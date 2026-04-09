import type { Request, Response } from 'express'
import { UsuarioService } from '../services/usuarioService'
import { erroValidacaoComMensagem } from '../errors/errorHandling'
import { authorizationInfoRequest } from '../tools/authorizationInfoRequest'
import { UsuarioAutorizado } from '../services/autorizacaoServices'

const usuarioService = new UsuarioService()

async function novoUsuario(req: Request, res: Response) {

    const usuarioId = await usuarioService.criarUsuario(req.body.nome, req.body.email, req.body.senha)
        res.status(201).json({ header: `api/v1/usuarios/${usuarioId}` })

}

async function obterListaUsuarios(req: Request, res: Response) {

        const usuarios = await usuarioService.listarUsuarios()
        res.status(200).json(usuarios)

}

async function obterUsuarioPorId(req: authorizationInfoRequest, res: Response) {

        if (!UsuarioAutorizado(req.user.id, String(req.params.id), res))
            return
        const usuario = await usuarioService.obterUsuarioPorId(String(req.params.id))
        res.status(200).json(usuario)

}

async function atualizarUsuario(req: authorizationInfoRequest, res: Response) {

        if (!UsuarioAutorizado(req.user.id, String(req.params.id), res))
            return
        const usuario = await usuarioService.atualizarUsuario(String(req.params.id), req.body)
        res.status(200).json(usuario)

}

async function deletarUsuario(req: authorizationInfoRequest, res: Response) {

        if (!UsuarioAutorizado(req.user.id, String(req.params.id), res))
            return

        await usuarioService.deletarUsuario(String(req.params.id))
        res.status(204).json('Usuario deletado com sucesso')

}

export { novoUsuario, obterListaUsuarios, obterUsuarioPorId, atualizarUsuario, deletarUsuario }