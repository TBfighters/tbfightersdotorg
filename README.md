# tbfighters.org
Source Code of the [tbfighters.org](https://tbfighters.org) website, written in vanilla HTML, CSS and JavaScript to keep a light footprint.

## Building
Generating the static pages requires [Node.js](https://nodejs.org/en).
Inside the directory, run `npm i` to install the dependency (eleventy, the static side generator).

Then, `npm run build` will generate the website in the `_site` directory.

Running `npm run serve` starts a development server on http://localhost:8080/ that updates upon file changes.

If you want to deploy to somewhere else then the root of your (sub)domain, please build the page with `npx @11ty/eleventy --pathprefix /the/subpath/`.

## Contributing
Contributions are gladly appreciated!
Feel free to fork and create a pull request with the changes you would like to propose.
However, please note that we may not accept all pull requests as we want to ensure a certain level of factuality and quality on the site.

By contributing to this project, you license all your code and other text materials under the MIT license, and all media content must either be in the public domain or licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

View the [contributing guide](CONTRIBUTING.md) for how this is organized, and [here](https://docs.google.com/document/d/1fM523NeS6SUvp-dweWrALmPBJrtPF0QCcNH9zqvjILY) is our crash course on using github!

## License
All code and text content is under the MIT license.
All media content is either in the public domain or [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) or another compatible license. Please check the individual image sources for more details.
