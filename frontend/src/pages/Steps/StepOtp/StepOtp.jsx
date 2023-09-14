import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../../components/Shared/Card/Card";
import TextInputs from "../../../components/Shared/TextInputs/TextInput";
import Button from "../../../components/Shared/Button/Button";
import Loader from "../../../components/Shared/Loader/Loader";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { verifyOtp } from "../../../api";
import { setAuth } from "../../../store/authSlice";

const StepOtp = () => {
	const Navigate = useNavigate();
	const [otp, setOtp] = useState("");
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const { phone, hash } = useSelector((state) => state.auth.otp);
	// "Unexpected token 3 in JSON at position 0"

	// verify otp
	async function submit() {
		if (!otp || !phone || !hash) return toast.error("Please OTP!");
		setLoading(true);
		try {
			const { data } = await verifyOtp({ otp, hash, phone });
			console.log("Verified OTP data: ", data);
			dispatch(setAuth(data));
			toast.success("OTP Verified!");
			Navigate("/activate");
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		} finally {
			setLoading(false);
		}
	}
	if (loading) return <Loader message="Verifing Otp.." />;
	return (
		<>
			<Card title="Enter the OTP we just texted you" icon="lock-emoji">
				<TextInputs value={otp} onChange={(e) => setOtp(e.target.value)} />
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
		</>
	);
};

export default StepOtp;
