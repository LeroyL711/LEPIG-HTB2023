// get the document ID from localStorage
const docId = localStorage.getItem('docId');

// fetch the data for the document
const docRef = db.collection('users').doc(userId).collection('applications').doc(docId);
docRef.get().then(doc => {
  if (doc.exists) {
    // display the data in the form
    const data = doc.data();
    // ...
  } else {
    console.log('Document not found');
  }
}).catch(error => {
  console.log('Error getting document:', error);
});

// add click event listener to edit button
const editBtn = document.getElementById('edit-btn');
editBtn.addEventListener('click', () => {
  // redirect to the edit page with the document ID in the URL
  window.location.href = `edit.html?docId=${docId}`;
});

// add click event listener to save button
const saveBtn = document.getElementById('save-btn');
saveBtn.addEventListener('click', () => {
  // save the changes to the document
  // ...
});


