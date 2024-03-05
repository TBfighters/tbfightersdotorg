let featuredElement = document.getElementById("featured-replace");
let featuredRaw = fetch("/featured-action.html");
featuredRaw.then((r) => {
    r.text().then((s) => {
        featuredElement.innerHTML += s
    })
})
