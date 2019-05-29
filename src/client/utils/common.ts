import { browerHistory, hashHistory } from 'react-router'

/**
 *枚举常量函数
 *
 * @export
 * @param {Array} args
 * @returns{Object}
 */
export function enumConstants(...args) {
  const constants = {}
  Object.keys(args).forEach((key) => {
    constants[args[key]] = args[key]
  })
  return constants
}

export function route(path, query) {
  let location = path
  const queryArr = []

  if (query) {
    Object.keys(query).forEach((key) => {
      queryArr.push(`${key}=${query[key]}`)
    })
  }

  if (queryArr.length > 0) {
    location = `${location}?${queryArr.join('&')}`
  }

  if (process.env.NODE_ENV === 'development') {
    browerHistory.push(location)
  } else {
    hashHistory.push(location)
  }
}

interface Bar{}
const bar = Bar
