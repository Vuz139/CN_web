import { api } from "./api";

export const getAllOrders = async (params) => {
	const res = await api.get("/orders", {
		params: {
			...params,
		},
	});

	return res;
};

export const getOrderById = async (id) => {
	return await api.get(`/order/${id}`);
};

export const updateOrder = async (id, body) => {
	return await api.put(`/order/${id}`, {
		...body,
	});
};

export const getUserOders = async ({
	take = 5,
	page = 1,
	orderStatus = "",
}) => {
	return await api.get(`/user/orders`, {
		params: { take, page, orderStatus },
	});
};

export const createOrder = async (order) => {
	return await api.post(`/order`, order);
};
