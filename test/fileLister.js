import { getDatabase,ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";


const firebaseConfig = {
    apiKey: "AIzaSyDobzNg3pD0GntHIcWNKQJjR2gmtU0cwFw",
    authDomain: "fifthyearinfo.firebaseapp.com",
    projectId: "fifthyearinfo",
    storageBucket: "fifthyearinfo.appspot.com",
    messagingSenderId: "626309577999",
    appId: "1:626309577999:web:ffac209eb1df5b97c7127a",
    measurementId: "G-MDTCV87DD4",
    databaseURL: "https://fifthyearinfo-default-rtdb.firebaseio.com/"
  };
const app = initializeApp(firebaseConfig)



function createRow(filename,url){
    var label = document.createElement('label')
    label.innerHTML = filename
    var link = document.createElement('a')
    link.innerHTML = "download"
    link.href = url
    
    var file_container = document.createElement('div')
    file_container.className = "file-container"
    file_container.append(label, link)

    var container = document.getElementById('fileListcontainer')
    container.append(file_container)

}



const db = getDatabase(app);
const dbRef = ref(db, 'files');

onValue(dbRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      //const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      createRow(childData.filename,childData.url)
      
      // ...
    });
  }, {
    onlyOnce: true
  });
    
    



