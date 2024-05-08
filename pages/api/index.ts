import type { NextApiRequest, NextApiResponse } from "next"
import { firestore } from "lib/firestore"

export default async function (req: NextApiRequest, res: NextApiResponse) {


    const newUser = await firestore.collection('auth').add({
        email: "danielaakerman14@gmail.com"
    })
    res.send(newUser)


}