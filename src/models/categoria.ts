import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    nome:          {type: String, required: [true, 'nome do Usuario não encontrado']},
    usuarioId:     {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: [true, 'vinculo Usuario não encontrado']},
    dataAlteracao: {type: Date, default: Date.now},
    dataCriacao:   {type: String, default: Date.now }
})

export const Categoria = mongoose.model('Categoria', schema)
