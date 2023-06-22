import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { orderStatus } from "../../contrainst/orderStatus";
import { createOrder } from "../../requests/orders.request";
import { removeAll } from "../../redux/cartSlice";
import "./OrderStyle.css";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { ImArrowLeft } from "react-icons/im";
import { locals } from "../../utils/vietnamlocalselector";

const NewOrder = () => {
	const [districts, setDistricts] = useState([]);
	const [communes, setCommunes] = useState([]);
	const cart = useSelector((state) => state.cart);
	const [shippingInfo, setShippingInfo] = useState({
		address: "",
		district: "",
		commune: "",
		phoneNo: "",
		city: "",
		country: "Việt Nam",
		postalCode: "",
	});
	const itemsPrice = useMemo(
		() =>
			cart.reduce((curr, value) => curr + value.price * value.amount, 0),
		[cart],
	);
	const taxPrice = useMemo(() => 0.05 * itemsPrice, [itemsPrice]);
	const totalPrice = itemsPrice + taxPrice;
	const dispatch = useDispatch();
	// const [order, setOrder] = useState({
	// 	taxPrice,
	// 	totalPrice,
	// 	shippingPrice: 15,
	// });
	const navigate = useNavigate();
	const makeOrder = async () => {
		const orderPost = {
			shippingInfo,
			orderStatus: orderStatus[0],
			itemsOrder: cart,
			taxPrice,
			itemsPrice,
			totalPrice,
			shippingPrice: 15,
		};
		try {
			await createOrder(orderPost);

			alert("Đặt hàng thành công");
			dispatch(removeAll());
			navigate("/user/orders", { replace: true });

			// console.log("res:", res);
		} catch (error) {
			console.log(error);
		}
	};

	const handleCityChange = (e) => {
		setShippingInfo((prev) => ({
			...prev,
			city: e.target.value,
			address: "",
			district: "",
			commune: "",
		}));
		const districts =
			locals[locals.findIndex((value) => value.n === e.target.value)];

		setDistricts(districts.c);
	};

	const handleDistrictChange = (e) => {
		setShippingInfo((prev) => ({
			...prev,
			district: e.target.value,
			commune: "",
		}));
		const communes =
			districts[
				districts.findIndex((value) => value.n === e.target.value)
			];
		setCommunes(communes.c);
	};
	const handleCommuneChange = (e) => {
		setShippingInfo((prev) => ({
			...prev,
			commune: e.target.value,
			postalCode:
				communes[communes.findIndex((c) => c.n === e.target.value)].i,
		}));
	};

	const handleAddressChange = (e) => {
		setShippingInfo((prev) => ({
			...prev,
			address: `${e.target.value}, ${prev.commune}, ${prev.district}`,
		}));
	};
	const handlePhoneChange = (e) => {
		setShippingInfo((prev) => ({
			...prev,
			phoneNo: e.target.value,
		}));
	};
	const handleClickCreate = async (e) => {
		e.preventDefault();
		if (cart.length < 1) {
			alert("Vui lòng thêm sản phẩm muốn mua");
			return;
		}

		if (
			!shippingInfo.address ||
			!shippingInfo.city ||
			!shippingInfo.commune ||
			!shippingInfo.district ||
			!shippingInfo.phoneNo
		) {
			alert("Vui lòng điền đầy đủ thông tin");
		} else await makeOrder();
	};

	return (
		<div class="checkout__container">
			<form class="information-container">
				<div class="checkout__form">
					<strong>Địa chỉ giao hàng</strong>
					<select id="country" name="country" class="form-control">
						<option value="Việt Nam">Việt Nam</option>
					</select>
					<div class="address-form">
						<select
							name="city"
							value={shippingInfo.city}
							onChange={handleCityChange}>
							<option value="">Thành phố/Tỉnh</option>
							{locals.map((value) => (
								<option value={value.n}>{value.n} </option>
							))}
						</select>
						<select
							value={shippingInfo.district}
							onChange={handleDistrictChange}>
							<option value="">Quận/Huyện</option>
							{districts.map((value) => (
								<option value={value.n}>{value.n} </option>
							))}
						</select>
						<select
							value={shippingInfo.commune}
							onChange={handleCommuneChange}>
							<option value="">Phường/Xã</option>
							{communes.map((value) => (
								<option value={value.n}>{value.n}</option>
							))}
						</select>
					</div>
					<div class="form__input">
						<input
							type="text"
							name="address"
							placeholder="Số nhà"
							onChange={handleAddressChange}
						/>
					</div>
					<div class="form__input">
						<input
							type="text"
							onChange={handlePhoneChange}
							name="phoneNo"
							placeholder="Số điện thoại"
							pattern="[0-9]*"
							inputmode="numeric"
						/>
					</div>
				</div>
			</form>

			<div class="product-container">
				<h2>Sản phẩm</h2>

				{cart.map((prod) => (
					<div className="product-info">
						<div className="product-image">
							<img
								alt="Sản phẩm"
								src={`http://localhost:4001/${prod.images[0].path}`}
								className="product-img"
							/>
							<div className="product-number">
								<strong>{prod.amount}</strong>
							</div>
						</div>
						<div className="product-name">
							<div>
								<strong>{prod.name}</strong>
								<div>{prod.description}</div>
							</div>
						</div>
						<strong className="checkout__product__price">
							{prod.price}
						</strong>
					</div>
				))}

				<div class="middle-info">
					<div class="checkout__subtotal">
						<div>Giá</div>
						<div>${itemsPrice}</div>
					</div>
					<div class="shipping">
						<div>Vận chuyển</div>
						<div>${15}</div>
					</div>
					<div class="shipping">
						<div>VAT: 5%</div>
						<div>${taxPrice}</div>
					</div>
				</div>
				<div class="total">
					<strong>Total</strong>
					<strong>${totalPrice}</strong>
				</div>
				<div class="button-container">
					<div class="return-button">
						<ImArrowLeft />
						<Link to={"/cart"}>Quay lại giỏ hàng</Link>
					</div>

					<Button title={"Đặt hàng"} onClick={handleClickCreate} />
				</div>
			</div>
		</div>
	);
};

export default NewOrder;
