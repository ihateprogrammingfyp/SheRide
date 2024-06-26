const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // Ensure this path is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-database-name.firebaseio.com' // Replace with your Firebase database URL
});

const db = admin.firestore();
module.exports = { admin, db };
