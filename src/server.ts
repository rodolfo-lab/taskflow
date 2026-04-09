import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import routes from './routes'

dotenv.config()
const app = express()

app.use(express.json())
app.use('/api/v1', routes)

mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('MongoDB conectado'))
    .catch(error => console.error('Erro ao conectar MongoDB:', error))

app.listen(3303, () => console.log('Servidor rodando na porta 3303'))