// 整个库的入口文件
import { AxiosRequestConfig } from './types'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  // 利用XML对象发送逻辑
  xhr(config)
}

// 发送config到xhr(config)之前, 需要对config处理
function processConfig(config: AxiosRequestConfig): void {
  // 转化url
  config.url = transformURL(config)
}

function transformURL(config: AxiosRequestConfig): string {

}

export default axios
