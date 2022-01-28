<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>角色管理</span>
      </div>

      <div class="filter-container">
        <el-input v-model="listQuery.searchword" :placeholder="'请输入关键字'" clearable style="width: 200px;margin-right: 10px;" class="filter-item" @keyup.enter.native="handleFilter" />

        <el-select v-model="listQuery.order" style="width: 140px;margin-right: 10px;" class="filter-item" @change="handleFilter">
          <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>

        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          {{ '搜索' }}
        </el-button>
        <el-button v-waves :disabled="!checkPermission(['maidou.group.create'])" class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">
          {{ '添加' }}
        </el-button>
      </div>

      <el-table
        v-loading="listLoading"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column min-width="150px" :label="'名称'">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="110px" align="center" :label="'授权'">
          <template slot-scope="scope">
            <el-button :disabled="!checkPermission(['maidou.group.access'])" type="warning" size="mini" @click="handleAccess(scope.$index, scope.row)">
              授权
            </el-button>
          </template>
        </el-table-column>

        <el-table-column min-width="160px" align="center" :label="'添加时间'">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" :label="'操作'" min-width="350">
          <template slot-scope="scope">
            <el-button :disabled="!checkPermission(['maidou.group.update'])" type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">
              {{ '编辑' }}
            </el-button>
            <el-button :disabled="!checkPermission(['maidou.group.detail'])" type="info" size="mini" icon="el-icon-info" @click="handleDetail(scope.$index, scope.row)">
              {{ '详情' }}
            </el-button>
            <el-button v-permission="['maidou.group.delete']" type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">
              {{ '删除' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-card>

    <el-dialog :title="'角色详情'" :visible.sync="detail.dialogVisible">
      <detail :data="detail.data" />
    </el-dialog>

    <el-dialog :title="'添加角色'" :visible.sync="create.dialogVisible" @close="getList">
      <create :item="create" />
    </el-dialog>

    <el-dialog :title="'编辑角色'" :visible.sync="edit.dialogVisible" @close="getList">
      <edit :item="edit" />
    </el-dialog>

    <el-dialog :title="'角色授权'" :visible.sync="access.dialogVisible">
      <access :item="access" />
    </el-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import permission from '@/directive/permission/index.js' // 权限判断指令
import checkPermission from '@/utils/permission' // 权限判断函数
import Detail from '@/components/Maidou/Detail'
import Edit from './components/Edit'
import Create from './components/Create'
import Access from './components/Access'
import { list, detail, del } from '@/api/group'
import { parseTime } from '@/utils'
export default {
  name: 'AdminIndex',
  components: { Pagination, Detail, Edit, Create, Access },
  directives: { waves, permission },
  filters: {
    parseTime
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        searchword: '',
        order: 'DESC',
        status: '',
        page: 1,
        limit: 10
      },
      sortOptions: [
        { key: 'ASC', label: '正序' },
        { key: 'DESC', label: '倒叙' }
      ],
      create: {
        dialogVisible: false
      },
      edit: {
        dialogVisible: false,
        id: ''
      },
      detail: {
        dialogVisible: false,
        data: []
      },
      access: {
        id: '',
        name: '',
        dialogVisible: false
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    checkPermission,
    getList() {
      this.listLoading = true
      list({
        search_word: this.listQuery.searchword,
        order: this.listQuery.order,
        status: this.listQuery.status,
        start: (this.listQuery.page - 1) * this.listQuery.limit,
        limit: this.listQuery.limit
      }).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate() {
      this.create.dialogVisible = true
    },
    handleEdit(index, row) {
      this.edit.dialogVisible = true
      this.edit.id = row.id
    },
    handleAccess(index, row) {
      this.access.id = row.id
      this.access.name = row.title
      this.access.dialogVisible = true
    },
    handleDetail(index, row) {
      detail(row.id).then((res) => {
        this.detail.dialogVisible = true
        const data = res.data
        this.detail.data = [
          {
            name: 'ID',
            content: data.id,
            type: 'text'
          },
          {
            name: '名称',
            content: data.title,
            type: 'text'
          },
          {
            name: '简介',
            content: data.description,
            type: 'text'
          },
          {
            name: '加入时间',
            content: data.create_time,
            type: 'time'
          },
          {
            name: '最近活动',
            content: data.update_time,
            type: 'time'
          },
          {
            name: '最近活动IP',
            content: data.update_ip,
            type: 'text'
          }
        ]
      })
    },
    handleDelete(index, row) {
      const thiz = this
      this.$confirm('确认要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del(row.id).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1500,
            onClose() {
              thiz.list.splice(index, 1)
            }
          })
        })
      }).catch(() => {

      })
    }
  }
}
</script>

<style scoped>
.pagination-container {
  padding: 5px 2px;
}
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
