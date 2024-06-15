//mobile menu style switcher
let toggleButton = document.getElementById("toggle-button");
toggleButton.addEventListener("click", (e) => {
	toggleButton.classList.toggle('active');
	document.querySelector(".site-menu ul").classList.toggle("active")
	e.preventDefault()
})
