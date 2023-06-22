import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Meta from "../components/Meta";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProductConfigs } from "../requests/products.request";
import { setProduct } from "../redux/productSlice";
import Loading from "../components/public/Loading";
import { refreshToken } from "../requests/users.request";

const AppLayout = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		const fetProductConfig = async () => {
			try {
				setLoading(true);
				const res = await getProductConfigs();
				await refreshToken();
				if (res.status === "success") {
					dispatch(setProduct(res.data));
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetProductConfig();
	}, []);
	return (
		<div className="appLayout">
			<Header />
			<Meta>
				{" "}
				<Link to={"/"}>Home</Link> /{" "}
				<Link to={location.pathname}>{location.pathname.slice(1)}</Link>{" "}
			</Meta>
			<section
				style={{
					minHeight: "90vh",
					maxWidth: "1200px",
					margin: "auto",
				}}
				className="main">
				<section className="page">
					{loading ? <Loading /> : children}
				</section>
			</section>
			<Footer />
		</div>
	);
};

export default AppLayout;
