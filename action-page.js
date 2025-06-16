const actions = {
    "international": [
        "danaher"
    ],
    "united-states": [
        "us-funding-cuts",
        "us-hill-day",
    ],
    "canada": [],
    "united-kingdom": [],
    "european-union": [],
}

let active = ["international"];
let campaigns = document.getElementsByClassName("campaign");

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

function toggleRegion(region, button) {
    if (active.includes("international")) {
        active = [region];
        button.classList.add("active");
    } else if (active.includes(region)) {
        let index = active.indexOf(region);
        active.splice(index, 1);

        button.classList.remove("active");

        if (active.length == 0) {
            active = ["international"];
        }
    } else {
        active.push(region);
        button.classList.add("active");
    }
    handleActions();
}

for (const [region, _] of Object.entries(actions)) {
    let button = document.getElementById(region);
    if (button == null) {
        continue;
    }
    button.onclick = function (e) {
        toggleRegion(region, button);
    };
}
