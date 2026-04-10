import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    nome:          {type: String, required: [true, 'nome do Usuario não encontrado']},
    email:         {type: String, required: [true, 'email do Usuario não encontrado'], unique: true},
    senha:         {type: String, required: [true, 'senha do Usuario não encontrado']},
    dataAlteracao: {type: Date, default: Date.now},
    dataCriacao:   {type: Date, default: Date.now}
})

export const Usuario = mongoose.model('Usuario', schema)