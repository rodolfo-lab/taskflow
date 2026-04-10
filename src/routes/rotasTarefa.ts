import { Router } from 'express'
import { autenticar } from '../middlewares/authorizationMiddleware'
import * as tarefaController from '../controllers/tarefaController'

const routerTarefa = Router()

routerTarefa.post(  '/tarefas',            autenticar, tarefaController.novaTarefa as any)
routerTarefa.get(   '/tarefas',            autenticar, tarefaController.listarTarefasOrdenadas as any)
routerTarefa.get(   '/tarefas/:id',        autenticar, tarefaController.obterTarefaPorId as any)
routerTarefa.put(   '/tarefas/:id',        autenticar, tarefaController.atualizarTarefa as any)
routerTarefa.delete('/tarefas/:id',        autenticar, tarefaController.deletarTarefa as any)
routerTarefa.patch( '/tarefas/:id/status', autenticar, tarefaController.atualizarStatusTarefa as any)

export default routerTarefa