function fetch_url() {
    var request = new Request('https://davidwalsh.name/users.json', {
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        headers: new Headers({
            'Content-Type': 'text/plain'
        })
    });
    fetch(request)
        .then(function (response) {
            return response.json();
        }).then(function (jsonData) {
            console.log(jsonData);
        }).catch(function (err) {
            console.log("Opps, Something went wrong!", err);
        })
}
