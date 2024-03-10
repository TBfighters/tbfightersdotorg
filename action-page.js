// expand button

let expanded = false;
let grid = document.getElementById("expand-action-grid");
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

addCopyButton(document.getElementById("copy-light"), `Dear ________,

The global fight against tuberculosis (TB) faces a critical year ahead. That is why I am pleased to invite you on behalf of the Stop TB Partnership, a United Nations-hosted entity based in Geneva, Switzerland, to mark World Tuberculosis (TB) Day on 24 March 2024.

This year, the Stop TB Partnership raises awareness of the critical funding gap of USD 9 billion still needed to combat TB. TB remains the world’s second-largest infectious disease and kills more than 4,100 people every day, among them 650 children. That means that every minute, three people lose their lives from TB.

Each year, on 24 March, we commemorate the day in 1882 when Dr. Robert Koch announced the discovery of the TB bacteria. World TB Day is an occasion to re-energize our battle and mobilize political and social commitment to further progress towards eliminating TB as a public health burden.

Last year the world turned a new page in the fight against TB, following the September 2023 UN High-Level Meeting (HLM) on TB. We recognize and commend the impressive global response, with 7.5 million people (out of the estimated 10.3 million) newly diagnosed with TB - the highest number of people with TB ever diagnosed and treated in a year. We want 2024 to be even better and on World TB Day we would like everybody to take this message one step further by saying what each of us is doing to help End TB by 2030.

It is an honor to invite ________ to join the global movement and light up a city landmark, building, or clock in RED on 24 March 2024, to bring attention to the devastating impact of TB.

The Stop TB Partnership launched the “Light Up for TB” campaign for the first time in 2017, and we have attracted broad participation from over 60 cities in previous campaigns.

Now more than ever, the world community must come together to end this terrible disease.

We hope that _________ will show your support by joining the initiative for World TB Day 2024 and Light Up for TB. Time is running out – we must invest in ending TB and saving lives.

Yours sincerely,
[YOUR NAME] `)


// copy buttons

addCopyButton(document.getElementById("copy-1"), document.getElementById("post-1").textContent)
addCopyButton(document.getElementById("copy-2"), document.getElementById("post-2").textContent)
addCopyButton(document.getElementById("copy-3"), document.getElementById("post-3").textContent)


// slide show
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

