function get_pending_friend_request_ids() {
    a = new XMLHttpRequest();
    a.open("GET", "/friends/requests/outgoing/more/?page=1&page_size=5000&pager_id=outgoing_reqs_pager_5586f2e3ba8949a98558844&__user=100006014373688&__a=1", true);
    a.onreadystatechange = function () {
        if (a.readyState == 4) {
           console.log(a.responseText);
        }
    }
    a.send();
}
get_pending_friend_request_ids();
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


https://www.facebook.com/friends/requests/outgoing/more/?page=1&page_size=5000&pager_id=outgoing_reqs_pager_5586f2e3ba8949a98558844&__user=100006014373688&__a=1