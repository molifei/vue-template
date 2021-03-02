<template>
  <div>
    <img src="@/assets/img/pika.png" alt="" width="200" height="200" id="img1" style="display: none">

    <div id="img-wrap"></div>

    <el-button @click="downloadZip">下载压缩文件</el-button>

    <el-upload
        class="upload-demo"
        action="http://localhost:2600/uploadOne"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :before-upload="beforeUpload"
        multiple
        ref="upload"
        :limit="1"
        :on-exceed="handleExceed"
        :on-success="handleSuccess"
        :file-list="fileList">
      <el-button><i class="iconfont iconupload"></i>上传文件</el-button>
      <div slot="tip" class="el-upload__tip">只支持ZIP格式文件，文件大小需小于15M。</div>
    </el-upload>
  </div>
</template>

<script>

import JSZip from 'jszip'
import FileSaver from 'file-saver';

export default {
  name: 'UploadZip',

  data() {
    return {
      fileList: []
    }
  },

  methods: {

    // 创建图片
    createImg(src) {
      let img = document.createElement('img')
      img.src = src
      img.alt = '123'
      img.id = 'img'
      img.width = '300'
      img.height = '300'
      // img.style.display = 'none'
      return img
    },

    // 下载zip文件
    async downloadZip() {
      let jz = new JSZip()

      new Promise((resolve, reject) => {
        // let img = this.createImg(require('@/assets/img/xb.jpg'))
        let img = this.createImg('http://cdn.wangyankai.top/img/xb.jpg')
        // let img = document.getElementById('img1')
        resolve(img)
      })
        .then(res => {
          return this.$tools.imgToBase64(res)
        })
        .then(imgData => {
          console.log(imgData)

          jz.file('Hello.txt', 'Hello World\n123');
          jz.file('Hello.xls', 'Hello World\n123');
          jz.file('README.md', 'Hello World\n');
          // 压缩一个文件夹，内部包含一个图片（可以压缩多个文件和文件夹）
          jz.folder('img').file('1.jpg', imgData.substring(imgData.indexOf(',') + 1), { base64: true });
          // 异步生成压缩文件
          jz.generateAsync({ type: 'blob' }).then(function(content) {
            // 保存到本地
            FileSaver(content, 'example.zip');
          });
        })
        .catch(e => {
          console.log(e)
        })

    },

    // 上传
    // 文件列表移除文件
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    // 点击文件列表中已经上传的文件
    handlePreview(file) {
      console.log(file);
    },
    // 超出限制
    handleExceed(files, fileList) {
      this.$message({
        message: `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`,
        type: 'warning'
      });
    },
    // 移除前
    beforeRemove(file, fileList) {
      // 自动过滤大小不符合标准的文件
      if (this.fileSize === 0) {
        return true;
      } else {

        return this.$confirm(`确定移除 ${file.name}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        })
      }
    },
    // 上传前，用于限制文件类型与大小
    beforeUpload(file) {
      console.log(file)
      return

      let flag = true

      var jz = new JSZip();
      jz.loadAsync(file)
        .then(function(file) {

          let nameArray = []
          console.log(file.files)
          let content = file.files
          for (let k in content) {
            nameArray.push(content[k].name)
          }
          nameArray.sort()

          if (JSON.stringify(nameArray) !== '["PH10_V1.bin","PH10_V1.dat","manifest.json"]') {
            flag = false
          }
          return flag
        })
        .then(res => {
          if (!res) {
            this.$refs.upload.handleRemove(file);
            this.$refs.upload.abort()
            return false
          }
          console.log(1)
          // 文件类型限制
          let fileType = file.name.replace(/.+\./, '');
          if (fileType !== 'zip') {
            this.$message({
              message: '仅支持ZIP格式文件',
              type: 'warning'
            });
            return false;
          }
          // 文件大小显示 1 符合标准      0 不合标准
          this.fileSize = file.size / 1024 < 15 * 1024 ? 1 : 0;
          // console.log(this.fileSize);
          if (this.fileSize === 0) {
            this.$message.warning('文件需小于15M');
            return false;
          }
        })

    },

    // 成功
    handleSuccess(res, file, fileList) {
      // 成功则存储地址
      if (res.status === true) {
        this.uploadTip = false;
        this.path = res.data;
      }
    },
  }
}
</script>

<style scoped lang="less">

</style>
