import React from "react";

const Card = ({ title, icon, children }) => {
	return (
		<div className="w-[500px] max-w-[90%] min-h-[300px] bg-white p-8 rounded-xl flex flex-col justify-center items-center">
			<div className="flex items-center justify-center mb-8">
				{icon && <img src={`/images/${icon}.png`} alt="logo" width="100" />}
				{title && (
					<h1 className="text-xl font-bold ml-2.5 text-primary-text">
						{title}
					</h1>
				)}
			</div>
			{children}
		</div>
	);
};

export default Card;
