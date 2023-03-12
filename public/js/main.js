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

          querySnapshot.forEach((doc, index) => {
            const application = doc.data();
            console.log(application);
            console.log(`application-${index + 1}: `, document.getElementById(`application-${index + 1}`));

            // Update the content of the div with the relevant data
            document.getElementById(`application-${index + 1}`).innerText = `${application.title} at ${application.company}`;
            document.getElementById(`company-name-${index + 1}`).innerText = application.company;
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