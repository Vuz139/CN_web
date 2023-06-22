import React, { useEffect, useState } from "react";
import "../assets/CSS/cart.css";
import Button from "../components/Button";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const ShoppingCart = () => {
	const cartItems = useSelector((state) => state.cart);
	return (
		<div class="cartWrapper">
			<h1 className="cartTitle">Your Cart</h1>
			<div class="cart-row">
				<span class="cart-item cart-header cart-column">Sản Phẩm</span>
				<span class="cart-price cart-header cart-column">Giá</span>
				<span class="cart-quantity cart-header cart-column">
					Số Lượng
				</span>
				<span class="cart-action cart-header cart-column"></span>
			</div>
			<div class="cart-items">
				{cartItems && cartItems.map((p) => <CartItem product={p} />)}
				<div class="cart-total">
					<strong class="cart-total-title">Tổng Cộng:</strong>

					<>
						{" "}
						<span class="cart-total-price">
							{cartItems.reduce(
								(curr, value) =>
									curr + value.price * value.amount,
								0,
							)}
							$
						</span>
						<br />
					</>

					<br />
					<Link to={"/order"}>
						<Button title={"Thanh toán"} />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCart;
