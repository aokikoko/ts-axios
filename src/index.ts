// 整个库的入口文件
import { AxiosRequestConfig } from './types'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  // 利用XML对象发送逻辑
  xhr(config)
}

export default axios
