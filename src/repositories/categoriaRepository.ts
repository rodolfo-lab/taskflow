import { Categoria } from '../models/categoria'

export class CategoriaRepository {

    async criar(dados: any) {

        const categoria = new Categoria(dados)
        return await categoria.save()
    }

    async listarTodos() {

        return await Categoria.find()
    }

    async buscarPorId(id: string) {

        return await Categoria.findById(id)
    }

    async atualizar(id: string, dados: any) {

        return await Categoria.findByIdAndUpdate(id, dados, {new: true})
    }

    async deletar(id: string) {

        return await Categoria.findByIdAndDelete(id)
    }
}