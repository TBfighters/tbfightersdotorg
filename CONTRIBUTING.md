# Contributing
> If you have any questions, feel free to ask in the `Web Dev` thread on discord.

## Adding a New Page

The simpliest way to add a new page is to copy an existing one, make any necessary changes and commit it. You should keep the header and footer the same, do not touch them (see more below on how to change them properly). The metadata should only be changed below the `<!-- Variable Tags -->` comment, if you need to change anything above, just redefine it.

## General Guideline

### Javascript

Please keep javascript to a minimum and when you do use it, use `<noscript>` tags to replace functionality as best as possible and/or inform the user.

### Accessibility and Mobile

We strive for WCAG 2.1 AA (AAA whenever possible) compliance for our website including alt text, keyboard accessibility, nostyle compatibility, and high contrast. The mobile website is our main priority and should replicate the desktop experience as much as possible. Standard mobile breakpoints and constrast compliant colors are listed further down in this documentation.

## Submitting a PR

Whenever you submit a PR, please notify us in the [thread](https://discord.com/channels/252701351786577920/1149204674390536262) on discord!

## Adding an action to the action page
The action page has a filter to allow people to see only actions for *their* country. Follow the steps below to add a new action or country to this filter.
### Adding a new country
- Add a new button to the filter buttons
- Create a new wrapper at the bottom with the classes `[country]-campaigns campaigns`
- In `action-page.js` add the country to the `actions` dict

### Adding a new action
- Copy an existing action in the `action.html` page and modify it to your liking.
- Change the class to one that describes the action in name. *These must be unique*
- Add that class name to the country's list in the `actions` dict in `action-page.js`

## Automations
> [!note]
> - If you ever add a new folder to the repo that **doesn't** contain files public on the website, add it to the `skipDirectories` list in the [./update-action/index.js](./update-action/index.js) file.
> - It is ok if the action fails, it is most likely because there was nothing to update and it ran for no reason/someone ran it locally! If you have any worries that it failed because of other reasons, please ping `YummyOreo` on discord in the `Web Dev` thread.

There are a couple automations that have been setup to allow for easy updating of the featured action, headers, metadata, and footers. All the code for the automations can be found in the [/update-actions/](./update-action/) folder.

### Featured Action

To update the featured action, change the [./update-action/featured-action.html](./update-action/featured-action.html) file and push to a branch. A github action should run and update the featured action across all files. To add a new file to the list, the steps get a bit more complicated:
- copy the current featured action from another file (wrapper and all).
- add the name of the new file to the `featuredActionFiles` list in the [./update-action/index.js](./update-action/index.js) file.

### Headers

To update the headers, change the [./update-action/header.html](./update-action/header.html) file and push to a branch. A github action will run and update the headers across all files.

### Footers

> [!note]
> If footers need anything custom, like credits, add it to the [./update-action/footer-credits.json](./update-action/footer-credits.json) file.

To update the footers, change the [./update-action/footer.html](./update-action/footer.html) file and push to a branch. A github action will run and update the headers across all files.

### Metadata

To update common metadata, change the [./update-action/metadata.html](./update-action/metadata.html) file and push to a branch. A github action will run and update the headers across all files.

## Standardization References

References for developers on colors, font size, and other styles.

### Colors

- `#FCF3E3` | Primary background/white replacement | css var `--bg`
- `#121212` | Primary text/black replacement | css var `--fg`
- `#BC1C1A` | Primary red accent | css var `--accent-bg`
- `#FDBF4A` | Secondary yellow accent | css var `--accent-yellow`
- `#003049` | Secondary navy blue accent | css var `--accent-blue`
- `#42AA8B` | Secondary green accent | css var `--accent-green`
- `#1E91CE` | Secondary light blue accent | css var `--accent-light-blue`
 **Special use colors**
- `#D7211E` | Primary red accent for use on black/foreground color | css var `--accent-fg`
- `#DDDAD4` | Alternate table row background (tinted light grey) | css var `--bg2`

### Mobile breakpoints and default sizing

For each breakpoint, information is listed as font size / line height, if applicable. Standard font size (based on 16px brower default) in parentheses.

**Maximum desktop breakpoint: min-width: 1440px**\
*(font sizes listed as* element/selector : font size / line height*)*
- `#main`: 1.5rem (24px) / 1.75rem (28px)
- `.larger`: 1.75rem (28px) / 1.85rem (29.6px)
- `.smaller`: 1rem (16px) / 1.25rem (20px)
- `h1`: 3.375rem (54px)
- `h2`: 2.75rem (44px)
- `h3`: 2.25rem (36px)
- `h4`: 2rem (32`px)
- `h5`: 1.75rem (28px)

Minor breakpoint for some columned boxes: min-width: 1200px\
Tablet breakpoint: min-width: 1024px\
Large mobile breakpoint: min-width: 768px\
**Minimum mobile breakpoint: min-width: 650px** (all fonts shift down one size; most margins/paddings remain the same)
