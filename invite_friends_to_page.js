var logger = new Logger();
start();

function start() {
    console.clear();    
    invite_friends_like_page();
}

async function invite_friends_like_page() {
    let user = getMyId();
    let fb_dtsg = getFBToken();
    let friends = await get_friend_uid(user);
    let pageUrl = prompt("Enter your page URL: ", "https://www.facebook.com/BetterLeadership/");
    if (!pageUrl) {
        if (confirm("Invalid URL, do you want to continue?") == true) {
            start();
        };
        return;
    };
    let pageId = await get_page_id_from_url(pageUrl);
    if (!pageId) {
        if (confirm("Invalid URL, do you want to continue?") == true) {
            start();
        };
        return;
    };
    for (let i = 0; i < friends.length; i++) {
        send_invite(user, fb_dtsg, friends[i], pageId);
        await wait(2000);
    }
}

function send_invite(user, fb_dtsg, friendId, pageId) {
    return new Promise(function (resolve, reject) {
        let url = `/ajax/pages/invite/send_single/?dpr=1`;
        let xhr = new XMLHttpRequest;
        let params = `invite_note=&ref=context_row_dialog&is_send_in_messenger=false&page_id=${pageId}&invitee=${friendId}&action=send&is_send_in_messenger=false&__user=${user}&__a=1&fb_dtsg=${fb_dtsg}`;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                logger.info(`Sent invite to ${friendId} (${this.status})`);
                resolve();
            };
        };
        xhr.send(params);
    });
}

function get_friend_uid(myId) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest;
        let arrId = [];
        request.open("GET", "/ajax/typeahead/first_degree.php?__a=1&filter[0]=user&lazy=0&viewer=" + myId + "&__user=" + myId + "&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm", true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                let data = JSON.parse(unescape(request.responseText.match(/\[{.+}\]/g)));
                data.forEach(function (el, i) {
                    arrId.push(el.uid);
                });
                resolve(arrId);
            };
        };
        request.send();
    });
}

function get_page_id_from_url(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest;
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    let pageId = xhr.responseText.match(/page\/\?id=\d+/)[0].match(/\d+/)[0];
                    resolve(pageId);
                } else {
                    reject();
                }
            };
        };
        xhr.send();
    })
}

/*Get Your Own UID*/
function getMyId() {
    let myId = null;
    if (document.cookie.match(/c_user=(\d+)/)) {
        if (document.cookie.match(/c_user=(\d+)/)[1]) {
            myId = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
            return myId;
        }
    } else {
        myId = prompt("ID not found in cookies, please enter it manually: ", "");
        return myId;
    }
}

/*Get fb_dtsg token*/
function getFBToken() {
    let fb_dtsg = null;
    if (window.location.pathname.match("/pokes")) {
        try {
            fb_dtsg = document.documentElement.innerHTML.match(/,\{"token":"\(.\*\?\)"/g)[0].replace(',\{"token":"', '').replace('"', '');
            return fb_dtsg;
        } catch (e) {
            logger.error(e);
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
            logger.error(e);
        };
    };
}

function wait(milliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, milliseconds);
    });
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