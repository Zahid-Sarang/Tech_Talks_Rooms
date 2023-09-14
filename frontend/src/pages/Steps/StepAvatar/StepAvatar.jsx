import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../../components/Shared/Card/Card";
import Button from "../../../components/Shared/Button/Button";

import { useSelector, useDispatch } from "react-redux";
import { setAvatar } from "../../../store/activateSlice";
import { setAuth } from "../../../store/authSlice";
import { activate } from "../../../api";

import { toast } from "react-toastify";

const StepAvatar = () => {
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState("/images/Avatar.png");
	const { name, avatar } = useSelector((state) => state.activate);
	const Navigate = useNavigate();
	const dispatch = useDispatch();

	// capture image
	function captureImage(e) {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setImage(reader.result);
			dispatch(setAvatar(reader.result));
		};
	}

	// submit image
	async function submit() {
		if (!name || !avatar) return toast.error("Please upload your profile");
		setLoading(true);
		console.log(name);
		console.log(image);
		try {
			const { data } = await activate({ name, avatar });
			if (data.auth) {
				dispatch(setAuth(data));
				console.log("avatar data:", data);
				Navigate("/rooms");
			}
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		} finally {
			setLoading(false);
		}
	}
	return (
		<Card title={`Okay,${name}`} icon="monkey-emoji">
			<p className="mb-5 text-center text-secondary-text">
				Upload Your Profile Picture
			</p>
			<div className="w-[110px] h-[110px] border-[6px] border-secondary-text rounded-full flex items-center justify-center overflow-hidden">
				<img
					className="h-[100%] w-[100%] object-cover"
					src={image}
					alt="profile"
				/>
			</div>
			<div>
				<input
					onChange={captureImage}
					id="avatarInput"
					type="file"
					className="hidden"
				/>
				<label
					className="inline-block my-8 cursor-pointer text-Active-text"
					htmlFor="avatarInput"
				>
					Choose a different photo
				</label>
			</div>
			<div>
				<Button onClick={submit} text="Next" />
			</div>
		</Card>
	);
};

export default StepAvatar;
