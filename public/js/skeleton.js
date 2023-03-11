//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here.
            $('#afterlogin').load('/text/nav_after_login.html', function() {
                console.log("After login navbar loaded successfully.");
            });
        } else {
            // No user is signed in.
            $('#beforelogin').load('/text/nav_before_login.html', function() {
                console.log("Before login navbar loaded successfully.");
            });
        }
    });
    if ($('#beforelogin').length) {
        $('#beforelogin').load('/text/nav_before_login.html', function() {
            console.log("Before login navbar loaded successfully.");
        });
    }
}
loadSkeleton(); //invoke the function

//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
      }).catch((error) => {
        // An error happened.
      });
  }
  
  