// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";
import { WriteFileData } from "./filehander.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
var uploadBtn = document.getElementById('uploadBtn')
var file = document.getElementById('file')
var uploading = document.getElementById('uploading')


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

// function writeUserData(userId, name, email, imageUrl) {
//     const db = getDatabase();
//     set(ref(db, 'users/' + userId), {
//       username: name,
//       email: email,
//       profile_picture : imageUrl
//     });
//   }


function setDisable(bool){
    uploadBtn.disabled = bool
    file.disabled = bool

}


uploadBtn.addEventListener('click', (e)=>{
    uploading.style.display = "block"
    uploading.innerHTML = "Uploading..."
    setDisable(true)
    if (file.files[0]){
        var storageRef = ref(storage, file.files[0].name)
        
        
        uploadBytes(storageRef, file.files[0]).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            getDownloadURL(storageRef).then(url=>{
                
                WriteFileData(Date.now(),file.files[0].name, url)
                
               
            })
            alert("upload successfully")
            uploading.innerHTML = "Upload successfully"
            setTimeout(() => {
                uploading.style.display = "none"
                setDisable(false)
                
            },1000);
            
                    
        });
        
    }else{
        uploading.style.display = "none"
        setDisable(false)
    }
     
})



