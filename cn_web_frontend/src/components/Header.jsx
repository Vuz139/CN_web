import React, { useEffect, useState } from "react";
import { BsCart4, BsSearch, BsBoxArrowInRight } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import logo from "../assets/images/logo1.png";

const Header = () => {
	const navigate = useNavigate();
	const [width, setWidth] = useState(window.innerWidth);
	const cart = useSelector((state) => state.cart);
	const [searchInput, setSearchInput] = useState("");
	const endPointImage =
		process.env.REACT_APP_END_POINT_IMAGE || "http://localhost:4001";
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	useEffect(() => {
		function handleResize() {
			setWidth(window.innerWidth);
		}
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleSearchInputChange = (e) => {
		setSearchInput(e.target.value);
	};
	const handleSearchSummit = (e) => {
		if (e.keyCode === 13) {
			e.preventDefault();
			navigate(`/products?${searchInput}`, { replace: true });
		}
	};
	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		setTimeout(() => {
			navigate("/login", { replace: true });
		}, 500);
	};
	const location = useLocation();

	return (
		<div className="header">
			<Link to={"/"} className="header__logo">
				<img src={logo} alt="LOGO" />
				{width > 786 && <span className="header__name">Nhóm 46</span>}
			</Link>
			{!location.pathname.includes("/product") && (
				<div className="header__search">
					<input
						type="text"
						className="header__search__input"
						placeholder="Tìm kiếm"
						value={searchInput}
						onChange={handleSearchInputChange}
						onKeyDown={handleSearchSummit}
					/>
					<span
						onClick={handleSearchSummit}
						className="header__search__icon">
						<BsSearch />
					</span>
				</div>
			)}
			{width > 786 && (
				<div className="header__navigation">
					<Link to={"/"}>Home</Link>
					<Link to={"/products"}>Products</Link>
					<Link to={"/about"}>About</Link>
					<Link to={"/user"}>Me</Link>
				</div>
			)}
			<div className="header__icons">
				<Link to={"/cart"} className="header__cart header__icon">
					<BsCart4 />
					<span className="header__cart__amount">{cart.length}</span>
				</Link>
				<span className="header__user header__icon">
					{user && user.id ? (
						<img
							style={{
								width: "100%",
								height: "100%",
								borderRadius: "50%",
							}}
							src={
								`${endPointImage}/${user.avatar}` ||
								"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX-BH0rwTlqY-_4BGCB_EYWt0vkOJkI8aBDQ&usqp=CAU"
							}
						/>
					) : (
						<HiOutlineUserCircle />
					)}

					<div className="header__user__menu">
						<Link to={"/user/orders"}>Đơn hàng</Link>
						<Link to={"/admin/newProduct"}>Quản lí sản phẩm</Link>
						{width <= 786 && (
							<>
								<Link to={"/"}>Home</Link>
								<Link to={"/products"}>Products</Link>
								<Link to={"/about"}>About</Link>
								<Link to={"/user"}>Me</Link>
							</>
						)}

						{user && user.id ? (
							<a
								style={{
									display: "inline-flex",
									alignItems: "center",
									gap: "4px",
								}}
								onClick={handleLogout}>
								<span style={{ display: "inline-flex" }}>
									Đăng xuất
								</span>
								<span
									style={{
										display: "inline-flex",
										fontSize: "1.8rem",
									}}>
									<BsBoxArrowInRight
										style={{ marginTop: "3px" }}
									/>
								</span>
							</a>
						) : (
							<Link to={"/login"}>Đăng nhấp</Link>
						)}
					</div>
				</span>
			</div>
		</div>
	);
};

export default Header;
