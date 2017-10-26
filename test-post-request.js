(function () {
    let url = "https://www.facebook.com/ajax/bz";
    let xhr = new XMLHttpRequest;
    let params = `__user=${getMyId()}&fb_dtsg=${getFBToken}&__req=1k&__a=1`;
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log('this.response', this.response);
            console.log('this.statusText', this.status);
        };
    };
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
    xhr.send(params);
})();

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
