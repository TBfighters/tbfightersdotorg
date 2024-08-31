//mobile menu style switcher
let toggleButton = document.getElementById("hamburger-button");
toggleButton.addEventListener("click", (e) => {
	toggleButton.classList.toggle('active');
	document.querySelector(".site-menu ul").classList.toggle("active")
	e.preventDefault()
})
