// REMEMBER to add a noscript
function addCopyButton(button, text) {
    button.onclick = function() {
        navigator.clipboard.writeText(text.trim())
        alert("Copied!")
    }
}

function addCopyButtonCallback(button, text) {
    button.onclick = function() {
        navigator.clipboard.writeText(text().trim())
        alert("Copied!")
    }
}

function formatElement(element) {
    let text = "";
    let children = element.children;
    for (let i = 0; i < children.length; i++) {
        child = children[i];
        if (child.nodeName != "BR") {
            text += child.textContent.trim().replaceAll(/\s{2, }|\t+/g, "").replaceAll("\n", " ");
        }
        text += "\n"
    }
    return text;
}

// call this to register a print with a form (this only currently works with one register!)
// to add a print button, call the function that it returns like this:
// x(document.getElementById("button"), element.innerHTML, (form, doc) => {
    // doc.getElementById("x").textContent = "y"
    // })
// REMEMBER to add a noscript
function registerPrintForm(formElement, popupElement) {
    let currentText = null
    let currentReplaceFunction = null
    function printPopupFunc(button, textHtml, replaceFunction) {
        button.onclick = function() {
            form.focus();
            popup.classList.add("show-popup")
            currentText = textHtml
            currentReplaceFunction = replaceFunction
        }
    }

    function submitFunc(event) {
        event.preventDefault();
        // options
        // print stuff
        if (['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform)
            || (navigator.userAgent.includes("Mac") && "ontouchend" in document)) {
            let win = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
            win.document.write(
                "<style>* {font-size: 16px; margin: 0; line-height: 1.1em; font-weight: 400; font-family: 'Atkinson Hyperlegible';}</style>" + currentText
            );
            currentReplaceFunction(form, win.document);
            win.focus();
            win.print();
            win.addEventListener("afterprint", (event) => {
                win.close()
                currentText = null
                currentReplaceFunction = null
            }, { once: true });
        } else {
            var iframe = document.createElement('iframe');
            iframe.style.display = "none";
            document.body.appendChild(iframe);
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(
                "<style>* {font-size: 16px; margin: 0; line-height: 1.1em; font-weight: 400; font-family: 'Atkinson Hyperlegible';}</style>" + currentText
            );
            currentReplaceFunction(form, iframe.contentWindow.document);
            iframe.contentWindow.document.close();
            iframe.contentWindow.print()
            iframe.contentWindow.addEventListener("afterprint", (event) => {
                iframe.remove();
                currentText = null
                currentReplaceFunction = null
            }, { once: true });
        }

        // reset
        popup.classList.remove("show-popup")

        return false;
    }
    form.addEventListener("submit", submitFunc)

    popup.addEventListener("click", function(event) {
        if (event.target == popup) {
            popup.classList.remove("show-popup")
            currentText = null
            currentReplaceFunction = null
        }
    })
    document.getElementById("close").addEventListener("click", function(event) {
        popup.classList.remove("show-popup")
        currentText = null
        currentReplaceFunction = null
    })


    var focusableEls = Array.from(popup.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'));
    var firstFocusableEl = focusableEls[0];
    var lastFocusableEl = focusableEls[focusableEls.length - 1];
    var KEYCODE_TAB = 9;

    // body always has the focus
    document.body.addEventListener('keydown', function(e) {
        if (currentText == null) return;
        if (e.key === 'Tab' || e.keyCode === KEYCODE_TAB) {
            if (e.shiftKey) /* shift + tab */ {
                if (document.activeElement === firstFocusableEl || !focusableEls.find(node => node == document.activeElement)) {
                    lastFocusableEl.focus();
                    e.preventDefault();
                }
            } else /* tab */ {
                if (document.activeElement === lastFocusableEl || !focusableEls.find(node => node == document.activeElement)) {
                    firstFocusableEl.focus();
                    e.preventDefault();
                }
            }
        }
    });
    return printPopupFunc;
}
