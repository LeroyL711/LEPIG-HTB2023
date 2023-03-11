// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      var user = authResult.user;                            // get the user object from the Firebase authentication database
      if (authResult.additionalUserInfo.isNewUser) { //if new user
        const newUserRef = db.collection("users").doc(user.uid);

        // Create the user document
        newUserRef.set({
          name: user.displayName,
          email: user.email
        })
          .then(() => {
            // Create the applications sub-collection
            newUserRef.collection("applications");
            console.log("New user added to firestore");
            window.location.assign("main.html");
          })
          .catch(function (error) {
            console.log("Error adding new user: ", error);
          });
      } else {
        return true;
      }
      return false;

    },
    uiShown: function () {

      document.getElementById("loader").style.display = "none";
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "main.html",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '<your-tos-url>',
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start("#firebaseui-auth-container", uiConfig);
