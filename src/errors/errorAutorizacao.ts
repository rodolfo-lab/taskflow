import { ErroHandling } from "./errorHandling"

export class ErroAutorizacao extends ErroHandling {
  constructor(message: string) {
    super(message, 401)
  }
}