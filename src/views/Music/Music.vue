<template>
    <div>
        MUSIC
    </div>
</template>

<script>
    export default {
        name: "Music",
        data() {
            return {}
        },
        methods: {
            async getMv() {
                const res = await this.$api.music.getMv()
                // console.log(res)
            },
            async getDj(){
                const res = await this.$api.dj.getDj()
                console.log(res)
            }
        },
        mounted() {
            this.getMv()
            this.getDj()
        }
    }
</script>

<style scoped>

</style>