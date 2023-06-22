import React from "react";
import { Link } from "react-router-dom";
const Error404 = () => {
	return (
		<div className="error404Page">
			<div className="error404Page__bg"></div>
			<div className="error404Page__link">
				<Link to="">Back Home</Link>
			</div>
		</div>
	);
};

export default Error404;
