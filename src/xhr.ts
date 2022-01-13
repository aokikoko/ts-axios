// 实现请求逻辑
import {AxiosRequestConfig} from './types'
export default function xhr(config: AxiosRequestConfig): void {
  // 利用XML对象发送逻辑
  const { data = null, url, method='get' } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
