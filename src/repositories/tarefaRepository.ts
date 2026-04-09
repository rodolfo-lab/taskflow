import { Tarefa } from '../models/tarefas'
import { TarefaModelo } from '../models/tarefasModelo'

export class TarefaRepository {

    async criar(dados: any) {
        const tarefa = new Tarefa(dados)
        await tarefa.save()
    }

    async listar(filtro: any,
                 limite: number,
                 pagina: number,
                 ordenar: string,
                 skip: number): Promise<TarefaModelo[] | any> {

        return await Tarefa.find(filtro)
        .limit(limite)
        .skip(skip)
        .sort({createdAt: ordenar === 'desc' ? -1 : 1})
    }

    async buscarPorId(id: string): Promise<TarefaModelo | null> {
        return await Tarefa.findById(id)
    }

    async atualizar(id: string, dados: any) {
        await Tarefa.findByIdAndUpdate(id, dados, {new: true})
    }

    async deletar(id: string) {
        await Tarefa.findByIdAndDelete(id)
    }
}