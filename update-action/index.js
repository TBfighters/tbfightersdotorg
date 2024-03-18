var fs = require('fs');

let featuredActionFiles = ["index.html", "action.html"]
let skipDirectories = ["update-action", "img", ".github", ".git"]

let replaceContentFeaturedAciton = fs.readFileSync('./featured-action.html', 'utf8').trim();

let regexHeader = /<!-\-BELOW THIS GETS COPIED TO ALL PA(H|G)ES WHEN MENU CHANGES \(CHANGE BODY CLASS TO PAGE NAME\)-->(\n.*)+<!--ABOVE THIS GETS COPIED TO ALL PAGES MENU CHANGES-->/gm
let replaceContentHeader = fs.readFileSync("./header.html", 'utf8').trim();


function replaceContent(files, leadingPath) {
    files.forEach((file, index) => {
        if (file.isDirectory() && !skipDirectories.includes(file.name)) {
            let files = fs.readdirSync(leadingPath + file.name, { withFileTypes: true });
            replaceContent(files, leadingPath + file.name + "/");
        }

        if (file.name.endsWith(".html") && file.name == "index.html" || file.name == "letter-guide.html") {
            let content = fs.readFileSync(leadingPath + file.name, { encoding: 'utf8' });
            content.replace(regexHeader, replaceContentHeader);
            if (featuredActionFiles.includes(file.name)) {
                content.replaceAll(/<strong>FEATURED ACTION:<\/strong>.*$/gm, "<strong>FEATURED ACTION:</strong> " + replaceContentFeaturedAciton)
            }

            fs.writeFile(leadingPath + file.name, c.replaceAll(regexHeader, replaceContentHeader), () => { })
        }

    })
}
let files = fs.readdirSync("../", { withFileTypes: true });
replaceContent(files, "../")

