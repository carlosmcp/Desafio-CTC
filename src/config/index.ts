import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

export default function init() {
     
    const env: string = process.env as unknown as string

    switch (env) {
        
        case 'development':
        
        dotenv.config({
            path: `${__dirname}/dev.env`
        })

        default: 
            dotenv.config({
                path: `${__dirname}/dev.env`
            })
        break
    } 
}

init()
