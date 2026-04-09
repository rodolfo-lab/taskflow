import type { Request, Response } from 'express'
import { TarefaService } from '../services/tarefaServices'
import { erroValidacaoComMensagem } from '../errors/errorHandling'
import { authorizationInfoRequest } from '../tools/authorizationInfoRequest'
import { UsuarioAutorizado } from '../services/autorizacaoServices'

const tarefaService = new TarefaService()

export async function novaTarefa(req: Request, res: Response) {

    try {
        const tarefa = await tarefaService.criarTarefa(req.body, res)
        if (!tarefa)
            return
        
        res.status(201).json(tarefa)

    } catch (error: any) {
        erroValidacaoComMensagem(res, error.message)
    }
}

export async function listarTarefasOrdenadas(req: Request, res: Response) {

    try {
        const tarefas = await tarefaService.listarTarefas(req.query)
        res.json(tarefas)

    } catch (error: any) {
        erroValidacaoComMensagem(res, error.message)
    }
}

export async function obterTarefaPorId(req: Request, res: Response) {

    try {
        const tarefa = await tarefaService.obterTarefaPorId(String(req.params.id), res)
        res.status(200).json(tarefa)

    } catch (error: any) {
        erroValidacaoComMensagem(res, error.message)
    }
}

export async function atualizarTarefa(req: Request, res: Response) {

    try {
        const tarefa = await tarefaService.atualizarTarefa(String(req.params.id), req.body, res)
        res.status(200).json(tarefa)

    } catch (error: any) {
        erroValidacaoComMensagem(res, error.message)
    }
}

export async function deletarTarefa(req: authorizationInfoRequest, res: Response) {

    try {
        await tarefaService.deletarTarefa(String(req.params.id), res)
        res.status(204).send()

    } catch (error: any) {
        erroValidacaoComMensagem(res, error.message)
    }
}

export async function atualizarStatusTarefa(req: Request, res: Response) {

    try {
        const tarefa = await tarefaService.atualizarStatus(String(req.params.id), req.body.status, res)
        if (!tarefa)
            return

        res.status(200).json(tarefa)

    } catch (error: any) {
        erroValidacaoComMensagem(res, error.message)
    }
}