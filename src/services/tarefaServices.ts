import { erroValidacaoComMensagem } from '../errors/errorHandling'
import { TarefaRepository } from '../repositories/tarefaRepository'
import { UsuarioService } from './usuarioService'

const tarefaRepository = new TarefaRepository()
const usuarioService = new UsuarioService()

export class TarefaService {

    async criarTarefa(dados: any) {

        if (!dados.titulo || !dados.usuarioId) {
            throw new Error('Título e usuário são obrigatórios' )
        }
        
        return await tarefaRepository.criar(dados)

    }

    async listarTarefas(query: any) {

        const { status, categoriaId, limite = 10, pagina = 1, ordenar = 'asc' } = query
        const skip = (pagina - 1) * limite
        const filtro: any = {}

        if (status) 
            filtro.status = status

        if (categoriaId) 
            filtro.categoriaId = categoriaId

        return await tarefaRepository.listar(filtro, limite, pagina, ordenar, skip)

    }

    async obterTarefaPorId(id: string) {

        if (!id) {
            throw new Error('O parâmetro id é obrigatório' )
        }

        const tarefa = await tarefaRepository.buscarPorId(id)

        if (!tarefa){
            throw new Error('Tarefa não encontrada' )
        }

        return tarefa
    }

    async atualizarTarefa(id: string, dados: any) {

        if (!id) {
            throw new Error('O parâmetro id é obrigatório' )
        }

        dados.dataAlteracao = Date()
        await tarefaRepository.atualizar(id, dados)
     }

    async deletarTarefa(id: string) {

        const tarefa = await this.obterTarefaPorId(id) as any
        usuarioService.obterUsuarioPorId(String(tarefa.usuarioId))
        await tarefaRepository.deletar(id)

    }

    async atualizarStatus(id: string, status: string) {

        if (!id){
            throw new Error('O parâmetro id é obrigatório' )
        }
        await tarefaRepository.atualizar(id, { status, dataAlteracao: Date() })

    }
}