import {isObject, isFunction, ajax, bindEvent} from 'sav-util'

export function Api () {
  bindEvent(this)
  this.maps = {} // api 映射
  this.baseUrl = '' // 基础URL
  this.ajax = ajax  // ajax请求
}

Api.prototype.setBaseUrl = function (url) {
  this.baseUrl = url
}

Api.prototype.setAjax = function (ajax) {
  this.ajax = ajax
}

Api.prototype.declare = function (key, val) {
  if (isObject(key)) {
    var ret = {}
    for (var name in key) {
      ret[name] = this.declare(name, key[name])
    }
    return ret
  } else {
    this.maps[key] = val
    let ret = this[key] = (opts, fn) => {
      if (!isObject(opts)) {
        opts = {}
      }
      if (isFunction(opts)) {
        fn = opts
      }
      return this._send(key, opts, fn)
    }
    return ret
  }
}

Api.prototype._send = function (api, opts, fn) {
  let map = this.maps[api]

    // 发送
  this.emit('send', api, opts, map)

    // url 合并
  var path = (opts.url || map.url || '')
  if (!/^http(s)?:/.test(path)) {
    if (path && path[0] === '/') { // 去掉前面的 /
      path = path.substr(1, path.length)
    }
    opts.url = this.baseUrl + path
  } else {
    opts.url = path
  }
    // 参数 合并
  [
    'method',
    'dataType',
    'timeout',
    'headers'
  ].forEach(function (key) {
    if (!(key in opts)) {
      if (key in map) {
        opts[key] = map[key]
      }
    }
  })

  opts.dataType || (opts.dataType = 'JSON')
  opts.method || (opts.method = 'POST')

  return this.ajax(api, opts, (ret) => {
    this.emit('recv', api, opts, ret)
    fn && fn(ret)
  }, map || {})
}
