(function () {
    let url = prompt("Enter url: ", "");
    let xhr = new XMLHttpRequest;
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            console.log('this.response', this.response);
            console.log('this.statusText', this.status);
        };
    };
    xhr.send();
})();
