start_cancel_outgoing_request();

function start_cancel_outgoing_request() {
    cancel_outgoing_request();
}

async function cancel_outgoing_request() {
    let fb_dtsg = getFBToken();
    let myId = getMyId();
    let friends = await get_pending_friend_outgoing_request_ids(myId);
    console.log(friends.length);
    for (let i = 0; i < friends.length; i++) {
        send_cancel_outgoing_request(myId, friends[i], fb_dtsg);
    }
}

function get_pending_friend_outgoing_request_ids(myId) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `/friends/requests/outgoing/more/?page=1&page_size=5000&pager_id=outgoing_reqs_pager_5586f2e3ba8949a98558844&__user=${myId}&__a=1`, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                let data = JSON.parse(unescape(xhr.responseText.match(/\[{.+}\]/g)));
                let arrId = [];
                data.forEach(function (el, i) {
                    arrId.push(el.uid);
                });
                resolve(arrId);
            }
        }
        xhr.send();
    });
}

function send_cancel_outgoing_request(myId, friendId, fb_dtsg) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        let url = "https://www.facebook.com/ajax/friends/requests/cancel.php?dpr=1";
        let params = `friend=${friendId}&cancel_ref=outgoing_requests&__user=${myId}&__a=1&_fb_dtsg=${fb_dtsg}&confirmed=1`;
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                console.log(`Sent cancel request to ${friendId} (${xhr.status})`);
                resolve();
            }
        }
        xhr.send(params);
    });

}

function wait(miliseconds) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, miliseconds);
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