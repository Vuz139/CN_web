import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
	name: "product",
	initialState: {},
	reducers: {
		setProduct: (state, payload) => {
			// console.log(">>>check payload: ", payload.payload);
			Object.assign(state, payload.payload);
		},
	},
});

export const { setProduct } = productSlice.actions;

export const productReducer = productSlice.reducer;
