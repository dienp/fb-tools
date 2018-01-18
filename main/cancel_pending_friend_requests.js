var logger = new Logger()

start(1000)

/* Start the application, $size determines how many outgoing requests will be cancel */
async function start (size) {
  let token = getToken()
  let user = getUserId()
  /* Pause application and wait for getPending() is done */
  let friends = await getPending(getUserId(), size).then((data) => {
    return data
  }).catch((error) => {
    logger.error(error)
  })
  if (friends.length === 0) {
    window.alert('No pending outgoing request found. Application stopped.')
    return
  }
  for (let i = 0; i < friends.length; i++) {
    /* Pause application and wait until cancelRequest() is done */
    await cancelRequest(user, friends[i].match(/\d+/)[0], token).then((response) => {
      logger.info(response)
    }).catch((error) => {
      logger.error(error)
    })
    /* Pause application for x millisecond(s) */
    await wait(2000)
  }
  window.alert('Done')
}

/* Get pending outgoing request(s) */
function getPending (user, size) {
  return new Promise((resolve, reject) => {
    let url = `/friends/requests/outgoing/more/?page=1&page_size=${size}&pager_id=outgoing_reqs_pager_5a3e76a99ad4e6951982620&dpr=1&__user=${user}&__a=1`
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        if (xhr.responseText.match(/profileid=\\"\d+\\"/g)) {
          resolve(xhr.responseText.match(/profileid=\\"\d+\\"/g))
        } else {
          resolve([])
        }
      }
    }

    xhr.send()
  })
}

/* Cancel one outgoing pending request */
function cancelRequest (user, friend, token) {
  return new Promise((resolve, reject) => {
    let params = `friend=${friend}&cancel_ref=outgoing_requests&__user=${user}&__a=1&fb_dtsg=${token}&confirmed=1`
    let xhr = new XMLHttpRequest()
    xhr.open('POST', '/ajax/friends/requests/cancel.php?dpr=1', true)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=utf-8')
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        resolve(`Canceled request to ${friend}`)
      }
    }
    xhr.send(params)
  })
}

function getUserId () {
  let myId = null
  if (document.cookie.match(/c_user=(\d+)/)) {
    if (document.cookie.match(/c_user=(\d+)/)[1]) {
      myId = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1])
      return myId
    }
  } else {
    myId = window.prompt('ID not found in cookies, please enter it manually: ', '')
    return myId
  }
}

function getToken () {
  let fb = null
  if (window.location.pathname.match('/pokes')) {
    try {
      fb = document.documentElement.innerHTML.match(/,\{"token":"\(.\*\?\)"/g)[0].replace(',\{"token":"', '').replace('"', '')
      return fb
    } catch (e) {
      logger.error(e)
    };
  } else {
    try {
      if (document.getElementsByName('fb_dtsg')) {
        if (document.getElementsByName('fb_dtsg')[0]) {
          fb = document.getElementsByName('fb_dtsg')[0].value
          return fb
        }
      }
    } catch (e) {
      logger.error(e)
    };
  };
}

function Logger () {
  this.info = function (message) {
    console.log('[INFO][' + getTime() + ']: ' + message)
  }
  this.error = function (message) {
    console.error('[ERROR][' + getTime() + ']: ' + message)
  }
}

function getTime () {
  return (new Date()).toUTCString()
}

function wait (milliseconds) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve()
    }, milliseconds)
  })
}
