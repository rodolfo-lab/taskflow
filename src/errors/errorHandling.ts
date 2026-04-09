import {Response} from 'express'

function erroValidacaoComMensagem(res: Response, error: any) {
    res.status(400).json( { error: error })
}

function tratarErroParaJson(error: any) {
    
    return { erro: error.mensage }

}

export {erroValidacaoComMensagem, tratarErroParaJson}


