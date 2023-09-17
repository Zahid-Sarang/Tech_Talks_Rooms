import React from "react";
import AllRooms from "../AllRooms/AllRooms";
import SideBar from "../../components/SideBar/SideBar";

const RoomsLayout = ({ children }) => {
	return (
		<div>
			<SideBar />
			{children ? <div>{children}</div> : <AllRooms />}
		</div>
	);
};

export default RoomsLayout;
