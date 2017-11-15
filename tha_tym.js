start_tha_tym();

function start_tha_tym() {
    tha_tym(100);
    console.log(1);
    setInterval(function(){
        tha_tym(100);
    },20000);
}

async function tha_tym(times) {
    let heart = document.querySelector('.uiLayer span[aria-label="Love"]');
    let like = document.querySelector('.uiLayer span[aria-label="Like"]');
    let array = [heart, like];
    for (let i = 0; i < times; i++) {
        let reaction = array[random_generator()];
        reaction.click();
        await wait(1000);
    }
}

async function wait(miliseconds) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, miliseconds);
    })
}

function random_generator() {
    return Math.floor((Math.random() * 2) + 1) - 1;
}
