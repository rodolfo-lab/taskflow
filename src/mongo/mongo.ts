
import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config()

const mongoDB = mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('MongoDB conectado'))
    .catch(error => console.error('Erro ao conectar MongoDB:', error))

export default mongoDB