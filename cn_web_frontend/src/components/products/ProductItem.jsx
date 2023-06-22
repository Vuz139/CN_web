import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { IoIosAdd, IoIosCart } from "react-icons/io";
import "./ProductItem.css";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ product }) => {
	const dispatch = useDispatch();
	const [showAddToCart, setShowAddToCart] = useState(false);
	const YesStar = [];

	for (let i = 0; i < Math.floor(product.ratings); i++) {
		YesStar.push(<FaStar color="yellow" />);
	}
	const NoStar = [];
	let noStar = 5 - Math.floor(product.ratings);
	for (let i = 0; i < noStar; i++) {
		NoStar.push(<FaStar />);
	}

	const navigate = useNavigate();
	const handleAddToCart = (event) => {
		event.stopPropagation();
		dispatch(addToCart(product));
		setShowAddToCart(true);
		setTimeout(() => {
			setShowAddToCart(false);
		}, 600);
	};

	const handleBuyNow = (event) => {
		event.stopPropagation();
		dispatch(addToCart(product));

		navigate("/order", { replace: true });
	};

	const endPointImg = process.env.REACT_APP_END_POINT_IMAGE;

	console.log(">>>>image: ", product.id, product.images);
	return (
		<div
			style={{ cursor: "pointer" }}
			onClick={() => {
				window.scrollTo({ top: 0, behavior: "smooth" });
				navigate(`/product/${product.id}`);
			}}
			className="col-4 m-3 sm-12">
			<div className="pi-product">
				<Link to={`/product/${product.id}`} className="pi-img-prod">
					<img
						className="pi-img-fluid"
						src={
							product?.images && product.images.length > 0
								? `${endPointImg}/${product.images[0].path}`
								: ""
						}
						alt="Normal"
					/>
					{showAddToCart && (
						<div
							style={{ objectFit: "cover" }}
							class="sketchfab-embed-wrapper productFly">
							<img
								style={{
									width: "100%",
									height: "320px",
								}}
								src={`${endPointImg}/${
									product && product.images[0]?.path
								}`}
								alt=""
							/>
						</div>
					)}
					<div className="pi-overlay" />
				</Link>

				<div className="pi-text">
					<div className="pi-wrap-cat-rat">
						<div className="pi-cat">
							<span>{product.category}</span>
						</div>

						<div className="pi-rating">
							<p className="">
								{YesStar}
								{NoStar}
							</p>
						</div>
					</div>

					<h3 className="pi-des">{product.description}</h3>
					<div className="pi-pricing">
						<p className="pi-price">${product.price}</p>
					</div>
					<div className="pi-seller">
						<p>{product.seller}</p>
					</div>
					<p className="pi-bottom-area">
						<button
							onClick={handleAddToCart}
							className="pi-add-cart pi-cho">
							ADD TO CART
							<IoIosAdd />
						</button>
						<button
							onClick={handleBuyNow}
							className="pi-buy-now pi-cho">
							BUY NOW
							<IoIosCart />
						</button>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ProductItem;
