import React, { useState } from "react";

import Card from "../../../components/Shared/Card/Card";
import TextInputs from "../../../components/Shared/TextInputs/TextInput";
import Button from "../../../components/Shared/Button/Button";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../store/activateSlice";

const StepName = ({ onNext }) => {
	const { name } = useSelector((state) => state.activate);
	const dispatch = useDispatch();
	const [fullname, setFullname] = useState(name);

	function nextStep() {
		if (!fullname) {
			return toast.error("Fullname is required");
		}
		dispatch(setName(fullname));
		onNext();
	}
	return (
		<Card title="What’s your full name?" icon="test">
			<TextInputs
				value={fullname}
				onChange={(e) => setFullname(e.target.value)}
			/>
			<p className="mx-auto mt-5 text-secondary-text">
				Please use your real name
			</p>
			<div className="mt-10">
				<Button onClick={nextStep} text="Next" />
			</div>
		</Card>
	);
};

export default StepName;
