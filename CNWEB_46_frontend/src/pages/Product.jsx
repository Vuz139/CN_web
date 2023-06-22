import React, { useEffect, useState } from "react";
import "../assets/CSS/product.css";
import { useParams } from "react-router";
import { getAllProducts, getProductById } from "../requests/products.request";
import Loading from "../components/public/Loading";
import CommentWrapper from "../components/products/CommentWrapper";
import FIlterStar from "../components/products/FIlterStar";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import ProductWrapper from "../components/products/ProductWrapper";
const Product = () => {
	const [currProduct, setCurrProduct] = useState({});
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const params = useParams();
	const [showAddToCart, setShowAddToCart] = useState(false);
	const [productSuggest, setProductSuggest] = useState([]);
	useEffect(() => {
		const getProduct = async () => {
			try {
				setLoading(true);
				const resp = await getProductById(params.id);
				if (resp.status === "success") {
					setCurrProduct({ ...resp.product });
					const suggestions = await getAllProducts({
						take: 4,
						page: 0,
						orderBy: ["ratings", "desc"],
						keyword: resp.product.category,
					});

					if (suggestions.status === "success") {
						let sgs = [];
						for (let i = 0; i < suggestions.products.length; i++) {
							if (
								suggestions.products[i].id.toString() !==
								params.id.toString()
							) {
								sgs.push(suggestions.products[i]);
							}
						}

						setProductSuggest(sgs);
					}
				}
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		};
		getProduct();
	}, [params.id]);
	const handleAddToCart = () => {
		setShowAddToCart(true);
		setTimeout(() => {
			setShowAddToCart(false);
		}, 600);
		dispatch(addToCart(currProduct));
	};
	return loading ? (
		<Loading />
	) : (
		<div class="product-page-container">
			<section id="product-page">
				<div class="product-page-img">
					<div
						style={{ objectFit: "cover" }}
						class="sketchfab-embed-wrapper">
						<img
							style={{
								width: "100%",
								height: "320px",
							}}
							src={`http://localhost:4001/${
								currProduct && currProduct.images[0]?.path
							}`}
							alt=""
						/>
					</div>
					{showAddToCart && (
						<div
							style={{ objectFit: "cover" }}
							class="sketchfab-embed-wrapper productFly">
							<img
								style={{
									width: "100%",
									height: "320px",
								}}
								src={`http://localhost:4001/${
									currProduct && currProduct.images[0]?.path
								}`}
								alt=""
							/>
						</div>
					)}
				</div>
				<div class="product-page-details">
					<strong>{currProduct.name}</strong>
					<span class="product-category">
						Thể loại: {currProduct && currProduct.category}
					</span>
					<span class="product-offer">
						<i class="fa-solid fa-tag"></i>25% Discount
					</span>
					<span class="price">
						${currProduct && currProduct.price}
						<del>${(currProduct.price * 1.25).toFixed(2)}</del>
					</span>
					<p class="small-description">
						<span style={{ color: "black", fontWeight: "600" }}>
							Mô tả:{" "}
						</span>
						{currProduct && currProduct.description}
					</p>

					<div>
						<p className="rate">
							<div>
								<FIlterStar
									offset={1}
									ratings={Number(currProduct.ratings)}
								/>
								<FIlterStar
									offset={2}
									ratings={Number(currProduct.ratings)}
								/>
								<FIlterStar
									offset={3}
									ratings={Number(currProduct.ratings)}
								/>
								<FIlterStar
									offset={4}
									ratings={Number(currProduct.ratings)}
								/>
								<FIlterStar
									offset={5}
									ratings={Number(currProduct.ratings)}
								/>
							</div>
						</p>
					</div>

					<div class="cart-btns">
						<Button
							title={"Add to cart"}
							onClick={handleAddToCart}
						/>

						<Button title={"Buy now"} type="danger" />
					</div>
					<div className="product-page__reviews">
						{"Đánh giá: "}
						{currProduct.numOfRev}{" "}
					</div>
					<div class="price-shipping">
						<strong>
							$1 <span> + $1 Shipping</span>
						</strong>
					</div>
				</div>
			</section>
			<CommentWrapper productId={currProduct?.id} />
			<div className="mt-12">
				<h2>Sản phẩm tương tự</h2>
				<ProductWrapper loading={loading} products={productSuggest} />
			</div>
		</div>
	);
};

export default Product;
