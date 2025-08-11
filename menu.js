//mobile menu style switcher

let mobile = window.screen.width <= 992;

let dropdownButtons = document.querySelectorAll(".dropdown");
for (let i = 0; i < dropdownButtons.length; i++) {
	let id = dropdownButtons[i].id;
	let query = "#" + id + " div button"
	let dropdownButton = document.querySelector(query);

	let queryContent = "#" + id + " .dropdown-content";
	let content = document.querySelector(queryContent);
	dropdownButton.addEventListener("click", (e) => {
		content.classList.toggle("active");

		if (!mobile) {
			document.querySelectorAll(".dropdown-content").forEach((e) => {
				if (e.parentNode == dropdownButton.parentNode.parentNode) {
					return;
				}
				e.classList.remove("active");
			});
		}
		e.preventDefault();
	})
}

if (mobile) {
	let toggleButton = document.getElementById("hamburger-button");
	toggleButton.addEventListener("click", (e) => {
		toggleButton.classList.toggle('active');
		document.querySelector(".site-menu ul").classList.toggle("active")
		e.preventDefault()
	})

	window.onclick = function(event) {
		console.log("first " + !event.target.matches(".dropdown"))
		console.log("second " + !event.target.matches("#hamburger-button"))
		if (!document.getElementsByClassName("site-menu")[0].contains(event.target) && !event.target.matches("#hamburger-button")) {
			if (toggleButton.classList.contains("active")) {
				toggleButton.classList.remove('active');
				document.querySelector(".site-menu ul").classList.add("active")
				event.preventDefault()

			}
		}
	}
} else {
	window.onclick = function(event) {
		if (!event.target.matches(".dropdown button img") && !event.target.matches(".dropdown button")) {
			document.querySelectorAll(".dropdown-content").forEach((e) => {
				e.classList.remove("active");
			});
		}
	}
}
