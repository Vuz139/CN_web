import { createSlice } from "@reduxjs/toolkit";
import { removeUser, setUser } from "../utils/storage.util";

const userLogined = JSON.parse(localStorage.getItem("user")) || {};

const userSlice = createSlice({
	name: "user",
	initialState: userLogined,
	reducers: {
		loginRedux: (state, payload) => {
			Object.assign(state, payload.payload);
			setUser(payload.payload);
		},
		updateUserRedux: (state, payload) => {
			Object.assign(state, payload.payload);
			setUser(state);
		},
		logout: () => {
			removeUser();
			return {};
		},
	},
});

export const { loginRedux, logout, updateUserRedux } = userSlice.actions;

export const userReducer = userSlice.reducer;
