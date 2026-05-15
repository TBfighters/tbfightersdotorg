const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

const options = {
  root: null,
  rootMargin: "0px",
  scrollMargin: "0px",
  threshold: 0.2,
};

if (!!isReduced) {} else {

}
IntersectingAnimation({
	id: "immune-cells",
	path: "../img/hiv/immune-cells.json"
});

IntersectingAnimation({
	id: "world",
	path: "../img/hiv/world-fill.json"
});

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
