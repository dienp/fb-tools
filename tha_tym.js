start_tha_tym();

async function start_tha_tym(){
    for(let i = 0;;i++){
        tha_tym(100);
        await wait(60000);
    }
}

async function tha_tym(times){
    let heart = document.querySelector('span[aria-label="Love"]');
    let like = document.querySelector('span[aria-label="Like"]');
    let array = [heart,like];    
    for(let i = 0; i < times; i++){
        let reaction = array[random_generator()];
        reaction.click();
        await wait(500);
    }
}

async function wait(miliseconds) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve("Done waiting");
        }, miliseconds);
    })
}

function random_generator(){
    return Math.floor((Math.random() * 2) + 1) - 1;
}