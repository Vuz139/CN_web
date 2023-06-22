import React, { useEffect, useState } from "react";
import { AiOutlineShop } from "react-icons/ai";
import { BsCheckCircle, BsTruck } from "react-icons/bs";
import { FcCancel } from "react-icons/fc";
import { GiPerpendicularRings } from "react-icons/gi";
import Loading from "../public/Loading";
import { getOrderById, updateOrder } from "../../requests/orders.request";
import { Link } from "react-router-dom";
import { orderStatus } from "../../contrainst/orderStatus";
import Button from "../Button";
import ProductRemoveModal from "../admin/ProductRemoveModal";

const UserOrderItem = ({ id, setCurrentOrder }) => {
	const [loading, setLoading] = useState(true);
	const [orderDetails, setOrderDetails] = useState([]);
	const [showRemoveModal, setShowRemoveModal] = useState(0);
	const fetchOrder = async () => {
		try {
			setLoading(true);
			const res = await getOrderById(id);
			if (res.status === "success") {
				setOrderDetails(res.data);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchOrder();
	}, []);

	const iconStatus = [
		<GiPerpendicularRings />,
		<BsTruck />,
		<BsCheckCircle />,
		<FcCancel />,
	];
	const handleStatusChange = async () => {
		try {
			setLoading(true);
			const res = await updateOrder(id, {
				orderStatus: orderStatus[3],
			});
			if (setCurrentOrder) {
				setCurrentOrder((prev) => ({
					...prev,
					orderStatus: orderStatus[3],
				}));
			}

			if (res.status === "success") {
				await fetchOrder();
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <Loading />;
	return (
		<div className="userOrder__item">
			<div className="userOrder__item__status">
				{iconStatus[orderStatus.indexOf(orderDetails.orderStatus)]}

				{orderDetails.orderStatus}
			</div>
			<div className="userOrder__products">
				{orderDetails.products.map((product) => (
					<div className="userOrder__product">
						<Link
							to={`/product/${product.id}`}
							className="order__product__img">
							<img
								src={`${process.env.REACT_APP_END_POINT_IMAGE}/${product.images[0].path}`}
								alt="ANH"
							/>
							<div className="order__product__amount">
								x{product.amount}
							</div>
						</Link>
						<div className="order__product__body">
							<h2>{product.name}</h2>
							<p>
								<AiOutlineShop /> {product.seller}
							</p>
						</div>
						<div className="order__product__price">
							{product.price} <span>đ</span>
						</div>
					</div>
				))}
			</div>
			<div className="userOrder__item__price">
				<span>
					Tổng tiền:{" "}
					<span className="userOder__item__total">
						{orderDetails.totalPrice}
					</span>{" "}
					đ
				</span>
			</div>
			<div className="userOrder__address">
				<p>
					Địa chỉ: {orderDetails.shipping_info.address},{" "}
					{orderDetails.shipping_info.city},{" "}
					{orderDetails.shipping_info.country}{" "}
				</p>
				<p>Số điện thoại: {orderDetails.shipping_info.phoneNo}</p>
			</div>
			{orderDetails.orderStatus === orderStatus[0] && (
				<div className="userOrder__action">
					<Button
						type="small"
						color={"danger"}
						onClick={() => {
							setShowRemoveModal(id);
						}}>
						Hủy đơn hàng
					</Button>
					{showRemoveModal !== 0 && (
						<ProductRemoveModal
							title="Bạn có muốn hủy đơn hàng này?"
							onClickHide={() => setShowRemoveModal(0)}
							onRemove={() => handleStatusChange()}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default UserOrderItem;
