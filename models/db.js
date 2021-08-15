var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://clink-63080-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

var connectedRef = admin.database().ref(".info/connected");
  connectedRef.on("value", (snap) => {
    if (snap.val() === true) {
      console.log("Connected to Database");
    } else {
      console.log("Not Connected to Database");
    }
});

var model = {

    getUsers: async () => {

        const users = await db.collection("users").get();
        users.forEach((doc) => {
            console.log(doc.id, '=>', doc.data(doc));
        });

    }
    

}

module.exports = model;