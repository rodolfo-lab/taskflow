import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Usuario } from '../models/usuario'
import { erroValidacaoComMensagem } from '../errors/errorHandling'

export async function login(req: Request, res: Response) {
    try {
        const { email, senha } = req.body
        const usuario = await Usuario.findOne({ email })

        if (!usuario) 
            return erroValidacaoComMensagem(res, {error: 'Login inválido - Usuário/senha incorretos' })

        const senhaValida = await bcrypt.compare(senha, usuario.senha)

        if (!senhaValida) 
            return erroValidacaoComMensagem(res, {error: 'Login inválido - Usuário/senha incorretos'})

        const token = jwt.sign({ id: usuario._id, email: usuario.email }, process.env.JWT_SECRET!, { expiresIn: '1d' })
        res.status(200).json({ token })

    } catch (error: any) {
        erroValidacaoComMensagem(res, error.message)
    }
}