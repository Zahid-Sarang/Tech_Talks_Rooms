import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import { toast } from "react-toastify";

import { logout } from "../../../api";

const Navigation = () => {
	const dispatch = useDispatch();
	const Navigate = useNavigate();
	const { isAuth, user } = useSelector((state) => state.auth);

	async function logoutUser() {
		try {
			const { data } = await logout();
			dispatch(setAuth(data));
			Navigate("/");
			toast.success("Logout Success!");
		} catch (error) {
			console.error(error);
			toast.error(error.response?.data.message);
		}
	}

	return (
		<>
			{!user && (
				<nav className="flex items-center justify-center lg:justify-start mx-auto  lg:w-[1200px]">
					<Link
						to="/"
						className="items-center font-bold text-white no-underline ext-lg lg:flex"
					>
						<img src="/images/Logo.png" width="200px" alt="Logo" />
					</Link>
					{isAuth && (
						<div className="flex items-center mx-auto lg:mx-0 ">
							<h3>{user?.name}</h3>
							<Link to="/">
								<img
									className="rounded-full object-cover border-[3px] border-Active-text mx-5 mr-2.5"
									src={user.avatar ? user.avatar : "/images/logo.png"}
									width="40"
									height="40"
									alt="avatar"
								/>
							</Link>
							<button
								className="p-1 rounded ursor-pointer bg-secondary"
								onClick={logoutUser}
							>
								<img src="/images/arrow-forward.png" alt="logout" />
							</button>
						</div>
					)}
				</nav>
			)}
		</>
	);
};

export default Navigation;
