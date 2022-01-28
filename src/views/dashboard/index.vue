<template>
  <div class="dashboard-container">
    <el-row :gutter="24">
      <el-col :span="12">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-card class="box-card">
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col class="font-color-909090" :span="18">账号统计</el-col>
                <el-col class="font-right" :span="6"><el-tag size="mini">实时</el-tag></el-col>
              </el-row>
              <span class="bold">100</span>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="box-card">
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col class="font-color-909090" :span="18">角色统计</el-col>
                <el-col class="font-right" :span="6"><el-tag size="mini">实时</el-tag></el-col>
              </el-row>
              <span class="bold">100</span>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card class="box-card">
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col class="font-color-909090" :span="18">权限统计</el-col>
                <el-col class="font-right" :span="6"><el-tag size="mini">实时</el-tag></el-col>
              </el-row>
              <span class="bold">100</span>
            </el-card>
          </el-col>
        </el-row>
        <div id="main" ref="chart" style="width: 100%;height: 600px;" />
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>版本信息</span>
          </div>
          <div class="text">
            <el-table
              :data="edition"
              :show-header="false"
              stripe
              style="width: 100%"
            >
              <el-table-column
                prop="title"
                align="center"
                width="120"
              />
              <el-table-column
                prop="content"
              />
            </el-table>
          </div>
        </el-card>

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>更新日志</span>
          </div>
          <div class="item" style="height: 230px">
            <el-table
              :data="updateLog"
              :show-header="false"
              stripe
              style="width: 100%"
            >
              <el-table-column
                prop="date"
                align="center"
                width="120"
              />
              <el-table-column
                prop="content"
              />
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      // 版本
      edition: [
        {
          title: '框架名称',
          content: 'maidou-admin'
        }, {
          title: '框架版本',
          content: 'v1.0'
        }, {
          title: '框架特色',
          content: '零基础，前后端分类，集成api文档，极简'
        }, {
          title: 'gitee',
          content: 'https://gitee.com/doudou-y/maidou-admin-api'
        }, {
          title: 'github',
          content: 'https://github.com'
        }
      ],
      // 版本
      updateLog: [
        {
          date: '2022年1月25日',
          content: 'v1 第一版更新'
        }
      ]
    }
  },
  created() {
    setTimeout(() => {
      this.chart()
    }, 200)
  },
  methods: {
    chart() {
      const myChart = echarts.init(this.$refs.chart)
      const option = {
        title: {
          // text: 'Stacked Area Chart'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            label: {
              show: true,
              position: 'top'
            },
            areaStyle: {},
            emphasis: {
              focus: 'series'
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.box-card{
  margin-bottom: 24px;
  .bold{
    display: block;
    text-align: center;
    font-size: 32px;
    font-weight: bold;
  }
}
.font-right{
  text-align: right;
}
.font-color-909090{
  color: #909090;
}
.item{
  overflow: auto;
}
</style>
