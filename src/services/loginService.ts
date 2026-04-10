import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { ErroAutorizacao } from '../errors/errorAutorizacao'
import { UsuarioService } from './usuarioService'

const usuarioService = new UsuarioService()

export class LoginService {

    async login(email: string, senha: string) {

        const usuario = await usuarioService.obterUsuarioPorEmail(email)

        if (!usuario)
            throw new ErroAutorizacao('Login inválido - Usuário/senha incorretos')

        const senhaValida = await bcrypt.compare(senha, usuario.senha)

        if (!senhaValida)
            throw new ErroAutorizacao('Login inválido - Usuário/senha incorretos')

        const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET!, { expiresIn: '1d' })
        return { token:token , usuarioId: usuario.id }
    }
}