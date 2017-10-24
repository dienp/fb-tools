/*Like a specific post*/
function likeAPost() {
    var postId = prompt("Post Id:", "Enter post Id"); /* Get user id */
    var user_id = '';
    if (document.cookie.match(/c_user=(\d+)/)) {
        if (document.cookie.match(/c_user=(\d+)/)[1]) {
            user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1])
        };
    }; /* Get facebook csrf token */
    var fb_dtsg = '';
    if (window.location.pathname.match("/pokes")) {
        try {
            fb_dtsg = document.documentElement.innerHTML.match(/,\{"token":"\(.\*\?\)"/g)[0].replace(',\{"token":"', '').replace('"', '');
        } catch (e) { /* handle error */ };
    } else {
        try {
            if (document.getElementsByName("fb_dtsg")) {
                if (document.getElementsByName("fb_dtsg")[0]) {
                    fb_dtsg = document.getElementsByName("fb_dtsg")[0].value;
                }
            }
        } catch (e) { /* handle error */ };
    }; /* Reaction types */
    var reaction = {
        "like": 1,
        "love": 2,
        "haha": 3,
        "wow": 4,
        "sad": 5,
        "angry": 6
    }; /* Target post Id */
    var xhr = new XMLHttpRequest; /* Request body */
    var params = `ft_ent_identifier=${postId}&reaction_type=${reaction.love}&__user=${user_id}&fb_dtsg=${fb_dtsg}&__req=1k&__a=1`;
    xhr.open("POST", "/ufi/reaction/?dpr=1", true); /* Request header content-type */
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log(this.responseText);
        };
    };
    xhr.send(params);
};


/*Export friends UIDs to csv*/
function exportUIDs() {
    var user_id = '';
    if (document.cookie.match(/c_user=(\d+)/)) {
        if (document.cookie.match(/c_user=(\d+)/)[1]) {
            user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1])
        };
    };
    var xmlhttp = new XMLHttpRequest;
    xmlhttp.open("GET", "/ajax/typeahead/first_degree.php?__a=1&filter[0]=user&lazy=0&viewer=" + user_id + "&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm", true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            var json = JSON.parse(unescape(xmlhttp.responseText.match(/\[{.+}\]/g)));
            console.log('json', json);
            var JSONData = [];
            json.forEach(function (el, i) {
                var object = `{"UID":"id=${el.uid}","Full name":"${el.text}","Profile page":"https://www.fb.com${el.path}"}`;
                JSONData.push(JSON.parse(object));
            });
            var ReportTitle = "Friend_List";
            var ShowLabel = true;
            var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
            var CSV = "";
            CSV += ReportTitle + escape('\r\n\n');
            if (ShowLabel) {
                var row = "";
                for (var index in arrData[0]) {
                    row += index + ',';
                }
                row = row.slice(0, -1);
                CSV += row + escape('\r\n');
            }
            for (var i = 0; i < arrData.length; i++) {
                var row = "";
                for (var index in arrData[i]) {
                    row += '' + unescape(arrData[i][index]) + ',';
                }
                row.slice(0, row.length - 1);
                CSV += row + escape('\r\n');
            }
            if (CSV == '') {
                alert("Invalid data");
                return;
            }
            var fileName = "";
            fileName += ReportTitle.replace(/ /g, "_");
            var uri = 'data:text/csv;charset=utf-8,﻿' + CSV;
            var link = document.createElement("a");
            link.href = uri;
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
    };
    xmlhttp.send();
}
