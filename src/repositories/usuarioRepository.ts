import { Usuario } from '../models/usuario'

export class UsuarioRepository {

    async criar(dados: any) {

        const usuario = new Usuario(dados)
        return await usuario.save()
    }

    async listarTodos() {

        return await Usuario.find().select('-senha')
    }

    async buscarPorId(id: string) {

        return await Usuario.findById(id)
    }

    async atualizar(id: string, dados: any) {

        return await Usuario.findByIdAndUpdate(id, dados, { new: true })
    }

    async deletar(id: string) {

        return await Usuario.findByIdAndDelete(id)
    }
}