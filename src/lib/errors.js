import { createError } from './helpers'

export const ApiError = (msg, info) => createError('ApiError', msg, undefined, info)
