import type { NextApiRequest, NextApiResponse } from "next"
import { Auth } from "lib/auth"
import { User } from "lib/user"
import { findOrCreateAuth } from "lib/controllers/auth"
import { sendCode } from "lib/controllers/auth"

export default async function (req: NextApiRequest, res: NextApiResponse) {

    const auth = await sendCode(req.body.email)
    // const auth = await findOrCreateAuth(req.body.email)

    res.send(auth)

}