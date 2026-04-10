import type { Request, Response } from 'express'
import { LoginService } from '../services/loginService'

const loginService = new LoginService()

export async function login(req: Request, res: Response) {
    const token = await loginService.login(req.body.email, req.body.senha)
    res.status(200).json(token)
}