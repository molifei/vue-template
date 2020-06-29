<template>
  <div>
    <el-button type="primary" @click="add">
      点击
    </el-button>
    <p>{{ count }}</p>
    <p>{{ user }}</p>
    <p>{{ toggle }}</p>
    <p>{{ countt }}</p>
  </div>
</template>

<script>
  import {mapState,mapGetters} from "vuex"

  export default {
    name: "StoreTest",
    // computed: mapState({
    //   count: state => state.count,
    //   user: "user",
    //   toggle(state) {
    //     return state.count + this.name + state.user
    //   }
    // }),
    // computed: mapState(["count","user"]),
    // data() {
    //   return {
    //     name: "小明"
    //   }
    // },
    computed: {
      ...mapState({
        count: state => state.count,
        user: "user",
      }),
      ...mapGetters(["countt"]),
      toggle() {
        return this.count + this.name + this.user
      },
    },
    data() {
      return {
        name: "小明"
      }
    },
    methods: {
      add() {
        this.$store.commit("add")
        console.log(this.$store.state.count)
      }
    }
  }
</script>

<style scoped lang="less">

</style>