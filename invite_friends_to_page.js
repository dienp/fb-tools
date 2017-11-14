
/*Wait for a set amount time*/
function wait(milliseconds) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, milliseconds);
    });
}


function invite_friends_like_page(){

}

function send_invite(friendId,pageId){
    return new Promise(function (resolve, reject) {
        let url  = `https://www.facebook.com/ajax/pages/invite/send_single/?dpr=1`;       
        let xhr = new XMLHttpRequest;
        let params = `page_id=${pageId}&invitee=${friendId}
        &action=send&is_send_in_messenger=false&__user=${getMyId()}&__a=1&fb_dtsg=${getFBToken()}`;
        xhr.open("POST", url, true); /* Request header content-type */
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                logger.info("");
                resolve();
            };
        };
        xhr.send(params);
    });
}

/*Get your friends UIDs*/
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