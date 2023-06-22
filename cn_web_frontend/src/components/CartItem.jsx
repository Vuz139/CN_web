import React, { useState } from "react";
import "../assets/CSS/cart.css";
import { useDispatch } from "react-redux";
import {
	addToCart,
	removeAllFromCart,
	removeFromCart,
} from "../redux/cartSlice";
import Button from "./Button";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { Link } from "react-router-dom";
const CartItem = ({ product }) => {
	const [amount, setAmount] = useState(product.amount);

	const handleIncre = () => {
		dispatch(addToCart(product));
		setAmount((prev) => prev + 1);
	};
	const handleDecre = () => {
		if (amount < 1) {
			return;
		}
		dispatch(removeFromCart(product));
		setAmount((prev) => prev - 1);
	};

	const dispatch = useDispatch();
	return (
		<div class="cart-row">
			<Link to={`/product/${product.id}`} class="cart-item cart-column">
				<img
					class="cart-item-image"
					src={`${process.env.REACT_APP_END_POINT_IMAGE}/${product.images[0].path}`}
					width="100"
					height="100"
				/>
				<span class="cart-item-title">
					<h2>{product.name}</h2>
					{product.description.slice(0, 50)}...
				</span>
			</Link>
			<span class="cart-price cart-column">
				${product.price * amount}
			</span>
			<div class="cart-quantity cart-column">
				<span className="cart__quantity" type="number">
					<span onClick={handleIncre}>
						<BsArrowUp />
					</span>
					{amount}
					<span onClick={handleDecre}>
						<BsArrowDown />
					</span>
				</span>
			</div>
			<div className="cart-action cart-column">
				<Button
					color="danger"
					onClick={() => dispatch(removeAllFromCart(product.id))}
					type="small">
					Xóa
				</Button>
			</div>
		</div>
	);
};

export default CartItem;
