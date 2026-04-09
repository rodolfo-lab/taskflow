import { Tarefa } from '../models/tarefas'

export class TarefaRepository {

    async criar(dados: any) {

        const tarefa = new Tarefa(dados)
        return await tarefa.save()
    }

    async listar(filtro: any, limite: number, pagina: number, ordenar: string, skip: number) {

        return await Tarefa.find(filtro)
        .limit(limite)
        .skip(skip)
        .sort({createdAt: ordenar === 'desc' ? -1 : 1})
    }

    async buscarPorId(id: string) {

        return await Tarefa.findById(id)
    }

    async atualizar(id: string, dados: any) {

        return await Tarefa.findByIdAndUpdate(id, dados, {new: true})
    }

    async deletar(id: string) {

        return await Tarefa.findByIdAndDelete(id)
    }
}