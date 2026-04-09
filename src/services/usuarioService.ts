import bcrypt from 'bcryptjs'
import { UsuarioRepository } from '../repositories/usuarioRepository'
import { UsuarioModelo } from '../models/usuarioModelo'

const usuarioRepository = new UsuarioRepository()

export class UsuarioService {

    async criarUsuario(nome: string, email: string, senha: string): Promise<string> {
        
        if (!nome || !email || !senha){
            throw new Error('Nome, email e senha são obrigatórios para criar um usuário')
        }

        try {
            const senhaHash = await bcrypt.hash(senha, 10)
            const usuario = await usuarioRepository.criar({ nome, email, senha: senhaHash })
            return usuario.id
            
        } catch {
            throw new Error('Erro ao criar usuário - Nome, email e senha são obrigatórios para criar um usuário')
        }
    }

    async listarUsuarios(): Promise<UsuarioModelo[]> {
        return await usuarioRepository.listarTodos()
    }

    async obterUsuarioPorId(id: string): Promise<UsuarioModelo> {

        if (!id){
            throw new Error('O parâmetro id é obrigatório' )
        }

        const usuario = await usuarioRepository.buscarPorId(id)
        
        if (!usuario){
            throw new Error('Usuário não encontrado' )
        }
        
        return usuario
    }

    async atualizarUsuario(id: string, dados: any) {
        
        if (!id){
            throw new Error('O parâmetro id é obrigatório' )
        }

        dados.dataAlteracao = Date()
        const usuario = await usuarioRepository.atualizar(id, dados)

    }

    async deletarUsuario(id: string) {

        if (!id){
            throw new Error('O parâmetro id é obrigatório' )
        }

        await usuarioRepository.deletar(id)
    }
}