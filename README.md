maidou-admin
===============
>maidou-admin是一套使用 thinkphp6、vue-element-admin  、JWT 和 RBAC鉴权的通用后台管理系统，本项目是前端项目

## 主要新特性
* `maidou-admin` 的前端页面及菜单api接口
* 框架为 `vue2` 和 `element-ui`
* 有账号管理，权限管理，角色管理
* 本项目为前端服务，后台api服务点击可查看 [`maidou-admin`](https://github.com/doudou-dream/vue-2-maidou-admin-api) 后端项目

## 环境要求
* nodejs v14.15.4
* npm 8.3.0
* vue-cli

## 安装

```bash
# 克隆项目
git clone https://gitee.com/doudou-y/maidou-admin-ui.git
git clone https://github.com/doudou-dream/vue-2-maidou-admin-ui.git

# 进入项目目录
cd maidou-admin

# 重命名文件
mv vue.config.js.maidou vue.config.js

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```
![图片](/doc/1643373317475-1.jpg)
## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix

# 测试代理设置
proxy: {
  [process.env.VUE_APP_BASE_API]: {
    target: '填写自己的测试地址', // 测试地址
    changeOrigin: true,
    pathRewrite: {
      ['^' + process.env.VUE_APP_BASE_API]: ''
    }
  }
}
   
```

## 特别鸣谢
感谢以下的项目,排名不分先后

vue : https://cn.vuejs.org/v2/guide/

element-ui : https://element.eleme.io/#/zh-CN

vue-element-admin : https://panjiachen.github.io/vue-element-admin-site/zh/

## 版权信息
`maidou-admin` 遵循 `Apache2` 开源协议发布，在保留本系统版权的情况下提供商业免费使用

该系统所属版权归 maidou(https://github.com/doudou-dream) 所有
