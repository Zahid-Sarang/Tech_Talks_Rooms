import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomsLaout from "../RoomsLayout/RoomsLayout";
import TextInput from "../../components/Shared/TextInputs/TextInput";
import { create } from "../../api";
import { toast } from "react-toastify";

const CreateRoom = () => {
	const [roomType, setroomType] = useState("open");
	const [topic, setTopic] = useState("");
	const navigate = useNavigate();

	async function createRooms() {
		console.log(topic, roomType);
		try {
			if (!topic) return toast.error("Please provide a topic!");
			const { data } = await create({ topic, roomType });
			console.log(data);
			toast.success("Room created successfully!");
			navigate("/rooms");
		} catch (error) {
			toast.error(error.message);
		}
	}

	return (
		<div>
			<RoomsLaout>
				<main className="2xl:ml-[--w-side] xl:ml-[--w-side-md] md:ml-[--w-side-small] w-full">
					<div className="max-w-screen-sm pt-10 pb-10 pl-5 pr-5 mx-auto">
						<div className="fixed top-0 bottom-0 right-0 flex items-center justify-center left-20 ">
							<div className="relative w-1/2 bg-card-color max-w-500 rounded-xl">
								<div className="p-10 border-b border-secondary">
									<h3 className="m-3 text-xl font-bold text-secondary">
										Enter the Topic to be disscussed
									</h3>
									<TextInput
										fullwidth="true"
										value={topic}
										onChange={(e) => setTopic(e.target.value)}
									/>
									<h2 className="text-lg m-2.5 font-bold text-secondary">
										Room types
									</h2>
									<div className="grid grid-cols-3 gap-7.5">
										<div
											onClick={() => setroomType("open")}
											className={`flex flex-col items-center p-2.5 rounded-lg cursor-pointer ${
												roomType === "open" ? "bg-background-color" : ""
											}`}
										>
											<img src="/images/globe.png" alt="globe" />
											<span className="text-secondary">Open</span>
										</div>
										<div
											onClick={() => setroomType("social")}
											className={`flex flex-col items-center p-2.5 rounded-lg cursor-pointer ${
												roomType === "social" ? "bg-background-color" : ""
											}`}
										>
											<img src="/images/social.png" alt="socail" />
											<span className="text-secondary">Social</span>
										</div>
										<div
											onClick={() => setroomType("close")}
											className={`flex flex-col items-center p-2.5 rounded-lg cursor-pointer ${
												roomType === "close" ? "bg-background-color" : ""
											}`}
										>
											<img src="/images/lock.png" alt="lock" />
											<span className="text-secondary">Closed</span>
										</div>
									</div>
								</div>
								<div className="p-7.5 text-center mb-4">
									<h2 className="my-5 text-lg font-bold text-secondary">
										Start a room, Open to EveryOne
									</h2>
									<button
										onClick={createRooms}
										className="bg-Active-text text-white flex items-center w-50 justify-center py-1.5 px-2.5 rounded-xl mx-auto transition-transform transform hover:bg-green-700"
									>
										<img src="/images/celebration.png" alt="celebration" />
										<span className="ml-1.5 font-bold">Let's go</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</main>
			</RoomsLaout>
		</div>
	);
};

export default CreateRoom;
