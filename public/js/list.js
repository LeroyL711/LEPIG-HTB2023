firebase.auth().onAuthStateChanged(user => {
  if (user) {
    const userId = firebase.auth().currentUser.uid;
    const tableBody = document.getElementById('table-body');

    // clear existing rows
    tableBody.innerHTML = '';

    // retrieve all documents in the 'applications' sub-collection
    firebase.firestore().collection('users').doc(userId).collection('applications')
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log(`No documents found for user ${userId}`);
        } else {
          querySnapshot.forEach((doc) => {
            // create row for each document
            const row = document.createElement('tr');
            const data = doc.data();

            // add data to row
            row.innerHTML = `
              <td>${data.company}</td>
              <td>${data.title}</td>
              <td>${data.status}</td>
              <td>${data.updated_date}</td>
              <td><a href="/detail.html" data-id="${doc.id}">View</a></td>
            `;

            tableBody.appendChild(row);
          });
        }
      })
      .catch((error) => {
        console.error('Error retrieving documents:', error);
      });
  }
});

// add click event listener to each row of the table
const rows = document.querySelectorAll('tbody tr');
rows.forEach(row => {
  row.addEventListener('click', () => {
    // get the document ID
    const docId = row.getAttribute('data-id');
    // store the document ID in localStorage
    localStorage.setItem('docId', docId);
    // redirect to the detail page
    window.location.href = 'detail.html';
  });
});

