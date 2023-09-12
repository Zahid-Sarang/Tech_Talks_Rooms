import React from "react";
import { Link } from "react-router-dom";
const Navigation = () => {
	return (
		<nav className="flex items-center justify-between  lg:w-[1200px] max-w-90 mx-auto">
			<Link
				to="/"
				className="items-center hidden text-lg font-bold text-white no-underline lg:flex"
			>
				<img src="/images/Logo.png" width="200px" />
			</Link>
			<div className="flex items-center mx-auto lg:mx-0 ">
				<h3>Name</h3>
				<Link to="/">
					<img
						className="rounded-full object-cover border-[3px] border-Active-text mx-5 mr-2.5"
						src="/images/Logo.png"
						width="40"
						height="40"
						alt="avatar"
					/>
				</Link>
				<button className="p-1 rounded ursor-pointer bg-secondary">
					<img src="/images/arrow-forward.png" alt="logout" />
				</button>
			</div>
		</nav>
	);
};

export default Navigation;
