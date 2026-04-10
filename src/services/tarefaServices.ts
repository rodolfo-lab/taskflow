import { ErroValidacao } from '../errors/errorValIdacao'
import { ITarefa } from '../models/tarefasModelo'
import { TarefaRepository } from '../repositories/tarefaRepository'
import { AutorizacaoService } from './autorizacaoServices'

const autorizacaoService = new AutorizacaoService()
const tarefaRepository = new TarefaRepository()

export class TarefaService {

    async criarTarefa(dados: any, tokenId: string): Promise<ITarefa> {

        if (!dados.titulo || !dados.usuarioId) {
            throw new ErroValidacao('Título e usuário são obrigatórios' )
        }

        await autorizacaoService.buscarUsuarioAutorizado(tokenId, dados.usuarioId)

        try {
            const novaTarefa = await tarefaRepository.criar(dados)
            if (novaTarefa && novaTarefa.id) {
                return await tarefaRepository.buscarPorId(novaTarefa.id)
            }
                throw new ErroValidacao('Erro ao criar tarefa')
        } catch (error) {
            if (error instanceof ErroValidacao) {
                throw error
            }
            throw new ErroValidacao('Erro ao criar tarefa')
        }

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

    async obterTarefaPorId(id: string, tokenId: string): Promise<ITarefa> {

        if (!id) {
            throw new ErroValidacao('O parâmetro id é obrigatório' )
        }

        try {
            const tarefa = await tarefaRepository.buscarPorId(id)
            await autorizacaoService.buscarUsuarioAutorizado(tokenId, tarefa.usuarioId)

            if (!tarefa){
                throw new ErroValidacao('Tarefa não encontrada' )
            }

            return tarefa
        } catch (error) {
            if (error instanceof ErroValidacao) {
                throw error
            }
            throw new ErroValidacao('Erro ao obter tarefa' )
        }
    }

    async atualizarTarefa(id: string, dados: any, tokenId: string) {

        await autorizacaoService.buscarTarefaAutorizada(tokenId, id)

        if (!id) {
            throw new ErroValidacao('O parâmetro id é obrigatório' )
        }

        dados.dataAlteracao = Date()
        try {
            await tarefaRepository.atualizar(id, dados)
        } catch {
            throw new ErroValidacao('Erro ao atualizar tarefa')
        }
     }

    async deletarTarefa(id: string, tokenId: string) {

        await autorizacaoService.buscarTarefaAutorizada(tokenId, id)

        try {
            await tarefaRepository.deletar(id)
        } catch {
            throw new ErroValidacao('Erro ao deletar tarefa')
        }

    }

    async atualizarStatus(id: string, status: string, tokenId: string) {

        await autorizacaoService.buscarTarefaAutorizada(tokenId, id)

        if (!(status == 'pendente' || status == 'concluída' || status == 'em andamento')) {
            throw new ErroValidacao('Status inválido. Use "pendente", "concluida" ou "em andamento".' )
        }

        try {
            await tarefaRepository.atualizar(id, { status, dataAlteracao: Date() })
        } catch (error) {
            if (error instanceof ErroValidacao) {
                throw error
            }
            throw new ErroValidacao('Erro ao atualizar status da tarefa')
        }

    }
}