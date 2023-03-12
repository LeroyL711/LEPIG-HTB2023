
$(document).ready(function () {
  $("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".dropdown-menu li").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

function addApplicationItem(name, company, position, status, id) {
  const applicationItem = document.createElement('li');
  applicationItem.innerHTML = `
    <div class="application-name">${name}</div>
    <div class="application-company">${company}</div>
    <div class="application-position">${position}</div>
    <div class="application-status">${status}</div>
  `;

  // Add a unique identifier attribute to the HTML element
  applicationItem.setAttribute('data-id', id);

  applicationList.appendChild(applicationItem);
}


// Load the user's applications from Firestore
function loadApplicationsFromFirestore() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      db.collection('users').doc(user.uid).collection('applications').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { name, company, position, status } = doc.data();
          addApplicationItem(name, company, position, status, doc.id);
        });
      }).catch((error) => {
        console.error("Error loading applications from Firestore: ", error);
      });
    }
  });
}

