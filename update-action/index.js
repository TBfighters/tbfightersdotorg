var fs = require('fs');

let featuredActionFiles = ["index.html", "action.html"]
let skipDirectories = ["update-action", "img", ".github", ".git"]

let replaceContentFeaturedAciton = fs.readFileSync('./featured-action.html', 'utf8').trim();
let regexHeader = /<!-.BELOW THIS GETS COPIED TO ALL PA(H|G)ES WHEN MENU CHANGES \(CHANGE BODY CLASS TO PAGE NAME\)-->(\n.*)+<!--ABOVE THIS GETS COPIED TO ALL PAGES MENU CHANGES-->/gm
let replaceContentHeader = fs.readFileSync("./header.html", 'utf8').trim();


function replaceContent(files, leadingPath, prefixLength) {
    files.forEach((file, index) => {
        if (file.isDirectory() && !skipDirectories.includes(file.name)) {
            let files = fs.readdirSync(leadingPath + file.name, { withFileTypes: true });
            prefixLength ++;
            replaceContent(files, leadingPath + file.name + "/", prefixLength);
        }

        if (file.name.endsWith(".html") && file.name == "index.html" || file.name == "letter-guide.html") {
            let content = fs.readFileSync(leadingPath + file.name, { encoding: 'utf8' });

            // stupid regex
            let start = content.indexOf('<!--BELOW THIS GETS COPIED TO ALL PAHES WHEN MENU CHANGES (CHANGE BODY CLASS TO PAGE NAME)-->');
            if (start == -1) {
                start = content.indexOf('<!--BELOW THIS GETS COPIED TO ALL PAGES WHEN MENU CHANGES (CHANGE BODY CLASS TO PAGE NAME)-->');
            }
            let end = content.indexOf('<!--ABOVE THIS GETS COPIED TO ALL PAGES MENU CHANGES-->') + "<!--ABOVE THIS GETS COPIED TO ALL PAGES MENU CHANGES-->".length;

            let prefix = "../".repeat(prefixLength);
            console.log(prefix)
            console.log(prefixLength)
            console.log(file)
            let replaceContentHeaderPrefixed = replaceContentHeader.replaceAll("{prefix}", prefix);
            console.log(replaceContentHeaderPrefixed)

            if (start != -1 && end != -1) {
                content = content.substring(0, start) + replaceContentHeaderPrefixed + content.substring(end+1);
            }

            if (featuredActionFiles.includes(file.name)) {
                content = content.replaceAll(/<strong>FEATURED ACTION:<\/strong>.*$/gm, "<strong>FEATURED ACTION:</strong> " + replaceContentFeaturedAciton)
            }
            fs.writeFile(leadingPath + file.name, content, () => { })
        }

    })
}
let files = fs.readdirSync("../", { withFileTypes: true });
replaceContent(files, "../", 0)

