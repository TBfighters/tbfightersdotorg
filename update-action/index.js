var fs = require('fs');

let featuredActionFiles = ["index.html", "action.html"]
let skipFiles = ["update-action", "img", ".github", ".git", ".default", 'newsletter.html']

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
        if (skipFiles.includes(file.name)) {
            return
        }
        if (file.isDirectory()) {
            let files = fs.readdirSync(leadingPath + file.name, { withFileTypes: true });
            replaceContent(files, leadingPath + file.name + "/", prefixLength + 1);
        }

        if (file.name.endsWith(".html")) {
            let content = fs.readFileSync(leadingPath + file.name, { encoding: 'utf8' });

            // header
            let startHeader = content.indexOf('<header id="site-head"><a href="#main" class="skip">Skip to main content</a>');
            let endHeader = content.indexOf('</header>');

            let prefix = "../".repeat(prefixLength);
            let headerPrefixed = headerContent.replaceAll("{prefix}", prefix);

            headerPrefixed = addIndent('<header id="site-head"><a href="#main" class="skip">Skip to main content</a>', content, headerPrefixed)

            if (startHeader != -1 && endHeader != -1) {
                content = content.substring(0, startHeader) + headerPrefixed + content.substring(endHeader + "</header>".length);
            }

            // footer
            let startFooter = content.indexOf('<footer class="site-foot">');
            let endFooter = content.indexOf('</footer>');

            let footerContentReplaced = contentFooter.replaceAll("{prefix}", prefix);
            let name = file.name;
            if (leadingPath.length >= 4) {
                name = leadingPath.replace("../", "") + name;

            }
            console.log(name);
            console.log(credit[name]);
            if (name == "action.html") {
                console.log(footerContentReplaced)
                console.log("-----")
            }
            footerContentReplaced = footerContentReplaced.replaceAll("{credits}", (credit[name] == undefined) ? "" : credit[name]);
            if (name == "action.html") {
                console.log(footerContentReplaced)
            }

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
                const startText = "<!-- featured Action Start -->";
                const endText = "<!-- featured Action End -->";
                let startFeaturedAction = content.indexOf(startText, 0);
                let endFeaturedAction = content.indexOf(endText, 0);
                while (startFeaturedAction != -1 && endFeaturedAction != -1) {
                    featuredActionContentReplace = addIndent(startText, content, featuredAction)

                    content = content.substring(0, startFeaturedAction) + featuredActionContentReplace + content.substring(endFeaturedAction + endText.length)
                    startFeaturedAction = content.indexOf(startText, startFeaturedAction + featuredActionContentReplace.length);
                    endFeaturedAction = content.indexOf(endText, endFeaturedAction + featuredActionContentReplace.length);
                }

            }
            fs.writeFile(leadingPath + file.name, content, () => { })
        }

    })
}
let files = fs.readdirSync("../", { withFileTypes: true });
replaceContent(files, "../", 0)
