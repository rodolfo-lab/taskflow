import { erroValidacaoComMensagem } from '../errors/errorHandling'
import { CategoriaRepository } from '../repositories/categoriaRepository'
import { UsuarioService } from './usuarioService'

const categoriaRepository = new CategoriaRepository()
const usuarioService = new UsuarioService()

export class CategoriaService {

    async criarCategoria(nome: string, usuarioId: string): Promise<void> {

        try {
            if (!nome || !usuarioId)
                throw new Error('Nome e ID do usuário são obrigatórios para criar uma categoria')

            await usuarioService.obterUsuarioPorId(usuarioId)
            await categoriaRepository.criar({nome, usuarioId})
        } catch (error) {
            throw new Error('Erro ao criar categoria')
        }

    }
        

    async listaDeCategorias() {
        return await categoriaRepository.listarTodos()
    }

    async obterCategoriaPorId(id: string) {
        const categoria = await categoriaRepository.buscarPorId(id)
        if (!categoria){
            throw new Error('Categoria não encontrada')
        }

        return categoria
    }

    async atualizarCategoria(id: string, dados: any) {
        
        dados.dataAlteracao = Date()
        await categoriaRepository.atualizar(id, dados)

    }

    async deletarCategoria(id: string) {

        const categoria = await this.obterCategoriaPorId(id)
        const usuario = usuarioService.obterUsuarioPorId(String(categoria.usuarioId))

        if (!usuario)
            return
        await categoriaRepository.deletar(id)
    }
}