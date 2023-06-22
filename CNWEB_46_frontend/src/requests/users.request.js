import { api, apiImage } from "./api";

import { setAccessToken } from "../utils/storage.util";

export const addAvatar = async (avatar) => {
	try {
		const formData = new FormData();
		formData.append("file", avatar);
		const response = await apiImage.post(`/user/avatar`, formData);
		return response.data;
		// console.log("Image uploaded successfully:", response.data);
	} catch (error) {
		console.error("Error uploading image:", error);
	}
};

export const getListUsers = async (
	take = 10,
	skip = 0,
	keyword = "",
	orderBy = ["id", "DESC"],
) => {
	const response = await api.get(`/admin/users?orderBy=${orderBy}`, {
		params: {
			take,
			skip,
			keyword,
		},
	});
	return response;
};

export const createUser = async (body, avatar = null) => {
	const response = await api.post("/user/register", body);

	setAccessToken(response?.token);

	avatar && (await addAvatar(avatar));
	return response;
};

export const updateUser = async (id, body) => {
	const response = await api.put(`/admin/user/${id}`, body);
	return response;
};
export const updateUserSelf = async (body) => {
	const response = await api.post(`/me/update`, body);
	return response;
};

export const login = async (body) => {
	const response = await api.post("/user/login", body);
	setAccessToken(response?.token);
	return response;
};
export const refreshToken = async () => {
	const response = await api.get("/refresh-token");
	setAccessToken(response?.token);
	return response;
};
