import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    titulo:        {type: String, required: [true, 'titulo da tarefa não encontrado']},
    descricao:     {type: String},
    status:        {type: String, enum: ['pendente', 'em andamento', 'concluída'], default: 'pendente'},
    dataLimite:    {type: String},
    categoriaId:   {type: mongoose.Schema.Types.ObjectId, ref: 'categoria', required: [true, 'vinculo categoria não encontrado']},
    usuarioId:     {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'vinculo Usuario não encontrado']},
    dataAlteracao: {type: Date, default: Date.now},
    dataCriacao:   {type: String, default: Date.now}
})

export const Tarefa = mongoose.model('Tarefa', schema)
