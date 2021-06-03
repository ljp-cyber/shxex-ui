<template>
  <el-container>
    <el-header class="homeHeader" height="auto">
      <auto-nav-header :routes="routes"></auto-nav-header>
    </el-header>
    <el-main class="homeMain">
      <router-view/>
    </el-main>
    <el-footer  class="homeFooter" height="auto">
      <slot name="homeFooter"></slot>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "auto-home",
  data: () => {
    return {
      dataList: [],
      activeIndex: "1",
    };
  },
  props: {
    routes:{
      typt: Array,
      default: ()=> [{
        name:'home',
        path:''
      }]
    },
    url: {
      type: String
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
    handleSelect() {},
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
    this.getData();
  },
};
</script>

<style>
.homeMain {
  background-image: -webkit-linear-gradient(left, #59c2fd, #3f79f4);
  padding: 5px;
}

.homeHeader {
  background-image: -webkit-linear-gradient(left, #59c2fd, #3f79f4);
  text-align: center;
}

.homeFooter {
  background-image: -webkit-linear-gradient(left, #59c2fd, #3f79f4);
  font-size: 14px;
  text-align: center;
}
</style>