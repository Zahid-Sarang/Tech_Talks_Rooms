import { useCallback, useEffect, useRef, useState } from "react";
import { useStateWithCallback } from "./useStateWithCallBack";
import socketInit from "../socket";
import { ACTIONS } from "../actions.js";

export const useWebRTC = (roomId, user) => {
	const [clients, setClients] = useStateWithCallback([]);
	const audioElements = useRef({});
	const connections = useRef({});
	const localMediaStream = useRef(null);
	const socket = useRef(null);

	useEffect(() => {
		socket.current = socketInit();
	}, []);

	// wrapper function
	const addNewClient = useCallback(
		(newClient, cb) => {
			console.log("Adding new client:", newClient);

			const lookingFor = clients.find((client) => client.id === newClient.id);
			if (lookingFor == undefined) {
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
	}, []);

	const provideRef = (instance, userId) => {
		audioElements.current[userId] = instance;
	};

	return { clients, provideRef };
};
