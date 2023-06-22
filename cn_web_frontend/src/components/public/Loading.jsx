import React from "react";
import { ImSpinner3 } from "react-icons/im";
const Loading = () => {
	return (
		<div className="loading">
			<div className="loading__icon">
				<span>
					<ImSpinner3 />
				</span>
			</div>
			<div className="loading__title">Đang tải...</div>
		</div>
	);
};

export default Loading;
