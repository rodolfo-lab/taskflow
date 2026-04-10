import { Usuario } from '../mongo/usuario'
import { IUsuario } from '../models/usuarioModelo'

export class UsuarioRepository {

    async criar(dados: any): Promise<IUsuario> {
        const usuario = new Usuario(dados)
        return await usuario.save()
    }

    async listarTodos(): Promise<IUsuario[]> {
        return await Usuario.find().select('-senha -__v')
    }

    async buscarPorId(id: string): Promise<IUsuario | null> {
        return await Usuario.findById(id, '-senha -__v')
    }

    async buscarPorEmail(email: string): Promise<IUsuario | null> {
        return await Usuario.findOne({ email })
    }

    async atualizar(id: string, dados: any){
        await Usuario.findByIdAndUpdate(id, dados, { new: true })
    }

    async deletar(id: string) {
        await Usuario.findByIdAndDelete(id)
    }
}