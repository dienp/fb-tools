function fetch_url(url) {
    var request = new Request(url, {
        method: 'GET',
        mode: 'no-cors',
        redirect: 'follow',
        headers: new Headers({
            'Content-Type': 'text/plain'
        })
    });
    fetch(request)
        .then(function (response) {
            console.log(response);
        }).catch(function (err) {
            console.log("Opps, Something went wrong!", err);
        });
}
fetch_url("https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1&filter[0]=user&lazy=0&viewer=" + 100006014373688 + "&__user=" + 100006014373688 + "&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm");
