debugger
var notSent = document.body.querySelectorAll('.FriendRequestAdd:not(.hidden_elem)')
var deleted = 0
for (let i = 0; i < notSent.length; i++) {
  let parent = notSent[i].closest('._4p2o')
  if (parent) {
    deleted++
    parent.parentNode.removeChild(parent)
  }
  if (deleted === 5) {
    break
  }
}
