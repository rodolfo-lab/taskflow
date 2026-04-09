class Categoria {

    id: String
    nome: String
    usuarioId: String
    dataAlteracao: Date
    dataCriacao: Date

    constructor(id: string,
                nome: string,
                usuarioId: string) {

        this.id            = id
        this.nome          = nome
        this.usuarioId     = usuarioId
        this.dataCriacao   = new Date()
        this.dataAlteracao = new Date()
    }

}

export { Categoria as CategoriaModelo }