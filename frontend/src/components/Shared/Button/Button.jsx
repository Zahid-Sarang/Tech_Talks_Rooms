import React from "react";

const Button = ({ text, onClick }) => {
	return (
		<button
			onClick={onClick}
			className="bg-secondary px-5 py-2.5 border-0 outline-none flex items-center mx-auto text-white text-lg font-bold rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:bg-card-color"
		>
			<span className="font-bold ">{text}</span>
			<img className="ml-2.5" src="/images/arrow-forward.png" alt="arrow" />
		</button>
	);
};

export default Button;
