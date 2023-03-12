const urlParams = new URLSearchParams(window.location.search);
const docId = urlParams.get('docID');
let applicationRef;
// get a reference to the "users" collection
firebase.firestore().collection("users").get()
  .then(querySnapshot => {
    querySnapshot.forEach(userDoc => {
      firebase.firestore().collection("users").doc(userDoc.id).collection("applications").doc(docId).get()
        .then(applicationDoc => {
          if (applicationDoc.exists) {
            // get the user ID
            const userId = userDoc.id;
            console.log(`User ID: ${userId}`);
            // get a reference to the application document
            applicationRef = db.collection("users").doc(userId).collection("applications").doc(docId);

            // Retrieve the existing data from the document
            applicationRef.get().then((doc) => {
              if (doc.exists) {
                const existingData = doc.data();
                console.log("Existing data:", doc.data());

                // Use the existing data to populate the form
                document.getElementById("company-editview").value = existingData.company;
                document.getElementById("job-title-editview").value = existingData.title;
                document.getElementById("link-editview").value = existingData.link;
                // get the dropdown element by ID
                const statusDropdown = document.getElementById("status-editview");
                let selectedStatusIndex = Array.from(statusDropdown.options).findIndex(option => option.value === existingData.status);
                statusDropdown.selectedIndex = selectedStatusIndex;

                document.getElementById("job-location-editview").value = existingData.location;
                document.getElementById("date-applied-editview").value = existingData.applied_date;
                document.getElementById("date-updated-editview").value = existingData.updated_date;
                document.getElementById("note-editview").value = existingData.note;
                document.getElementById("job-description-editview").value = existingData.job_description;
                document.getElementById("contact-email-editview").value = existingData.contact_email;
                document.getElementById("contact-number-editview").value = existingData.contact_number;
              } else {
                console.log("No such document!");
              }
            })
              .catch(error => {
                console.log("Error getting application document:", error);
              });
          };
        })
        .catch(error => {
          console.log("Error getting users:", error);
        });
    })

  });

// add click event listener to edit button

function updateApplication() {
  let Company = document.getElementById("company-editview").value;
  let Title = document.getElementById("job-title-editview").value;
  let Link = document.getElementById("link-editview").value;
  let statusDropdown = document.getElementById("status-editview"); // get the dropdown element by ID
  let selectedStatusIndex = statusDropdown.selectedIndex; // get the index of the selected option
  let Status = statusDropdown.options[selectedStatusIndex].value; // get the value of the selected option
  let Location = document.getElementById("job-location-editview").value;
  let Applied = document.getElementById("date-applied-editview").value;
  let Updated = document.getElementById("date-updated-editview").value;;
  let Note = document.getElementById("note-editview").value;;
  let Description = document.getElementById("job-description-editview").value;;
  let Email = document.getElementById("contact-email-editview").value;;
  let Number = document.getElementById("contact-number-editview").value;;
  const newData = {
    company: Company,
    title: Title,
    link: Link,
    status: Status,
    location: Location,
    applied_date: Applied,
    updated_date: Updated,
    note: Note,
    job_description: Description,
    contact_email: Email,
    contact_number: Number
  };
  applicationRef.update(newData)
    .then(() => {
      alert("Application successfully updated!");
      window.location.href = 'list.html';
    })
    .catch((error) => {
      console.error('Error updating document: ', error);

    });
}

function handleFormUpdate(event) {
  event.preventDefault();
  updateApplication();
}

document.getElementById('update-btn-editview').addEventListener('click', handleFormUpdate);
