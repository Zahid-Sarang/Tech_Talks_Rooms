import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authSlice";

export function useLoadingWithRefresh() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(
					`${process.env.REACT_APP_API_URL}/api/refresh-Token`,
					{
						withCredentials: true,
					}
				);
				dispatch(setAuth(data));
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		})();
	}, []);

	return { loading };
}
