import React, { useState } from "react";

import Card from "../../../components/Shared/Card/Card";
import TextInputs from "../../../components/Shared/TextInputs/TextInput";
import Button from "../../../components/Shared/Button/Button";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { setOtp } from "../../../store/authSlice";
import { sendOtp } from "../../../api";

const StepPhone = ({ onNext }) => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const dispatch = useDispatch();

	// function for sendOtp
	async function submit() {
		if (!phoneNumber) {
			return toast.error("Please enter a phone number");
		}
		try {
			const { data } = await sendOtp({ phone: phoneNumber });
			console.log(data);
			dispatch(setOtp({ phone: data.phone, hash: data.hash }));
			toast.success("OTP Sent!");
			onNext();
		} catch (error) {
			console.log(error);
			toast.error("request failed please try Again");
		}
	}
	return (
		<Card title="Enter Your Phone Number" icon="telephone">
			<TextInputs
				value={phoneNumber}
				onChange={(e) => setPhoneNumber(e.target.value)}
			/>
			<div>
				<div className="mt-10">
					<Button text="Next" onClick={submit} />
				</div>
				<p className="mx-auto mt-5 text-secondary-text">
					By entering your number, you’re agreeing to our Terms of Service and
					Privacy Policy. Thanks!
				</p>
			</div>
		</Card>
	);
};

export default StepPhone;
