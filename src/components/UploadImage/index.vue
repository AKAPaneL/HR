<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :on-preview="preview"
      :on-remove="remove"
      :limit="1"
      :file-list="fileList"
      :on-change="onChange"
      :http-request="customUpload"
      :class="{ disabled: fileList.length > 0 }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDvlSzNdieUJ4PZYLwZy95tV1NXZUF5mMx',
  SecretKey: 'WqzveAYmoeFhy74mKqW6VoxsY1UnvsfE'
})

export default {
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    preview() {
      this.dialogVisible = true
      this.dialogImageUrl = this.fileList[0].url
    },
    remove() {
      this.fileList = []
    },
    customUpload({ file }) {
      // file就是用户选择的文件，也是我们要上传的文件
      cos.uploadFile({
        Bucket: 'hr-1316319910', /* 填写自己的bucket，必须字段 */
        Region: 'ap-guangzhou', /* 存储桶所在地域，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如:1.jpg，a/b/test.txt，图片.jpg）支持中文，必须字段 */
        Body: file, // 上传文件对象
        SliceSize: 1024 * 1024 * 5, /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        if (err) {
          console.log('上传失败', err)
        } else {
          console.log('上传成功', data)
          this.fileList[0].url = `http://${data.Location}`
          // 上传完成，增加一个标记
          this.fileList[0].success = true
        }
      })
    },
    onChange(file, fileList) {
      this.fileList = fileList
    }
  }
}
</script>
<style scoped>
.disabled ::v-deep .el-upload {
  display: none;
}
</style>
