import React, { useRef, useState } from "react";

const Slider = ({ setState, maxPrice = 30000 }) => {
	const [sliderValue, setSliderValue] = useState(100);

	const priceSlider = useRef();

	const handleDrag = (e) => {
		// const volumeSlider = document.querySelector(".volume-slider");

		const bounds = priceSlider.current.getBoundingClientRect();
		const x = e.clientX - bounds.left;
		const percentage = (x / bounds.width) * 100;
		if (percentage > 100) setSliderValue(100);
		else if (percentage < 0) setSliderValue(0);
		else {
			setSliderValue(percentage);
		}
	};

	const handleDragEnd = (e) => {
		// const volumeSlider = document.querySelector(".volume-slider");
		const bounds = priceSlider.current.getBoundingClientRect();
		const x = e.clientX - bounds.left;
		const percentage = (x / bounds.width) * 100;
		const percent = Math.max(0, Math.min(percentage, 100));
		const price = (percent * maxPrice) / 100;
		setSliderValue(percent);
		setState((prev) => ({
			...prev,
			price,
		}));
	};
	return (
		<div className="sidebar__price">
			<h2 className="sidebar__field-name">Price</h2>
			<p className="sidebar__price__value">
				${((sliderValue * maxPrice) / 100).toFixed(2)}
			</p>
			<div ref={priceSlider} className="volume-slider">
				<div className="bar" style={{ width: `${sliderValue}%` }}></div>
				<div
					style={{ left: `${sliderValue}%` }}
					draggable
					onDrag={handleDrag}
					onDragEnd={handleDragEnd}
					className="handle"></div>
			</div>
		</div>
	);
};

export default Slider;
