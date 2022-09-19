import Reader from './Reader'
import MongoUtil from '../mongo/MongoUtil'
import MongoDBC from '../mongo/MongoDBC'

import { createReadStream, createWriteStream } from "fs"

jest.mock('../mongo/MongoUtil')

let reader:Reader
const phase = "carro arroz amor luz casa carro bola arvore arvore|computador casa luz luz casa arvore luz arvore amor|computador computador arroz arroz luz arroz computador casa bola|carro carro amor bola arvore amor casa casa casa|casa carro bola amor casa arvore amor carro luz|arroz casa computador bola casa arvore carro arroz bola|arroz computador luz computador casa casa arroz amor bola|bola casa luz arvore amor luz carro carro arvore|arroz carro carro arroz casa casa luz carro luz|arvore luz amor computador arvore computador arroz computador casa|casa casa amor amor carro computador arvore amor casa|luz casa bola arroz luz arroz carro carro computador|luz carro amor carro computador arroz computador carro computador|carro casa bola bola casa computador luz bola computador|bola luz arroz casa computador casa arroz carro casa|arroz arroz computador amor amor bola arroz amor carro|arroz arroz arroz arvore bola amor luz luz bola|computador arroz luz amor casa carro luz arroz arvore|bola luz arroz casa arvore arvore luz amor computador|casa amor bola bola bola arroz amor bola bola|carro luz carro casa computador arvore bola carro arvore|luz computador luz computador arroz computador luz luz casa|arroz arroz bola luz luz arroz bola bola arroz|luz arvore amor carro casa amor amor carro bola|computador arroz carro amor carro bola computador arvore casa|computador carro casa casa casa computador casa bola carro|carro casa amor amor amor casa computador luz casa|casa amor computador carro casa arvore luz luz arvore|amor carro arvore casa computador arvore amor amor amor|luz casa casa casa arvore amor carro bola luz|bola arroz casa computador bola computador computador bola amor|luz luz arvore arroz casa arroz luz computador arvore|bola computador bola computador arvore luz computador luz bola|casa casa bola luz arvore carro computador luz luz|amor casa luz amor arroz casa arroz casa arvore|arvore casa carro casa bola bola arvore arroz carro|computador arroz arvore arroz luz carro arvore computador casa|arvore amor casa casa computador carro casa computador carro|carro amor amor carro computador casa amor casa bola|arroz amor arroz luz arvore arroz luz computador arvore|carro arroz arvore luz computador arvore computador casa carro|bola carro amor luz bola luz amor carro arroz|computador casa bola amor arroz computador amor computador bola|luz arvore carro arvore carro arroz luz carro carro|arroz arvore arvore amor carro bola arroz carro bola|arvore arvore amor carro amor arvore casa bola carro|luz arvore amor arroz casa carro arroz computador luz|carro carro casa luz amor arroz amor bola carro|arroz bola arroz carro luz arroz arroz arroz bola|bola amor computador casa amor amor casa casa arroz"

beforeEach(() => {
    reader = new Reader()
})

describe('Teste Reader', () => {
 
    it('Expect to split value with separator', () => {
        jest.spyOn(MongoUtil, 'create').mockReturnValue({} as unknown as MongoDBC)
        
        const result = phase.split('|').map(item => ({ frase: item }))
        
        expect(reader.splitPhases(phase)).toEqual(expect.arrayContaining((result)))
    })    

})
