var fs = require('fs');

let files = ["../index.html", "../action.html"]
let replaceContent = ` Help amplify new Time For $5 ads and remind Danaher to put #PeopleOverProfits, by sharing <a href="https://drive.google.com/drive/folders/1-3rQZiWv7d6d217P-pmsPf1RoTpZQL2G" target="_blank">photos of the ads</a> and <a href="https://www.youtube.com/watch?v=v19WQ9MzANM" target="_blank">John's video</a>.`;

for (i in files) {
    let file = files[i]
    let content = fs.readFileSync(file, { encoding: 'utf8' })
    fs.writeFile(file, content.replace("<strong>FEATURED ACTION:</strong>", "<strong>FEATURED ACTION:</strong>" + replaceContent))
}
