import type { Request, Response } from 'express'
import { CategoriaService } from '../services/categoriaServices'
import { authorizationInfoRequest } from '../tools/authorizationInfoRequest'

const categoriaService = new CategoriaService()

export async function novaCategoria(req: authorizationInfoRequest, res: Response) {
    const categoria = await categoriaService.criarCategoria(req.body.nome, req.body.usuarioId, req.user.id)
    res.status(201).json(categoria)
}

export async function obterCategorias(req: authorizationInfoRequest, res: Response) {
    const categorias = await categoriaService.listaDeCategorias(req.user.id)
    res.status(200).json(categorias)
}

export async function obterCategoriaPorId(req: authorizationInfoRequest, res: Response) {
    const categoria = await categoriaService.obterCategoriaPorId(String(req.params.id), req.user.id)
    res.status(200).json(categoria)
}

export async function atualizarCategoria(req: authorizationInfoRequest, res: Response) {
    const categoria = await categoriaService.atualizarCategoria(String(req.params.id), req.body, req.user.id)
    res.status(200).json('Categoria atualizada com sucesso')
}

export async function deletarCategoria(req: authorizationInfoRequest, res: Response) {
    await categoriaService.deletarCategoria(String(req.params.id), req.user.id)
    res.status(204).json('Categoria deletada com sucesso')
}