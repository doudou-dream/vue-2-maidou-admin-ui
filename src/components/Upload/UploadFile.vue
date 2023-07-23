<template>
  <div>
    <el-upload
      name="file"
      :headers="headers"
      action="/upload"
      :multiple="multiple"
      :limit="limit"
      :file-list="files"
      :accept="accept"
      :auto-upload="false"
      :on-success="wayOnSuccess"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :on-preview="handleDownload"
    >
      <slot name="default">
        <el-button size="small">上传</el-button>
        <span style="color: #8c939d;margin: 0 0.25rem;font-size: 14px">{{ placeholder }}</span>
      </slot>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { getFormat } from '@/utils'
import request from '@/utils/request'

export default {
  name: 'Upload',
  props: {
    accept: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择文件'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 999
    },
    fileList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      files: [],
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    }
  },
  watch: {
    fileList: {
      handler(val) {
        this.files = val
      }
    }
  },
  mounted() {
    this.files = this.fileList
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handleChange(file, fileList) {
      const formData = new FormData()
      formData.append('file', file.raw)
      request({
        url: '/upload',
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      }).then(res => {
        this.wayOnSuccess(res, file, fileList)
      })
    },
    handleRemove(file) {
      this.files.splice(this.files.findIndex(v => v.url === file.url), 1)
      this.$emit('change', this.files)
    },
    handleDownload(file) {
      this.downloadFile(file.url, file.name)
    },
    wayOnSuccess(res, file, fileList) {
      this.files.push({
        uid: file.uid,
        type: getFormat(file.name),
        name: file.name,
        url: res.data.url,
        path: res.data.path
      })
      this.$emit('change', this.files)
    },
    downloadFile(url, fileName) {
      // 创建一个隐藏的 <a> 元素
      var link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.download = fileName
      link.target = '_blank'

      // 将 <a> 元素添加到页面中
      document.body.appendChild(link)

      // 模拟点击 <a> 元素进行下载
      link.click()

      // 移除 <a> 元素
      document.body.removeChild(link)
    }
  }
}
</script>

<style scoped lang="sass">
//.el-upload-list__item-thumbnail
//  display: flex
//  width: 100%
//  height: 100%
//  align-items: center
//  justify-content: center
//  object-fit: cover
//
//  i
//    font-size: 3rem
</style>
