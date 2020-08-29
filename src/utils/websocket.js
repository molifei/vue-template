/*
 * 连接websocket
 * @author WYK
 * @date 2020-05-18 15:23:46
 */

// url
const WSS_URL = 'ws://127.0.0.1:2600'
// const WSS_URL = "ws://192.168.10.14:7000/websocket/read"
// const WSS_URL = "ws://121.40.165.18:8800"
let Socket;
let setIntervalWebsocketPush = null

/** 建立连接 */
export function createSocket() {
  if (!Socket) {
    console.log('建立websocket连接')
    Socket = new WebSocket(WSS_URL)
    Socket.onopen = onopenWS
    Socket.onmessage = onmessageWS
    Socket.onerror = onerrorWS
    Socket.onclose = oncloseWS
  } else {
    console.log('websocket已连接')
  }
}

/** 打开WS之后发送 */
export function onopenWS() {
  sendPing() // 发送
}

/** 连接失败重连 */
export function onerrorWS() {
  clearInterval(setIntervalWebsocketPush)
  Socket.close()
  createSocket() // 重连
}

/** WS数据接收统一处理 */
export function onmessageWS(e) {
  window.dispatchEvent(new CustomEvent('onmessageWS', {
    detail: {
      data: e
    }
  }))
}

/** 发送数据
 * @param eventType
 */
export function sendWSPush(eventTypeArr) {
  const obj = {
    appId: 'airShip',
    cover: 0,
    event: eventTypeArr
  }
  if (Socket !== null && Socket.readyState === 3) {
    Socket.close()
    createSocket() // 重连
  } else if (Socket.readyState === 1) {
    Socket.send(JSON.stringify(obj))
  } else if (Socket.readyState === 0) {
    setTimeout(() => {
      Socket.send(JSON.stringify(obj))
    }, 3000)
  }
}

/** 关闭WS */
export function oncloseWS() {
  clearInterval(setIntervalWebsocketPush)
  console.log('websocket已断开')
}

/** 发送 */
export function sendPing() {
  Socket.send('ping')
  setIntervalWebsocketPush = setInterval(() => {
    Socket.send('ping')
  }, 3000)
}
