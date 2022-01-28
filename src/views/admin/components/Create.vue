<template>
  <el-form ref="form" :model="data" :rules="rules" label-width="100px">
    <el-form-item :label="'账号'" prop="name">
      <el-input v-model.trim="data.name" :placeholder="'请填写账号'" />
    </el-form-item>
    <el-form-item :label="'昵称'" prop="nickname">
      <el-input v-model.trim="data.nickname" :placeholder="'请填写昵称'" />
    </el-form-item>
    <el-form-item :label="'简介'" prop="introduce">
      <el-input v-model.trim="data.introduce" type="textarea" rows="6" :placeholder="'请填写简介'" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { create } from '@/api/admin'

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
        name: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '昵称不能为空', trigger: 'blur' }
        ]
      },
      data: {
        name: '',
        nickname: '',
        avatarKey: '',
        introduce: ''
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
          name: this.data.name,
          nickname: this.data.nickname,
          introduce: this.data.introduce
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
