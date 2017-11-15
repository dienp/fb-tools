var logger = new Logger();
start_invite_frriends();

function start_invite_frriends() {
    invite_friends_like_page();
}

async function invite_friends_like_page() {
    debugger;
    let myId = getMyId();
    let fb_dtsg = getFBToken();
    let pageUrl = prompt("Enter your page URL: ", "");
    if (!pageUrl) {
        if (confirm("Invalid URL. Do you want to enter it again?")) {
            start_invite_frriends();
        }
        return;
    }
    try {
        let resultPage = await check_page_url(pageUrl);
        if (confirm(`Found page: ${resultPage}. Continue?`) == true) {
            let pageId = await get_page_id_from_url(pageUrl);
            let friendArr = await get_friend_uid(myId, pageId);
            logger.info(`Total friends: ${friendArr.length}`);
            for (let i = 0; i < friendArr.length; i++) {
                let friendId = friendArr[i];
                send_invite(friendId, pageId[0], myId, fb_dtsg, i);
                await wait(2000);
            }
        }
    } catch (err) {
        logger.error(err);
        if (confirm(`${err}. Do you want to enter the url again?`)) {
            start_invite_frriends();
        }
        return;
    }
}

function send_invite(friendId, pageId, myId, fb_dtsg, no) {
    return new Promise(function (resolve, reject) {
        let url = `https://www.facebook.com/ajax/pages/invite/send_single/?dpr=1`;
        let xhr = new XMLHttpRequest;
        let params = `page_id=${pageId}&invitee=${friendId}&action=send&is_send_in_messenger=false&__user=${myId}&__a=1&fb_dtsg=${fb_dtsg}`;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                logger.info(`[${no}]Sent invite to ${friendId} (${this.status})`);
                resolve();
            };
        };
        xhr.send(params);
    });
}

/*Get your friends UIDs*/
function get_friend_uid(myId, pageId) {
    return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest;
        let arrId = [];
        let url = `https://www.facebook.com/pages/typeahead/invite_bootstrap/?page_id=${pageId}&dpr=1&options[0]=friends_only&viewer=${myId}&__a=1`
        request.open("GET", url, true);
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

/*Get page Id from URL*/
function get_page_id_from_url(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest;
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if (xhr.responseText.match(/fb\:\/\/page\/\?id=\d+/)) {
                    let pageId = xhr.responseText.match(/fb\:\/\/page\/\?id=\d+/)[0].match(/\d+/);
                    if (pageId) {
                        resolve(pageId);
                    }
                    reject("Page ID Not Found");
                }
                reject("Page ID Not Found");
            };
        };
        xhr.send();
    });
}

/*Check valid page url*/
function check_page_url(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest;
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 404) {
                    reject("Page Not Found");
                } else {
                    let pageName = xhr.responseText.match(/title="[^"]+"/)[0].match(/"[^"]+"/)[0].replace(/"/g, "");
                    resolve(pageName);
                }
            };
        };
        xhr.send();
    });
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

/*Wait for a set amount time*/
function wait(milliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, milliseconds);
    });
}