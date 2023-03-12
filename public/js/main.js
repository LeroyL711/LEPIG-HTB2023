function insertNameFromFirestore() {
  // to check if the user is logged in:
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user.uid); // let me to know who is the user that logged in to get the UID
      currentUser = db.collection("users").doc(user.uid); // will to to the firestore and go to the document of the user
      currentUser.get().then(userDoc => {
        //get the user name
        var userName = userDoc.data().name;
        console.log(userName);
        document.getElementById("username").innerText = userName;
      })
    }
  })
}
insertNameFromFirestore()

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    const user = firebase.auth().currentUser;
    const userId = user.uid;
    const userRef = db.collection("users").doc(userId);

    userRef.get().then((doc) => {
      const userName = doc.data().name;
      console.log("User name:", userName);

      const applicationsRef = userRef.collection("applications");

      applicationsRef
        .orderBy("updated_date", "desc")
        .limit(3)
        .get()
        .then((querySnapshot) => {
          console.log("Retrieved applications successfully:", querySnapshot);

          let index = 0;
          querySnapshot.forEach((doc) => {
            const application = doc.data();
            console.log(doc.id);
            console.log(application);
            console.log(index);

            console.log(`application-${index + 1}: `, document.getElementById(`application-${index + 1}`));

            // Update the content of the div with the relevant data
            document.getElementById(`application-${index + 1}`).innerText = ` ${application.title} at ${application.company}`;
            document.getElementById(`company-name-${index + 1}`).innerText = application.company;
            document.getElementById(`job-title-${index + 1}`).innerText = application.title;
            document.getElementById(`job-posting-${index + 1}`).innerText = application.link;
            document.getElementById(`status-${index + 1}`).innerText = application.status;
            document.getElementById(`contact-email-${index + 1}`).innerText = application.contact_email;
            document.getElementById(`contact-number-${index + 1}`).innerText = application.contact_number;
            document.getElementById(`application-date-${index + 1}`).innerText = application.applied_date;
            document.getElementById(`last-update-time-${index + 1}`).innerText = application.updated_date;
            document.getElementById(`note-${index + 1}`).innerText = application.note;

            index++;
          });

          if (querySnapshot.empty) {
            console.log("No applications found");
          }
        })

        .catch((error) => {
          console.log("Error getting applications: ", error);
        });
    });
  }
});

//adds a close button to existing list items
var listItems = document.getElementsByTagName("li");
var i;
for (i = 0; i < listItems.length; i++) {
  var span = document.createElement("SPAN");
  var close_button = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(close_button);
  listItems[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = () => {
    this.parentElement.style.display = "none";
  }
}

var task_list = document.querySelector('ul');
task_list.addEventListener('click', function (ev) {
  if (ev.target.tagName == 'LI') {
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

}