import mongodb from 'mongodb'
import MongoDBC from './MongoDBC'

jest.mock('mongodb')

describe('MongoDBC', () => {
  it('Expect throw an Exception when get undefined values', () => {
    expect(
      () => new MongoDBC(undefined, undefined, undefined, undefined)
    ).toThrow(Error('Mongo server,username,password,port config not found!'))
  })

  it('Expect NOT throw an Exception when get localhost undefined', () => {
    expect(
      () => new MongoDBC('localhost', 'username', 'password', 27021)
    ).not.toThrow(
      Error('Mongo server,username,password,port config not found!')
    )
  })
})
