import type { NextApiRequest, NextApiResponse } from "next"
import { parseToken } from "lib/parse-token"
import { decode } from "lib/jwt"
import { User } from "lib/user"
import {authMiddleware} from "lib/middlewares"


async function handler(req: NextApiRequest, res: NextApiResponse, token) {
    console.log("el token es ", token)
    const user = new User(token.userId)
    await user.pull()
    res.send(user.data)
}




export default authMiddleware(handler)