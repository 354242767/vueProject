# learning vue.js

> A Vue.js project

## Build Setup

``` bash
---Vue 提供一个官方命令行工具，可用于快速搭建大型单页应用 vue-cli。
# 全局安装 vue-cli
$ npm install --global vue-cli
$ vue -V
> 2.9.3

# 创建一个基于 webpack 模板的新项目
$ vue init webpack my-project
> Project name(my-project) Y
> Project description(A Vue.js project) Y
> Author tiger
> Install vue-router Y
> Use ESlint... Y
> Set up unit test N
> Setup e2e tests... N
> Should we... 
  Yes,use NPM Y

# installing project dependencies ...

# Project initialization finished！

$ cd my-project
$ npm run dev

搞定，走你
localhost：8080
```

## 本项目涉及内容
### 所有页面共用组件
1. **layout.vue**
  1. dialog.vue 弹出框组件
  2. logForm.vue 登录组件
  3. regForm.vue 注册组件
  4. 路由
### 首页index
1. 导航栏
1. 轮播组件
### 详情页detail
1. base组件
  1. counter.vue
  2. chooser.vue
  3. mulChooser.vue
  4. selection.vue
2. 路由
3. 购买弹框组件
### 订单页orderList
1. base组件
  1. selection.vue
  2. datepicker.vue
2. 关键词
3. 表格分页
4. 表格排序

###项目截图orderList
**首页**

![index.html](/src/assets/images/vue-01.jpg)

![index.html](/src/assets/images/vue-02.png)

![index.html](/src/assets/images/vue-03.png)

![index.html](/src/assets/images/vue-04.jpg)

![detail.html](/src/assets/images/vue-05.png)

![detail.html](/src/assets/images/vue-06.png)

![orderList.html](/src/assets/images/vue-07.png)
