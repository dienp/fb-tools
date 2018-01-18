/* Tool is used for unfriending mutuals of a certain friend of yours */
function start2018 () {
  const specialArray = ['100023645207948']
}

function getMutuals () {
  let arr = []
  let list = document.querySelectorAll('#pagelet_timeline_medley_friends .uiProfileBlockContent a[data-hovercard-prefer-more-content-show="1"]')
  for (let i = 0; i < list.length; i++) {
    if (list[i].dataset.gt) {
      arr.push({
        name: list[i].innerText,
        id: JSON.parse(list[i].dataset.gt).engagement.eng_tid
      })
    }
  }
  console.log(arr)

  return arr
}

function unfriend (friendId) {

}

function filterArray (specialArray, normalArray) {
  for (let i = 0; i < specialArray.length; i += 1) {
    let index = normalArray.indexOf(specialArray[i])
    if (index > -1) {
      normalArray.splice(index, 1)
    }
  }
}
