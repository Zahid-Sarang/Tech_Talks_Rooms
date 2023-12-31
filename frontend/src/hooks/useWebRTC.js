import { useCallback, useEffect, useRef, useState } from "react";
import { useStateWithCallback } from "./useStateWithCallBack";
import socketInit from "../socket";
import { ACTIONS } from "../actions.js";
import { toast } from "react-toastify";
import freeice from "freeice";

export const useWebRTC = (roomId, user) => {
	const [clients, setClients] = useStateWithCallback([]);
	const audioElements = useRef({});
	const connections = useRef({});
	const localMediaStream = useRef(null);
	const socket = useRef(null);

	useEffect(() => {
		console.log("render socketInit", 2);
		socket.current = socketInit();
	}, []);

	const addNewClient = useCallback(
		(newClient, cb) => {
			const lookingFor = clients.find((client) => client.id === newClient.id);

			if (lookingFor === undefined) {
				setClients((existingClients) => [...existingClients, newClient], cb);
			}
		},
		[clients, setClients]
	);
	// Capture Media
	useEffect(() => {
		const startCapture = async () => {
			localMediaStream.current = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});
		};
		startCapture().then(() => {
			addNewClient(user, () => {
				const localElement = audioElements.current[user.id];
				if (localElement) {
					localElement.volume = 0;
					localElement.srcObject = localMediaStream.current;
				}
				// socket emit JOIN socket io
				socket.current.emit(ACTIONS.JOIN, {});
			});
		});
		return () => {
			// Leaving the room
			localMediaStream.current.getTracks().forEach((track) => track.stop());
			socket.current.emit(ACTIONS.LEAVE, { roomId });
		};
	}, []);

	useEffect(() => {
		const handleNewPeer = async ({ peerId, createOffer, user: remoteUser }) => {
			// if already connected then give warning
			if (peerId in connections.current) {
				return toast.error(`you are already connected with ${peerId}`);
			}
			connections.current[peerId] = new RTCPeerConnection({
				iceServers: freeice(),
			});
			// Handle new ice candidate
			connections.current[peerId].oniceCandidate = (event) => {
				socket.current.emit(ACTIONS.RELAY_ICE, {
					peerId,
					icecandidate: event.candidate,
				});
			};
			// Handle on Track on this connection

			connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
				addNewClient(remoteUser, () => {
					if (audioElements.current[remoteUser.id]) {
						audioElements.current[remoteUser.id].srcObject = remoteStream;
					} else {
						let settled = false;
						const interval = setInterval(() => {
							if (audioElements.current[remoteUser.id]) {
								audioElements.current[remoteUser.id].srcObject = remoteStream;
								settled = true;
							}
							if (settled) {
								clearInterval(interval);
							}
						}, 1000);
					}
				});
			};
			// Add local track to remote connections
			localMediaStream.current.getTracks().forEach((track) => {
				connections.current[peerId].addTrack(track, localMediaStream.current);
			});
			// Create Offer
			if (createOffer) {
				const offer = await connections.current[peerId].createOffer();
				await connections.current[peerId].setLocalDescription(offer);
				// send offer to another client
				socket.current.emit(ACTIONS.RELAY_SDP, {
					peerId,
					sessionDescription: offer,
				});
			}
		};
		socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);
		return () => {
			socket.current.off(ACTIONS.ADD_PEER);
		};
	}, []);

	// handle ice cendidate
	useEffect(() => {
		socket.current.on(ACTIONS.ICE_CANDIDATE, ({ peerId, icecandidate }) => {
			if (icecandidate) {
				connections.current[peerId].addIceCandidate(icecandidate);
			}
		});
		return () => {
			socket.current.off(ACTIONS.ICE_CANDIDATE);
		};
	}, []);

	//handle SDP
	useEffect(() => {
		const handleRemoteSdp = async ({
			peerId,
			sessionDescription: remoteSessionDescription,
		}) => {
			connections.current[peerId].sessionDescription(
				new RTCSessionDescription(remoteSessionDescription)
			);
			//if session description is type of offer then create a an answer
			if (remoteSessionDescription.type === "offer") {
				const connection = connections.peerId[peerId];
				const answer = await connection.createAnswer();
				connection.setLocalDescription(answer);
				socket.current.emit(ACTIONS.RELAY_SDP, {
					peerId,
					sessionDescription: answer,
				});
			}
		};
		socket.current.on(ACTIONS.SESSION_DESCRIPTION, handleRemoteSdp);
		return () => {
			socket.current.off(ACTIONS.SESSION_DESCRIPTION);
		};
	}, []);

	// remove peer
	useEffect(() => {
		const handleRemotePeer = async ({ peerId, userId }) => {
			if (connections.current[peerId]) {
				connections.current[peerId].close();
			}
			delete connections.current[peerId];
			delete audioElements.current[peerId];
			setClients((list) => list.filter((client) => client.id !== userId));
		};
		socket.current.on(ACTIONS.REMOVE_PEER, handleRemotePeer);
		return () => {
			socket.current.off(ACTIONS.REMOVE_PEER);
		};
	});

	const provideRef = (instance, userId) => {
		audioElements.current[userId] = instance;
	};

	return { clients, provideRef };
};
