import axios from "axios";

const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
	headers: {
		"Content-type": "application/json",
		Accept: "application/json",
	},
});

/*
|--------------------------------------------|
| Api Enpoints   
|--------------------------------------------|
|
*/

export const sendOtp = (data) => api.post("/api/send-otp", data);
export const verifyOtp = (data) => api.post("/api/verify-otp", data);
export const activate = (data) => api.post("/api/activate", data);
export const logout = () => api.post("/api/logout");
export const create = (data) => api.post("/api/createroom", data);
export const getAllRooms = () => api.get("/api/allrooms");

/* INTERCEPTORS */
api.interceptors.response.use(
	(config) => {
		return config;
	},
	async (error) => {
		const originalRequest = error.config;
		if (
			error.response.status === 401 &&
			originalRequest &&
			!originalRequest._isRetry
		) {
			originalRequest.isRetry = true;
			try {
				await axios.get(`${process.env.REACT_APP_API_URL}/api/refresh-Token`, {
					withCredentials: true,
				});
				return api.request(originalRequest);
			} catch (error) {
				console.log("interceptors error");
				console.log(error);
			}
		}
		throw error;
	}
);

export default api;
