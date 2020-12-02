export default class WebSocketConnect {
  constructor(url) {
    this.url = url
    this.socket = null
    this.timer = null
  }

  // 创建连接
  create = () => {
    this.socket = new WebSocket(this.url)
    console.warn('连接')
    this.open()
  }

  // 连接之后
  open = () => {
    this.socket.onopen = () => {
      this.sendPing()
    }
  }

  // 接收信息
  msg = (cb) => {
    this.socket.onmessage = function(data) {
      cb(data)
    }
  }

  // 发送信息
  send = (data) => {
    this.socket.send(JSON.stringify(data))
  }

  // 连接错误,重连
  error = () => {
    this.socket.error = () => {
      console.warn('连接错误')
      clearInterval(this.timer)
      this.close()
      this.create()
    }
  }

  // 关闭连接
  close = () => {
    this.send({ msg: 'close' })
    this.socket.close()
    clearInterval(this.timer)
    console.warn('关闭')
  }

  // 心跳检测
  sendPing = () => {
    this.send('ping')
    this.timer = setInterval(() => {
      this.send('ping')
    }, 3000)
  }

}
