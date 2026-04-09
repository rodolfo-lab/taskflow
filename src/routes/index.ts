import { Router } from 'express'
import * as usuarioController from '../controllers/usuarioController'
import * as categoriaController from '../controllers/categoriaController'
import * as tarefaController from '../controllers/tarefaController'
import * as loginController from '../controllers/loginController'
import { autenticar } from '../middlewares/authorizationMiddleware'

const router = Router()

router.post(  '/usuarios',                 usuarioController.novoUsuario)
router.get(   '/usuarios',     autenticar, usuarioController.obterListaUsuarios)
router.get(   '/usuarios/:id', autenticar, usuarioController.obterUsuarioPorId as any)
router.put(   '/usuarios/:id', autenticar, usuarioController.atualizarUsuario as any)
router.delete('/usuarios/:id', autenticar, usuarioController.deletarUsuario as any)

router.post(  '/categorias',     autenticar, categoriaController.novaCategoria as any)
router.get(   '/categorias',     autenticar, categoriaController.obterCategorias)
router.get(   '/categorias/:id', autenticar, categoriaController.obterCategoriaPorId)
router.put(   '/categorias/:id', autenticar, categoriaController.atualizarCategoria)
router.delete('/categorias/:id', autenticar, categoriaController.deletarCategoria as any) 

router.post(  '/tarefas',            autenticar, tarefaController.novaTarefa) 
router.get(   '/tarefas',            autenticar, tarefaController.listarTarefasOrdenadas) 
router.get(   '/tarefas/:id',        autenticar, tarefaController.obterTarefaPorId) 
router.put(   '/tarefas/:id',        autenticar, tarefaController.atualizarTarefa) 
router.delete('/tarefas/:id',        autenticar, tarefaController.deletarTarefa as any)
router.patch( '/tarefas/:id/status', autenticar, tarefaController.atualizarStatusTarefa) 

router.post('/login', loginController.login)

export default router