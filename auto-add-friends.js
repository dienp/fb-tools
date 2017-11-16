let logger = new Logger();
start_auto_add_friends();

function start_auto_add_friends() {
    console.clear();
    clean_ui();
    auto_add_friends();
}

function scroll_to_bottom() {
    window.scrollTo(0, document.body.scrollHeight);
}

async function auto_add_friends() {
    let maxFriends = parseInt(prompt("Enter how many friends you wanna add: ", "150"));
    if (typeof maxFriends === 'undefined' || !maxFriends) {
        if (confirm("Invalid input value. Do you want to enter it again?") == true) {
            start_auto_add_friends();
        }
        return;
    }
    for (let i = 0;; i++) {
        scroll_to_bottom();
        logger.info("Scrolled " + (i + 1) + " times");
        await wait(2000);
        if (i % 5 == 0 || is_end_of_scroll()) {
            clean_trash_cards();
            let addBtn = scan_add_buttons();
            if (addBtn.length >= maxFriends || is_end_of_scroll()) {
                await click_add_buttons(addBtn, maxFriends);
                alert("Done adding friends.");
                break;
            }
        }
    }
}

function scan_add_buttons() {
    let addBtn = document.body.querySelectorAll('#contentArea .addButton:not(.hidden_elem)');
    logger.info("Found " + addBtn.length + " \"Add friend\" buttons");    
    return addBtn;
}

function click_add_buttons(addBtn, maxFriends) {
    return new Promise(async(resolve, reject) => {
        logger.info("Adding...");
        let max = addBtn.length < maxFriends ? addBtn.length : maxFriends;
        for (let i = 0; i < max; i++) {
            addBtn[i].click();
            logger.info("Added " + (i + 1));
            await wait(2000);            
            if (i % 2 == 0 || i == (max - 1)) {
                dismiss_dialogs();
            }
        };
        resolve();
    })
}


function dismiss_dialogs() {
    let dialog = document.body.querySelectorAll('.uiLayer div[role="dialog"]:not(.uiContextualLayerBelowLeft)');
    logger.info("Found " + dialog.length + " dialog(s)");
    for (let i = 0; i < dialog.length; i++) {
        if (dialog[i].innerHTML.indexOf("Does This Person Know You") > 0) {
            if (dialog[i].querySelector('.layerConfirm')) {
                dialog[i].querySelector('.layerConfirm').click();
            } else {
                logger.error("Unable to dismiss dialog: ", dialog[i]);
            }
        } else {
            if (dialog[i].querySelector('.layerCancel')) {
                dialog[i].querySelector('.layerCancel').click();
            } else {
                logger.error("Unable to dismiss dialog: ", dialog[i]);
            }
        }
    }
    logger.info("Dismissed dialog(s).");
}

function is_end_of_scroll() {
    let endScroll = document.body.querySelector('._24j');
    if (endScroll !== null) {
        return true;
    }
    return false;
}

/*Util Functions*/
function wait(miliseconds) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, miliseconds);
    })
}

function clean_ui() {
    let nope = document.body.querySelectorAll("#pagelet_bluebar,#pagelet_sidebar,#pagelet_dock, #toolbarContainer,#leftCol,#rightCol,#bottomContent");
    if (nope === null || nope.length < 1) {
        return;
    }
    for (let i = 0; i < nope.length; i++) {
        nope[i].parentNode.removeChild(nope[i]);
    }
}

function clean_trash_cards() {
    let card = document.body.querySelectorAll("._4p2o");
    if (card === null || card.length < 1) {
        return;
    }
    for (let i = 0; i < card.length; i++) {
        if (!(card[i].innerHTML.match(/Add Friend/))) {
            card[i].parentNode.removeChild(card[i]);
        }
    }
    logger.info("Cleaned trash cards.");
}

function Logger() {
    this.info = function (message) {
        console.log("[INFO][" + getTime() + "]: " + message);
    }
    this.error = function (message) {
        console.error("[ERROR][" + getTime() + "]: " + message)
    }
}

function getTime() {
    return (new Date()).toUTCString();
}