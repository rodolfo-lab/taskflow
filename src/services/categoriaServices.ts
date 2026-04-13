import { ErroValidacao } from '../errors/errorValIdacao'
import { ICategoria } from '../models/categoriaModelo'
import { CategoriaRepository } from '../repositories/categoriaRepository'
import { TarefaRepository } from '../repositories/tarefaRepository'
import { AutorizacaoService } from './autorizacaoServices'

const categoriaRepository = new CategoriaRepository()
const autorizacaoService = new AutorizacaoService()
const tarefaRepository = new TarefaRepository()

export class CategoriaService {

    async criarCategoria(nome: string, usuarioId: string, tokenId: string): Promise<ICategoria> {

        if (!nome || !usuarioId)
            throw new ErroValidacao('Nome e ID do usuário são obrigatórios para criar uma categoria')

        await autorizacaoService.buscarUsuarioAutorizado(tokenId, usuarioId)
        const categoria = await categoriaRepository.buscarPorNome(nome, usuarioId)

        if (categoria) {
            throw new ErroValidacao('Categoria já existe para este usuário')
        }

        try {

            const novaCategoria = await categoriaRepository.criar({ nome, usuarioId })

            if (novaCategoria && novaCategoria.id) {
                return await categoriaRepository.buscarPorId(novaCategoria.id) as ICategoria
            }

            throw new ErroValidacao('Erro ao criar categoria')
        } catch {
            throw new ErroValidacao('Erro ao criar categoria')
        }

    }

    async listaDeCategorias(tokenId: string) {
        try {
            return await categoriaRepository.listarTodos(tokenId)
        } catch (error) {
            throw new ErroValidacao('Erro ao listar categorias')
        }
    }

    async obterCategoriaPorId(id: string, tokenId: string): Promise<ICategoria | null> {

        const categoria = await categoriaRepository.buscarPorId(id)
        await autorizacaoService.buscarCategoriaAutorizada(tokenId, id)

        try {
            return categoria
        } catch {
            throw new ErroValidacao('Categoria não encontrada')
        }
    }

    async atualizarCategoria(id: string, dados: any, tokenId: string) {

        await autorizacaoService.buscarCategoriaAutorizada(tokenId, id)
        dados.dataAlteracao = Date()

        try {
            await categoriaRepository.atualizar(id, dados)
        } catch {
            throw new ErroValidacao('Erro ao atualizar categoria')
        }

    }

    async deletarCategoria(id: string, tokenId: string) {

        await autorizacaoService.buscarCategoriaAutorizada(tokenId, id)

        if (await tarefaRepository.buscarPorIdCategoria(id)) {
            throw new ErroValidacao('falha ao deletar categoria, existem tarefas associadas' )
        }

        try {
            await categoriaRepository.deletar(id)
        } catch (error) {
            if (error instanceof ErroValidacao) {
                throw error
            }
            throw new ErroValidacao('Erro ao deletar categoria')
        }
    }

}