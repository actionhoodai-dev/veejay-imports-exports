const firebase = require('firebase/app');
require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyAg8ZNzAxCuoESMYZtyqMiMDjk46M8NKPM",
  authDomain: "veejay-import-export.firebaseapp.com",
  projectId: "veejay-import-export",
  storageBucket: "veejay-import-export.firebasestorage.app",
  messagingSenderId: "896800907409",
  appId: "1:896800907409:web:c5aa4443d68d0e04ba9f30"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

async function seed() {
    console.log("Starting database seeding...");

    // 1. Seed Categories
    const categories = ["Spices", "Fabrics"];
    for (const cat of categories) {
        await db.collection('categories').add({ name: cat });
        console.log(`Added Category: ${cat}`);
    }

    // 2. Seed Products
    const products = [
        {
            title: "Sarees",
            category: "Fabrics",
            shortDesc: "Authentic handloom. Forever the Finest.",
            richDesc: "Our collection features the finest premium fabrics, known for exceptional durability, luxurious weight, and intricate detailing and craftsmanship.",
            imageUrl: "https://images.unsplash.com/photo-1610030469983-4338573fc068?q=80&w=600"
        },
        {
            title: "Black Pepper",
            category: "Spices",
            shortDesc: "The King of Spices. Bold and aromatic.",
            richDesc: "Our black pepper is larger than standard black pepper, with a more complex, citrusy, and floral flavor profile. We export only the highest Extra Bold grade.",
            imageUrl: "https://images.unsplash.com/photo-1599818804364-0aa8f8e0a300?q=80&w=600"
        },
        {
            title: "Cardamom",
            category: "Spices",
            shortDesc: "Queen of Spices. Extra bold premium pods.",
            richDesc: "Our cardamom is sourced directly from premium plantations, ensuring the highest volatile oil content and the most vibrant natural green color without any dyes.",
            imageUrl: "https://images.unsplash.com/photo-1621841957884-a210fe158c3f?q=80&w=600"
        },
        {
            title: "Turmeric",
            category: "Spices",
            shortDesc: "The Golden Spice. High curcumin value.",
            richDesc: "Our Curcuma Longa is world-renowned for its brilliant yellow color and high curcumin content. We process it using low-temperature grinding.",
            imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d019cb0?q=80&w=600"
        }
    ];

    for (const prod of products) {
        await db.collection('products').add({ 
            ...prod, 
            timestamp: firebase.firestore.FieldValue.serverTimestamp() 
        });
        console.log(`Added Product: ${prod.title}`);
    }

    console.log("Seeding Completed Successfully!");
    process.exit(0);
}

seed().catch(console.error);
