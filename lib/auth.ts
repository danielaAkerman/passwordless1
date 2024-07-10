import { firestore } from "./firestore";

const collection = firestore.collection("auth")

export class Auth {
    ref: FirebaseFirestore.DocumentReference
    data: any;
    id: string

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

    static async findByEmail(email: string) {
        // No pertenece a una instancia, pertenece a la clase
        // Quiero que este método me genere una instancia a la clase
        // genera una nueva instancia de auth

        const cleanEmail = email.trim().toLowerCase()
        const results = await collection.where('email', '==', cleanEmail).get()
        if (results.docs.length) {
            const first = results.docs[0]
            const newAuth = new Auth(first.id)
            newAuth.data = first.data()
            return newAuth

        } else { return null }
    }

    static async createNewAuth(data) {
        const newUserSnap = await collection.add(data)
        const newUSer = new Auth(newUserSnap.id)
        newUSer.data = data
        return newUSer
    }
}

// Esta Clase representa a un solo user (con id)