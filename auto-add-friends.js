start_auto_add_friends();

function start_auto_add_friends() {
    auto_add_friends();
}

async function scroll_to_bottom() {
    window.scrollTo(0, document.body.scrollHeight);
}

async function auto_add_friends() {
    let maxFriends = parseInt(prompt("Enter how many friends you wanna add: ", "150"));
    if (typeof maxFriends === 'undefined' || !maxFriends) {
        console.error("[ERROR][" + getTime() + "]: Invalid maxFriends value.");
        if (confirm("Invalid input value. Do you want to enter it again?") == true) {
            start_auto_add_friends();
        } else {
            console.log("[INFO][" + getTime() + "]: Application has been stopped.")
        }
        return;
    }
    console.log("[INFO][" + getTime() + "]: Scrolling...");
    for (let i = 0; !is_end_of_scroll(); i++) {
        console.log("[INFO][" + getTime() + "]: Scrolled " + i + " times");
        scroll_to_bottom();
        await wait(2000);
        if (i % 5 == 0) {
            let addBtn = scan_add_buttons();
            console.log("[INFO][" + getTime() + "]: Found " + addBtn.length + " \"Add friend\" buttons");
            if (addBtn.length >= maxFriends) {
                console.log("[INFO][" + getTime() + "]: Adding...");
                click_add_buttons(addBtn);
                break;
            }
        }
    }
    console.log("[INFO][" + getTime() + "]: Application has been stopped.");
    return;
}

function scan_add_buttons() {
    console.log("[INFO][" + getTime() + "]: Scanning for \"Add Friend\" buttons.")
    return document.body.querySelectorAll('#contentArea .addButton:not(.hidden_elem)');
}

async function click_add_buttons(addBtn) {
    for (let i = 0; i < addBtn.length; i++) {
        addBtn[i].click();
        if (i % 10 == 0 || i % (addBtn.length - 1) == 0) {
            dismiss_dialogs()
        }
        console.log("[INFO][" + getTime() + "]: Added " + i);
        await wait(2000);
    }
}

function dismiss_dialogs() {
    console.log("[INFO][" + getTime() + "]: Scanning for dialogs...");
    let dialog = document.body.querySelectorAll('.uiLayer div[role="dialog"]:not(.uiContextualLayerBelowLeft)');

    if (dialog.length < 1) {
        console.log("[INFO][" + getTime() + "]: No dialogs found.");
        return;
    }
    console.log("[INFO][" + getTime() + "]: Found " + dialog.length + " dialog(s)");
    console.log("[INFO][" + getTime() + "]: Dismissing dialog(s)...");
    for (let i = 0; i < dialog.length; i++) {
        if (dialog[i].innerHTML.indexOf("Does This Person Know You") > 0) {
            if (dialog[i].querySelector('.layerConfirm')) {
                dialog[i].querySelector('.layerConfirm').click();
            } else {
                console.error("[ERROR][" + getTime() + "]: Unable to dismiss dialog: ", dialog[i]);
            }
        } else {
            if (dialog[i].querySelector('.layerCancel')) {
                dialog[i].querySelector('.layerCancel').click();
            } else {
                console.error("[ERROR][" + getTime() + "]: Unable to dismiss dialog: ", dialog[i]);
            }
        }
    }
    console.log("[INFO][" + getTime() + "]: Done dismissing dialog(s)...");
}

function is_end_of_scroll() {
    let endScroll = document.body.querySelector('._24j');
    if (endScroll !== null) {
        console.log("[INFO][" + getTime() + "]: Found end of scroll.");
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

}
