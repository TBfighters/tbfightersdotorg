let activateButton = document.getElementById("filter-activate");
let activeButtonInner = document.querySelector("#filter-activate span")

let filter = document.querySelector(".wrapper-filter menu");
let focused = null;
let buttons = document.querySelectorAll(".wrapper-filter menu button");

let wrapper = document.querySelector(".wrapper-filter")

let menuActive = false;

function toggleMenu() {
    filter.classList.toggle("active")
    activateButton.classList.toggle("active")
    if (!menuActive) {
        focused = 0;
        if (!mobile) {
            buttons[0].focus();
        }
        menuActive = true;
    } else {
        menuActive = false;
    }
}

activateButton.onclick = () => {
    toggleMenu()
}

wrapper.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { // Space or Enter key
        toggleMenu()
        return;
    }
    if (e.key == "ArrowDown") {
        e.preventDefault(); // Prevent the default action to stop scrolling when pressing Space
        focused++;
        if (focused == buttons.length) {
            focused = 0;
        }
        if (!mobile) {
            buttons[focused].focus();
        }
    }
    if (e.key == "ArrowUp") {
        e.preventDefault(); // Prevent the default action to stop scrolling when pressing Space
        focused--;
        if (focused == -1) {
            focused = buttons.length - 1;
        }
        if (!mobile) {
            buttons[focused].focus();
        }
    }

    if (e.key == "Tab") {
        toggleMenu();
    }
})

window.addEventListener("click", (event) => {
    if (!menuActive) {
        return;
    }
    if (!event.target.matches(".wrapper-filter *")) {
        toggleMenu()
    }
})


// Button id: ["id of action (on the article element)"] The class for the div containing the countries actions is NOT used
const actions = {
    "all": [],
    "international": [
        "danaher"
    ],
    "united-states": [
        "us-funding-cuts",
        "us-hill-day",
    ],
    "canada": [
        "canada-hill-day",
    ],
    "uk": [
        "uk-funding-cuts",
    ],
    "australia": [
        "global-fund",
    ]
}

// Handle initial url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let active = "all";
if (urlParams.size != 0) {
    const regionParams = urlParams.get("region");
    active = regionParams
}

let campaigns = document.getElementsByClassName("campaign");

let campaignsWrapper = document.getElementsByClassName("campaigns").item(0);

function handleActions() {

    // make copy
    let currentActions = actions["international"].slice();

    for (let i = 0; i < Object.keys(actions).length; i++) {
        let key = Object.keys(actions)[i];
        if (active != "all") {
            if (active != key) {
                continue;
            }
        }
        if (key == "all" || key == "international") {
            continue;
        }
        let a = actions[key];
        for (let b = 0; b < a.length; b++) {
            currentActions.push(a[b]);
        }
    }

    for (let i = 0; i < campaigns.length; i++) {
        let action = campaigns.item(i);
        if (currentActions == null) {
            action.classList.add("active");
        } else if (currentActions.includes(action.id)) {
            action.classList.add("active");
        } else {
            action.classList.remove("active");
        }
    }
}

function handleUrlUpdate() {
    let url = window.location.origin + window.location.pathname + window.location.hash;
    if (active != "all") {
        let activeString = active;
        url = window.location.origin + window.location.pathname + "?region=" + activeString + window.location.hash;
    }

    history.replaceState({}, document.title, url);

}

function handleButton(region, button) {
    document.getElementById(active).classList.remove("active")
    active = region;
    button.classList.add("active");
    if (active != "all") {
        campaignsWrapper.classList.add("reversed");
    } else {
        campaignsWrapper.classList.remove("reversed");
    }

    activeButtonInner.innerHTML = document.getElementById(active).innerHTML;

    if (mobile && menuActive) {
        toggleMenu()
    }

}

for (const [region, _] of Object.entries(actions)) {
    let button = document.getElementById(region);
    if (button == null) {
        continue;
    }
    button.onclick = function(_) {
        handleButton(region, button);
        handleActions();
        handleUrlUpdate();
    };
}

// handleButton(active, document.getElementById(active))
handleActions();

// filter

