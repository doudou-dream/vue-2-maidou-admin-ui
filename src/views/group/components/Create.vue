<template>
  <el-form ref="form" :model="data" :rules="rules" label-width="100px">
    <el-form-item :label="'名称'" prop="title">
      <el-input v-model.trim="data.title" :placeholder="'请填写名称'" />
    </el-form-item>
    <el-form-item :label="'简介'">
      <el-input v-model.trim="data.description" type="textarea" rows="6" :placeholder="'请填写简介'" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { create } from '@/api/group'

export default {
  name: 'AdminCreate',
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
  created() {
  },
  methods: {
    submit() {
      const thiz = this

      this.$refs.form.validate(valid => {
        if (!valid) {
          return false
        }

        create({
          title: this.data.title,
          description: this.data.description
        }).then(response => {
          this.$message({
            message: '添加成功',
            type: 'success',
            duration: 1500,
            onClose() {
              if (thiz.$refs.form !== undefined) {
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
