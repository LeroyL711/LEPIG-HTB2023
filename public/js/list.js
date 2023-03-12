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
              <td><a href="/detail.html">View</a></td>
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
const table = document.querySelector('table');
document.addEventListener('DOMContentLoaded', () => {
  const rows = document.querySelectorAll('tr');
  rows.forEach(row => {
    console.log('Adding click event listener to row:', row);
    row.addEventListener('click', () => {
      let params = new URL(window.location.href) //get the url from the search bar
      let ID = params.searchParams.get("docID");
      localStorage.setItem('docId', ID);
      window.location.href = 'detail.html';
    }
    );
  });
});
