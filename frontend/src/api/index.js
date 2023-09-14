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

export const sendOtp = (data) => api.post('/api/send-otp', data)