const actions = {
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
    "united-kingdom": [
        "uk-funding-cuts",
    ],
    // "european-union": [],
}

// Handle initial url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let active = ["international"];
if (urlParams.size != 0) {
    const regionParams = urlParams.get("region").split(',');
    active = regionParams
}

let campaigns = document.getElementsByClassName("campaign");

let campaignsWrapper = document.getElementsByClassName("campaigns").item(0);

function handleActions() {

    // make copy
    let currentActions = actions["international"].slice();

    if (!active.includes("international")) {
        for (let i = 0; i < active.length; i++) {
            for (let b = 0; b < actions[active[i]].length; b++) {
                currentActions.push(actions[active[i]][b]);
            }
        }
    } else {
        currentActions = null;
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
    if (!active.includes("international")) {
        let activeString = active.join(",");
        url = window.location.origin + window.location.pathname + "?region=" + activeString + window.location.hash;
    }

    history.replaceState({}, document.title, url);
}

function handleButton(region, button) {
    if (active.includes("international")) {
        active = [region];
        button.classList.add("active");
        campaignsWrapper.classList.add("reversed");
    } else if (active.includes(region)) {
        let index = active.indexOf(region);
        active.splice(index, 1);

        button.classList.remove("active");

        if (active.length == 0) {
            active = ["international"];
            campaignsWrapper.classList.remove("reversed");
        }
    } else {
        active.push(region);
        button.classList.add("active");
    }
}

for (const [region, _] of Object.entries(actions)) {
    let button = document.getElementById(region);
    if (button == null) {
        continue;
    }
    button.onclick = function (e) {
        handleButton(region, button);
        handleActions();
        handleUrlUpdate();
    };
}

// Handle initial url
if (!active.includes("international")) {
    handleActions()
    campaignsWrapper.classList.add("reversed");
    for (let i = 0; i < active.length; i++) {
        let id = active[i];
        document.getElementById(id).classList.add("active");
    }
}
