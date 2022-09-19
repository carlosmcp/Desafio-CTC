import MongoDBC from "./MongoDBC"


/**
 * MongoPool - Mongo DBC pool
 *
 * @author Carlos Brito <carlosmcp@gmail.com>
 * @since 2022/09/14
 */

 export default class MongoUtil {
    
    public static create(): MongoDBC {
        const server = process.env.MONGO_SERVER
        const username = process.env.MONGO_USERNAME
        const password = process.env.MONGO_PASSWORD
        const port = process.env.MONGO_PORT ? parseInt (process.env.MONGO_PORT) : 27021
        return new MongoDBC(server, username, password, port)
    }    
    
 }
