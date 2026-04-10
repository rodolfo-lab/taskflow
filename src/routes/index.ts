import { Router } from 'express'
import * as loginController from '../controllers/loginController'
import routerTarefa from './rotasTarefa'
import routerUsuario from './rotasUsuario'
import routerCategoria from './rotasCategoria'

const router = Router()

router.use('/api/v1/', routerUsuario)
router.use('/api/v1/', routerCategoria)
router.use('/api/v1/', routerTarefa)

router.post('/api/v1/login', loginController.login)

export default router