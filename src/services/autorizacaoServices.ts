import { Response, Request } from "express"

export function UsuarioAutorizado(tokenId: string, externoid: string, res: Response): boolean {

    if (!(externoid === tokenId)){
        res.status(401).json({erro: 'Acesso negado'})
        return false

    }
    return true
}