/**
 * Throws an error message randomly given a probability number
 * @param {number} prob Probability of failure
 * @param {string} msg Error message
 * @throws {error} msgOrErr
 */
export const mayThrow = (
  prob = 0.1,
  msgOrErr = 'There was an error'
) => {
  if (Math.random() < prob) {
    throw msgOrErr
  }
}

/**
 * Run an async function until it doesn't throw
 * @param {promise} promise Promise to run on each retry
 * @param {number} retries Max number of retries before it throws
 * @param {function} onError Callback executed on each error
 * @throws {error} Error object coming from the failed promise
 * @returns {*} Promise value
 */
export const retryUntil = async (promise, retries = Infinity, onError) => {
  const retry = async (num = 0) => {
    try {
      return await promise()
    } catch (err) {
      if (num + 1 > retries) throw err
      if (typeof onError !== 'undefined' && onError) {
        onError(err)
      }

      retry(num + 1)
    }
  }

  retry()
}

/**
 * Create a custom error
 * @param {string} name
 * @param {string} message
 * @param {string|number} code
 * @param {*} extra
 * @returns {error} Custom error
 */
export const createError = (name, message, code = 500, extra) => {
  const err = Error(message)
  err.name = name || 'AppError'
  err.code = code
  err.extra = extra

  return err
}
