import React, { useState } from "react";
import Button from "../Button";
import Loading from "../public/Loading";
import { updateUser } from "../../requests/users.request";
const UserEdit = ({ user, onClickHide }) => {
	const [loading, setLoading] = useState(false);
	const [currUser, setCurrUser] = useState({ ...user });
	const handleChange = (e) => {
		setCurrUser((prev) => ({
			...prev,
			role: e.target.value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		updateUser(user.id, currUser)
			.then((res) => {
				if (res.status === "success") {
					onClickHide();
				}
			})
			.catch((err) => {
				alert(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<div id="editModal" class="modal">
			<div class="modal-content">
				<span onClick={onClickHide} class="close-button">
					&times;
				</span>
				<h2>Edit User: {user.id}</h2>
				<form className="new-product-container" onSubmit={handleSubmit}>
					<div className="form-group">
						<select
							value={currUser.role}
							onChange={handleChange}
							className="form-input"
							name="role"
							id="role"
							required>
							<option value={currUser.role}>
								{currUser.role}
							</option>
							<option value="admin">Admin</option>
							<option value="user">User</option>
						</select>
					</div>
					<Button
						title={"Update User"}
						loading={loading}
						onClick={(e) => handleSubmit(e)}
					/>
					<Button
						title={"Cancel"}
						type="danger"
						onClick={onClickHide}
					/>
				</form>
			</div>
		</div>
	);
};

export default UserEdit;
