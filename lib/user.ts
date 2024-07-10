import { firestore } from "./firestore";

const collection = firestore.collection("users")

export class User {
    ref: FirebaseFirestore.DocumentReference
    data: any;
    id: string;

    constructor(id) {
        this.id = id
        this.ref = collection.doc(id)
    }

    async pull() {
        const snap = await this.ref.get()
        this.data = snap.data()
    }

    async push() {
        this.ref.update(this.data)
    }

    static async createNewUSer(data) {
        const newUserSnap = await collection.add(data)
        const newUSer = new User(newUserSnap.id)
        newUSer.data = data
        return newUSer
    }
}

// Esta Clase representa a un solo user (con id)