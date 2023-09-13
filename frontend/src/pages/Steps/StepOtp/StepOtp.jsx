import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../../components/Shared/Card/Card";
import TextInputs from "../../../components/Shared/TextInputs/TextInput";
import Button from "../../../components/Shared/Button/Button";

const StepOtp = () => {
	const Navigate = useNavigate();
	function submit() {
		Navigate("/activate");
	}
	return (
		<Card title="Enter the OTP we just texted you" icon="lock-emoji">
			<TextInputs />
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

export default StepOtp;
