import bcrypt from 'bcryptjs'
import { UsuarioRepository } from '../repositories/usuarioRepository'
import { IUsuario } from '../models/usuarioModelo'
import { ErroValidacao } from '../errors/errorValIdacao'
import { AutorizacaoService } from './autorizacaoServices'

const usuarioRepository = new UsuarioRepository()
const autorizacaoService = new AutorizacaoService()

export class UsuarioService {

    async criarUsuario(nome: string, email: string, senha: string): Promise<string> {

        if (!nome || !email || !senha){
            throw new ErroValidacao('Nome, email e senha são obrigatórios para criar um usuário')
        }

        try {
            const senhaHash = await bcrypt.hash(senha, 10)
            const usuario = await usuarioRepository.criar({ nome, email, senha: senhaHash })
            return usuario.id

        } catch (error) {
            if (error instanceof ErroValidacao) {
                throw error
            }
            throw new ErroValidacao( 'Erro ao criar usuário')
        }

    }

    async listarUsuarios(): Promise<IUsuario[]> {
        return await usuarioRepository.listarTodos()
    }

    async obterUsuarioPorId(id: string, tokenId: string): Promise<IUsuario> {

        if (!id){
            throw new ErroValidacao('O parâmetro id é obrigatório' )
        }

        await autorizacaoService.usuarioAutorizado(tokenId, id)


        try {
            const usuario = await usuarioRepository.buscarPorId(id)

            if (!usuario){
                throw new ErroValidacao('Usuário não encontrado' )
            }

            return usuario

        } catch (error) {

            if (error instanceof ErroValidacao) {
                throw error
            }

            throw new ErroValidacao('Erro ao buscar usuário por email' )
        }
    }


    async obterUsuarioPorEmail(email: string): Promise<IUsuario> {

        if (!email){
            throw new ErroValidacao('O parâmetro email é obrigatório' )
        }

        try {
            const usuario = await usuarioRepository.buscarPorEmail(email)
            if (!usuario){
                throw new ErroValidacao('Usuário não encontrado' )
            }
            return usuario

        } catch (error) {
            if (error instanceof ErroValidacao) {
                throw error
            }
            throw new ErroValidacao('Erro ao buscar usuário por email' )
        }

    }

    async atualizarUsuario(id: string, dados: any, tokenId: string) {

        await autorizacaoService.buscarUsuarioAutorizado(id, tokenId)
        dados.dataAlteracao = Date()

        try {
            await usuarioRepository.atualizar(id, dados)
        } catch {
            throw new ErroValidacao('Erro ao atualizar usuário')
        }

    }

    async deletarUsuario(id: string, tokenId: string) {

        await autorizacaoService.buscarUsuarioAutorizado(id, tokenId)

        try {
            await usuarioRepository.deletar(id)
        } catch {
            throw new ErroValidacao('Erro ao deletar usuário')
        }
    }
}