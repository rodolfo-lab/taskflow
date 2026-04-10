import { Router } from 'express'
import * as usuarioController from '../controllers/usuarioController'
import { autenticar } from '../middlewares/authorizationMiddleware'

const routerUsuario = Router()

routerUsuario.post(  '/usuarios',                 usuarioController.novoUsuario)
routerUsuario.get(   '/usuarios',     autenticar, usuarioController.obterListaUsuarios)
routerUsuario.get(   '/usuarios/:id', autenticar, usuarioController.obterUsuarioPorId as any)
routerUsuario.put(   '/usuarios/:id', autenticar, usuarioController.atualizarUsuario as any)
routerUsuario.delete('/usuarios/:id', autenticar, usuarioController.deletarUsuario as any)

export default routerUsuario