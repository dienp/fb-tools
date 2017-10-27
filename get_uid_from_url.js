javascript: (function () {
    start_get_get_uid_from_url();

    function start_get_get_uid_from_url() {
        let url = prompt("Enter URL:", "");
        if (!url) {
            if (confirm("Invalid URL, do you want to continue?") == true) {
                start_get_get_uid_from_url();
            };
            return;
        };
        get_uid_from_url(url);
    }

    function get_uid_from_url(url) {
        let xhr = new XMLHttpRequest;
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    let uid = xhr.responseText.match(/"entity_id":"\d+"/)[0].match(/\d+/);
                    alert(uid);
                } else {
                    if (confirm("Invalid URL, do you want to continue?") == true) {
                        start_get_get_uid_from_url();
                    };
                    return;
                };
            };
        };
        xhr.send();
    }
})();
