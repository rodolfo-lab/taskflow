import { Tarefa } from '../mongo/tarefas'
import { ITarefa } from '../models/tarefasModelo'

export class TarefaRepository {

    async criar(dados: any): Promise<ITarefa | any> {
        const tarefa = new Tarefa(dados)
        await tarefa.save()
        return tarefa
    }

    async listar(filtro: any,
                 limite: number,
                 pagina: number,
                 ordenar: string,
                 skip: number): Promise<ITarefa[] | any> {

        return await Tarefa.find(filtro, '-__v')
        .limit(limite)
        .skip(skip)
        .sort({createdAt: ordenar === 'desc' ? -1 : 1})
    }

    async buscarPorId(id: string): Promise<ITarefa> {
        return await Tarefa.findById(id, '-__v') as ITarefa
    }

    async atualizar(id: string, dados: any) {
        await Tarefa.findByIdAndUpdate(id, dados, {new: true})
    }

    async deletar(id: string) {
        await Tarefa.findByIdAndDelete(id)
    }
}