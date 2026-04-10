import type { Request, Response } from 'express'
import { UsuarioService } from '../services/usuarioService'
import { authorizationInfoRequest } from '../tools/authorizationInfoRequest'

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
    const usuario = await usuarioService.obterUsuarioPorId(String(req.params.id), req.user.id)
    res.status(200).json(usuario)
}

async function atualizarUsuario(req: authorizationInfoRequest, res: Response) {
    const usuario = await usuarioService.atualizarUsuario(String(req.params.id), req.body, req.user.id)
    res.status(200).json(usuario)
}

async function deletarUsuario(req: authorizationInfoRequest, res: Response) {
    await usuarioService.deletarUsuario(String(req.params.id), req.user.id)
    res.status(204).json('Usuario deletado com sucesso')
}

export { novoUsuario, obterListaUsuarios, obterUsuarioPorId, atualizarUsuario, deletarUsuario }