import React from "react";
import { useNavigate,Link } from "react-router-dom";

import VoiceChatIcon from "@mui/icons-material/VoiceChat";
import PersonIcon from "@mui/icons-material/Person";

const RoomCard = ({ room }) => {
	const navigate = useNavigate();

	return (
		<div
			onClick={() => {
				navigate(`/room/${room.id}`);
			}}
			className="p-5 rounded-lg cursor-pointer bg-card-color"
		>
			<div className="flex items-center justify-between gap-2">
			<h3 className="text-secondary">{room.topic}</h3>
			<Link to={`/room/${room.id}`} className="font-bold text-Active-text">Join</Link>
				
			</div>
			<div
				className={`flex items-center relative my-5 ${
					room.speakers.length === 1 ? "space-x-5" : ""
				}flex items-center relative my-5`}
			>
				<div className="absolute top-0 left-0">
					{room.speakers.map((speaker) => (
						<img
							key={speaker.id}
							src={speaker.avatar}
							alt="speaker-avatar"
							className="w-10 h-10 rounded-full object-cover border-2 border-Active-text bg-secondary last:top-[20px] last:left-[20px]"
						/>
					))}
				</div>
				<div className="ml-24">
					{room.speakers.map((speaker) => (
						<div key={speaker.id} className="flex items-center space-x-1.5">
							<span className="inline-block pb-1 text-secondary-text">
								{speaker.name}
							</span>
							<VoiceChatIcon className="text-Active-text" />
						</div>
					))}
				</div>
			</div>
			<div className="items-center text-right">
				<span className="font-bold mr-1.5 text-secondary">
					{room.totalPeople}
				</span>
				<PersonIcon className="text-secondary" />
			</div>
		</div>
	);
};

export default RoomCard;
