//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here.
            $('#afterlogin').load('./nav_after_login.html', function () {
                console.log("After login navbar loaded successfully.");
            });
            $('#footerPlaceholder').load('./footer.html', function (response, status, xhr) {
                console.log('Loaded footer:', status);
                if (status == 'error') {
                    console.log('Error loading footer:', xhr.status, xhr.statusText);
                }
            });
        } else {
            // No user is signed in.
            $('#beforelogin').load('./nav_before_login.html', function () {
                console.log("Before login navbar loaded successfully.");
            });
            $('#beforelogin').load('./footer_before_login.html', function (response, status, xhr) {
                console.log('Loaded footer:', status);
                if (status == 'error') {
                    console.log('Error loading footer:', xhr.status, xhr.statusText);
                }
            });
        }
        if ($('#beforelogin').length) {
            $('#beforelogin').load('./nav_before_login.html', function() {
                console.log("Before login navbar loaded successfully.");
            });
        }
    });
}
loadSkeleton(); // Invoke the function


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

