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
      <el-button type="primary" @click="submit">{{ '提交' }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { detail, update } from '@/api/admin'

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
        introduce: ''
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
          name: this.data.name,
          nickname: this.data.nickname,
          introduce: this.data.introduce
        }).then(response => {
          this.$message({
            message: '编辑管理员信息成功',
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
