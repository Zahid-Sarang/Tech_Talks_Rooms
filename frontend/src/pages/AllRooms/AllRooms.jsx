import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Rooms from "../RoomsLayout/RoomsLayout";

import RoomCard from "../../components/RoomCard/RoomCard";

import { getAllRooms } from "../../api";
// const rooms = [
// 	{
// 		id: 1,
// 		topic: "Which framework best for frontend ?",
// 		speakers: [
// 			{
// 				id: 1,
// 				name: "John Doe",
// 				avatar: "/images/avatar.png",
// 			},
// 			{
// 				id: 2,
// 				name: "Jane Doe",
// 				avatar: "/images/Home.png",
// 			},
// 		],
// 		totalPeople: 40,
// 	},
// 	{
// 		id: 3,
// 		topic: "What’s new in machine learning?",
// 		speakers: [
// 			{
// 				id: 1,
// 				name: "John Doe",
// 				avatar: "/images/Home.png",
// 			},
// 			{
// 				id: 2,
// 				name: "Jane Doe",
// 				avatar: "/images/Home.png",
// 			},
// 		],
// 		totalPeople: 40,
// 	},
// 	{
// 		id: 4,
// 		topic: "Why people use stack overflow?",
// 		speakers: [
// 			{
// 				id: 1,
// 				name: "John Doe",
// 				avatar: "/images/Home.png",
// 			},
// 			{
// 				id: 2,
// 				name: "Jane Doe",
// 				avatar: "/images/Home.png",
// 			},
// 		],
// 		totalPeople: 40,
// 	},
// 	{
// 		id: 5,
// 		topic: "Artificial inteligence is the future?",
// 		speakers: [
// 			{
// 				id: 1,
// 				name: "zahid",
// 				avatar: "/images/Home.png",
// 			},
// 			{
// 				id: 2,
// 				name: "Jane Doe",
// 				avatar: "/images/Home.png",
// 			},
// 		],
// 		totalPeople: 40,
// 	},
// ];

const AllRooms = () => {
	const [rooms, setRooms] = useState([]);
	const navigate = useNavigate();

    // Get All Rooms
	useEffect(() => {
		const fetchRooms = async () => {
			try {
				const { data } = await getAllRooms();
				setRooms(data);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchRooms();
	}, []);

	return (
		<div>
			<main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small] w-full">
				<div className="pt-10 pb-10 pl-5 pr-5 md:ml-[300px] lg:ml-[400px] ">
					<div className="flex flex-row items-center justify-between">
						<span className="relative text-xl font-bold">
							All voice Rooms
							<span className="absolute bottom-[-10px] left-0 w-3/5 h-1 bg-Active-text"></span>
						</span>
						<button
							onClick={() => navigate("/create-room")}
							to="/create-room"
							className="flex items-center md:mr-[100px] lg:mr-[150px] text-white bg-Active-text py-3 px-5 rounded-xl transition-all duration-300 ease-in-out hover:bg-green-800"
						>
							<img src="/images/add-room-icon.png" alt="add-room" />
							<span className="text-lg ml-2.5">Start a room</span>
						</button>
					</div>
					<div className="grid grid-cols-3 gap-10 mt-16 mr-5">
						{rooms.map((room) => (
							<RoomCard key={room.id} room={room} />
						))}
					</div>
				</div>
			</main>
		</div>
	);
};

export default AllRooms;
