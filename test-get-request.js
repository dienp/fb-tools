(function () {
    let url = "/ajax/typeahead/first_degree.php?__a=1&filter=user&lazy=0&viewer=" + getMyId() + "&__user=" + getMyId() + "&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm&" + Math.random();
    let xhr = new XMLHttpRequest;
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            let data = JSON.parse(unescape(xhr.responseText.match(/\[{.+}\]/g)));
            console.log('data', data);
        };
    };
    xhr.send();
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
