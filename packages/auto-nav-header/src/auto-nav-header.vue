<template>
  <el-menu
    class="navHeader"
    :mode="mode"
    @select="handleSelect"
    :default-active="this.$router.path"
    router
  >
    <template v-for="(item, key) in routes">
      <el-submenu v-if="item.chilren" :key="key">
        <template slot="title">item.name</template>
        <template v-for="(item1, key1) in item">
          <el-submenu v-if="item1.chilren" :key="key + '' + key1">
            <template slot="title">item1.name</template>
            <template v-if="!item1.chilren">
              <el-menu-item
                v-for="(item2, key2) in item1"
                :index="item2.path"
                :key="key + '' + key1 + '' + key2"
              >
                {{ item2.name }}
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item v-else :key="key + '' + key1" :index="item1.path">{{
            item1.name
          }}</el-menu-item>
        </template>
      </el-submenu>
      <el-menu-item v-else :key="key" :index="item.path">{{
        item.name
      }}</el-menu-item>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: "auto-nav-header",
  props: {
    mode:{
      type: String,
      default: "horizontal"
    },
    routes: {
      type: Array,
      default: () => [
        {
          name: "主页",
          path: "",
        },
      ],
    },
  },
  methods: {
    handleSelect() {
      console.log("handleSelect");
    },
  },
};
</script>

<style>
.navHeader {
  background-image: -webkit-linear-gradient(left, #59c2fd, #3f79f4);
}
</style>