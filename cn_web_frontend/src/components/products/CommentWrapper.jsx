import React, { useEffect, useState } from "react";
import Pagination from "../public/Pagination";
import { GrUploadOption } from "react-icons/gr";
import Comment from "../Comment";
import { createReview, getReviews } from "../../requests/products.request";
import Loading from "../public/Loading";
import FIlterStar from "./FIlterStar";

const CommentWrapper = ({ productId }) => {
	const [commentValue, setCommentValue] = useState({
		comment: "",
		rating: 5,
	});
	const [loading, setLoading] = useState(true);
	const [state, setState] = useState({
		take: 5,
		skip: 0,
		page: 1,
	});
	const [reviews, setReviews] = useState([]);
	const [total, setTotal] = useState(0);
	const fetchReviews = async () => {
		try {
			setLoading(true);
			const res = await getReviews({ productId, ...state });

			if (res.status === "success") {
				setReviews(res.reviews);
				setTotal(res.total);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchReviews();
	}, [state]);

	const handleCommentChange = (e) => {
		setCommentValue((prev) => ({
			...prev,

			[e.target.name]: e.target.value,
		}));
	};

	const handleRatingChange = (rating) => {
		setCommentValue((prev) => ({
			...prev,

			rating,
		}));
	};

	const handleSubmitComment = async () => {
		if (commentValue.comment.trim().length < 1) return;

		try {
			setLoading(true);
			const res = await createReview({
				productId,
				rating: Number(commentValue.rating),
				comment: commentValue.comment,
			});
			if (res.status === "success") {
				fetchReviews();
				setCommentValue({
					comment: "",
					rating: 5,
				});
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	const handleOnKeyDown = (e) => {
		if (e.keyCode !== 13) {
			return;
		}
		handleSubmitComment();
	};

	return (
		<div>
			<h1 style={{ fontSize: "1.6rem" }}>Bình luận của người dùng: </h1>
			<div
				className="comments_wrapper"
				style={{
					marginTop: "8px",
					maxHeight: "400px",
					overflow: "auto",
					backgroundColor: "#fff",
					border: "2px solid gray",
					borderRadius: "10px",
					padding: "20px",
				}}>
				{loading ? (
					<Loading />
				) : (
					<>
						{reviews?.map((re) => (
							<Comment comment={re} />
						))}
					</>
				)}
			</div>
			<div className="comment__control__wrapper">
				<div className="comment__input__control">
					<div className="comment__rating__control">
						<span>Đánh giá:</span>
						<FIlterStar
							ratings={commentValue.rating}
							offset={1}
							handleRatingChange={() => handleRatingChange(1)}
						/>
						<FIlterStar
							ratings={commentValue.rating}
							offset={2}
							handleRatingChange={() => handleRatingChange(2)}
						/>
						<FIlterStar
							ratings={commentValue.rating}
							offset={3}
							handleRatingChange={() => handleRatingChange(3)}
						/>
						<FIlterStar
							ratings={commentValue.rating}
							offset={4}
							handleRatingChange={() => handleRatingChange(4)}
						/>
						<FIlterStar
							ratings={commentValue.rating}
							offset={5}
							handleRatingChange={() => handleRatingChange(5)}
						/>
					</div>
					<div className="comment__input">
						<input
							name="comment"
							value={commentValue.comment}
							onChange={handleCommentChange}
							onKeyDown={handleOnKeyDown}
							type="text"
							placeholder="Comment..."
						/>
						<button onClick={handleSubmitComment}>
							<GrUploadOption />
						</button>
					</div>
				</div>
				<Pagination
					setState={setState}
					state={state}
					numOfPages={Math.ceil(total / state.take)}
				/>
			</div>
		</div>
	);
};

export default CommentWrapper;
