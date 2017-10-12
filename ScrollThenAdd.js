(function () {
    let maxFriends = parseInt(prompt("Nhập số lượng friends cần add: ", "100"));
    let content;
    let addButtons;
    let endScroll;
    console.log("---------------||Start scrolling||---------------");
    let scrollBot = setInterval(function () {
        content = document.querySelector('#contentArea');
        addButtons = content.querySelectorAll('.addButton:not(.hidden_elem)');
        endScroll = document.querySelector('._24j');
        console.log('Not added account(s) found: ' + addButtons.length);
        if ((addButtons.length >= maxFriends || endScroll !== null) && addButtons.length > 0) {
            clearInterval(scrollBot);
            console.log("---------------||Done scrolling||---------------")
            console.log("---------------||Start adding||---------------");
            let i = 0;
            let addBot = setInterval(function () {
                addButtons[i].click();
                console.log("Added person number ", i + 1);
                let closeButtons = document.querySelectorAll('.layerCancel');
                for (let j = 0; j < closeButtons.length; j++) {
                    closeButtons[j].click();
                }
                if (++i === maxFriends) {
                    clearInterval(addBot);
                    console.log("---------------||Done adding||---------------");
                    console.log("Total added friends: ", i);

                }
            }, 2000)
        } else {
            window.scrollTo(0, document.body.scrollHeight);
            if (addButtons.length <= 0 && endScroll !== null) {
                clearInterval(scrollBot);
                console.log("---------------||Done scrolling||---------------");
                console.log("---------------||There is nobody to add!||---------------");
            }
        }
    }, 2000);
})();
