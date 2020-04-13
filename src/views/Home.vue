<template>
    <div class="home">
        <el-button type="primary">主要按钮</el-button>
        <p>{{ msg }}</p>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                msg:"你好"
            }
        }
    }
</script>

<style lang="less">

</style>