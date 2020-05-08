<template>
    <div class="edit_container ql-snow">
        <quill-editor
                class="ql-editor ql-snow"
                v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                @change="onEditorChange($event)">
        </quill-editor>
        <el-button type="primary" v-on:click="saveHtml">保存</el-button>
        <transition name="plus-icon">
            <div v-if="flag" class="notify">
                <p>检测到有输入过的内容，是否填充</p>
                <a href="javascript:void(0);" @click="toFill(false)">不</a>
                <a href="javascript:void(0);" @click="toFill(true)">好</a>
            </div>
        </transition>
    </div>
</template>

<script>

    export default {
        name: 'Edit',
        data() {
            return {
                flag: false,
                content: ``,
                editorOption: {
                    theme: 'snow'
                }
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            },
        },
        methods: {
            onEditorReady(editor) { // 准备编辑器
            },
            onEditorBlur() {// 失去焦点事件

            },
            onEditorFocus() {// 获得焦点事件

            },
            onEditorChange() {// 内容改变事件
                // 内容存进local
                this.tools.saveS("edit", this.content)
                // 隐藏弹窗
                this.flag && (this.flag = false)
            },
            saveHtml: function (event) {
                console.log(this.content);
            },
            // 进入页面时，检测localStorage中是否有存储的值，防止用户误刷新
            editRemedy() {
                let edit = this.tools.getS("edit")
                if (edit === null) {
                    this.content = ``
                } else {
                    this.flag = true
                }
            },
            toFill(bool) {
                // 判断用户填充操作
                if (bool) {
                    // 如果确认填充，获取存储的内容
                    this.content = this.tools.getS("edit")
                    // 隐藏弹框
                    this.flag = false
                } else {
                    // 如果取消填充
                    this.content = ``
                    // 清空local存储的值
                    this.tools.delS("edit")
                    // 隐藏弹框
                    this.flag = false
                }
            }
        },
        created() {
            this.editRemedy()
        },
        components: {}
    }
</script>

<style lang="less">
    @import url("~quill/dist/quill.snow.css");
    @import url("~quill/dist/quill.core.css");
    @import url("~quill/dist/quill.bubble.css");

    .edit_container {
        .ql-container {
            min-height: 300px;
        }
    }

    .notify {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 280px;
        padding: 20px;
        background-color: #eee;
        border-radius: 10px;

        p {
            font-size: 16px;
            margin-bottom: 10px;
        }

        a {
            font-size: 14px;
            margin-right: 30px;
        }
    }

    .plus-icon-enter-active {
        transition: opacity .2s;
    }

    .plus-icon-enter {
        opacity: 0;
    }

    .plus-icon-leave-active {
        transition: opacity .2s;
    }

    .plus-icon-leave-to {
        opacity: 0;
    }

    .plus-icon-enter-to {
        opacity: 1;
    }
</style>