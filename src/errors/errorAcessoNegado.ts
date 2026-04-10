import { ErroHandling } from "./errorHandling"

export class ErroValidacao extends ErroHandling {
  constructor(message: string) {
    super(message, 403)
  }
}