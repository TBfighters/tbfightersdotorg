const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

const options = {
	root: null,
	rootMargin: "0px",
	scrollMargin: "0px",
	threshold: 0.2,
};

IntersectingAnimation({
	id: "immune-cells",
	path: "../img/hiv/immune-cells.json"
});

IntersectingAnimation({
	id: "world",
	path: "../img/hiv/world-fill.json"
});

// IntersectingAnimation({
// 	id: "lenacapavir",
// 	path: "../img/hiv/lenacapavir.json"
// });

function IntersectingAnimation(config) {
	const box = document.getElementById(config.id);
	const animation = bodymovin.loadAnimation({
		container: box, // Required
		path: config.path, // Required
		renderer: 'canvas', // Required
		loop: true, // Optional
		autoplay: false, // Optional
		name: "Hello World", // Name for future reference. Optional.
	})
	paused = true
	let button = document.getElementById(config.id + "-control")
	let img = document.querySelector("#" + config.id + "-control img")
	button.addEventListener("click", () => {
		if (paused) {
			animation.play();
			img.setAttribute("src", "../img/icons/pause.svg")
			img.setAttribute("alt", "Pause")
			paused = false
		} else {
			animation.pause();
			img.setAttribute("src", "../img/icons/play.svg")
			img.setAttribute("alt", "Play")
			paused = true
		}
	})

	if (!!isReduced) {
		animation.pause()
	} else {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting == true) {
				animation.play();
				img.setAttribute("src", "../img/icons/pause.svg")
				img.setAttribute("alt", "Pause")
				paused = false
			} else {
				animation.pause();
				img.setAttribute("src", "../img/icons/play.svg")
				img.setAttribute("alt", "Play")
				paused = false
			}
		}, options);

		observer.observe(box)
	}
}
window.addEventListener("load", () => {
	let loopPaused = false;
	const top = horizontalLoop("#countries .row#top .country", { speed: 0.2, repeat: -1 });
	const bottom = horizontalLoop("#countries .row#btm .country", { speed: 0.15, repeat: -1 });

	let button = document.getElementById("loop-controls")
	let img = document.querySelector("#loop-controls img")
	button.addEventListener("click", () => {
		if (loopPaused) {
			top.play();
			bottom.play();
			img.setAttribute("src", "../img/icons/pause.svg")
			img.setAttribute("alt", "Pause")
			loopPaused = false
		} else {
			top.pause();
			bottom.pause();
			img.setAttribute("src", "../img/icons/play.svg")
			img.setAttribute("alt", "Play")
			loopPaused = true
		}
	})

	if (!!isReduced) {
		top.pause()
		bottom.pause()
		loopPaused = true;
		img.setAttribute("src", "../img/icons/play.svg")
		img.setAttribute("alt", "Play")
	}

})

/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
- Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
- When each item animates to the left or right enough, it will loop back to the other side
- Optionally pass in a config object with values like "speed" (default: 1, which travels at roughly 100 pixels per second), paused (boolean),  repeat, reversed, and paddingRight.
- The returned timeline will have the following methods added to it:
- next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
- previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
- toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
- current() - returns the current index (if an animation is in-progress, it reflects the final index)
- times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
*/
function horizontalLoop(items, config) {
	items = gsap.utils.toArray(items);
	config = config || {};
	let tl = gsap.timeline({
		repeat: config.repeat,
		paused: config.paused,
		defaults: { ease: "none" },
		onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
	}),
		length = items.length,
		startX = items[0].offsetLeft,
		times = [],
		widths = [],
		xPercents = [],
		curIndex = 0,
		pixelsPerSecond = (config.speed || 1) * 100,
		snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
		totalWidth,
		curX,
		distanceToStart,
		distanceToLoop,
		item,
		i;
	gsap.set(items, {
		// convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
		xPercent: (i, el) => {
			let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
			xPercents[i] = snap(
				(parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
				gsap.getProperty(el, "xPercent")
			);
			return xPercents[i];
		},
	});
	gsap.set(items, { x: 0 });
	totalWidth =
		items[length - 1].offsetLeft +
		(xPercents[length - 1] / 100) * widths[length - 1] -
		startX +
		items[length - 1].offsetWidth *
		gsap.getProperty(items[length - 1], "scaleX") +
		(parseFloat(config.paddingRight) || 0);
	for (i = 0; i < length; i++) {
		item = items[i];
		curX = (xPercents[i] / 100) * widths[i];
		distanceToStart = item.offsetLeft + curX - startX;
		distanceToLoop =
			distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
		tl.to(
			item,
			{
				xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
				duration: distanceToLoop / pixelsPerSecond,
			},
			0
		)
			.fromTo(
				item,
				{
					xPercent: snap(
						((curX - distanceToLoop + totalWidth) / widths[i]) * 100
					),
				},
				{
					xPercent: xPercents[i],
					duration:
						(curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
					immediateRender: false,
				},
				distanceToLoop / pixelsPerSecond
			)
			.add("label" + i, distanceToStart / pixelsPerSecond);
		times[i] = distanceToStart / pixelsPerSecond;
	}
	function toIndex(index, vars) {
		vars = vars || {};
		Math.abs(index - curIndex) > length / 2 &&
			(index += index > curIndex ? -length : length); // always go in the shortest direction
		let newIndex = gsap.utils.wrap(0, length, index),
			time = times[newIndex];
		if (time > tl.time() !== index > curIndex) {
			// if we're wrapping the timeline's playhead, make the proper adjustments
			vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
			time += tl.duration() * (index > curIndex ? 1 : -1);
		}
		curIndex = newIndex;
		vars.overwrite = true;
		return tl.tweenTo(time, vars);
	}
	tl.next = (vars) => toIndex(curIndex + 1, vars);
	tl.previous = (vars) => toIndex(curIndex - 1, vars);
	tl.current = () => curIndex;
	tl.toIndex = (index, vars) => toIndex(index, vars);
	tl.times = times;
	tl.progress(1, true).progress(0, true); // pre-render for performance
	if (config.reversed) {
		tl.vars.onReverseComplete();
		tl.reverse();
	}
	return tl;
}
