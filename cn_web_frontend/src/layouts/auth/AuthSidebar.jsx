import React, { useState } from "react";
import "./authLayout.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { RiGroupLine, RiGiftLine, RiProductHuntLine } from "react-icons/ri";
import { FcStatistics } from "react-icons/fc";
import { Link, useLocation } from "react-router-dom";
const AuthSidebar = () => {
	const location = useLocation();
	const [showSidebar, setShowSidebar] = useState(true);

	return (
		<div className="authSidebarWrapper">
			<span
				onClick={() => {
					setShowSidebar(!showSidebar);
				}}
				className="authSidebar__arrow">
				{showSidebar ? <BsArrowLeft /> : <BsArrowRight />}
			</span>
			<ul className="authSidebar__list">
				<Link
					to={"users"}
					className={`authSidebar__item ${
						location.pathname.includes("users") ? "on" : "off"
					}`}>
					<span
						style={{
							display: `${showSidebar ? "inline-block" : "none"}`,
						}}>
						List User{" "}
					</span>
					<RiGroupLine />
				</Link>
				<Link
					to={"orders"}
					className={`authSidebar__item ${
						location.pathname.includes("orders") ? "on" : "off"
					}`}>
					{" "}
					<span
						style={{
							display: `${showSidebar ? "inline-block" : "none"}`,
						}}>
						List Order{" "}
					</span>
					<RiGiftLine />
				</Link>

				<Link
					to={"products"}
					className={`authSidebar__item ${
						location.pathname.includes("product") ? "on" : "off"
					} `}>
					<span
						style={{
							display: `${showSidebar ? "block" : "none"}`,
						}}>
						List Product
					</span>{" "}
					<RiProductHuntLine />
				</Link>
				<Link
					to={"newProduct"}
					className={`authSidebar__item ${
						location.pathname.includes("newProduct") ? "on" : "off"
					} `}>
					<span
						style={{
							display: `${showSidebar ? "block" : "none"}`,
						}}>
						New Product
					</span>{" "}
					<RiProductHuntLine />
				</Link>
				<li className="authSidebar__item">
					<span
						style={{
							display: `${showSidebar ? "block" : "none"}`,
						}}>
						Statistic
					</span>
					<FcStatistics />
				</li>
			</ul>
		</div>
	);
};

export default AuthSidebar;
