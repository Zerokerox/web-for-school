
import { getDatabase,ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";





function WriteFileData( id,filename ,url) {
    const db = getDatabase();
    
    set(ref(db, 'files/' + id), {
      filename: filename,
      url: url,
    });
  }

export{WriteFileData}



