import React from "react";
import { Link } from "react-router-dom";

const Error403 = () => {
	return (
		<div className="error403Page">
			<div className="error404Page__link">
				<Link to="/">Back Home</Link>
			</div>
		</div>
	);
};

export default Error403;
