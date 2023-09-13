import { useState } from "react";

import StepPhone from "../Steps/StepPhone/StepPhone";
import StepOtp from "../Steps/StepOtp/StepOtp";

const Steps = {
	1: StepPhone,
	2: StepOtp,
};

const Authentication = () => {
	const [step, setStep] = useState(1);
	function onNext() {
		if (step >= 2) {
			return;
		}
		setStep(step + 1);
	}
	const Step = Steps[step];
	return (
		<div className="flex items-center justify-center mt-24">
			<Step onNext={onNext}></Step>
		</div>
	);
};

export default Authentication;
