//mobile menu style switcher


if (window.screen.width <= 992) {
	let toggleButton = document.getElementById("hamburger-button");
	toggleButton.addEventListener("click", (e) => {
		toggleButton.classList.toggle('active');
		document.querySelector(".site-menu ul").classList.toggle("active")
		e.preventDefault()
	})

	let dropdownButtons = document.querySelectorAll(".dropdown button");
	for (let i = 0; i < dropdownButtons.length; i++) {
		let dropdownButton = dropdownButtons[i];
		dropdownButton.addEventListener("click", (e) => {
			dropdownButton.parentNode.querySelector(".dropdown-content").classList.toggle("active");
			e.preventDefault();
		})
	}
} else {
	let dropdownButtons = document.querySelectorAll(".dropdown button");
	for (let i = 0; i < dropdownButtons.length; i++) {
		let dropdownButton = dropdownButtons[i];
		dropdownButton.addEventListener("click", (e) => {
			document.querySelectorAll(".dropdown-content").forEach((e) => {
				if (e.parentNode == dropdownButton.parentNode.parentNode) {
					return;
				}
				e.classList.remove("active");
			});
			dropdownButton.parentNode.parentNode.querySelector(".dropdown-content").classList.toggle("active");
			e.preventDefault();
		})
	}
	window.onclick = function(event) {
		if (!event.target.matches(".dropdown button img") && !event.target.matches(".dropdown button")) {
			document.querySelectorAll(".dropdown-content").forEach((e) => {
				e.classList.remove("active");
			});
		}
	}
}
