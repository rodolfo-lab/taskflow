import { ErroAutorizacao } from "../errors/errorAutorizacao"
import { UsuarioRepository } from "../repositories/usuarioRepository"
import { CategoriaRepository } from "../repositories/categoriaRepository"
import { TarefaRepository } from "../repositories/tarefaRepository"

const tarefaRepository = new TarefaRepository()
const categoriaRepository = new CategoriaRepository()
const usuarioRepository = new UsuarioRepository()

export class AutorizacaoService {

    async usuarioAutorizado(tokenId: string, externoid: string) {
        if (!(externoid === tokenId)) {
            throw new ErroAutorizacao('Acesso negado')
        }
    }

    async buscarUsuarioAutorizado(tokenId: string, IdBusca: string) {
        const usuario = await usuarioRepository.buscarPorId(IdBusca)

        if (!usuario) {
            throw new ErroAutorizacao('Usuário não encontrado')
        }
        await this.usuarioAutorizado(tokenId, IdBusca)
    }

    async buscarTarefaAutorizada(tokenId: string, IdBusca: string) {
        const tarefa = await tarefaRepository.buscarPorId(IdBusca)
        console.log(tarefa)

        if (!tarefa) {
            throw new ErroAutorizacao('Tarefa não encontrada')
        }
        console.log(tokenId, tarefa.usuarioId);

        await this.usuarioAutorizado(tokenId, String(tarefa.usuarioId))
    }

    async buscarCategoriaAutorizada(tokenId: string, IdBusca: string) {
        const categoria = await categoriaRepository.buscarPorId(IdBusca)

        if (!categoria) {
            throw new ErroAutorizacao('Categoria não encontrada')
        }
        await this.usuarioAutorizado(tokenId, String(categoria.usuarioId))
    }

}
