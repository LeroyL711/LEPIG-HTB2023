
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

function openTab(event, tabId) {
  // Declare variables
  var i, tabcontent, tablinks;

  // Get all tab content elements and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all tab links and remove the active class
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the selected tab content and mark the corresponding tab link as active
  document.getElementById(tabId).style.display = "block";
  event.currentTarget.className += " active";

  // Retrieve documents based on the selected tab's id
  if (tabId === "tab1") {
    // All documents
    db.collection("applications").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { name, company, position, status } = doc.data();
        addApplicationItem(name, company, position, status, doc.id);
      });
    }).catch((error) => {
      console.error("Error loading applications from Firestore: ", error);
    });
  } else {
    // Documents with matching status
    const status = document.getElementById(tabId).getAttribute("data-tab-id");
    db.collection("applications").where("status", "==", status).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { name, company, position, status } = doc.data();
        addApplicationItem(name, company, position, status, doc.id);
      });
    }).catch((error) => {
      console.error("Error loading applications from Firestore: ", error);
    });
  }
}

// function populateApplications() {
//   let listTemplate = document.getElementById("applicationTemplate");

//   let params = new URL(window.location.href) //get the url from the searbar
//   let listID = params.searchParams.get("docID")
  
//   // doublecheck: is your collection called "Reviews" or "reviews"?
//   db.collection("applications").where( "usersD", "==", listID).get()
//       .then(allApplications => {
//           applications=allApplications.docs;
//           console.log(applications);
//           applications.forEach(doc => {
//               var company = doc.data().company; //gets the name field

//               let reviewCard = hikeCardTemplate.content.cloneNode(true);
//               reviewCard.querySelector('.title').innerHTML = title;     //equiv getElementByClassName
//               reviewCard.querySelector('.time').innerHTML = new Date(time).toLocaleString();    //equiv getElementByClassName
//               reviewCard.querySelector('.level').innerHTML = `level: ${level}`;
//               reviewCard.querySelector('.season').innerHTML = `season: ${season}`;
//               reviewCard.querySelector('.scrambled').innerHTML = `scrambled: ${scrambled}`;  //equiv getElementByClassName
//               reviewCard.querySelector('.flooded').innerHTML = `flooded: ${flooded}`;  //equiv getElementByClassName
//               reviewCard.querySelector('.description').innerHTML = `Description: ${description}`;
//               hikeCardGroup.appendChild(reviewCard);
//           })
//       })
// }
// function populateApplications();


