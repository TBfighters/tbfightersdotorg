var fs = require('fs');

let featuredActionFiles = ["index.html", "action.html"]
let skipDirectories = ["update-action", "img", ".github", ".git"]

let featuredAction = fs.readFileSync('./featured-action.html', 'utf8').trim();
let headerContent = fs.readFileSync("./header.html", 'utf8').trim();

let contantFooter = fs.readFileSync("./footer.html", 'utf8').trim();
let indexFooter = " Images courtesy: laboratorio diagnostica ancona IZSUM via Wikimedia Commons; Adobe stock; Leiem via Wikimedia Commons; Icons by fontawesome. <br>"

function replaceContent(files, leadingPath, prefixLength) {
    files.forEach((file, index) => {
        if (file.isDirectory() && !skipDirectories.includes(file.name)) {
            let files = fs.readdirSync(leadingPath + file.name, { withFileTypes: true });
            replaceContent(files, leadingPath + file.name + "/", prefixLength + 1);
        }

        if (file.name.endsWith(".html")) {
            let content = fs.readFileSync(leadingPath + file.name, { encoding: 'utf8' });

            // stupid regex
            let startHeader = content.indexOf('<!--BELOW THIS GETS COPIED TO ALL PAHES WHEN MENU CHANGES (CHANGE BODY CLASS TO PAGE NAME)-->');
            if (startHeader == -1) {
                startHeader = content.indexOf('<!--BELOW THIS GETS COPIED TO ALL PAGES WHEN MENU CHANGES (CHANGE BODY CLASS TO PAGE NAME)-->');
            }
            let endHeader = content.indexOf('<!--ABOVE THIS GETS COPIED TO ALL PAGES MENU CHANGES-->') + "<!--ABOVE THIS GETS COPIED TO ALL PAGES MENU CHANGES-->".length;

            let prefix = "../".repeat(prefixLength);
            let headerPrefixed = headerContent.replaceAll("{prefix}", prefix);

            if (startHeader != -1 && endHeader != -1) {
                content = content.substring(0, startHeader) + headerPrefixed + content.substring(endHeader);
            }

            // footer
            console.log(file)

            // stupid regex
            let startFooter = content.indexOf('<footer class="site-foot">');
            let endFooter = content.indexOf('</footer>') + "</footer>".length;

            let footerContentReplaced = content.replaceAll("{prefix}", prefix);
            if (file.name == "index.html") {
                footerContentReplaced = footerContentReplaced.replaceAll("{index}", indexFooter);
            } else {
                footerContentReplaced = footerContentReplaced.replaceAll("{index}", "");
            }

            console.log(startFooter + "" + startHeader)
            if (startFooter != -1 && endFooter != -1) {
                content = content.substring(0, startFooter) + footerContentReplaced + content.substring(endFooter);
            }

            if (featuredActionFiles.includes(file.name)) {
                content = content.replaceAll(/<strong>FEATURED ACTION:<\/strong>.*$/gm, "<strong>FEATURED ACTION:</strong> " + featuredAction)
            }
            fs.writeFile(leadingPath + file.name, content, () => { })
        }

    })
}
let files = fs.readdirSync("../", { withFileTypes: true });
replaceContent(files, "../", 0)

