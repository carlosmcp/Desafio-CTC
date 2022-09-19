import './config'
import Reader from './modules/reader/Reader'

/**
 * Bootstrap main class
 *
 * @author Carlos Brito <carlosmcp@gmail.com>
 * @since 2022/09/14
 */

async function bootstrap() {
    new Reader().process(
        process.env.PATH_ARQUIVOS as string, 
        process.env.NOME_ARQUIVO_TESTE as string, 
        process.env.NOME_ARQUIVO_RESULTADO as string, 
    )
}

bootstrap()    