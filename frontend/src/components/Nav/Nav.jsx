import React from "react";
import NavBarLink from "./NavLink";

//======================================== Material Icons Imports========================================//
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
//=====================================================================================================//

const Nav = () => {
	return (
		<nav className="flex-1 md:mt-20 max-md:flex max-md:justify-around md:space-y-2">
			{/* Home  */}
			<NavBarLink url="/rooms" Icon={HomeRoundedIcon} title="Rooms" />
            {/* Create a room */}
            <NavBarLink url="/create-room" Icon={AddCircleOutlineRoundedIcon} title="Create Rooms" />
		</nav>
	);
};

export default Nav;
