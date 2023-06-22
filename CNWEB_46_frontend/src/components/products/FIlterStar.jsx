import React from "react";
import { BsFillStarFill } from "react-icons/bs";
const FIlterStar = ({ ratings = 5, offset, handleRatingChange }) => {
	return (
		<span
			onClick={handleRatingChange}
			className={`sidebar__rating__star ${
				ratings >= offset && "onActive"
			}`}
			value={offset}>
			<BsFillStarFill />
		</span>
	);
};

export default FIlterStar;
