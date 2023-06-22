import axios from "axios";
import { getAccessToken, removeAccessToken } from "../utils/storage.util";
export const api = axios.create({
	baseURL: process.env.REACT_APP_END_POINT + "api/v1",
	headers: {
		"Content-Type": "application/json",
		Accept: "*/*",
		Authorization: getAccessToken(),
	},
});

export const apiImage = axios.create({
	baseURL: process.env.REACT_APP_END_POINT + "api/v1",
	headers: {
		"Content-Type": "multipart/form-data",
		Accept: "image/*",
	},
});

apiImage.interceptors.request.use(
	(config) => {
		const token = getAccessToken();

		// add token to headers
		if (token && config?.headers) {
			config.headers["Authorization"] = "Bearer " + token;
		}
		return config;
	},
	(error) => {
		Promise.reject(error);
	},
);

api.interceptors.request.use(
	(config) => {
		const token = getAccessToken();

		// add token to headers
		if (token && config?.headers) {
			config.headers["Authorization"] = "Bearer " + token;
		}
		return config;
	},
	(error) => {
		Promise.reject(error);
	},
);

api.interceptors.response.use(
	(response) => response.data,
	(error) => {
		if (error.response?.status === 401) {
			removeAccessToken();
		}
		return Promise.reject(error);
	},
);
