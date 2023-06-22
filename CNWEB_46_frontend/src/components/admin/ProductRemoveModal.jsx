import React from "react";
import Button from "../Button";

const ProductRemoveModal = ({
	onClickHide,
	onRemove,
	title = "Bạn có chắc muốn xóa sản phẩm này chứ?",
}) => {
	return (
		<div className="product__remove__modal">
			<span onClick={onClickHide} class="close-button">
				&times;
			</span>
			<h2>{title} </h2>
			<Button
				title={"Xóa"}
				type="small"
				color="danger"
				onClick={onRemove}
			/>
			<Button
				type="small"
				color="primary"
				title={"Quay lại"}
				onClick={onClickHide}
			/>
		</div>
	);
};

export default ProductRemoveModal;
