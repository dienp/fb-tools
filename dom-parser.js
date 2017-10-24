(function () {
    parser = new DOMParser();
    var url = "https://www.facebook.com/search/me/non-friends/me/friends/friends/intersect";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            debugger;
            var doc = parser.parseFromString(xhr.responseText, "text/html");
            let contentArea = doc.getElementById('contentArea');
            let addBtn = content.querySelectorAll('.addButton:not(.hidden_elem)');
            console.log(doc.body);
        }
    }
    xhr.send();
})();
