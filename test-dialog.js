init_dialog();

function init_dialog() {
    generate_dialog();
    /*generate_floating_button();*/
}

function show_dialog() {
    document.body.querySelector('#ptd-dialog-container').classList.toggle("ptd-hidden");
}

function hide_dialog() {
    document.body.querySelector('#ptd-dialog-container').classList.add("ptd-hidden");
}

async function generate_dialog() {
    let data = await get_friend_uid(getMyId());
    let cards = generate_cards(data);
    let styles = `.ptd-dialog{position:relative;width:600px;margin-left:-300px;height:400px;margin-top:-200px;background:#fff;border:1px solid rgba(100,100,100,.4);border-radius:0 0 2px 2px;box-shadow:0 3px 8px rgba(0,0,0,.25);color:#1d2129;overflow:visible;box-sizing:border-box}.center-point{font-family:Helvetica,Arial,sans-serif;font-size:12px;top:50%;left:50%;position:fixed;z-index:99999}.ptd-header{background-color:#4267b2;border-bottom:1px solid #29487d;color:#fff;height:30px;font-size:13px;line-height:30px;width:100%;display:inline-block}.ptd-body{width:100%;height:calc(100% - 30px);overflow:auto}.ptd-title{float:left;margin-left:10px;font-weight:700}.ptd-img-circle{border-radius:50%}.ptd-dismiss{float:right;margin-right:10px;font-size:15px;cursor:pointer}.ptd-dismiss:hover{transform:scale(1.4)}.ptd-img{float:left;margin-left:10px;margin-top:10px;width:30px;height:30px}.ptd-name{float:left;margin-left:10px}.ptd-card{display:inline;height:50px;width:100%;border-bottom:1px solid rgba(100,100,100,.4);display:block;background:#fff;line-height:50px}.ptd-button{float:left;background-color:#4267b2;border-color:#4267b2;color:#fff;border:1px solid;border-radius:2px;box-sizing:content-box;font-size:12px;font-weight:700;justify-content:center;padding:0 8px;position:relative;text-align:center;text-shadow:none;vertical-align:middle;height:24px;margin-left:10px;margin-top:13px}.ptd-visible{visibility:visible;opacity:1;transition:opacity 0.2s linear}.ptd-hidden{visibility:hidden;opacity:0;transition:visibility 0s 0.2s,opacity 0.2s linear}`;

    let dialog = `<div class="center-point"> <div class="ptd-dialog"> <div class="ptd-header"> <div class="ptd-title">Messenger</div><div class="ptd-dismiss">&times;</div></div><div class="ptd-body"> <div class="ptd-card"> <button class="ptd-button">Button</button> <img class="ptd-img ptd-img-circle" src="https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.0-1/p50x50/21761369_752756941577087_7799875693860459143_n.jpg?oh=281088442b744c9d0810c8987e5b0115&oe=5AAE5A69"/> <div class="ptd-name">John Doe</div></div>${cards}</div></div></div>`;

    if (!document.head.querySelector("#ptd-dialog-style")) {
        let css = document.createElement("style");
        css.id = "ptd-dialog-style";
        css.appendChild(document.createTextNode(styles));
        document.head.appendChild(css);
    };
    if (!document.body.querySelector("#ptd-dialog-container")) {
        let div = document.createElement("div");
        div.id = "ptd-dialog-container";
        div.innerHTML = dialog;
        document.body.appendChild(div);
    };
    document.body.querySelector('.ptd-dismiss').addEventListener('click', function () {
        hide_dialog();
    });
};

function generate_floating_button() {
    let floatingBtn = `<div class="ptd-floating">+</div>`;
    let floatingStyle = `.ptd-floating{position:fixed;background-color:red;z-index:99999;width:50px;height:50px;top:80%;left:80%;margin-right:100px;margin-bottom:100px;border-radius:50%;}`;

    if (!document.head.querySelector("#ptd-floating-style")) {
        let css = document.createElement("style");
        css.id = "ptd-floating-style";
        css.appendChild(document.createTextNode(floatingStyle));
        document.head.appendChild(css);
    };
    if (!document.body.querySelector("#ptd-floating-container")) {
        let div = document.createElement("div");
        div.id = "ptd-floating-container";
        div.innerHTML = floatingBtn;
        document.body.appendChild(div);
    };
    document.body.querySelector('.ptd-floating').addEventListener('click', function () {
        show_dialog();
    });
}


/*Async functions*/
async function get_friend_uid(myId) {
    return new Promise(function (resolve, reject) {
        console.log("Getting your friends UIDs...");
        let request = new XMLHttpRequest;
        request.open("GET", "/ajax/typeahead/first_degree.php?__a=1&filter[0]=user&lazy=0&viewer=" + myId + "&__user=" + myId + "&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm", true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                let data = JSON.parse(unescape(request.responseText.match(/\[{.+}\]/g)));
                console.log('data', data);
                resolve(data);
            };
        };
        request.send();
    });
};

function generate_cards(data) {
    let cards = '';
    data.forEach(function (el, i) {
        cards += make_card(el.photo, el.text);
    });
    return cards;
};

function make_card(imgSrc, name) {
    let cardTemplate = `<div class='ptd-card'> <button class='ptd-button'>Button</button> <img class='ptd-img ptd-img-circle' src='${imgSrc}'/> <div class='ptd-name'>${name}</div></div>`;
    return cardTemplate;
}
/*Util functions*/
async function wait(miliseconds) {
    return new Promise(function (resolve, reject) {
        let start_time = new Date().getTime();
        setTimeout(function () {
            resolve(new Date().getTime() - start_time);
        }, miliseconds);
    });
};

function getMyId() {
    let myId = null;
    if (document.cookie.match(/c_user=(\d+)/)) {
        if (document.cookie.match(/c_user=(\d+)/)[1]) {
            myId = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
            return myId;
        } else {
            myId = prompt("ID not found in cookies, please enter it manually: ", "");
            return myId;
        }
    } else {
        myId = prompt("ID not found in cookies, please enter it manually: ", "");
        return myId;
    }
}

function getFBToken() {
    let fb_dtsg = null;
    if (window.location.pathname.match("/pokes")) {
        try {
            fb_dtsg = document.documentElement.innerHTML.match(/,\{"token":"\(.\*\?\)"/g)[0].replace(',\{"token":"', '').replace('"', '');
            return fb_dtsg;
        } catch (e) {
            console.log("Error: ", e);
        };
    } else {
        try {
            if (document.getElementsByName("fb_dtsg")) {
                if (document.getElementsByName("fb_dtsg")[0]) {
                    fb_dtsg = document.getElementsByName("fb_dtsg")[0].value;
                    return fb_dtsg;
                }
            }
        } catch (e) {
            console.log("Error: ", e);
        };
    };
}
