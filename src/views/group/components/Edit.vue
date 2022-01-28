<template>
  <el-form ref="form" :model="data" :rules="rules" label-width="100px">
    <el-form-item :label="'名称'" prop="title">
      <el-input v-model.trim="data.title" :placeholder="'请填写名称'" />
    </el-form-item>
    <el-form-item :label="'简介'">
      <el-input v-model.trim="data.description" type="textarea" rows="6" :placeholder="'请填写简介'" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">{{ '提交' }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { detail, update } from '@/api/group'

export default {
  name: 'AdminEdit',
  components: { },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      id: '',
      rules: {
        title: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ]
      },
      data: {
        title: '',
        description: ''
      }
    }
  },
  watch: {
    item: {
      handler(val, oldVal) {
        if (this.item.dialogVisible === true &&
          this.id !== val.id
        ) {
          this.id = val.id
          this.fetchData(val.id)
        }
      },
      deep: true
    }
  },
  created() {
    const id = this.item.id
    this.id = id
    this.fetchData(id)
  },
  methods: {
    fetchData(id) {
      detail(id).then(response => {
        this.data = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    submit() {
      const thiz = this

      this.$refs.form.validate(valid => {
        if (!valid) {
          return false
        }

        update(this.id, {
          title: this.data.title,
          description: this.data.description
        }).then(response => {
          this.$message({
            message: '编辑成功',
            type: 'success',
            duration: 1500,
            onClose() {
              if (thiz.$refs.form !== undefined) {
                thiz.id = ''
                thiz.$refs.form.resetFields()
              }
              thiz.item.dialogVisible = false
            }
          })
        })
      })
    }
  }
}
</script>
