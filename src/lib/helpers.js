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
