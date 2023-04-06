// const functions = require("firebase-functions");

// import { collection, query, where, getDocs } from "firebase/firestore";
// const firestore = require("firebase-firestore")


const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.checkTrades = functions.firestore.document("/orders/{documentId}")
    .onCreate((snap, context) => {
      const newValue = snap.data().value;
      const isBid = snap.data().bidOrAsk == "bid";

      functions.logger.log("Uppercasing", context.params.documentId, isBid);

      if (isBid) {
        db.collection("orders")
            .where("bidOrAsk", "==", "ask")
            .orderBy("value", "desc")
            .limit(1)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                if (doc.data().value < newValue) {
                  doc.delete();
                  return snap.ref.delete();
                } else {
                  return null;
                }
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        return snap.ref.set({isBid}, {merge: true});
      } else {
        db.collection("orders")
            .where("bidOrAsk", "==", "bid")
            .orderBy("value", "desc")
            .limit(1)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                if (doc.data().value > newValue) {
                  doc.delete();
                  return snap.ref.delete();
                } else {
                  return null;
                }
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
        return snap.ref.set({isBid}, {merge: true});
      }
    });
