import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Login from "../pages/auth/all_login/Login";
import Me from "../pages/auth/all_me/Me";
import Header from "../components/Header";
import Footer from "../components/Footer";

import ShoppingCart from "../pages/ShoppingCart";
import { useSelector } from "react-redux";

import Home from "../pages/home/Home";
import ListProducts from "../pages/ListProducts";
import Error404 from "../components/public/Error404";
import Error403 from "../components/public/Error403";
import AuthLayout from "../layouts/auth/AuthLayout";

import SignUp from "../pages/auth/all_signup/Signup";
import ListOrder from "../pages/admin/ListOrder";
import Product from "../pages/Product";
import NewProduct from "../pages/admin/NewProduct";
import ListProductRow from "../pages/admin/ListProductRow";
import ListUser from "../pages/admin/ListUser";
import AppLayout from "../layouts/AppLayout";
import NewOrder from "../pages/orders/NewOrder";
import UserOrders from "../pages/orders/UserOrders";
import About from "../pages/About";
import User from "../pages/User";
const ProtectedRoute = ({ children, roles }) => {
	const user = useSelector((state) => state.user);

	if (user) {
		if (roles && !roles.includes(user.role))
			return <Navigate to="/403" replace />;
		return children;
	}
	alert("Bạn nên đăng nhập trước");
	return <Navigate to="/login" replace />;
};

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/*" element={<Error404 />} />
			<Route path="/403" element={<Error403 />} />

			<Route
				path="/"
				element={
					<>
						<Header />
						<Home />
						<Footer />
					</>
				}
			/>
			<Route
				path="/order"
				element={
					<ProtectedRoute>
						<AppLayout>
							<NewOrder />
						</AppLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/user/orders"
				element={
					<ProtectedRoute>
						<AppLayout>
							<UserOrders />
						</AppLayout>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/login"
				element={
					<>
						<Header />
						<Login />
						<Footer />
					</>
				}
			/>
			<Route path="/signup" element={<SignUp />} />
			<Route
				path="/products"
				element={
					<AppLayout>
						<ListProducts />
					</AppLayout>
				}
			/>
			<Route
				path="/product/:id"
				element={
					<AppLayout>
						<Product />
					</AppLayout>
				}
			/>
			<Route path="/me" element={<Me />} />
			<Route
				path="/cart"
				element={
					<AppLayout>
						<ShoppingCart />
					</AppLayout>
				}
			/>
			<Route
				path="/about"
				element={
					<AppLayout>
						<About />
					</AppLayout>
				}
			/>
			<Route
				path="/user"
				element={
					<AppLayout>
						<User />
					</AppLayout>
				}
			/>
			<Route
				path="/admin"
				element={
					<ProtectedRoute roles={"admin"}>
						<AuthLayout>
							<Outlet />
						</AuthLayout>
					</ProtectedRoute>
				}>
				<Route path="newProduct" element={<NewProduct />} />
				<Route path="users" element={<ListUser />} />
				<Route path="orders" element={<ListOrder />} />
				<Route path="products" element={<ListProductRow />} />
			</Route>
		</Routes>
	);
};

export default AppRoutes;
