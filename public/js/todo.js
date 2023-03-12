// var listItems = document.getElementsByTagName("li");
// var i;
// for (i = 0; i < listItems.length; i++) {
//   var span = document.createElement("SPAN");
//   var close_button = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(close_button);
//   listItems[i].appendChild(span);
// }

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

var task_list = document.querySelector('ul');
task_list.addEventListener('click', function (ev) {
  if (ev.target.tagName == 'li') {
    ev.target.classList.toggle('checked');
  }
}, false);

function newListItem() {
  var taskItem = document.createElement("li");
  var taskToAdd = document.getElementById("new-tasks").value;
  var text = document.createTextNode(taskToAdd);
  taskItem.appendChild(text);
  if (taskToAdd === '') {
    alert("Please enter a task!");
  } else {
    document.getElementById("my-tasks").appendChild(taskItem);
  }
  document.getElementById("new-tasks").value = ""; //clears text field

  var span = document.createElement("span");
  var close_button = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(close_button);
  taskItem.appendChild(span);
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }

}