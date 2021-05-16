<template>
  <el-container>
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">项目</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3">生活</el-menu-item>
        <el-menu-item index="4">后台</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <auto-card-list :dataList="dataList"></auto-card-list>
    </el-main>
    <el-footer height="100px">
      <p>
        今日访问人数：${userCount}|累计访问人次：${cumCount}|总次数：${accessCount}
      </p>
      <p>
        Copyright © 2021-2021 <a href="http://shxex.cn">shxex.cn.</a> All Rights
        Reserved.
      </p>
      <P>
        <a href="https://beian.miit.gov.cn" target="_blank"
          >粤ICP备2021021846号</a
        >
      </P>
      <div style="width: 240px; margin: 0 auto; padding: 0 0">
        <a
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030602005573"
          style="
            display: inline-block;
            text-decoration: none;
            height: 20px;
            line-height: 20px;
          "
          ><img
            src="images/备案图标.png"
            style="float: left; height: 20px; width: 20px"
          />
          <p
            style="
              float: left;
              height: 20px;
              line-height: 20px;
              margin: 0px 0px 0px 5px;
              color: #939393;
            "
          >
            粤公网安备44030602005573号
          </p>
        </a>
      </div>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "auto-card-home",
  data: () => {
    return {
      dataList: [],
      activeIndex:"1"
    };
  },
  props: {
    url: {
      type: String,
      default: () => "http://localhost:8080/myweb/home/1",
    },
    method: {
      type: String,
      default: () => "GET",
    },
    params: {
      type: Object,
      default: () => {},
    },
    data: {
      type: Object,
      default: () => {},
    },
    headers: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    handleSelect(){

    },
    getData() {
      let that = this;
      this.$axios({
        method: that.method,
        url: that.url,
        params: that.params,
        data: that.data,
        headers: that.headers,
      })
        .then((res) => {
          that.dataList = res.data;
          console.log(Object.keys(that.dataList));
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    // document.documentElement.clientHeight;
    this.getData();
  },
};
</script>

<style>
.el-header {
  background-image: -webkit-linear-gradient(left, #59c2fd, #3f79f4);
  color: #333;
  text-align: center;
}
.el-menu {
  background-image: -webkit-linear-gradient(left, #59c2fd, #3f79f4);
}
.el-footer {
  font-size: 14px;
  background-image: -webkit-linear-gradient(left, #59c2fd, #3f79f4);
  color: #333;
  text-align: center;
}
.el-footer p {
  margin: 3px;
  line-height: 15px;
}
.el-main {
  background-image: -webkit-linear-gradient(left, #59c2fd, #3f79f4);
  padding: 5px;
  color: #333;
}
</style>