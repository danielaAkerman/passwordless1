export function parseToken(req) {

    const ubicaciónBearerToken = req.rawHeaders.indexOf("Authorization") + 1
    const BearerTokenHeader = (req.rawHeaders[ubicaciónBearerToken]).split(" ")
    const token = BearerTokenHeader[1]

    return token

}