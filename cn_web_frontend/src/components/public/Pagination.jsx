import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Button from "../../components/Button";
const Pagination = ({ state, setState, numOfPages, option = true }) => {
	return (
		<div className="pagination">
			<div className="pagination__take">
				{option && (
					<>
						<label htmlFor="take">Số bảng tin</label>
						<select
							onChange={(e) =>
								setState((prev) => ({
									...prev,
									take: Number(e.target.value),
									skip: 0,
									page: 1,
								}))
							}
							value={state.take}
							name="take"
							id="take">
							<option value={5}>5 records</option>
							<option value={10}>10 records</option>
							<option value={15}>15 records</option>
						</select>
					</>
				)}
			</div>
			<div className="pagination__page">
				{state.page > 1 && (
					<Button
						onClick={() =>
							setState((prev) => ({
								...prev,
								page: state.page - 1,
								skip: state.take * (state.page - 2),
							}))
						}>
						{" "}
						<BsChevronLeft /> Prev
					</Button>
				)}
				<span className="pagination__pagenum">
					{(state.page - 1) * state.take +
						1 +
						"....." +
						state.page * state.take}
				</span>
				{state.page < numOfPages && (
					<Button
						onClick={() =>
							setState((prev) => ({
								...prev,
								page: state.page + 1,
								skip: state.take * state.page,
							}))
						}>
						{" "}
						<BsChevronRight /> Next
					</Button>
				)}
			</div>
		</div>
	);
};

export default Pagination;
