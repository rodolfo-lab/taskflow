import { Usuario } from '../models/usuario'
import { UsuarioModelo } from '../models/usuarioModelo'

export class UsuarioRepository {

    async criar(dados: any): Promise<UsuarioModelo> {

        const usuario = new Usuario(dados)
        return await usuario.save()
    }

    async listarTodos(): Promise<UsuarioModelo[]> {

        return await Usuario.find().select('-senha')
    }

    async buscarPorId(id: string): Promise<UsuarioModelo | null> {

        return await Usuario.findById(id)
    }

    async atualizar(id: string, dados: any){

        await Usuario.findByIdAndUpdate(id, dados, { new: true })
    }

    async deletar(id: string) {

        await Usuario.findByIdAndDelete(id)
    }
}