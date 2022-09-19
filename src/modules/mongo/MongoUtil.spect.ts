import MongoUtil from './MongoUtil'

describe('MongoDBC', () => {
  it('Expect throw an Exception when get undefined values', () => {
    expect(() => MongoUtil.create()).toBeDefined()
  })
})
