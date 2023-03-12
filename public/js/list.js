function addApplicationItem(name, company, position, status, id) {
  const applicationItem = document.createElement('li');
  applicationItem.innerHTML = `
    <div class="application-name">${company}</div>
    <div class="application-company">${title}</div>
    <div class="application-position">${location}</div>
    <div class="application-status">${status}</div>
  `;

  // Add a unique identifier attribute to the HTML element
  applicationItem.setAttribute('data-id', id);

  const tabId = getTabIdFromStatus(status);
  const tabContent = document.getElementById(tabId);
  const list = tabContent.querySelector('ul');
  list.appendChild(applicationItem);
}


const applicationsRef = firebase.firestore().collection('applications');

applicationsRef.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    console.log('Data:', data);
    
    const listItem = document.createElement('li');
    listItem.textContent = `${data.Title} at ${data.Company}`;
    
    const status = data.Status;
    console.log('Status:', status);
    
    const tabId = getTabIdFromStatus(status);
    console.log('Tab Id:', tabId);
    
    const tabContent = document.getElementById(tabId);
    console.log('Tab Content:', tabContent);
    
    const list = tabContent.querySelector('ul');
    console.log('List:', list);
    
    list.appendChild(listItem);
  });
});

function getTabIdFromStatus(status) {
  switch (status) {
    case 'Preparing': return 'tab2';
    case 'Submitted': return 'tab3';
    case 'Shortlisted': return 'tab4';
    case 'Negotiating': return 'tab5';
    case 'Offered': return 'tab6';
    case 'Declined': return 'tab7';
    default: return 'tab1'; 
  }
}

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
  const tabcontents = document.querySelectorAll('.tabcontent');
  tabcontents.forEach(tabcontent => {
    tabcontent.style.display = 'none';
  });

  const tablinks = document.querySelectorAll('.tablinks');
  tablinks.forEach(tablink => {
    tablink.classList.remove('active');
  });

  const tabcontent = document.querySelector(`#${tabId}`);
  tabcontent.style.display = 'block';

  event.currentTarget.classList.add('active');
}
