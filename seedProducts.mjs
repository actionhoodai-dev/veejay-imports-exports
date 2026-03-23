import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAg8ZNzAxCuoESMYZtyqMiMDjk46M8NKPM",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "veejay-import-export.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "veejay-import-export",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "veejay-import-export.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "896800907409",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:896800907409:web:c5aa4443d68d0e04ba9f30",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-W81GFJC5H6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const productList = [
  "Red Chilli", "Green chilli", "Turmeric", "Cumin", "Coriander", "Ginger", "Black Pepper", 
  "Cardamom", "Fenugreek", "Fennel", "Garlic", "Nutmeg and mace", "Cloves", "Mustard seeds", "Cinnamon", "Bay leaf",
  "Semi husked coconut", "Processed coconut products", "Tender coconut", "Dry copra coconut",
  "Coir matt & rugs", "Cocopeat blocks", "Coir yarn & fiber rolls",
  "Brown sugar", "Cane sugar", "White sugar", "Organic sugar", "Jaggery",
  "Clothing lifestyle list in exports", "Home & lifestyle texttiles", "Apparal & Garments", "Sarees",
  "Sago", "Nylon Sago", "Roasted Sago",
  "Granitites", "Iron & Steel materials",
  "Mangoes", "Grapes", "Bananas", "Apples", "Oranges", "Papaya", "Guava", "Litchi", "Avocados", 
  "Sapota (chikoo)", "Watermelons", "Promogranate",
  "Tomatoes", "Potatoes", "Cabbage", "Cauliflower", "Okra (lady's finger)", "Beans", "Spinach", "Cucumber", "Onion", "Onions",
  "Appalam / Pappad", "Cereals & Pulses", "Rice varieties", "Toor Dhall"
];

async function seedMissingProducts() {
  console.log("Authenticating as admin...");
  try {
    await signInWithEmailAndPassword(auth, "temp_admin@veejay.com", "password123");
    console.log("Authenticated successfully.");
  } catch(e) {
    console.log("Failed to auth. Run seed_runner.html if credentials changed.");
    process.exit(1);
  }

  console.log("Checking existing products...");
  const snapshot = await getDocs(collection(db, "products"));
  const existingTitles = snapshot.docs.map(doc => doc.data().title?.trim().toLowerCase());
  
  let addedCount = 0;

  for (const title of productList) {
    if (!existingTitles.includes(title.toLowerCase())) {
      console.log(`Adding missing product: ${title}`);
      await addDoc(collection(db, "products"), {
        title,
        category: "Export Category",
        shortDesc: `Premium export quality ${title}`,
        richDesc: `Experience the finest grade ${title} sourced directly from verified Indian networks.`,
        imageUrl: "",
        timestamp: new Date()
      });
      addedCount++;
    }
  }

  console.log(`Successfully synced! Total new products added: ${addedCount}`);
  process.exit(0);
}

seedMissingProducts().catch(console.error);
