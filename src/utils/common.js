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

/**
 *
 *
 * @export
 * @param {*} args
 * @returns{Object}
 */
export function enumConstantsx(...args) {
  const constants = {}
  Object.keys(args).forEach((key) => {
    constants[args[key]] = args[key]
  })
  return constants
}
