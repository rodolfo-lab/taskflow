import { erroValidacaoComMensagem } from '../errors/errorHandling'
import { TarefaRepository } from '../repositories/tarefaRepository'
import { UsuarioService } from './usuarioService'
import type { Response } from 'express'

const tarefaRepository = new TarefaRepository()
const usuarioService = new UsuarioService()

export class TarefaService {

    async criarTarefa(dados: any, res: Response) {

        if (!dados.titulo || !dados.usuarioId) {
            erroValidacaoComMensagem(res, 'Título e usuário são obrigatórios' )
            return false
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

    async obterTarefaPorId(id: string, res: Response) {

        if (!id) {
            erroValidacaoComMensagem(res, 'O parâmetro id é obrigatório' )
            return {}
        }

        const tarefa = await tarefaRepository.buscarPorId(id)

        if (!tarefa){
            erroValidacaoComMensagem(res, 'Tarefa não encontrada' )
            return tarefa
        }

        return tarefa
    }

    async atualizarTarefa(id: string, dados: any, res: Response) {

        if (!id) {
            erroValidacaoComMensagem(res, 'O parâmetro id é obrigatório' )
            return
        }


        dados.dataAlteracao = Date()

        const tarefa = await tarefaRepository.atualizar(id, dados)
        if (!tarefa) {
            erroValidacaoComMensagem(res, 'Erro ao atualizar tarefa' )
            return

        }

        return tarefa
    }

    async deletarTarefa(id: string, res: Response) {

        const tarefa = await this.obterTarefaPorId(id, res) as any
        if (!tarefa)
            return
        const usuario =  usuarioService.obterUsuarioPorId(String(tarefa.usuarioId), res)

        if (!usuario)
            return

        await tarefaRepository.deletar(id)

    }

    async atualizarStatus(id: string, status: string, res: Response) {

        if (!id){
            erroValidacaoComMensagem(res, 'O parâmetro id é obrigatório')
            return
        }

        const tarefa = await tarefaRepository.atualizar(id, { status, dataAlteracao: Date() })

        if (!tarefa) {
            erroValidacaoComMensagem(res, 'Tarefa não encontrada')
            return
        }

        return tarefa

    }
}