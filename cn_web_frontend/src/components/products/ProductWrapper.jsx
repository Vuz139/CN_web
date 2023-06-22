import React from "react";
import ProductItem from "./ProductItem";
import Loading from "../public/Loading";
const ProductWrapper = ({ products, loading }) => {
	return (
		<div className="grid mt-12">
			{loading ? (
				<Loading />
			) : (
				<>
					{products && products.length > 0 ? (
						<div className="grid__row">
							{products.map((product) => (
								<ProductItem
									product={product}
									key={product.id}
								/>
							))}
						</div>
					) : (
						<h2 style={{ textAlign: "center" }}>
							Không có sản phẩm nào
						</h2>
					)}
				</>
			)}
		</div>
	);
};

export default ProductWrapper;
