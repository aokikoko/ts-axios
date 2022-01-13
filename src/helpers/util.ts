const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  // typeof val === 'object'这样不够, 因为val如果是null也是true
  // 所以需要加上!==null
  return val !==null && typeof val === 'object'
}
