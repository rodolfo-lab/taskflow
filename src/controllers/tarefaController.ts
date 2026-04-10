import type { Request, Response } from 'express'
import { TarefaService } from '../services/tarefaServices'
import { authorizationInfoRequest } from '../tools/authorizationInfoRequest'

const tarefaService = new TarefaService()

export async function novaTarefa(req: authorizationInfoRequest, res: Response): Promise<void> {
    const tarefa = await tarefaService.criarTarefa(req.body, req.user.id)
    res.status(201).json(tarefa)
}

export async function listarTarefasOrdenadas(req: Request, res: Response) {
    const tarefas = await tarefaService.listarTarefas(req.query)
    res.json(tarefas)
}

export async function obterTarefaPorId(req: authorizationInfoRequest, res: Response) {
    const tarefa = await tarefaService.obterTarefaPorId(String(req.params.id), req.user.id)
    res.status(200).json(tarefa)
}

export async function atualizarTarefa(req: authorizationInfoRequest, res: Response) {
    const tarefa = await tarefaService.atualizarTarefa(String(req.params.id), req.body, req.user.id)
    res.status(200).json(tarefa)
}

export async function deletarTarefa(req: authorizationInfoRequest, res: Response) {
    await tarefaService.deletarTarefa(String(req.params.id), req.user.id)
    res.status(204).json('Tarefa deletada com sucesso')
}

export async function atualizarStatusTarefa(req: authorizationInfoRequest, res: Response) {
    await tarefaService.atualizarStatus(String(req.params.id), req.body.status, req.user.id)
    res.status(200).json('Tarefa atualizada com sucesso')
}