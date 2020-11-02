<template>
  <div class="home">

    <router-link to="/lazy" tag="a">去/lazy</router-link>
    <br>
    <router-link to="/edit" tag="a">去/edit</router-link>
    <br />

    <el-button type="primary" @click="getCloneData">主要按钮</el-button>
    <p>{{ $C.NAME }}</p>
    <el-button>点击复制</el-button>
    <!--        <banner></banner>-->
  </div>
</template>

<script>
import Banner from '@/components/swipe/swipe';
import { getA, getB } from '../pass/api2'

export default {
  name: 'Home',
  components: {
    Banner
  },
  data() {
    return {
      cloneData: { a: 'a', b: 'b', c: ['小明', '小刚'], d: { dd: 'dd' } },
    }
  },
  created() {
  },
  methods: {
    getCloneData() {
      let data = this.$tools.deepClone(this.cloneData)
      console.log(data)
      data.c.push(77)
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
