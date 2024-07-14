import type { NextApiRequest, NextApiResponse } from "next"
import { generate } from "lib/jwt";
import { Auth } from "lib/auth";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { email, code } = req.body
    const auth = await Auth.findByEmailAndCode(email, code)
    if (!auth) {
        res.status(401).send({ message: "Email o código incorrecto" })
    }

    const isCodeValid = auth.isCodeValid()
    if (!isCodeValid) {
        res.status(401).send({ message: "Código expirado" })
    }

    const token = generate({ userId: auth.data.userId })

    res.send({token})
}