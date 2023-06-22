import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAvatar, updateUserSelf } from "../requests/users.request";
import Button from "../components/Button";
import { updateUserRedux } from "../redux/userSlice";
import Loading from "../components/public/Loading";
const User = () => {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const [avatar, setAvatar] = useState(null);
	const [formData, setFormData] = useState({
		name: user.name,
		email: user.email,
	});
	const handleFormChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};
	const handleAvatarChange = (e) => {
		setAvatar(e.target.files);
	};
	const updateAvatar = async () => {
		try {
			setLoading(true);
			if (avatar) {
				const res = await addAvatar(avatar[0]);
				dispatch(updateUserRedux({ avatar: res }));
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		updateAvatar();
	}, [avatar]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await updateUserSelf(formData);
			alert("Cập nhật thành công");
		} catch (error) {
			console.log(error);
		}
	};
	if (loading) return <Loading />;
	return (
		<div className="user_page">
			<form className="user_page__form" action={handleSubmit}>
				<div className="user_page__form__avatar">
					<img
						src={`${process.env.REACT_APP_END_POINT_IMAGE}/${
							user.avatar || ""
						}`}
						alt="avatar"
					/>

					<label htmlFor="avatar">Avatar</label>
					<input
						hidden
						type="file"
						id="avatar"
						onChange={handleAvatarChange}
					/>
				</div>
				<div className="user_page__form__item">
					<label htmlFor="name">Tên:</label>
					<input
						type="text"
						id="name"
						name="name"
						onChange={handleFormChange}
						value={formData.name}
					/>
				</div>
				<div className="user_page__form__item">
					<label htmlFor="email">Email:</label>
					<input
						disabled
						type="text"
						id="email"
						name="email"
						onChange={handleFormChange}
						value={formData.email}
					/>
				</div>
				<div className="user_page__form__item">
					<Button onClick={handleSubmit}>Thay đổi</Button>
				</div>
			</form>
		</div>
	);
};

export default User;
