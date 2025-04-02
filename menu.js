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

}
