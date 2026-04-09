class Tarefa {

    id: String
    titulo: String
    descricao: String
    status: String
    dataLimite: String
    categoriaId: string
    usuarioId: string
    dataAlteracao: Date
    dataCriacao: Date

    constructor(id: string,
                titulo: string,
                descricao: string,
                status: string,
                dataLimite: string,
                categoriaId: string,
                usuarioId: string) {

        this.id            = id
        this.titulo        = titulo
        this.descricao     = descricao
        this.status        = status
        this.dataLimite    = dataLimite
        this.categoriaId   = categoriaId
        this.usuarioId     = usuarioId        
        this.dataCriacao   = new Date()
        this.dataAlteracao = new Date()
    }

}

export { Tarefa as TarefaModelo }