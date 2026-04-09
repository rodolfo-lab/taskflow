import type { Request, Response } from 'express'
import { UsuarioService } from '../services/usuarioService'
import { erroValidacaoComMensagem } from '../errors/errorHandling'
import { authorizationInfoRequest } from '../tools/authorizationInfoRequest'
import { UsuarioAutorizado } from '../services/autorizacaoServices'

const usuarioService = new UsuarioService()

export async function novoUsuario(req: Request, res: Response) {

    try {
        const usuario = await usuarioService.criarUsuario(req.body.nome, req.body.email, req.body.senha, res)
        if(!usuario)
            return
        res.status(201).json({ header: `api/v1/usuarios/${usuario.id}` })

    } catch (error: any) {
        erroValidacaoComMensagem(res, error.message)
    }
}

export async function obterListaUsuarios(req: Request, res: Response) {

    try {
        const usuarios = await usuarioService.listarUsuarios()
        res.status(200).json(usuarios)

    } catch (error: any) {
        erroValidacaoComMensagem(res, error.message)
    }
}

export async function obterUsuarioPorId(req: authorizationInfoRequest, res: Response) {

    try {
        if (!UsuarioAutorizado(req.user.id, String(req.params.id), res))
            return
        const usuario = await usuarioService.obterUsuarioPorId(String(req.params.id), res)
        
        if (!usuario)
            return
        
        res.status(200).json(usuario)

    } catch (error: any) {
        erroValidacaoComMensagem(res, error.message)
    }
}

export async function atualizarUsuario(req: authorizationInfoRequest, res: Response) {

    try {
        if (!UsuarioAutorizado(req.user.id, String(req.params.id), res))
            return
        const usuario = await usuarioService.atualizarUsuario(String(req.params.id), req.body, res)
        res.status(200).json(usuario)

    } catch (error: any) {
        erroValidacaoComMensagem(res, error.message)
    }
}

export async function deletarUsuario(req: authorizationInfoRequest, res: Response) {

    try {
        if (!UsuarioAutorizado(req.user.id, String(req.params.id), res))
            return

        await usuarioService.deletarUsuario(String(req.params.id), res)
        res.status(204).send()

    } catch (error: any) {
        erroValidacaoComMensagem(res, error.message)
    }
}