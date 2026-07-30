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

function convertRemToPixels(rem) {
	return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

const rem = convertRemToPixels(1)

window.addEventListener("load", () => {
	let top = marquee("top", 1);
	let bottom = marquee("btm", 0.9);
	loopPaused = false;

	let button = document.getElementById("loop-controls")
	let img = document.querySelector("#loop-controls img")
	button.addEventListener("click", () => {
		if (loopPaused) {
			top.classList.remove("stop")
			bottom.classList.remove("stop")
			img.setAttribute("src", "../img/icons/pause.svg")
			img.setAttribute("alt", "Pause")
			loopPaused = false
		} else {
			top.classList.add("stop")
			bottom.classList.add("stop")
			img.setAttribute("src", "../img/icons/play.svg")
			img.setAttribute("alt", "Play")
			loopPaused = true
		}
	})

	if (!!isReduced) {
		top.classList.add("stop")
		bottom.classList.add("stop")
		loopPaused = true;
		img.setAttribute("src", "../img/icons/play.svg")
		img.setAttribute("alt", "Play")
	}
})

function marquee(id, speedMulti) {
	const row = document.getElementById(id);
	const items = row.children;

	let width = 0;

	for (const item of items) {
		width += item.getBoundingClientRect().width;
		// width += (rem / 2);
	}
	console.log(width)

	row.style.setProperty("--width", (width / 2) + "px");
	// px PX/S
	let pxPerSecond = 100 * speedMulti;
	let seconds = (1 / (pxPerSecond / (width / 2)))
	row.style.setProperty("--speed", seconds + "s");
	return row;
}

