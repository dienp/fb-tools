var logger = new Logger();
start_auto_add_friends();

function start_auto_add_friends() {
    clean_ui();
    auto_add_friends();
}

async function scroll_to_bottom() {
    window.scrollTo(0, document.body.scrollHeight);
}

async function auto_add_friends() {
    let maxFriends = parseInt(prompt("Enter how many friends you wanna add: ", "150"));
    if (typeof maxFriends === 'undefined' || !maxFriends) {
        logger.error("Invalid maxFriends value.");
        if (confirm("Invalid input value. Do you want to enter it again?") == true) {
            start_auto_add_friends();
        } else {
            logger.info("Application has been stopped.")
        }
        return;
    }
    logger.info("Scrolling...");
    for (let i = 0;; i++) {
        scroll_to_bottom();
        logger.info("Scrolled " + (i + 1) + " times");
        if (i % 5 == 0 || is_end_of_scroll()) {
            clean_trash_cards();
            let addBtn = scan_add_buttons();
            if (addBtn.length < 1) {
                logger.info("No \"Add Friend\" buttons found.");
                continue;
            }
            logger.info("Found " + addBtn.length + " \"Add friend\" buttons");
            if (addBtn.length >= maxFriends || is_end_of_scroll()) {
                click_add_buttons(addBtn);
                break;
            }
        }
        await wait(2000);
    }
    logger.info("Application has been stopped.");
    return;
}

function scan_add_buttons() {
    logger.info("Scanning for \"Add Friend\" buttons...")
    let addBtn = document.body.querySelectorAll('#contentArea .addButton:not(.hidden_elem)');
    return addBtn;
}

async function click_add_buttons(addBtn) {
    if (addBtn.length < 1) {
        return;
    }
    logger.info("Adding...");
    for (let i = 0; i < addBtn.length; i++) {
        addBtn[i].click();
        if (i % 10 == 0 || i % (addBtn.length - 1) == 0) {
            dismiss_dialogs()
        }
        logger.info("Added " + i);
        await wait(2000);
    }
}

function dismiss_dialogs() {
    logger.info("Scanning for dialogs...");
    let dialog = document.body.querySelectorAll('.uiLayer div[role="dialog"]:not(.uiContextualLayerBelowLeft)');

    if (dialog.length < 1) {
        logger.info("No dialogs found.");
        return;
    }
    logger.info("Found " + dialog.length + " dialog(s)");
    logger.info("Dismissing dialog(s)...");
    for (let i = 0; i < dialog.length; i++) {
        if (dialog[i].innerHTML.indexOf("Does This Person Know You") > 0) {
            if (dialog[i].querySelector('.layerConfirm')) {
                dialog[i].querySelector('.layerConfirm').click();
            } else {
                logger.error("Unable to dismiss dialog: " + dialog[i]);
            }
        } else {
            if (dialog[i].querySelector('.layerCancel')) {
                dialog[i].querySelector('.layerCancel').click();
            } else {
                logger.error("Unable to dismiss dialog: " + dialog[i]);
            }
        }
    }
    logger.info("Done dismissing dialog(s)...");
}

function is_end_of_scroll() {
    let endScroll = document.body.querySelector('._24j');
    if (endScroll !== null) {
        logger.info("Found \"End of Results\".");
        return true;
    }
    return false;
}

/*Util Functions*/
async function wait(miliseconds) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve("Done waiting");
        }, miliseconds);
    })
}

function getTime() {
    return (new Date()).toUTCString();
}

function clean_ui() {
    let nope = document.body.querySelectorAll("#pagelet_bluebar,#pagelet_sidebar,#pagelet_dock, #toolbarContainer,#leftCol,#rightCol,#bottomContent");
    for (let i = 0; i < nope.length; i++) {
        nope[i].parentNode.removeChild(nope[i]);
    }
}

function clean_trash_cards() {
    let keep = document.body.querySelectorAll("._4p2o");
    for (let i = 0; i < keep.length; i++) {
        if (!keep[i].innerHTML.match("Add Friend"))
            keep[i].parentNode.removeChild(keep[i]);
    }
}

function Logger() {
    this.info = function (message) {
        console.log("[INFO][" + getTime() + "]: " + message);
    }
    this.error = function (message) {
        console.error("[ERROR][" + getTime() + "]: " + message)
    }
}
