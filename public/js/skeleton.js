//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            console.log('User is signed in');
            $('#afterlogin').load('./text/nav_after_login.html', function(response, status, xhr) {
                console.log('Loaded afterlogin navbar:', status);
                if (status == 'error') {
                    console.log('Error loading afterlogin navbar:', xhr.status, xhr.statusText);
                }
            });
        } else {
            // No user is signed in.
            console.log('No user is signed in');
            $('#beforelogin').load('./text/nav_before_login.html', function(response, status, xhr) {
                console.log('Loaded beforelogin navbar:', status);
                if (status == 'error') {
                    console.log('Error loading beforelogin navbar:', xhr.status, xhr.statusText);
                }
            });
        }
        $('#footerPlaceholder').load('./text/footer.html', function(response, status, xhr) {
            console.log('Loaded footer:', status);
            if (status == 'error') {
                console.log('Error loading footer:', xhr.status, xhr.statusText);
            }
        });
    });
}

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
  
  