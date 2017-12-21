let logger = new Logger()
startAutoAddFriend()

function startAutoAddFriend () {
  let maxFriends = parseInt(window.prompt('Enter how many friends you wanna add: ', '150'))
  if (isNaN(maxFriends)) {
    if (window.confirm('Invalid input value. Do you want to enter it again?') === true) {
      startAutoAddFriend()
    }
    return
  }
  console.clear()
  cleanUI()
  autoAddFriend(maxFriends)
}

async function autoAddFriend (maxFriends) {
  for (let i = 0; ; i++) {
    if (i % 5 === 0) {
      cleanTrashCards()
    }
    if (isEndOfScroll() || getAllAddButton().length >= maxFriends) {
      clickAddButtons(maxFriends)
      break
    }
    scrollToBottom()
    await wait(2000)
  }
  let leftOver = getAllAddButton()
  if (leftOver.length > 0) {
    logger.debug(`There are ${leftOver} un-clicked [Add Friend] button(s)`)
    logger.debug(`Adding again...`)
    clickAddButtons(leftOver.length)
  }
}

async function clickAddButtons (maxFriends) {
  let addBtn = getAllAddButton()
  let max = addBtn.length < maxFriends ? addBtn.length : maxFriends
  for (let i = 0; i < max; i++) {
    addBtn[i].click()
    await wait(2000)
    if (i % 2 === 0 || i === (max - 1)) {
      dismissDialogs()
    }
  }
}

function getAllAddButton () {
  let addBtn = document.body.querySelectorAll('#contentArea .addButton:not(.hidden_elem)')
  logger.info('Found ' + addBtn.length + ' "Add friend" buttons')
  return addBtn
}

function dismissDialogs () {
  let dialog = document.body.querySelectorAll('.uiLayer div[role="dialog"]:not(.uiContextualLayerBelowLeft)')
  logger.info('Found ' + dialog.length + ' dialog(s)')
  for (let i = 0; i < dialog.length; i++) {
    if (dialog[i].innerHTML.indexOf('Does This Person Know You') > 0) {
      if (dialog[i].querySelector('.layerConfirm')) {
        dialog[i].querySelector('.layerConfirm').click()
      } else {
        logger.error('Unable to dismiss dialog: ', dialog[i])
      }
    } else {
      if (dialog[i].querySelector('.layerCancel')) {
        dialog[i].querySelector('.layerCancel').click()
      } else {
        logger.error('Unable to dismiss dialog: ', dialog[i])
      }
    }
  }
  logger.info('Dismissed dialog(s).')
}

function isEndOfScroll () {
  let endScroll = document.body.querySelector('._24j')
  if (endScroll !== null) {
    return true
  }
  return false
}

/* Util Functions */
function wait (milliseconds) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve()
    }, milliseconds)
  })
}

function cleanUI () {
  let nope = document.body.querySelectorAll('#pagelet_bluebar,#pagelet_sidebar,#pagelet_dock, #toolbarContainer,#leftCol,#rightCol,#bottomContent')
  for (let i = 0; i < nope.length; i++) {
    nope[i].parentNode.removeChild(nope[i])
  }
}

function cleanTrashCards () {
  let card = document.body.querySelectorAll('._4p2o')
  for (let i = 0; i < card.length; i++) {
    if (!(card[i].innerHTML.match(/Add Friend/))) {
      card[i].parentNode.removeChild(card[i])
    }
  }
  logger.info('Cleaned trash cards.')
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

function scrollToBottom () {
  window.scrollTo(0, document.body.scrollHeight)
}
