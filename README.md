# autoBackground

> 该项目为自适应后台管理系统，目地是简化开发过程中对数据库增删改查测试流程，只需绑定后台增删改查接口即可实现增删改查测试。该项目以vue为前端框架，二次封装elmentui，实现了autoTable、autoForm、autoBackground组件。该项目为自适应后台管理系统，目地是简化开发过程中对数据库增删改查测试流程，只需绑定后台增删改查接口即可实现增删改查测试。

## 目录结构

``` lua
├── build --项目构建(webpack)相关代码
├── config  --配置目录，包括端口号等
├── node_modules    --npm 加载的项目依赖模块
├── lib --把组件打包成js后的文件存放目录
├── examples    --用于展示组件的demo，把程序主入口配置在这里了
├── packages    --组件代码
├── static  --静态资源目录，如图片、字体等
├── test    --测试相关
├── index.html  --首页入口文件，你可以添加一些 meta 信息或统计代码啥的
├── package.json    --项目配置文件
├── README.md   --项目的说明文档，markdown 格式
```
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
