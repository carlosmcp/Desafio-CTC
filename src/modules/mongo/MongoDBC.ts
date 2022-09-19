import { MongoClient } from 'mongodb'

/**
 * MongoDBC config class
 *
 * @author Carlos Brito <carlosmcp@gmail.com>
 * @since 2022/09/14
 */

export default class MongoDBC {
  private static client: MongoClient
  
  constructor(
    server: string | undefined,
    username: string | undefined,
    password: string | undefined,
    port: number | undefined
  ) {
    
    const erros = []

    if (!server) {
      erros.push('server')
    }
    if (!username) {
      erros.push('username')
    }
    if (!password) {
      erros.push('password')
    }
    if (!port) {
      erros.push('port')
    }

    if (erros.length > 0) {
      throw new Error(`Mongo ${erros.join(',')} config not found!`)
    }

    const uri = `mongodb://${username}:${password}@${server}:${port}/?authMechanism=DEFAULT`
    MongoDBC.client = new MongoClient(uri)
  }

  public async connect() {
    try {
      await MongoDBC.client.connect()
      await MongoDBC.client.db('admin').command({ ping: 1 })
      console.log('Connected successfully to server')
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  }

  public async close() {
    await MongoDBC.client.close()
  }

  public getClient() {
    return MongoDBC.client
  }
}
