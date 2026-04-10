
import { Router } from 'express'
import * as categoriaController from '../controllers/categoriaController'
import { autenticar } from '../middlewares/authorizationMiddleware'

const routerCategoria = Router()

routerCategoria.post(  '/categorias',     autenticar, categoriaController.novaCategoria as any)
routerCategoria.get(   '/categorias',     autenticar, categoriaController.obterCategorias as any)
routerCategoria.get(   '/categorias/:id', autenticar, categoriaController.obterCategoriaPorId as any)
routerCategoria.put(   '/categorias/:id', autenticar, categoriaController.atualizarCategoria as any)
routerCategoria.delete('/categorias/:id', autenticar, categoriaController.deletarCategoria as any)

export default routerCategoria