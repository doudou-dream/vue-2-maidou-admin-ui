<template>
  <el-form ref="form" :model="data" label-width="100px">
    <el-form-item :label="'管理员账号'" prop="name">
      <el-input v-model.trim="name" readonly />
    </el-form-item>

    <el-form-item :label="'分组'" prop="access">
      <el-tree
        ref="tree"
        class="admin-access"
        :props="props"
        :data="list"
        show-checkbox
        node-key="id"
        :highlight-current="true"
        :default-expand-all="false"
        :expand-on-click-node="false"
        @check-change="treeCheck"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  detail,
  group,
  access
  // updateAccess as updateAdminAccess
} from '@/api/admin'

export default {
  name: 'AdminAccess',
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
      name: '',
      data: {
        access: ''
      },
      props: {
        label: 'title'
      },
      list: [],
      checkedids: ''
    }
  },
  watch: {
    item: {
      handler(val, oldVal) {
        if (this.item.dialogVisible === true) {
          this.id = val.id
          this.featchData()
        }
      },
      deep: true
    }
  },
  created() {
    this.id = this.item.id
    this.name = this.item.name
    this.featchData()
  },
  methods: {
    async featchData() {
      await this.fetchGroups()

      await this.fetchAdminDetail()
    },
    fetchAdminDetail() {
      const thiz = this

      return detail(this.id).then(response => {
        const groups = response.data.groups
        if (groups.length > 0) {
          groups.forEach(item => {
            const node = thiz.$refs.tree.getNode(item)
            if (node['isLeaf']) {
              thiz.$refs.tree.setChecked(node, true)
            }
          })
        }
      })
    },
    fetchGroups() {
      return group().then((res) => {
        this.list = res.data.data
      })
    },
    treeCheck() {
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      const HalfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()

      this.checkedids = checkedKeys.concat(HalfCheckedKeys).join(',')
    },
    submit() {
      const thiz = this
      access(this.id, {
        ids: this.checkedids
      }).then(response => {
        this.$message({
          message: '账号授权成功',
          type: 'success',
          duration: 2 * 1000,
          onClose() {
            if (thiz.$refs.form !== undefined) {
              thiz.$refs.form.resetFields()
            }
            thiz.item.dialogVisible = false
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.admin-access {
  background-color: #FFFFFF;
  background-image: none;
  border-radius: 5px;
  border: 1px solid #DCDFE6;
  padding: 8px 5px;
}
</style>
