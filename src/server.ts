import express from 'express'
import routes from './routes'
import { ErroHandling } from './errors/errorHandling'
import mongoDB from './mongo/mongo'

const app = express()

app.use(express.json())
app.use('', routes)
app.use((erro: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {

    if (erro instanceof ErroHandling) {
        console.error(erro.stack)
        res.status(erro.statusCode).send({ error: erro.message })

    } else {
        console.error(erro.stack)
        res.status(500).send({ error: 'Something broke!' })
    }

})
mongoDB

app.listen(process.env.PORT, () => console.log('Servidor rodando na porta 3303'))