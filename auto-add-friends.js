function start_auto_add_friends() {
    auto_add_friends();
}

async function scroll_to_bottom() {
    window.scrollTo(0, document.body.scrollHeight);
}

async function auto_add_friends() {
    let maxFriends = parseInt(prompt("Nhập số lượng friends cần add: ", "120"));
    console.log("Scrolling...");
    for (let i = 0; !is_end_of_scroll(); i++) {
        console.log("[Scrolled " + i + "]");
        scroll_to_bottom();
        await wait(2000);
        if (i % 5 == 0) {
            let addBtn = scan_add_buttons();
            console.log('Found ' + addBtn.length + " [Add friend] buttons");
            if (addBtn.length >= maxFriends) {
                console.log("Adding...");
                click_add_buttons(addBtn);
                break;
            }
        }
    }
}

function scan_add_buttons() {
    return document.body.querySelectorAll('#contentArea .addButton:not(.hidden_elem)');
}

async function click_add_buttons(addBtn) {
    for (let i = 0; i < addBtn.length; i++) {
        addBtn[i].click();
        if (i % 10 == 0 || i % (addBtn.length - 1) == 0) {
            dismiss_dialogs()
        }
        console.log("[Added " + i + "]");
        await wait(2000);
    }
    alert("Done auto_add_friends");
}

function dismiss_dialogs() {
    let dialog = document.body.querySelectorAll('.uiLayer div[role="dialog"]');
    for (let i = 0; i < dialog.length; i++) {
        if (dialog[i].innerHTML.indexOf("Does This Person Know You") > 0) {
            if (dialog[i].querySelector('.layerConfirm')) {
                dialog[i].querySelector('.layerConfirm').click();
            } else {
                console.error("No dialogs found");
            }
        } else {
            if (dialog[i].querySelector('.layerCancel')) {
                dialog[i].querySelector('.layerCancel').click();
            } else {
                console.error("No dialogs found");
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

start_auto_add_friends();

/*Util Functions*/
async function wait(miliseconds) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve("Done waiting");
        }, miliseconds);
    })
}
