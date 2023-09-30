import React from "react";
import { useNavigate } from "react-router-dom";
import NavBarLink from "./NavLink";
import { logout } from "../../api";

import { toast } from "react-toastify";
//======================================== Material Icons Imports========================================//
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
//=====================================================================================================//

import { useDispatch} from "react-redux";
import { setAuth } from "../../store/authSlice";

const Nav = () => {
	const dispatch = useDispatch();
	const Navigate = useNavigate();

	async function LogoutUser() {
		try {
			const { data } = await logout();
			dispatch(setAuth(data));
			Navigate("/");
			toast.success("Logout Success");
		} catch (error) {
			toast.error(error.message);
		}
	}
	return (
		<nav className="flex-1 md:mt-20 max-md:flex max-md:justify-around md:space-y-2">
			{/* Home  */}
			<NavBarLink url="/rooms" Icon={HomeRoundedIcon} title="Rooms" />
			{/* Create a room */}
			<NavBarLink
				url="/create-room"
				Icon={AddCircleOutlineRoundedIcon}
				title="Create Rooms"
			/>
			{/* Logout  */}
			<NavBarLink Icon={LogoutIcon} title="Logout" onClick={LogoutUser} />
		</nav>
	);
};

export default Nav;
