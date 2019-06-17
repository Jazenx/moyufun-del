import * as router from 'react-router'

const { browerHistory, hashHistory } = router

/**
 *枚举常量函数
 *
 * @export
 * @param {Array} args
 * @returns{Object}
 */
export function enumConstants<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key
    return res
  }, Object.create(null))
}

export function route(path: string, query?: any) {
  let location = path
  const queryArr: string[] = []

  if (query) {
    Object.keys(query).forEach((key: any) => {
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
