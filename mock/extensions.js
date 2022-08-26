
/**
 * 加载动态路由
 */
const fs = require('fs')
const path = require('path')

const load = (path, name) => {
  if (name) {
    return require(path + name)
  }
  return require(path)
}

module.exports = (dir = 'api') => {
  const patcher = []
  // eslint-disable-next-line no-path-concat
  fs.readdirSync(__dirname + '/' + dir).forEach(function(filename) {
    if (!/\.js$/.test(filename)) {
      return
    }
    const name = path.basename(filename, '.js')
    // const _load = load.bind(null, './' + dir + '/', name)
    // patcher.__defineGetter__(name, _load)
    const _load = load('./' + dir + '/', name)
    patcher.push(_load)
  })
  return patcher
}
