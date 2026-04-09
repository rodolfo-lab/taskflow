import type { Request, Response } from 'express'
import { CategoriaService } from '../services/categoriaServices'
import { erroValidacaoComMensagem, tratarErroParaJson } from '../errors/errorHandling'
import { authorizationInfoRequest } from '../tools/authorizationInfoRequest'

const categoriaService = new CategoriaService()

export async function novaCategoria(req: authorizationInfoRequest, res: Response) {
    
        const categoria = await categoriaService.criarCategoria(req.body.nome, req.body.usuarioId)
        res.status(201).json(categoria)

}

export async function obterCategorias(req: Request, res: Response) {

    try {
        const categorias = await categoriaService.listaDeCategorias()
        res.status(200).json(categorias)

    } catch (error: any) {
        erroValidacaoComMensagem(res, tratarErroParaJson( error ))
    }
}

export async function obterCategoriaPorId(req: Request, res: Response) {

    try {
        const categoria = await categoriaService.obterCategoriaPorId(String(req.params.id))
        if (!categoria)
            return
        res.status(200).json(categoria)

    } catch (error: any) {
        erroValidacaoComMensagem(res, tratarErroParaJson( error ))
    }
}

export async function atualizarCategoria(req: Request, res: Response) {

    try {
        const categoria = await categoriaService.atualizarCategoria(String(req.params.id), req.body)
        res.status(200).json('Categoria atualizada com sucesso')

    } catch (error: any) {
        erroValidacaoComMensagem(res, tratarErroParaJson( error ))
    }
}

export async function deletarCategoria(req: authorizationInfoRequest, res: Response) {

    try {
        await categoriaService.deletarCategoria(String(req.params.id))
        res.status(204).json('Categoria deletada com sucesso')

    } catch (error: any) {
        erroValidacaoComMensagem(res, tratarErroParaJson( error ))
    }
}