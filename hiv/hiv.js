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
	const observer = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting == true) {
			animation.play();
		} else {
			animation.pause();
		}
	}, options);

	observer.observe(box)
}
