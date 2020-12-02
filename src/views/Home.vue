<template>
  <div class="home">

    <router-link to="/lazy" tag="a">去/lazy</router-link>
    <br>
    <router-link to="/edit" tag="a">去/edit</router-link>
    <br />

    <!--<el-button type="primary" @click="getCloneData">主要按钮</el-button>-->
    <p>{{ $C.NAME }}</p>
    <!--<el-button>点击复制</el-button>-->
    <!--        <banner></banner>-->
    <el-button @click="startSocket">开始</el-button>
    <el-button @click="closeSocket">关闭</el-button>
    <el-button @click="sendSocket">发送</el-button>
    <ul>
      <li v-for="item in list"> {{ item }}</li>
    </ul>
  </div>
</template>

<script>
import Banner from '@/components/Swipe/swipe';
import Connect from '@/utils/websocketClass'

export default {
  name: 'Home',
  components: {
    Banner
  },
  data() {
    return {
      cloneData: { a: 'a', b: 'b', c: ['小明', '小刚'], d: { dd: 'dd' } },
      ws: null,
      list: []
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {
    startSocket() {
      this.ws = new Connect(' ws://127.0.0.1:2600')
      this.ws.create()
      this.ws.msg(this.getData)
    },
    closeSocket() {
      this.ws.close()
      // this.ws = null
    },
    sendSocket() {
      this.ws.send(this.cloneData)
    },
    getData(data) {
      console.log(data)
      this.list.unshift(JSON.parse(data.data))
    }
  },
}
</script>

<style lang="less">
  #dv {
    width: 300px;
    height: 300px;
    border: 1px solid #000;
  }
</style>
