// get the document ID from localStorage
const docId = localStorage.getItem('docId');
// get a reference to the "users" collection
const usersRef = db.collection("users");

// perform a query to search for the document that contains the application ID
usersRef.where(`applications.${docId}`, '!=', null).get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // get the user ID
      const userId = doc.id;
      console.log(`User ID: ${userId}`);
      // get a reference to the application document
      const applicationRef = doc.ref.collection("applications").doc(docId);
      // Retrieve the existing data from the document
      applicationRef.get().then((doc) => {
        if (doc.exists) {
          const existingData = doc.data();
          // Use the existing data to populate the form
          document.getElementById("company-editview").value = existingData.company;
          document.getElementById("job-title-editview").value = existingData.title;
          document.getElementById("link-editview").value = existingData.link;
          document.getElementById("status-editview"); // get the dropdown element by ID
          let selectedStatusIndex = statusDropdown.selectedIndex; // get the index of the selected option
          statusDropdown.options[selectedStatusIndex].value = existingData.status; // get the value of the selected option
          document.getElementById("job-location-editview").value = existingData.location;
          document.getElementById("date-applied-editview").value = existingData.applied_date;
          document.getElementById("date-updated-editview").value = existingData.updated_date;;
          document.getElementById("note-editview").value = existingData.note;;
          document.getElementById("job-description-editview").value = existingData.job_description;;
          document.getElementById("contact-email-editview").value = existingData.contact_email;;
          document.getElementById("contact-number-editview").value = existingData.contact_number;;

        } else {
          console.log("No such document!");
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    });
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });

// add click event listener to edit button
const updateBtn = document.querySelector('#update-btn-editview');
updateBtn.addEventListener('click', () => {
  const newData = {
  };
  applicationRef.update(newData)
    .then(() => {
      console.log('Document updated successfully!');
    })
    .catch((error) => {
      console.error('Error updating document: ', error);
    });
});



