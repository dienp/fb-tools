start_fetch_url();


function start_fetch_url() {
    var friend_id = "100006014373688";
    send_add_friend_request(friend_id);
}


function send_add_friend_request(friend_id) {

    var params = `to_friend=${friend_id}&action=add_friend&__user=${getMyId()}&__a=1&fb_dtsg=${getFBToken()}&link_data[gt][type]=xtracking&link_data[gt][xt]=48.{"event":"add_friend","intent_status":null,"intent_type":null,"profile_id":${friend_id},"ref":1}&link_data[gt][profile_owner]=${friend_id}`;
    console.log('params', params);
    let xhr = new XMLHttpRequest;
    xhr.open("POST", "https://www.facebook.com/ajax/add_friend/action.php?dpr=1", true);
    /* Request header content-type */
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log(this.responseText);
        };
    };
    xhr.send(params);
}


function getMyId() {
    let myId = null;
    if (document.cookie.match(/c_user=(\d+)/)) {
        if (document.cookie.match(/c_user=(\d+)/)[1]) {
            myId = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1])
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
