// expand button
let expanded = false;
let grid = document.getElementById("expand-action-grid");
grid.style.display = "none";

// This enables the buttons w/ js enabled
document.getElementById("expand-button-container").style.display = "block";
function toggleExpand() {
    if (expanded) {
        grid.classList.remove("show-actions")
        grid.classList.add("hide-actions")
        grid.addEventListener('animationend', () => { grid.style.display = "none" }, { once: true });
        document.getElementsByClassName("expand-actions-arrow")[0].classList.remove("expand-actions-arrow-up")
        document.getElementById("expand-button-txt").textContent = "More actions";
        expanded = false
    } else {
        grid.classList.remove("hide-actions")
        grid.style.display = "";
        grid.classList.add("show-actions")
        document.getElementsByClassName("expand-actions-arrow")[0].classList.add("expand-actions-arrow-up")
        document.getElementById("expand-button-txt").textContent = "Less actions";
        expanded = true
    }
}

// copy buttons
const copyElements = document.getElementsByClassName("copy");
for (let i = 0; i < copyElements.length; i++) {
    let elm = copyElements[i]
    addCopyButton(elm, document.getElementById(elm.getAttribute("copy-elm")).textContent)
}


// slide show
// This enables the buttons w/ js enabled
document.getElementById("slideshow-buttons").style.display = "block"

var slideIndex = 0;
var x = document.getElementsByClassName("slideshow-img");
// Initial setup
for (i = 0; i < x.length; i++) {
    if (i == slideIndex) {
        x[slideIndex].style.display = "block";
    } else {
        x[i].style.display = "none";
    }
}

function incrementSlideshow(num) {
    x[slideIndex].style.display = "none";

    slideIndex += num;
    if (slideIndex > x.length - 1) { slideIndex = 0 }
    if (slideIndex < 0) { slideIndex = x.length - 1 };

    x[slideIndex].style.display = "block";
}

async function download() {
    downloadImage(document.getElementsByClassName("slideshow-img")[slideIndex].src)
}


addCopyButtonCallback(document.getElementById("copy-alt-text"), () => {
    return x[slideIndex].alt
})
