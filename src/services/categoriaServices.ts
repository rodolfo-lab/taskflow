import { erroValidacaoComMensagem } from '../errors/errorHandling'
import { CategoriaRepository } from '../repositories/categoriaRepository'
import { UsuarioService } from './usuarioService'
import type { Response } from 'express'

const categoriaRepository = new CategoriaRepository()
const usuarioService = new UsuarioService()

export class CategoriaService {

    async criarCategoria(nome: string, usuarioId: string, res: Response) {

        const usuario = usuarioService.obterUsuarioPorId(usuarioId, res)
        if(!usuario)
            return 

        if (!nome || !usuarioId){
            erroValidacaoComMensagem(res, 'Nome e usuário são obrigatórios')
            return
        }
        
        return await categoriaRepository.criar({nome, usuarioId})
    }

    async listaDeCategorias() {
        return await categoriaRepository.listarTodos()
    }

    async obterCategoriaPorId(id: string, res: Response) {
        const categoria = await categoriaRepository.buscarPorId(id)
        if (!categoria){
            erroValidacaoComMensagem(res, 'Categoria não encontrada')
            return {}
        }

        return categoria
    }

    async atualizarCategoria(id: string, dados: any, res: Response) {
        
        dados.dataAlteracao = Date()
        const categoria = await categoriaRepository.atualizar(id, dados)
        
        if (!categoria){
            erroValidacaoComMensagem(res, 'Erro ao atualizar categoria')
            return
        }

        return categoria
    }

    async deletarCategoria(id: string, res: Response) {

        const categoria = await this.obterCategoriaPorId(id, res) as {usuarioId: 0}

        const usuario = usuarioService.obterUsuarioPorId(String(categoria.usuarioId), res)

        if (!usuario)
            return
        await categoriaRepository.deletar(id)
    }
}