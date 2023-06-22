import React, { useState } from "react";
import Button from "../../components/Button";
import { createProduct } from "../../requests/products.request";
import { categories } from "../../contrainst/category";
const NewProduct = () => {
	const [loading, setLoading] = useState(false);

	const [product, setProduct] = useState({
		name: "",
		description: "",
		category: "",
		price: 0,
		seller: "",
		stock: 0,
	});
	const [image, setImage] = useState("");

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
			createProduct(product, image && image[0])
				.then((res) => {
					if (res.status === "success") {
						setProduct({
							name: "",
							description: "",
							category: "",
							price: 0,
							seller: "",
							stock: 0,
						});
						alert("Product created successfully");
					}
				})
				.then((res) => res)
				.catch((err) => {
					alert("Product created failed!");
					console.log(err);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};

	return (
		<div>
			<h2 className="new-product-title">Add New Product</h2>
			<form className="new-product-container" onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="productName">Product Name:</label>
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
					<label htmlFor="price">Price:</label>
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
					<label htmlFor="price">Seller:</label>
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
					<label htmlFor="stock">Stock:</label>
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
					<label htmlFor="productDescription">
						Product Description:
					</label>
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
					<label htmlFor="category">Category:</label>
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
				<div className="form-group">
					<label htmlFor="image">Image:</label>
					<input
						type="file"
						name="image"
						id="image"
						onChange={(e) => {
							setImage(e.target.files);
						}}
						className="form-input"
						accept="image/*"
					/>
				</div>
				<Button
					title={"Add Product"}
					loading={loading}
					onClick={(e) => handleSubmit(e)}
				/>
			</form>
		</div>
	);
};

export default NewProduct;
