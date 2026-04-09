import { Categoria } from '../models/categoria'
import { CategoriaModelo } from '../models/categoriaModelo'

export class CategoriaRepository {

    async criar(dados: any){
        const categoria = new Categoria(dados)
        await categoria.save()
    }

    async listarTodos(): Promise<CategoriaModelo[] | null> {
        return await Categoria.find()
    }

    async buscarPorId(id: string): Promise<CategoriaModelo | null> {
        return await Categoria.findById(id)
    }

    async atualizar(id: string, dados: any) {
        await Categoria.findByIdAndUpdate(id, dados, {new: true})
    }

    async deletar(id: string) {
        await Categoria.findByIdAndDelete(id)
    }
}