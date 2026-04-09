import type { Request } from 'express'

export interface authorizationInfoRequest extends Request {
  user: { id: string, email: string }
}