<template>
  <div class="not-found">
    <section>
      <img src="@/assets/img/404/404.png" alt="">
    </section>
    <section>
      <img src="@/assets/img/404/404_right_01.png" alt="">
      <img src="@/assets/img/404/404_right_02.png" alt="">
      <img src="@/assets/img/404/404_right_03.png" alt="">
      <router-link to="/" tag="div">返回首页</router-link>
    </section>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped lang="less">
  @color: #eabc3d;

  .not-found {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: @color;
    padding: 0 280px;

    section {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 10px;

      &:nth-of-type(1) {
        img {
          height: 50%;
        }
      }

      &:nth-of-type(2) {
        flex-direction: column;
        align-items: flex-start;

        img {
          &:nth-of-type(1) {
            height: 100px;
          }

          &:nth-of-type(2) {
            height: 50px;
            margin-top: 60px;
            margin-bottom: 30px;
          }

          &:nth-of-type(3) {
            height: 30px;
          }
        }

        div {
          width: 150px;
          height: 40px;
          background-size: contain;
          background-color: #fff;
          border-radius: 15px;
          color: @color;
          line-height: 40px;
          text-align: center;
          font-size: 20px;
          margin-top: 80px;
          cursor: pointer;
        }
      }
    }
  }
</style>
