test_post_comment()

function test_post_comment () {
  let comment = 'OK5'
  let postId = '112956032803094'
  let stickerId = '488541281259317' // mugsy under the rain
    // let myId = getMyId();
  let myId = '100006014373688' // ptdien id
    // let fb_dtsg = getFBToken();
  let fb_dtsg = 'AQG4BGaar_wg:AQED9VE5ElWE'// ptdien fb_dtsg
  send_post_comment(comment, stickerId, postId, myId, fb_dtsg)
}

function send_post_comment (comment, stickerId, postId, myId, fb_dtsg) {
  let xhr = new XMLHttpRequest()
  let url = `/ufi/add/comment/?dpr=1`
  let params = ''
    // Post Id
  params += `ft_ent_identifier=${postId}&`
    // Comment text
  params += `comment_text=${comment}&`
    // Sticker id
  params += `attached_sticker_fbid=${stickerId}&`
  params += `attached_photo_fbid=0&`
  params += `attached_video_fbid=0&`
  params += `client_id=1:1&`
  params += `__user=${myId}&`
  params += `__a=1&`
  params += `source=1&`
  params += `fb_dtsg=${fb_dtsg}`

  xhr.open('POST', url, true)
  document.cookie = `c_user=${myId}`
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8')
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      console.log(`Status = ${xhr.status}`)
    }
  }
  xhr.send(params)
}

function getMyId () {
  let myId = null
  if (document.cookie.match(/c_user=(\d+)/)) {
    if (document.cookie.match(/c_user=(\d+)/)[1]) {
      myId = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1])
      return myId
    }
  } else {
    myId = prompt('ID not found in cookies, please enter it manually: ', '')
    return myId
  }
}

function getFBToken () {
  let fb_dtsg = null
  if (window.location.pathname.match('/pokes')) {
    try {
      fb_dtsg = document.documentElement.innerHTML.match(/,\{"token":"\(.\*\?\)"/g)[0].replace(',\{"token":"', '').replace('"', '')
      return fb_dtsg
    } catch (e) {
      logger.error(e)
    };
  } else {
    try {
      if (document.getElementsByName('fb_dtsg')) {
        if (document.getElementsByName('fb_dtsg')[0]) {
          fb_dtsg = document.getElementsByName('fb_dtsg')[0].value
          return fb_dtsg
        }
      }
    } catch (e) {
      logger.error(e)
    };
  };
}
