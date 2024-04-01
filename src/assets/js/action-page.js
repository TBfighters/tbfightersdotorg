// expand button

let expanded = false;
let grid = document.getElementById("expand-action-grid");
grid.style.display = "none";
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

addCopyButton(document.getElementById("copy-1"), document.getElementById("post-1").textContent)
addCopyButton(document.getElementById("copy-2"), document.getElementById("post-2").textContent)
addCopyButton(document.getElementById("copy-3"), document.getElementById("post-3").textContent)


// slide show
document.getElementById("slideshow-buttons").style.display = "block"
var slideIndex = 0;
var x = document.getElementsByClassName("slideshow-img");
for (i = 0; i < x.length; i++) {
    if (i == slideIndex) {
        x[slideIndex].style.display = "block";
    } else {
        x[i].style.display = "none";
    }
}

function plusDivs() {
    x[slideIndex].style.display = "none";
    slideIndex += 1;
    if (slideIndex > x.length - 1) { slideIndex = 0 }
    x[slideIndex].style.display = "block";
}
function minusDiv() {
    x[slideIndex].style.display = "none";
    slideIndex -= 1;
    if (slideIndex < 0) { slideIndex = x.length - 1 };
    x[slideIndex].style.display = "block";
}

async function download() {
    const link = document.createElement('a')
    link.href = document.getElementsByClassName("slideshow-img")[slideIndex].src
    link.download = ""
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}


addCopyButtonCallback(document.getElementById("copy-alt-text"), () => {
    return x[slideIndex].alt
})
