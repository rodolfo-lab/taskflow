import bcrypt from 'bcryptjs'
import { UsuarioRepository } from '../repositories/usuarioRepository'
import { erroValidacaoComMensagem, tratarErroParaJson } from '../errors/errorHandling'
import type { Response } from 'express'

const usuarioRepository = new UsuarioRepository()

export class UsuarioService {

    async criarUsuario(nome: string, email: string, senha: string, res: Response) {
        
        if (!nome || !email || !senha){
            erroValidacaoComMensagem(res, 'O parâmetro id é obrigatório' )
            return
        }
        
        const senhaHash = await bcrypt.hash(senha, 10)
        return await usuarioRepository.criar({ nome, email, senha: senhaHash })
    }

    async listarUsuarios() {
        return await usuarioRepository.listarTodos()
    }

    async obterUsuarioPorId(id: string, res: Response) {

        if (!id){
            erroValidacaoComMensagem(res, 'O parâmetro id é obrigatório' )
            return {}
        }

        const usuario = await usuarioRepository.buscarPorId(id)
        
        if (!usuario){
            erroValidacaoComMensagem(res, 'Usuário não encontrado' )
            return usuario
        }
        
        return usuario
    }

    async atualizarUsuario(id: string, dados: any, res: Response) {
        
        if (!id){
            erroValidacaoComMensagem(res, 'O parâmetro id é obrigatório' )
            return
        }

        dados.dataAlteracao = Date()
        const usuario = await usuarioRepository.atualizar(id, dados)

        if (!usuario){
            erroValidacaoComMensagem(res, 'Erro ao atualizar usuário' )
            return usuario
        }

        return usuario
    }

    async deletarUsuario(id: string, res: Response) {

        if (!id){
            erroValidacaoComMensagem(res, 'O parâmetro id é obrigatório' )
        }

        await usuarioRepository.deletar(id)
    }
}