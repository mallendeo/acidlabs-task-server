/* eslint-env mocha */

import { expect } from 'chai'
import * as helpers from '../../../src/lib/helpers'

describe('Helpers', () => {
  it('[retryUntil] Should keep trying to resolve the promise', async () => {
    let fail = 0
    const until = 10
    const willFail = async () =>
      new Promise((resolve, reject) => {
        if (++fail < until) {
          return reject(Error('api request failed!'))
        }

        resolve({ success: true })
      })

    const val = await helpers.retryUntil(willFail, until)
    expect(val).to.deep.equal({ success: true })
  })

  it('[retryUntil] Should throw after trying once', async () => {
    try {
      await helpers.retryUntil(() => Promise.reject(Error(true)), 1)
    } catch (err) {
      expect(err.message).to.equal('true')
    }
  })

  it('[mayThrow] Should always throw (given 1)', async () => {
    expect(() => helpers.mayThrow(1, 'oops!'))
      .to.throw('oops!')
  })

  it('[mayThrow] Should never throw (given 0)', async () => {
    expect(() => helpers.mayThrow(0, 'oops!'))
      .to.not.throw()
  })

  it('[createError] Should create an Error object', async () => {
    const msg = 'I made an oopsie...'
    const error = helpers.createError('TestError', msg, 500)
    expect(error).to.be.an('Error')
    expect(error).to.haveOwnProperty('code', 500)
    expect(error).to.haveOwnProperty('message', msg)
    expect(error).to.haveOwnProperty('extra')
  })
})
