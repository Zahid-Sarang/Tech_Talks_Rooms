import React from "react";

import Card from "../../../components/Shared/Card/Card";
import TextInputs from "../../../components/Shared/TextInputs/TextInput";
import Button from "../../../components/Shared/Button/Button";

const StepPhone = ({ onNext }) => {
	function submit() {
    onNext();
  }
	return (
		<div className="flex items-center justify-center mt-24">
			<Card title="Enter Your Phone Number" icon="telephone">
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
		</div>
	);
};

export default StepPhone;
