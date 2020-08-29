<template>
  <div v-html="msg">

  </div>
</template>

<script>
import { createSocket, sendWSPush } from '../../utils/websocket'

export default {
  name: 'WebSocket',
  data() {
    return {
      msg: ''
    }
  },
  watch: {
    msg(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$message.success(`原来是${oldVal}，现在是${newVal}`)
      }
    }
  },
  methods: {
    getData() {
      let _this = this
      // 创建
      createSocket()
      // 发送数据
      sendWSPush('')

      // 监听相应数据
      const getDataFn = function(e) {
        _this.msg = e.detail.data.data
        console.log(e)
      }
      window.addEventListener('onmessageWS', getDataFn)
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<!--<script>-->
<!--  export default {-->
<!--    name: "WebSocket",-->
<!--    data() {-->
<!--      return {-->
<!--        path: "ws://192.168.10.14:7000/websocket/read",-->
<!--        socket: "",-->
<!--        msg: ""-->
<!--      }-->
<!--    },-->
<!--    methods: {-->
<!--      // websocket-->
<!--      init: function () {-->
<!--        if (typeof (WebSocket) === "undefined") {-->
<!--          alert("您的浏览器不支持socket")-->
<!--        } else {-->
<!--          // 实例化socket-->
<!--          this.socket = new WebSocket(this.path)-->
<!--          // 监听socket连接-->
<!--          this.socket.onopen = this.open-->
<!--          // 监听socket错误信息-->
<!--          this.socket.onerror = this.error-->
<!--          // 监听socket消息-->
<!--          this.socket.onmessage = this.getMessage-->
<!--        }-->
<!--      },-->
<!--      open: function () {-->
<!--        console.log("socket连接成功")-->
<!--      },-->
<!--      error: function () {-->
<!--        console.log("连接错误")-->
<!--      },-->
<!--      getMessage: function (msg) {-->
<!--        console.log(msg)-->
<!--      },-->
<!--      send: function () {-->
<!--        // 发送数据-->
<!--        this.socket.send(params)-->
<!--      },-->
<!--      close: function () {-->
<!--        console.log("socket已经关闭")-->
<!--      }-->
<!--    },-->
<!--    mounted() {-->
<!--      this.init()-->
<!--    },-->
<!--    destroyed() {-->
<!--      // 销毁监听-->
<!--      this.socket.onclose = this.close-->
<!--    }-->
<!--  }-->
<!--</script>-->

<style scoped lang="less">

</style>