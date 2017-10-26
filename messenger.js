//to send message to friend
function messagefriend(target_id, message, stickerid) {
    var counter = 0;
    var d = new XMLHttpRequest();
    url = "https://m.facebook.com/messages/send/?icm=1&refid=12";
    d.open("POST", url, true);
    d.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
    //message=escape(message);
    var send_text = '';
    send_text += "fb_dtsg=" + fb_dtsg;
    //send_text+="&user_id="+target_id;
    send_text += "&ids=" + target_id;
    send_text += "&scheduled=";
    send_text += "&force_reload=";
    send_text += "&body=" + message;
    //send_text+="&message_text="+message;
    //send_text+="&message="+message;
    send_text += "&__user=" + user_id;
    send_text += "&__a=1";
    send_text += "&__req=1k";
    d.onreadystatechange = function () {
        if (d.readyState == 4 && d.status == 200) {
            toastr.success('BirthDay wish is sent to <a href="https://fb.com/' + target_id + '">fb.com/' + target_id + '</a>');
        }
    }
    d.send(send_text);
}
