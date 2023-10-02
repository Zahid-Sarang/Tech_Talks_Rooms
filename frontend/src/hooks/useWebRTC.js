import { useState } from "react";
import { useStateWithCallback } from "./useStateWithCallBack";
export const useWebRTC = () => {
	const [clients, setClients] = useStateWithCallback([
		{
			id: 1,
			name: "Raksesh K",
		},
		{
			id: 2,
			name: "Zahid Sarang",
		},
	]);
	return { clients };
};
