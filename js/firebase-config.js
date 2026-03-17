// Dynamic Configuration Loader (Compatible with local static and Vercel .env)

const localFirebaseConfig = {
  apiKey: "AIzaSyAg8ZNzAxCuoESMYZtyqMiMDjk46M8NKPM",
  authDomain: "veejay-import-export.firebaseapp.com",
  projectId: "veejay-import-export",
  storageBucket: "veejay-import-export.firebasestorage.app",
  messagingSenderId: "896800907409",
  appId: "1:896800907409:web:c5aa4443d68d0e04ba9f30",
  measurementId: "G-W81GFJC5H6"
};

const localCloudinaryConfig = {
  cloudName: "dppteyryz",
  apiKey: "936535518599649",
  apiSecret: "FEmVGtZO0t_50AiqgC9-bhC9__Q"
};

let firebaseConfig = localFirebaseConfig;
let cloudinaryConfig = localCloudinaryConfig;
let app, auth, db, analytics;

async function initFirebase() {
  if (typeof firebase !== 'undefined') {
    try {
      // Avoid 404 console error warning on local static server during development
      const isLocal = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1');

      if (!isLocal) {
        const res = await fetch('/api/config');
        if (res.ok) {
          const env = await res.json();
          // Overwrite only if Vercel actually returned valid config values
          if (env.firebaseConfig && env.firebaseConfig.apiKey) firebaseConfig = env.firebaseConfig;
          if (env.cloudinaryConfig && env.cloudinaryConfig.cloudName) cloudinaryConfig = env.cloudinaryConfig;
        }
      }
    } catch (e) {
      console.log("Using static local configuration fallbacks.");
    }

    // Initialize with loaded config
    if (!firebase.apps.length) {
      app = firebase.initializeApp(firebaseConfig);
      auth = firebase.auth();
      db = firebase.firestore();
    } else {
      app = firebase.app();
    }
  }
}
