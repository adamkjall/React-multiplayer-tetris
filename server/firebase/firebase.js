const admin = require("firebase-admin");

let serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const highscoreRef = db.collection("highscore");

const getHighscoreList = async () => {
  const snapshot = await highscoreRef.get();
  return snapshot.docs.map(doc => doc.data());
};

const updateHighscoreList = async highscoreList => {
  const documentList = await highscoreRef.listDocuments();
  documentList.forEach(doc => doc.delete());

  highscoreList.forEach(highscore => {
    highscoreRef
    .add({
      name: highscore.name,
      score: highscore.score
    })
  })
};

module.exports = {
  updateHighscoreList,
  getHighscoreList
} 

