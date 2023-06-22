import React, { useEffect, useState } from "react";
import { getOrderById, updateOrder } from "../requests/orders.request";
import Loading from "./public/Loading";
import Button from "./Button";
import { orderStatus } from "../contrainst/orderStatus";
import UserOrderItem from "./order/UserOrderItem";

const OrderItem = ({ id }) => {
	const [loading, setLoading] = useState(true);
	const [currOrder, setCurrOrder] = useState({});

	const fetchOrder = async () => {
		try {
			setLoading(true);
			const resp = await getOrderById(id);
			if (resp.status === "success") {
				setCurrOrder(resp.data);
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

	const handleStatusChange = async (e) => {
		try {
			setLoading(true);
			const res = await updateOrder(id, {
				orderStatus: e.target.value,
			});
			// console.log(">> check order status", res);
			if (res.status === "success") {
				await fetchOrder();
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div key={currOrder?.id} className="order-container">
			{loading || !currOrder ? (
				<Loading />
			) : (
				<>
					<div className="order-info">
						<div>Khách hàng: {currOrder?.user?.name}</div>
						<div>Thời gian: {currOrder.createdAt}</div>
					</div>

					<UserOrderItem setCurrentOrder={setCurrOrder} id={id} />

					{currOrder.orderStatus === orderStatus[0] && (
						<div className="order-actions">
							<Button
								value={orderStatus[1]}
								color="success"
								onClick={(e) => handleStatusChange(e)}
								type="small">
								Nhận đơn
							</Button>
						</div>
					)}
					{currOrder.orderStatus === orderStatus[1] && (
						<div className="order-actions">
							<Button
								type="small"
								color="success"
								value={orderStatus[2]}
								onClick={(e) => handleStatusChange(e)}>
								Hoàn thành
							</Button>

							<Button
								type="small"
								color="danger"
								value={orderStatus[3]}
								onClick={(e) => handleStatusChange(e)}>
								Hủy
							</Button>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default OrderItem;
