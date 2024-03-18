var fs = require('fs');

// ** FEATuRED ACTIONS ** //

// replace will all files
let files = ["../index.html", "../action.html"]

// the code for the featured action
let replaceContentFeaturedAciton = fs.readFileSync('./featured-action.html', 'utf8').trim();

for (i in files) {
    let file = files[i]
    let content = fs.readFileSync(file, { encoding: 'utf8' })
    fs.writeFile(file, content.replaceAll(/<strong>FEATURED ACTION:<\/strong>.*$/gm, "<strong>FEATURED ACTION:</strong> " + replaceContentFeaturedAciton), () => { })
}

// ** HEADER ** //

/*
    *
<!--BELOW THIS GETS COPIED TO ALL PAHES WHEN MENU CHANGES (CHANGE BODY CLASS TO PAGE NAME)-->
<header id="site-head"><a href="#main" class="skip">Skip to main content</a>
    <div class="wrapper-head">
        <h1 class="page-title">
            <a href="index.html"><span class="black-highlight">TB</span>FIGHTERS</a>
        </h1>
        <a class="toggle-button" href="#" title="menu"></a>
        <nav class="site-menu">
            <ul class="active">
                <li><a href="about.html">About Us</a></li>
                <li><a href="timeline.html">News &amp; Timeline</a></li>
                <li><a href="resources.html">Resources</a></li>
                <li><a href="action.html">Take Action</a></li>
            </ul>
        </nav>
    </div>
</header>
<!--ABOVE THIS GETS COPIED TO ALL PAGES MENU CHANGES-->
    * */

let regexHeader = /<!--BELOW THIS GETS COPIED TO ALL PA(H|G)ES WHEN MENU CHANGES \(CHANGE BODY CLASS TO PAGE NAME\)-->(\n.*)+<!--ABOVE THIS GETS COPIED TO ALL PAGES MENU CHANGES-->/gm
let replaceContentHeader = fs.readFileSync("./header.html", 'utf8').trim();

let c = fs.readFileSync("../index.html", { encoding: 'utf8' });
fs.writeFile("../index.html", c.replaceAll(/<strong>FEATURED ACTION:<\/strong>.*$/gm, replaceContentHeader), () => { })
