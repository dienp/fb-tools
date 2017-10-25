function () {
    let maxFriends = parseInt(prompt("Nhập số lượng friends cần add: ", "120"));
    let interval = 2000;
    console.log("---------------||Start scrolling||---------------");
    let scrollBot = setInterval(function () {
        let content = document.querySelector('#contentArea');
        let addButtons = content.querySelectorAll('.addButton:not(.hidden_elem)');
        let endScroll = document.querySelector('._24j');
        console.log('Not added account(s) found: ' + addButtons.length);
        if ((addButtons.length >= maxFriends || endScroll !== null) && addButtons.length > 0) {
            clearInterval(scrollBot);
            console.log("---------------||Done scrolling||---------------");
            console.log("---------------||Start adding||---------------");
            let i = 0;
            let addBot = setInterval(function () {
                addButtons[i].click();
                console.log("Added person number ", i + 1);
                let closeButtons = document.querySelectorAll('.layerCancel');
                for (let j = 0; j < closeButtons.length; j++) {
                    closeButtons[j].click();
                };
                i++;
                if (i >= maxFriends || i === addButtons.length) {
                    clearInterval(addBot);
                    console.log("---------------||Done adding||---------------");
                    console.log("Total added friends: ", i);
                };
            }, interval);
        } else {
            window.scrollTo(0, document.body.scrollHeight);
            if (addButtons.length <= 0 && endScroll !== null) {
                clearInterval(scrollBot);
                console.log("---------------||Done scrolling||---------------");
                console.log("---------------||There is nobody to add!||---------------");
            };
        };
    }, interval);
};


function start_auto_add_friends() {
    auto_add_friends();
}

async function auto_add_friends() {
    let maxFriends = parseInt(prompt("Nhập số lượng friends cần add: ", "120"));

    await wait(2000);

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
