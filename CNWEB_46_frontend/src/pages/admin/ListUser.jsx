import React from "react";
import Loading from "../../components/public/Loading";
import { useState, useEffect } from "react";
import { getListUsers } from "../../requests/users.request";
import UserEdit from "../../components/admin/UserEdit";

import { BsSearch, BsArrowUp, BsArrowDown } from "react-icons/bs";

import Pagination from "../../components/public/Pagination";
import useDebounce from "../../utils/debounce";
import ProductRemoveModal from "../../components/admin/ProductRemoveModal";
const ListUser = () => {
	const [state, setState] = useState({
		take: 10,
		skip: 0,
		page: 1,
		keyword: "",
		orderBy: ["id", "DESC"],
	});
	const [total, setTotal] = useState(0);
	const [showModal, setShowModal] = useState(false);
	const [userEdit, setUserEdit] = useState({});
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showRemoveModal, setShowRemoveModal] = useState(0);
	const numOfPages = Math.ceil(total / state.take);
	const endPointImg =
		process.env.REACT_APP_END_POINT_IMAGE || "http://localhost:4001";
	const fetchData = async () => {
		try {
			setLoading(true);

			const res = await getListUsers(
				state.take,
				state.skip,
				state.keyword,
				state.orderBy,
			);
			if (res.status === "success") {
				setUsers(res.users);
				setTotal(res.total);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleOrderChange = (e) => {
		const name = e.target.getAttribute("name");

		if (state.orderBy[0] === name) {
			if (state.orderBy[1] === "ASC") {
				setState((prev) => ({
					...prev,
					orderBy: [name, "DESC"],
				}));
			} else {
				setState((prev) => ({
					...prev,
					orderBy: [name, "ASC"],
				}));
			}
		} else {
			setState((prev) => ({
				...prev,
				orderBy: [name, "ASC"],
			}));
		}
	};
	const [debounce, setDebounce] = useState("");

	useEffect(() => {
		setState((prev) => ({
			...prev,
			keyword: debounce,
		}));
	}, [useDebounce(debounce, 600)]);

	useEffect(() => {
		fetchData();
	}, [state, showModal]);

	const handleStateChange = (e) => {
		setState((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleUpdate = (e, user) => {
		e.preventDefault();
		setUserEdit(user);
		setShowModal(true);
	};

	const handleRemove = (e, id) => {
		e.preventDefault();
		setShowRemoveModal(id);
	};

	return (
		<div style={{ overflow: "auto" }}>
			<div>
				{showModal && (
					<UserEdit
						user={userEdit}
						onClickHide={() => setShowModal(false)}
					/>
				)}
			</div>
			<div
				style={{
					margin: "12px",
					border: "1px solid #ccc",
					borderRadius: "22px",
					display: "inline-block",
					padding: "4px 12px",
				}}>
				<input
					style={{
						outline: "none",
						border: "none",
						padding: "4px 8px",
						backgroundColor: "transparent",
						fontSize: "16px",
					}}
					onChange={(e) => setDebounce(e.target.value)}
					value={debounce}
					type="text"
					placeholder="Search?"
				/>
				<span style={{ fontSize: "16px" }}>
					<BsSearch />
				</span>
			</div>
			{loading ? (
				<Loading />
			) : (
				<table>
					<thead>
						<tr>
							<th name="id" onClick={handleOrderChange}>
								ID
								{state.orderBy[0] === "id" ? (
									state.orderBy[1] === "ASC" ? (
										<BsArrowUp />
									) : (
										<BsArrowDown />
									)
								) : (
									""
								)}
							</th>
							<th>Avatar</th>
							<th name="name" onClick={handleOrderChange}>
								Name
								{state.orderBy[0] === "name" ? (
									state.orderBy[1] === "ASC" ? (
										<BsArrowUp />
									) : (
										<BsArrowDown />
									)
								) : (
									""
								)}
							</th>
							<th name="email" onClick={handleOrderChange}>
								Email
								{state.orderBy[0] === "email" ? (
									state.orderBy[1] === "ASC" ? (
										<BsArrowUp />
									) : (
										<BsArrowDown />
									)
								) : (
									""
								)}
							</th>

							<th name="role" onClick={handleOrderChange}>
								Role
								{state.orderBy[0] === "role" ? (
									state.orderBy[1] === "ASC" ? (
										<BsArrowUp />
									) : (
										<BsArrowDown />
									)
								) : (
									""
								)}
							</th>

							<th colSpan={2}></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr>
								<td>{user.id}</td>
								<td style={{ objectFit: "cover" }}>
									<img
										class="product-image"
										style={{
											height: "100px",
											width: "100px",
										}}
										src={
											user?.avatar
												? `${endPointImg}/${user.avatar}`
												: ""
										}
										alt="User image"
									/>
								</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.role}</td>

								<td>
									<button
										onClick={(e) => handleUpdate(e, user)}
										class="edit-button">
										Edit
									</button>
									<span className="delete__side">
										<button
											onClick={(e) =>
												handleRemove(e, user.id)
											}
											class="delete-button">
											Delete
										</button>
										{showRemoveModal === user.id && (
											<ProductRemoveModal
												title="Bạn có muốn xóa user này?"
												onClickHide={() =>
													setShowRemoveModal(0)
												}
												onRemove={() =>
													setShowRemoveModal(0)
												}
											/>
										)}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}

			<Pagination
				handleStateChange={handleStateChange}
				numOfPages={numOfPages}
				state={state}
				setState={setState}
			/>
		</div>
	);
};

export default ListUser;
