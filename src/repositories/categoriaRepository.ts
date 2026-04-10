import { Categoria } from '../mongo/categoria'
import { ICategoria } from '../models/categoriaModelo'

export class CategoriaRepository {

    async criar(dados: {nome: string, usuarioId: string}): Promise<ICategoria | any> {
        const categoria = new Categoria(dados)
        return await categoria.save()
    }

    async listarTodos(tokenId: string): Promise<ICategoria[] | null> {
        return await Categoria.find({ usuarioId: tokenId }, '-__v' )
    }

    async buscarPorId(id: string): Promise<ICategoria | null> {
        return await Categoria.findById(id, '-__v')
    }

    async atualizar(id: string, dados: any) {
        await Categoria.findByIdAndUpdate(id, dados, {new: true})
    }

    async deletar(id: string) {
        await Categoria.findByIdAndDelete(id)
    }

    async buscarPorNome(nome: string, usuarioId: string): Promise<ICategoria | null> {
        return await Categoria.findOne({ nome, usuarioId })
    }
}