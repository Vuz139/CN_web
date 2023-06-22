import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import png from "./sign.png";
import { login } from "../../../requests/users.request";
import Button from "../../../components/Button";
import { useDispatch } from "react-redux";
import { loginRedux } from "../../../redux/userSlice";

function Login() {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleFormChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			setLoading(true);
			const result = await login(formData);
			if (result.success) {
				dispatch(loginRedux(result.user));
				navigate("/", { replace: true });
			}
		} catch (err) {
			alert("Đăng nhập thất bại!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="w3l-hotair-form">
			<h1>Group 46</h1>
			<div className="container">
				<div className="workinghny-form-grid">
					<div className="main-hotair">
						<div className="content-wthree">
							<h2>Log In</h2>
							<form>
								<input
									type="email"
									className="text"
									name="email"
									value={formData.email}
									onChange={handleFormChange}
									placeholder="Your email"
									required
									autoFocus
								/>
								<input
									type="password"
									className="password"
									value={formData.password}
									onChange={handleFormChange}
									name="password"
									placeholder="User Password"
									required
									autoFocus
								/>

								<br />

								<Button
									title={"Log In"}
									loading={loading}
									onClick={(e) => handleSubmit(e)}
								/>
							</form>
							<p className="account">
								Don't have an account?{" "}
								<Link to={"/signup"}>Register</Link>
							</p>
						</div>
						<div className="w3l_form align-self">
							<div className="left_grid_info">
								<img
									src={png}
									className="img-fluid"
									alt="LOGIN"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Login;
