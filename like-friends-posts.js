function start_like_friend_post() {
    like_friend_post();
}

async function like_friend_post() {
    let myId = getMyId();
    let fb_dtsg = getFBToken();
    let arrPostId = [];
    let waitTime = 2000;
    let arrUId = await get_friend_uid(myId);
    console.log('arrUId', arrUId);
    //let the100 = shuffle(arrUId).slice(0, 99);
    //console.log('the100', the100);
    console.log("----Getting your friends most recent posts...");
    let no = -1;
    for (let id of arrUId) {
        console.log("---" + (++no) + "---Getting " + id + " most recent post...");

        await get_friend_post(id).then(({
            postId,
            requestTime
        }) => {
            if (requestTime >= waitTime) {
                wait(0)
                    .then((time) => {
                        console.log('requestTime', requestTime);
                        console.log('waitedTime', time);
                        send_like_request(myId, postId, fb_dtsg)
                    });
            } else {
                wait(waitTime - requestTime)
                    .then((time) => {
                        console.log('requestTime', requestTime);
                        console.log('waitedTime', time);
                        send_like_request(myId, postId, fb_dtsg)
                    });
            }
        });
    }
    alert("Done like_friend_post.");
}
/*Async functions*/
async function get_friend_uid(myId) {
    return new Promise(function (resolve, reject) {
        console.log("Getting your friends UIDs...");
        let request = new XMLHttpRequest;
        let arrId = [];
        request.open("GET", "/ajax/typeahead/first_degree.php?__a=1&filter[0]=user&lazy=0&viewer=" + myId + "&__user=" + myId + "&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm", true);
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                let data = JSON.parse(unescape(request.responseText.match(/\[{.+}\]/g)));
                console.log('data', data);
                data.forEach(function (el, i) {
                    arrId.push(el.uid);
                });
                resolve(arrId);
            };
        };
        request.send();
    });
}

async function get_friend_post(uid) {
    return new Promise(function (resolve, reject) {
        let start_time = new Date().getTime();
        let arrPostId = [];
        let request = new XMLHttpRequest;
        request.open("GET", "https://www.facebook.com/" + uid, true);
        request.onreadystatechange = function () {
            if (this.readyState == 4) {
                let text = request.responseText.match(/"ft_ent_identifier"\svalue="\d+"/g);
                if (text === null) {
                    resolve([]);
                } else {
                    /*for (let i = 0; i < text.length; i++) {
                        let postId = text[i].match(/\d+/g)[0];
                        arrPostId.push(postId);
                    };*/
                    let request_time = new Date().getTime() - start_time;
                    let postId = text[0].match(/\d+/g)[0];
                    resolve({
                        postId: postId,
                        requestTime: request_time
                    });
                }
            };
        };
        request.send();
    })
}

async function send_like_request(myId, postId, fb_dtsg) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest;
        let reactionType = Math.floor(Math.random() * 2) + 1;
        let params = `ft_ent_identifier=${postId}&reaction_type=${reactionType}&__user=${myId}&fb_dtsg=${fb_dtsg}&__req=1k&__a=1`;
        xhr.open("POST", "/ufi/reaction/?dpr=1", true); /* Request header content-type */
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (reactionType === 1) {
                    console.log(`------------Liked ${postId} status ${this.status}`);
                } else {
                    console.log(`------------Loved ${postId} status ${this.status}`);
                }
                resolve();
            };
        };
        xhr.send(params);
    })

}

/*Util functions*/
async function wait(miliseconds) {
    return new Promise(function (resolve, reject) {
        let start_time = new Date().getTime();
        setTimeout(function () {
            resolve(new Date().getTime() - start_time);
        }, miliseconds);
    })
}

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

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
start_like_friend_post()
