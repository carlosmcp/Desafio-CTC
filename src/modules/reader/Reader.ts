import { createReadStream, createWriteStream } from "fs"
import { Readable, Writable, Transform, pipeline } from "stream"
import { promisify } from "util"
import path from 'path'
import { InsertManyResult } from "mongodb"
import MongoUtil from "../mongo/MongoUtil"
const pipelineAsync = promisify(pipeline)

/**
 * Reader file class
 *
 * @author Carlos Brito <carlosmcp@gmail.com>
 * @since 2022/09/14
 */

export default class Reader {
  private static mongoDBC = MongoUtil.create()
  private static readonly SEPARADOR = "|"
  private static readonly DATABASE = process.env.MONGO_DATABASE
  private static readonly COLLECTION = "frases"
  
  public async process(filePath: string, fileInput: string, fileResult: string) {
    console.time("process");
    await Reader.mongoDBC.connect()
    console.log(`Starting reading ${fileInput} file ...`)
    const fileAndPath = filePath.concat(path.sep).concat(fileInput)

    createReadStream(fileAndPath)
      .pipe(this.buildTransformStream())
      .pipe(this.buildMongoStream())
      .on("finish", () => this.getResults()
        .then(results => this.writeResults(results, filePath, fileResult))
        .then(() => {
          Reader.mongoDBC.close()
          console.log("Done!")
          console.timeEnd("process")
          process.exit()
        })
        .catch(console.error)
      ).on("error", (err) => {
        console.error(err)
      })
  }

  public buildTransformStream(): Transform {
    const self = this

    return new Transform({
      transform: function (chunk:Uint8Array, _, callback) {
        this.push(JSON.stringify(self.splitPhases(chunk.toString())))
        callback()
      }
    })
  }

  public buildMongoStream(): Writable {
    const self = this
   
    return new Writable({
      write: async function (chunk:Uint8Array, _, callBack) {
        self.savePhasesBatch(chunk.toString()).finally(() =>  callBack())
        callBack()
      }
    })
  }

  public savePhasesBatch(frase: string): Promise<InsertManyResult<any>> {
    return Reader.mongoDBC
      .getClient()
      .db(Reader.DATABASE)
      .collection(Reader.COLLECTION)
      .insertMany(JSON.parse(frase))
  }

  public splitPhases(chunk: string): Array<object> {
    return chunk.split(Reader.SEPARADOR).map((item) => ({ frase: item }))
  }

  public async getResults(): Promise<any> {
    return await Reader.mongoDBC
      .getClient()
      .db(Reader.DATABASE)
      .collection(Reader.COLLECTION)
      .aggregate([
        {
          $unwind: "$frase"
        },
        {
          $sortByCount: "$frase"
        },
        {
          $limit: 50000
        }
      ])
      .toArray()
  }

  public writeResults(results: [any], filePath:string, fileName:string): Promise<void> {
    console.log("Writing results....")
    const writeStream = createWriteStream(
      filePath
      .concat(path.sep)
      .concat(fileName), 
      { flags: "w" }
    )

    return new Promise(async (resolve, _) => {
      const resultadoStream = new Readable({
        read: function () {
            for (const index in results) {
              this.push(JSON.stringify(results[index]));
            }

            this.push(null);
        }
      })

      const escritaStream = new Writable({
        write: function(chunk, encoding, callback) {
          writeStream.write(chunk.toString().concat('\n'), function()  {
            callback()
          })          
        }
      })
    
      await pipelineAsync(resultadoStream, escritaStream)
      resolve()
    });
  }

}
