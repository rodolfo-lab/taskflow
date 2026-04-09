import type { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function autenticar(req: any, res: Response, next: NextFunction) {
    
    const authHeader = req.headers.authorization

    if (!authHeader) 
        return res.status(401).json({ erro: 'Token não fornecido' })

        
    const token = authHeader.split(' ')[1].trim()

    if (!token) 
        return res.status(401).json({ erro: 'Token inválido' })

    try {        
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string, email: string }

        req.user = payload
        next()
    } catch {
        return res.status(403).json({ erro: 'Token inválido ou expirado' })
    }
}