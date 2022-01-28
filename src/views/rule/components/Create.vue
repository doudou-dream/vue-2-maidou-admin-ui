<template>
  <el-form ref="form" :model="data" :rules="rules" label-width="100px">
    <el-form-item :label="'名称'" prop="title">
      <el-input v-model.trim="data.title" :placeholder="'请填写名称'" />
    </el-form-item>
    <el-form-item :label="'父id'" prop="parent_id">
      <el-cascader
        v-model="data.parent_id"
        :options="options"
        :props="props"
        clearable
      />
    </el-form-item>
    <el-form-item :label="'url'" prop="url">
      <el-input v-model.trim="data.url" :placeholder="'请填写url'" />
    </el-form-item>
    <el-form-item :label="'method'" prop="method">
      <el-select v-model="data.method" placeholder="请选择">
        <el-option
          v-for="item in method"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="'slug'" prop="slug">
      <el-input v-model.trim="data.slug" :placeholder="'请填写slug'" />
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
import { create, list } from '@/api/rule'

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
        ], parent_id: [
          { required: true, message: 'parent_id不能为空', trigger: 'blur' }
        ], url: [
          { required: true, message: 'url不能为空', trigger: 'blur' }
        ], method: [
          { required: true, message: 'method不能为空', trigger: 'blur' }
        ], slug: [
          { required: true, message: 'slug不能为空', trigger: 'blur' }
        ]
      },
      props: { checkStrictly: true, value: 'id', label: 'title' },
      data: {
        title: '',
        url: '',
        method: '',
        slug: '',
        parent_id: ['0'],
        description: ''
      },
      options: [{
        id: '0',
        title: '顶级'
      }],
      method: [
        {
          value: 'OPTIONS',
          label: 'OPTIONS'
        },
        {
          value: 'GET',
          label: 'GET'
        },
        {
          value: 'POST',
          label: 'POST'
        },
        {
          value: 'PATCH',
          label: 'PATCH'
        },
        {
          value: 'DELETE',
          label: 'DELETE'
        },
        {
          value: 'PUT',
          label: 'PUT'
        }
      ]
    }
  },
  created() {
    list().then(res => {
      console.log(res.data.data)
      this.options = [...this.options, ...res.data.data]
      console.log(this.options)
    })
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
          url: this.data.url,
          method: this.data.method,
          slug: this.data.slug,
          parent_id: this.data.parent_id[0],
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
