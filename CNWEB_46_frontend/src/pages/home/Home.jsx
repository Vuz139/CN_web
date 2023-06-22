import React, { useEffect, useState } from "react";
import "./home.css";
import Loading from "../../components/public/Loading";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../requests/products.request";
const Home = () => {
	const [loading, setLoading] = useState(true);
	const [bestProducts, setBestProducts] = useState([]);
	const getProductsTop = async () => {
		try {
			setLoading(true);
			const data = await getAllProducts({
				take: 4,
				orderBy: ["ratings", "desc"],
			});
			if (data.status) {
				setBestProducts(data.products);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getProductsTop();
	}, []);

	if (loading) return <Loading />;
	return (
		<div>
			<div class="homebg">
				<div class="gioithieu">
					<h1>A Store</h1>
					<p>Buy without lifting a finger</p>
					<button>
						<Link to={"/products"}>Shopping now</Link>
					</button>
				</div>
				<div class="best_selling_bg">
					<div class="container1">
						<div class="bs">Best Selling Clothes Ever</div>
						<div class="sp_noibat">
							{bestProducts.length > 0 &&
								bestProducts.map((value) => (
									<Link
										to={`/product/${value.id}`}
										onClick={() => {
											window.scrollTo({
												top: 0,
												behavior: "smooth",
											});
										}}
										class="sp_wrapper_margin">
										<div class="sp_wrapper" id="sp1">
											<img
												class="sp_img"
												src={`${process.env.REACT_APP_END_POINT_IMAGE}/${value?.images[0]?.path}`}
												alt="Ảnh sản phẩm"
											/>
											<div class="thongtin_sp">
												<h2 class="tensp">
													{value.name}
												</h2>
												<p class="giatien">
													{value.price}$
												</p>
											</div>
										</div>
									</Link>
								))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
