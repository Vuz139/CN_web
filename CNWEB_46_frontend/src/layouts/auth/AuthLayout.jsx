import React, { useState } from "react";
import AuthSidebar from "./AuthSidebar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Meta from "../../components/Meta";
import { useLocation } from "react-router";

const AuthLayout = ({ children }) => {
	const location = useLocation();
	const title = location.pathname.split("/");

	return (
		<>
			<Header />
			<Meta>
				{" "}
				<a>{title[1]}</a> / <a>{title[2]}</a>{" "}
			</Meta>
			<div className="authContainer">
				<header
					style={{
						margin: "0 8px",
						padding: "4px",
						border: "1px solid #ccc",
					}}>
					<AuthSidebar />
				</header>
				<section>{children}</section>
			</div>
			<Footer />
		</>
	);
};

export default AuthLayout;
