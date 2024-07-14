import type { NextApiRequest, NextApiResponse } from "next"
import { parseToken } from "./parse-token"
import { decode } from "./jwt"

export function authMiddleware(callback) {
    return function (req: NextApiRequest, res: NextApiResponse) {
        
        const token = parseToken(req)
        
        if (!token) {
            res.status(401).send({ message: "Token incorrectooooooooooo" })
        }

        const decodedToken = decode(token)

        if (decodedToken) {
            callback(req, res, decodedToken)
        } else {
            res.status(401).send({ message: "Falló decodificar token" })
        }


    }
}

        // Acá podría leer el iat del token, para hacerlo caducar
        // Depende si queremos que la persona esté logueada para siempre