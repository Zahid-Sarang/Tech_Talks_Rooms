import React from "react";

import { useSelector } from "react-redux";

//======================================== React Router Imports========================================//
import { Link } from "react-router-dom";
import Nav from "../Nav/Nav";
//=====================================================================================================//

const SideBar = () => {
	const { isAuth, user } = useSelector((state) => state.auth);

	return (
		<>
			{isAuth && (
				<div
					id="sidebar"
					className="fixed top-0 left-0 z-40 max-md:top-auto max-md:bottom-0"
				>
					<div className="flex sside md:flex-col justify-between md:h-screen md:p-2 p-1 transition-all duration-500  shadow  2xl:w-72 xl:w-60 max-xl:w-[73px] max-md:w-screen max-md:border-t">
						<div className="flex h-20 px-2 max-md:fixed max-md:top-0 max-md:left-0 max-md:px-4 ">
							<Link
								to="/"
								className="w-full h-6 ml-1 !hidden max-xl:!hidden  max-md:!block dark:!block text-xl text-secondary-btn"
							>
								<img src="/images/Logo.png" width="200px" alt="Logo" />
							</Link>
							<img
								id="logo__icon"
								src="/images/text-logo.png"
								alt="logo__icon"
								class="md:w-8 hidden text-2xl max-xl:!block max-md:!hidden shrink-0 uk-animation-scale-up"
							/>
						</div>
						<Nav />
					</div>
				</div>
			)}
		</>
	);
};

export default SideBar;
