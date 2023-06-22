import React, { useState } from "react";
import Button from "../Button";
import { updateProduct } from "../../requests/products.request";
import { categories } from "../../contrainst/category";
const ProductEditModal = ({ productUpdate, onClickHide }) => {
	const [loading, setLoading] = useState(false);

	const [product, setProduct] = useState({
		...productUpdate,
	});
	const handleOnChangeProduct = (e) => {
		e.preventDefault();
		setProduct((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			!product.name ||
			!product.description ||
			!product.category ||
			!product.price ||
			!product.seller ||
			!product.stock
		) {
			alert("Please fill all required fields");
		} else {
			setLoading(true);
			updateProduct(product)
				.then((res) => {
					if (res.status === "success") {
						onClickHide(e);
					}
				})
				.catch((err) => {
					alert("Product update failed!");
					console.log(err);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};
	return (
		<div id="editModal" class="modal">
			<div class="modal-content">
				<span onClick={onClickHide} class="close-button">
					&times;
				</span>
				<h2>Edit Product: {product.name}</h2>

				<form className="new-product-container" onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							required
							name="name"
							type="text"
							id="productName"
							value={product.name}
							onChange={handleOnChangeProduct}
							className="form-input"
						/>
					</div>
					<div className="form-group">
						<input
							required
							name="price"
							type="number"
							id="price"
							value={product.price}
							onChange={handleOnChangeProduct}
							className="form-input"
						/>
					</div>
					<div className="form-group">
						<input
							required
							name="seller"
							type="text"
							id="seller"
							value={product.seller}
							onChange={handleOnChangeProduct}
							className="form-input"
						/>
					</div>
					<div className="form-group">
						<input
							required
							name="stock"
							type="number"
							id="stock"
							value={product.stock}
							onChange={handleOnChangeProduct}
							className="form-input"
						/>
					</div>
					<div className="form-group">
						<textarea
							required
							rows={3}
							name="description"
							id="productDescription"
							value={product.description}
							onChange={handleOnChangeProduct}
							className="form-input"
						/>
					</div>
					<div className="form-group">
						<select
							value={product.category}
							onChange={handleOnChangeProduct}
							className="form-input"
							name="category"
							id="category"
							required>
							<option value="">____Category___</option>

							{categories.map((category) => (
								<option value={category}>{category}</option>
							))}
						</select>
					</div>

					<Button
						title={"Update Product"}
						loading={loading}
						onClick={(e) => handleSubmit(e)}
					/>
				</form>
			</div>
		</div>
	);
};

export default ProductEditModal;
