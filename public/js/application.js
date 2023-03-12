
function createApplication() {
  console.log("inside write review")
  let Company = document.getElementById("company").value;
  let Title = document.getElementById("job-title").value;
  let Link = document.getElementById("link").value;
  let Status = document.querySelector("status").options[document.querySelector("status").selectedIndex.value];
  let Location = document.getElementById("job-location").value;
  let Applied = document.getElementById("date-applied").value;
  let Applied = document.getElementById("date-applied").value;;
  console.log(Title, Level, Season, Description, Flooded, Scrambled);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid)
      var userID = user.uid;
      //get the document for current user.
      currentUser.get()
        .then(userDoc => {
          var userEmail = userDoc.data().email;
          db.collection("reviews").add({
            hikeDocID: hikeDocID,
            userID: userID,
            title: Title,
            level: Level,
            season: Season,
            description: Description,
            flooded: Flooded,
            scrambled: Scrambled,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          }).then(() => {
            window.location.href = "thanks.html"; //new line added
          })
        })
    } else {
      console.log("No user is signed in");
      window.location.href = 'application.html';
    }
  });
}