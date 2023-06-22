import React from "react";

import FIlterStar from "./products/FIlterStar";

const Comment = ({ comment }) => {
	return (
		<div className="product__comment">
			<div className="comment__user">
				<div className="comment__user__avatar">
					<img
						src={`${process.env.REACT_APP_END_POINT_IMAGE}/${comment.user.avatar}`}
						alt=""
					/>
				</div>
			</div>
			<div>
				<div className="comment__shortprofile">
					<span className="comment__username">
						{comment.user.name}
					</span>
					<span className="comment__star">
						<FIlterStar offset={1} ratings={comment.rating} />
						<FIlterStar offset={2} ratings={comment.rating} />
						<FIlterStar offset={3} ratings={comment.rating} />
						<FIlterStar offset={4} ratings={comment.rating} />
						<FIlterStar offset={5} ratings={comment.rating} />
					</span>
					<span className="comment__time">{comment.createdAt}</span>
				</div>
				<div className="comment__body">{comment.comment}</div>
			</div>
		</div>
	);
};

export default Comment;
