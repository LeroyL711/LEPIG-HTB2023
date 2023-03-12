
function createApplication() {
  console.log("inside createApplication")
  let Company = document.getElementById("company").value;
  let Title = document.getElementById("job-title").value;
  let Link = document.getElementById("link").value;
  let statusDropdown = document.getElementById("status"); // get the dropdown element by ID
  let selectedStatusIndex = statusDropdown.selectedIndex; // get the index of the selected option
  let Status = statusDropdown.options[selectedStatusIndex].value; // get the value of the selected option
  let Location = document.getElementById("job-location").value;
  let Applied = document.getElementById("date-applied").value;
  let Updated = document.getElementById("date-updated").value;;
  let Note = document.getElementById("note").value;;
  let Description = document.getElementById("job-description").value;;


  console.log(Company, Title, Link, Status, Location, Applied, Updated, Note);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid)
      var userID = user.uid;
      //get the document for current user.
      currentUser.get()
        .then(userDoc => {
          var userEmail = userDoc.data().email;
          db.collection("users").doc(user.uid).collection("applications").doc().set({
            company: Company,
            title: Title,
            link: Link,
            status: Status,
            location: Location,
            applied_date: Applied,
            updated_date: Updated,
            note: Note,
            job_description: Description
            // }).then(() => {
            //   window.location.href = "/list.html";
          })
          console.log("application added/updated to firestore");
        })
    } else {
      console.log("No user is signed in");
      window.location.href = '/application.html';
    }
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
  createApplication();
}
document.getElementById('update-btn').addEventListener('click', handleFormSubmit);

// pop up message after submitting the application
var reDirectBtn = document.getElementById("update-btn");
reDirectBtn.addEventListener("click", function(){
  window.alert("your form successfully saved");
  window.location.href="main.html";
});
