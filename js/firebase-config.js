// Firebase Configuration and Initialization
const firebaseConfig = {
  apiKey: "AIzaSyAg8ZNzAxCuoESMYZtyqMiMDjk46M8NKPM",
  authDomain: "veejay-import-export.firebaseapp.com",
  projectId: "veejay-import-export",
  storageBucket: "veejay-import-export.firebasestorage.app",
  messagingSenderId: "896800907409",
  appId: "1:896800907409:web:c5aa4443d68d0e04ba9f30",
  measurementId: "G-W81GFJC5H6"
};

// Cloudinary Configuration
const cloudinaryConfig = {
  cloudName: "dppteyryz",
  apiKey: "936535518599649",
  apiSecret: "FEmVGtZO0t_50AiqgC9-bhC9__Q"
};

// Initialize variables inside scope if loaded after SDKs
let app, auth, db, analytics;

// We will use standard ES Modules if type="module", or compat scripts
function initFirebase() {
  if (typeof firebase !== 'undefined') {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    if (typeof firebase.analytics !== 'undefined') {
      analytics = firebase.analytics();
    }
  }
}
