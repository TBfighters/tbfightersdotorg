var fs = require('fs');

let featuredActionFiles = ["index.html", "action.html"]
let skipDirectories = ["update-action", "img", ".github", ".git"]

let featuredAction = fs.readFileSync('./featured-action.html', 'utf8').trim();
let headerContent = fs.readFileSync("./header.html", 'utf8').trim();

let contentFooter = fs.readFileSync("./footer.html", 'utf8').trim();
let credit = JSON.parse(fs.readFileSync("./footer-credits.json", 'utf8'));

let metadataContent = fs.readFileSync("./metadata.html", 'utf8').trim();

featuredAction = featuredAction.replaceAll("\r", "");
headerContent = headerContent.replaceAll("\r", "");
contentFooter = contentFooter.replaceAll("\r", "");
metadataContent = metadataContent.replaceAll("\r", "");

function addIndent(query, content, replaceContent) {
    let indentation = 0;
    let startLine = content.match(new RegExp("([\t ]+)" + query));
    indentation = startLine[1].length;

    var separateLines = replaceContent.split(/\r?\n|\r|\n/g);
    for (line in separateLines) {
        if (line == 0) continue;
        separateLines[line] = "\t".repeat(indentation) + separateLines[line];
    }

    return separateLines.join("\n")
}

function replaceContent(files, leadingPath, prefixLength) {
    files.forEach((file, _) => {
        if (file.isDirectory() && !skipDirectories.includes(file.name)) {
            let files = fs.readdirSync(leadingPath + file.name, { withFileTypes: true });
            replaceContent(files, leadingPath + file.name + "/", prefixLength + 1);
        }

        if (file.name.endsWith(".html")) {
            let content = fs.readFileSync(leadingPath + file.name, { encoding: 'utf8' });

            // header
            let startHeader = content.indexOf('<!--BELOW THIS GETS COPIED TO ALL PAGES WHEN MENU CHANGES (CHANGE BODY CLASS TO PAGE NAME)-->');
            let endHeader = content.indexOf('<!--ABOVE THIS GETS COPIED TO ALL PAGES MENU CHANGES-->');

            let prefix = "../".repeat(prefixLength);
            let headerPrefixed = headerContent.replaceAll("{prefix}", prefix);

            headerPrefixed = addIndent("<!--BELOW THIS GETS COPIED TO ALL PAGES WHEN MENU CHANGES \\(CHANGE BODY CLASS TO PAGE NAME\\)-->", content, headerPrefixed)

            if (startHeader != -1 && endHeader != -1) {
                content = content.substring(0, startHeader) + headerPrefixed + content.substring(endHeader + "<!--ABOVE THIS GETS COPIED TO ALL PAGES MENU CHANGES-->".length);
            }

            // footer
            let startFooter = content.indexOf('<footer class="site-foot">');
            let endFooter = content.indexOf('</footer>');

            let footerContentReplaced = contentFooter.replaceAll("{prefix}", prefix);
            footerContentReplaced = footerContentReplaced.replaceAll("{credits}", (credit[file.name] == undefined) ? "" : credit[file.name]);

            footerContentReplaced = addIndent("<footer class=\"site-foot\">", content, footerContentReplaced)

            if (startFooter != -1 && endFooter != -1) {
                content = content.substring(0, startFooter) + footerContentReplaced + content.substring(endFooter + "</footer>".length);
            }

            // metadata
            let metadataContentReplaced = metadataContent.replaceAll("{prefix}", prefix);
            let startMetadata = content.indexOf("<!--Meta tags-->");
            let endMetadata = content.indexOf("<!-- Variable Tags -->");

            metadataContentReplaced = addIndent("<!--Meta tags-->", content, metadataContentReplaced)

            if (startMetadata != -1 && endMetadata != -1) {
                content = content.substring(0, startMetadata) + metadataContentReplaced + content.substring(endMetadata + "<!-- Variable Tags -->".length)
            }

            // featured action
            if (featuredActionFiles.includes(file.name)) {
                content = content.replaceAll(/<strong>FEATURED ACTION:<\/strong>.*$/gm, "<strong>FEATURED ACTION:</strong> " + featuredAction)
            }
            fs.writeFile(leadingPath + file.name, content, () => { })
        }

    })
}
let files = fs.readdirSync("../", { withFileTypes: true });
replaceContent(files, "../", 0)
