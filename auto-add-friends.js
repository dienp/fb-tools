start_auto_add_friends();

function start_auto_add_friends() {
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
        if (i % 5 == 0 || is_end_of_scroll()) {
            clean_trash_cards();
            let addBtn = scan_add_buttons();
            if (addBtn.length < 1) {
                continue;
            }
            if (addBtn.length >= maxFriends || is_end_of_scroll()) {
                click_add_buttons(addBtn, maxFriends);
                break;
            }
        }
        await wait(2000);
    }
    alert("Done.");
    return;
}

function scan_add_buttons() {
    let addBtn = document.body.querySelectorAll('#contentArea .addButton:not(.hidden_elem)');
    return addBtn;
}

async function click_add_buttons(addBtn, maxFriends) {
    if (addBtn.length < 1) {
        return;
    }
    for (let i = 0; i < maxFriends; i++) {
        addBtn[i].click();
        if (i % 10 == 0 || i % (maxFriends - 1) == 0) {
            dismiss_dialogs()
        }
        await wait(2000);
    }
}

function dismiss_dialogs() {
    let dialog = document.body.querySelectorAll('.uiLayer div[role="dialog"]:not(.uiContextualLayerBelowLeft)');
    if (dialog.length < 1) {
        return;
    }
    for (let i = 0; i < dialog.length; i++) {
        if (dialog[i].innerHTML.indexOf("Does This Person Know You") > 0) {
            if (dialog[i].querySelector('.layerConfirm')) {
                dialog[i].querySelector('.layerConfirm').click();
            }
        } else {
            if (dialog[i].querySelector('.layerCancel')) {
                dialog[i].querySelector('.layerCancel').click();
            }
        }
    }

}

function is_end_of_scroll() {
    let endScroll = document.body.querySelector('._24j');
    if (endScroll !== null) {
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

function clean_ui() {
    let nope = document.body.querySelectorAll("#pagelet_bluebar,#pagelet_sidebar,#pagelet_dock, #toolbarContainer,#leftCol,#rightCol,#bottomContent");
    if (nope != null && nope.length > 0) {
        for (let i = 0; i < nope.length; i++) {
            nope[i].parentNode.removeChild(nope[i]);
        }
    }
}

function clean_trash_cards() {
    let card = document.body.querySelectorAll("._4p2o");
    if (nope != null && nope.length > 0) {
        for (let i = 0; i < card.length; i++) {
            if (!(card[i].innerHTML.match(/Add Friend/))) {
                card[i].parentNode.removeChild(card[i]);
            }
        }
    }
}