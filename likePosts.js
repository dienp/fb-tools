    (function () {
        let posts = [];
        let user_id = '';
        if (document.cookie.match(/c_user=(\d+)/)) {
            if (document.cookie.match(/c_user=(\d+)/)[1]) {
                user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1])
            };
        };
        let xmlhttp = new XMLHttpRequest;
        xmlhttp.open("GET", "/ajax/typeahead/first_degree.php?__a=1&filter[0]=user&lazy=0&viewer=" + user_id + "&__user=" + user_id + "&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm", true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                let json = JSON.parse(unescape(xmlhttp.responseText.match(/\[{.+}\]/g)));
                console.log('Total Friends: ', json.length);
                json.forEach(function (el, i) {
                    getRecentPosts(el.uid);
                });
                console.log("Total Posts: ", posts.length);
                likeRecentPosts(user_id, posts);
            };
        };
        xmlhttp.send();

        function getRecentPosts(userId) {
            let xhr = new XMLHttpRequest;
            xhr.open("GET", "https://www.facebook.com/" + userId, true);
            xhr.onreadystatechange = function () {
                if (this.readyState == 4) {
                    let text = xhr.responseText.match(/"ft_ent_identifier"\svalue="\d+"/g);
                    for (let i = 0; i < text.length; i++) {
                        let postId = text[i].match(/\d+/g);
                        posts.push(postId[0]);
                    };
                };
            };
            xhr.send();
        }

        function likeRecentPosts(userId, posts) {
            let fb_dtsg = '';
            if (window.location.pathname.match("/pokes")) {
                try {
                    fb_dtsg = document.documentElement.innerHTML.match(/,\{"token":"\(.\*\?\)"/g)[0].replace(',\{"token":"', '').replace('"', '');
                } catch (e) {
                    console.log("Error: ", e);
                };
            } else {
                try {
                    if (document.getElementsByName("fb_dtsg")) {
                        if (document.getElementsByName("fb_dtsg")[0]) {
                            fb_dtsg = document.getElementsByName("fb_dtsg")[0].value;
                        }
                    }
                } catch (e) {
                    console.log("Error: ", e);
                };
            };
            /* Reaction types */
            let reaction = {
                "like": 1,
                "love": 2
            };
            let postNo = -1;
            let likeBot = setInterval(function () {
                let postId = posts[++postNo];
                console.log('postId', postId);
                let xhr = new XMLHttpRequest;
                /* Request body */
                let params = `ft_ent_identifier=${postId}&reaction_type=${reaction.like}&__user=${userId}&fb_dtsg=${fb_dtsg}&__req=1k&__a=1`;
                xhr.open("POST", "/ufi/reaction/?dpr=1", true); /* Request header content-type */
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
                xhr.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        console.log(`LIKE postId ${postId} of userId ${userId} with status ${this.status}`);
                    };
                };
                xhr.send(params);
            }, 2000)

        }

    })();
