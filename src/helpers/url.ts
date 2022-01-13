import { isDate, isObject } from './util'

// 这里不调用window.encodeURI, 因为还需要对特殊字符处理
function encode(val: string):string {
  // 比如@, : 等这些字符编译成转义后的字符串, 然后再转义回来
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/ig, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/ig, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/ig, '[')
    .replace(/%5D/ig, ']')
}

export default buildURL(url: string, params?: any): string {
  // 对params判断, 如果不传parmas, 就直接返回原样的url
  if (!params) {
    return url
  }

  // 否则
  // 遍历parmas, 遍历结果以key-value形式push到键值对数组中,
  // 再通过join把数组拼接成字符串
  const parts:string[] = []  // string类型的键值对数组

  // 通过object.keys来遍历params对象.foreach拿到每个key
  Object.keys(params).forEach(key => {
    // 通过key拿值
    const val = params[key]
    // 因为val值有多种类型, 需要判断
    if (val === null || typeof val === 'undefined') {
      // 不用放键值对数组中, 直接return
      return
      // 这里的return不是跳出foreach, 因为foreach中return跳不出, 而是跳一下次循环
    }
    // 因为val可能是数组的情况, 所以数组情况需要用数组去表示. 需要考虑是数组和不是数组的情况
    let values = []
    if (Array.isArray(val)) {
      // 如果是数组就赋值给上面定义的values = []这个临时变量
      values = val
      key+= '[]'
    } else {
      // 如果不是数组的情况, 都变成数组
      values = [val]
    }
    values.forEach(val => {
      // 判断类型, 因为可能是日期类型, 对象类型等..
      if (isDate(val)) {
        val = val.toISOString()
      } else if(isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)} = ${encode(val)}`)
    })
  })

  let serializeParams = parts.join('&')
  // 把serializeParams拼接到url后面
  if (serializeParams) {
    // 找url中是否有哈希标识#, 然后忽略#后的东西
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 拼接过程中也还要判断, 如果url已经带了参数, 就是会有问号?
    url += (url.indexOf('?') === -1 ? '?':'&') + serializeParams
  }

  return url
}
