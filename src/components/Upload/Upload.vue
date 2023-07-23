<template>
  <div>
    <el-upload
      list-type="picture-card"
      name="file"
      :headers="headers"
      action="/upload"
      :multiple="multiple"
      :limit="limit"
      :file-list="files"
      :auto-upload="false"
      :on-success="wayOnSuccess"
      :on-change="handleChange"
    >
      <i slot="default" class="el-icon-plus" />
      <div slot="file" slot-scope="{file}" style="width: 100%;height: 100%">
        <img
          v-if="file.type === 'img'"
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          alt=""
        >
        <div v-if="file.type !== 'img'" class="el-upload-list__item-thumbnail">
          <i class="el-icon-document" />
        </div>
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in" />
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download" />
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete" />
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="imgShow.show" append-to-body>
      <img width="100%" :src="imgShow.url" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { getFormat } from '@/utils'
import request from '@/utils/request'

export default {
  name: 'Upload',
  props: {
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
      imgShow: {
        show: false,
        url: ''
      },
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
    handlePictureCardPreview(file) {
      this.imgShow.url = file.url
      this.imgShow.show = true
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
.el-upload-list__item-thumbnail
  display: flex
  width: 100%
  height: 100%
  align-items: center
  justify-content: center
  object-fit: cover

  i
    font-size: 3rem
</style>
