<template>
    <div class="home">
        <el-button type="primary">主要按钮</el-button>
        <p>{{ CDATA.NAME }}</p>
        <p>{{ msg | wordLimit(9)}}</p>
        <p>{{ msg2 | wordLimit(9)}}</p>
        <p>{{ "" | getDate(true) }}</p>
        <p>{{ letter | getLetter(6) }}</p>
        <p>{{ phone | hideNum(3) }}</p>
        <p>{{ idCard | hideNum(2,2) }}</p>
        <div id="dv" ref="dv">

        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                msg: "你好黄寺大街浩丰科技大煞风景肯定会是分开较好的设计费厚大司考交话费的空间是否对会计师",
                msg2: 123456789132456789,
                letter: "AbcDefG",
                phone: 18955911468,
                idCard: "341023199608142010",
                arr: ["小明", "小白", "小兰", "小黄", "小紫", "小刚", "小智", "小霞", 4, 5],
                obj: {
                    a: 1,
                    b: 2,
                    c: {
                        t: "小明"
                    }
                },
                obj2: {}
            }
        },
        methods: {},
        mounted() {
            this.tool.test()
            this.obj2 = this.tool.deepCopy(this.obj)
            this.tool.breakArr(this.arr, 2, 2);
            this.tool.saveS("obj", this.arr, 2)
            this.tool.getS("obj")
            this.tool.getURL();
            this.$refs.dv.style.backgroundColor=this.tool.getColor(.1)
        }
    }
</script>

<style lang="less">
    #dv{
        width: 300px;
        height: 300px;
        border: 1px solid #000;
    }
</style>