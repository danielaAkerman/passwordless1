import { firestore } from "./firestore";

export class User {
    collection = firestore.collection("users")
    ref: FirebaseFirestore.DocumentReference
    constructor(id) {
        this.ref = this.collection.doc(id)
    }
}