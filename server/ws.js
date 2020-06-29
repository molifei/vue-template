const ws = require("ws")

// 启动websocket服务器
const wsServer = new ws.Server({
  host: "127.0.0.1",
  port: 2600
});

console.log("WebSocket server is listening at http://127.0.0.1:2600")

// 建立连接
function on_server_client_comming(wsObj) {
  console.log("request comming")
  websocket_add_listener(wsObj)
}

wsServer.on("connection", on_server_client_comming)

// 事件处理逻辑
const websocket_add_listener = function (wsObj) {
  let i = 0;
  wsObj.on("message", data => {
    console.log(`request data:${data}`)
    // setTimeout(() => {
    //     wsObj.send("1秒延迟之后，收到，处理中")
    // }, 1000)
    // // 处理
    // setTimeout(() => {
    //     wsObj.send("2秒延迟，返回数据")
    // }, 2000)
    // setTimeout(() => {
    //     wsObj.send("3秒延迟，返回数据")
    //     wsObj.close()
    // }, 3000)
    setTimeout(() => {
      i++;
      wsObj.send(`第${i}次`)
    },1)
  })

  wsObj.on("close", function () {
    console.log("request close")
  })

  wsObj.on("error", err => {
    console.log("request error", err)
  })

}
