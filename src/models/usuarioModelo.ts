class Usuario {
    id: string
    email: string
    nome: string
    senha: string
    dataCriacao: Date
    dataAlteracao: Date

    constructor(id: string, nome: string, email: string, senha: string) {
        this.id = id
        this.nome = nome
        this.email = email
        this.senha = senha
        
        this.dataCriacao = new Date()
        this.dataAlteracao = new Date()
    }

}
export { Usuario as UsuarioModelo }