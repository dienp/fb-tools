var logger = new Logger()
start(getMax())
async function start (max) {
  let sent = getSent()
  logger.info(`Checking for status...`)
  if (sent.length === max) {
    logger.info(`Added enough friends. Application stopped.`)
    return
  }
  await addFriend(max - sent.length)
  if (isEndOfScroll()) {
    logger.info('Hit the bottom. Application stopped')
    return
  }
  start(max)
}

async function addFriend (max) {
  logger.info(`Need to add (another) ${max} friends.`)
  for (let i = 0; ; i++) {
    let notSent = getNotSent()
    logger.info(`Found ${notSent.length} add buttons`)
    if (notSent.length >= max) {
      for (let j = 0; j < max; j++) {
        notSent[j].click()
        logger.info(`Clicked ${j + 1} add button(s)`)
        await wait(2000)
        dismissDialogs()
      }
      break
    }
    scrollToBottom()
    await wait(2000)
  }
}

function getSent () {
  return document.querySelectorAll('.FriendRequestOutgoing:not(.hidden_elem)')
}

function getNotSent () {
  return document.body.querySelectorAll('.FriendRequestAdd:not(.hidden_elem)')
}

function getMax () {
  let max = parseInt(window.prompt('Enter how many friends you wanna add: ', '100'))
  if (isNaN(max)) {
    max = 100
  }
  return max
}
function scrollToBottom () {
  window.scrollTo(0, document.body.scrollHeight)
}

function wait (milliseconds) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve()
    }, milliseconds)
  })
}

function isEndOfScroll () {
  let endScroll = document.body.querySelector('._24j')
  if (endScroll !== null) {
    return true
  }
  return false
}

function dismissDialogs () {
  let dialog = document.body.querySelectorAll('.uiLayer div[role="dialog"]:not(.uiContextualLayerBelowLeft)')
  for (let i = 0; i < dialog.length; i++) {
    if (dialog[i].innerHTML.indexOf('Does This Person Know You') > 0) {
      if (dialog[i].querySelector('.layerConfirm')) {
        dialog[i].querySelector('.layerConfirm').click()
      }
    } else {
      if (dialog[i].querySelector('.layerCancel')) {
        dialog[i].querySelector('.layerCancel').click()
      }
    }
  }
  logger.info('Dismissed dialog(s).')
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
