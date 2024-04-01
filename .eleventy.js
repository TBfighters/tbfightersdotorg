const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const {posix: path} = require("path");
const { createHash } = require("crypto");
const fs = require("fs");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

    let inputDir = "";

    eleventyConfig.addNunjucksFilter('rev', (filepath) => {
        if (!filepath)
            return filepath;
        let file = inputDir + filepath;
        try {
            const data = fs.readFileSync(file);
            const hash = createHash("sha256").update(data).digest("hex").slice(0, 8);
            return filepath + "?v=" + hash;
        } catch (e) {
            console.log(e);
        }
        return filepath;
    });

    eleventyConfig.on("eleventy.before", (arg) => {
        let _inputDir = arg.dir?.input ?? arg.inputDir;
        if (_inputDir) {
            _inputDir = path.normalize(_inputDir);
            // paths created by node:path.normalized() do not contain "." except when a path === ".".
            // For example:
            // path.normalize("./src/your/path"); // -> "src/your/path"
            // but,
            // path.normalize(".") // -> "."
            // The following line is just removing this exception to make things easier.
            inputDir = _inputDir === "." ? "" : _inputDir;
        }
    });

    eleventyConfig.addPassthroughCopy("src/assets");

    // Pages are generated to pagename/index.html by default. This changes it to pagename.html .
    eleventyConfig.addGlobalData('permalink', '/{{ page.filePathStem }}.html');
    // Use the layout.njk by default.
    eleventyConfig.addGlobalData('layout', 'layout.njk');
    // Use nunjucks as template engine.
    eleventyConfig.addGlobalData('templateEngineOverride', 'njk');

    return {
        dir: {
            input: "src",
            layouts: "_layout",
        }
    }
};
