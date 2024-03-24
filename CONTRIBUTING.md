# Contributing
> If you have any questions, feel free to ask in the `Web Dev` thread on discord.

## Adding a New Page

The simpliest way to add a new page is to copy an existing one, make any necessary changes and commit it. You should keep the header and footer the same, do not touch them (see more below on how to change them properly). The metadata should only be changed below the `<!-- Variable Tags -->` comment, if you need to change anything above, just redefine it.

## General Guideline

### Javascript

Please keep javascript to a minimum and when you do use it, use `<noscript>` tags to replace functionality as best as possible and/or inform the user.

### Mobile

Mobile users should be treated just as important as desktop users because they make up most of the trafic! Please do everything you can to make the mobile experiance as good as the desktop one.

## Submitting a PR

Whenever you submit a pr, please notify us in the [thread](https://discord.com/channels/252701351786577920/1149204674390536262) on discrod!

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
