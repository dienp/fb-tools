
start_send_add_request();

function start_send_add_request() {
    let friendId = "100002766573206";
    let myId = getMyId();
    let fb_dtsg = getFBToken();
    send_add_request(friendId, myId, fb_dtsg);
}



function send_add_request(friendId, myId, fb_dtsg) {
    let xhr = new XMLHttpRequest;
    let url = `https://www.facebook.com/ajax/add_friend/action.php?dpr=1`;
    let params = `to_friend=${friendId}&action=add_friend&how_found=profile_button&ref_param=none&link_data[gt][type]=xtracking&link_data[gt][xt]=48.%7B%22event%22%3A%22add_friend%22%2C%22intent_status%22%3Anull%2C%22intent_type%22%3Anull%2C%22profile_id%22%3A${friendId}%2C%22ref%22%3A1%7D&__user=${myId}&__a=1&fb_dtsg=${fb_dtsg}`;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");    
    xhr.send(params);
}


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