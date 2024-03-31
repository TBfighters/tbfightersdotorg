let elements = document.getElementsByClassName("header-copy");
for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    let parentId = element.parentElement.id;
    addCopyButton(element, location.protocol + '//' + location.host + location.pathname + "#" + parentId)
}
