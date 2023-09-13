import React from "react";

const TextInput = (props) => {
	return (
		<div>
			<input
				className={`bg-card-color border-none px-5 py-2.5 w-50 text-secondary text-lg rounded-lg focus:outline-none ${
					props.fullwidth === "true" ? "w-full" : ""
				}`}
				type="text"
				{...props}
			/>
		</div>
	);
};

export default TextInput;
