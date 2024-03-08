var fs = require('fs');

// replace will all files
let files = ["../index.html", "../action.html"]

// the code for the featured action
let replaceContent = fs.readFileSync('./featured-action.html', 'utf8').trim();

for (i in files) {
    let file = files[i]
    let content = fs.readFileSync(file, { encoding: 'utf8' })
    fs.writeFile(file, content.replaceAll(/<strong>FEATURED ACTION:<\/strong>.*$/gm, "<strong>FEATURED ACTION:</strong> " + replaceContent), () => { })
}
