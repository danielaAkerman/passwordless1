import { User } from "lib/user"
import { Auth } from "lib/auth"


export async function findOrCreateAuth(email: string): Promise<Auth> {
    const cleanEmail = email.trim().toLowerCase()


    const auth = (await Auth.findByEmail(cleanEmail))
    // Si ya existe, devolvemos datos
    // Sino, lo creamos
    if (auth) {
        console.log("Auth encontrado")
        return auth
    } else {
        const newUser = await User.createNewUSer({
            email: cleanEmail
        })

        const newAuth = await Auth.createNewAuth({
            email: cleanEmail,
            userId: newUser.id,
            code: "",
            expires: Date.now()
        })
        return newAuth
    }
}

export async function sendCode(email: string) {

    const auth = await findOrCreateAuth(email)
    const code = Math.floor(Math.random() * 100000)
    auth.data.code = code

    const expires = (Date.now() + 1200000)
    auth.data.expires = expires

    await auth.push()

    console.log("Mail enviado a " + email + " con el código " + code)

    return true

}