import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { orderStatus } from "../../contrainst/orderStatus";
import { BsTruck } from "react-icons/bs";
import { AiOutlineShop } from "react-icons/ai";
import Loading from "../../components/public/Loading";
import { getUserOders } from "../../requests/orders.request";
import OrderItem from "../../components/OrderItem";
import UserOrderItem from "../../components/order/UserOrderItem";
import Pagination from "../../components/public/Pagination";
const UserOrders = () => {
	const [loading, setLoading] = useState(true);
	const [state, setState] = useState({
		take: 5,
		skip: 0,
		page: 1,
		orderStatus: "",
	});
	const [orders, setOrders] = useState([]);
	const [total, setTotal] = useState(0);
	const fetchOrder = async () => {
		try {
			setLoading(true);
			const res = await getUserOders({
				take: state.take,
				page: state.page,
				orderStatus: state.orderStatus,
			});
			if (res.status === "success") {
				setTotal(res.total);
				setOrders(res.data);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchOrder();
	}, [state]);
	const handleStatusChange = (orderStatus) => {
		setState((prev) => ({
			...prev,
			orderStatus,
		}));
	};

	return (
		<div className="userOrder">
			<h1 className="userOrder__title">Đơn hàng của tôi</h1>
			<ul className="userOrder__status ">
				<li
					onClick={() => handleStatusChange("")}
					className={`userOrder__status__item  ${
						state.orderStatus === "" && "onActive"
					}`}>
					Tất cả đơn
				</li>
				{orderStatus.map((status) => (
					<li
						onClick={() => handleStatusChange(status)}
						className={`userOrder__status__item  ${
							state.orderStatus === status && "onActive"
						}`}>
						{status}
					</li>
				))}
			</ul>
			{loading ? (
				<Loading />
			) : (
				<div className="userOrder__list">
					{orders.map((order) => (
						<UserOrderItem id={order.id} />
					))}
				</div>
			)}
			<Pagination
				state={state}
				setState={setState}
				numOfPages={Math.ceil(total / state.take)}
			/>
		</div>
	);
};

export default UserOrders;
