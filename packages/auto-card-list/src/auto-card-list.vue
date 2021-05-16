<template>
  <div>
    <el-card
      class="model"
      v-for="(item, key) in dataList"
      :key="key"
      body-style="padding: 5px"
    >
      <div slot="header" class="model_header">
        {{ key }}
      </div>
      <template v-if="Array.isArray(item)">
        <el-card class="model_card" v-for="(val1, key1) in item" :key="key1">
          <auto-carousel
            :source="val1"
            class="model_card_carousel"
          ></auto-carousel>
        </el-card>
      </template>
      <template v-else-if="typeof item == 'object'">
        <el-card class="model_card">
          <auto-carousel
            :source="item"
            class="model_card_carousel"
          ></auto-carousel>
        </el-card>
      </template>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "auto-card-list",
  props: {
    dataList: {
      default: () => {
        return { "dear visitor": {context:"welcome"}};
      },
    },
  },
};
</script>

<style>
.model {
  background-image: -webkit-linear-gradient(left, #59c2fd, #3f79f4);
  text-align: center;
  margin: 0px 0px 5px 0px;
  display: block;
  width: 100%;
  height: auto;
}

.model_header {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: x-large;
  font-style: initial;
}

.model_card {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  background-image: -webkit-linear-gradient(left, #59c2fd, #3f79f4);
  margin: 2px;
  display: inline-block;
  width: 318px;
}
.el-card__body {
  padding: 3px;
}
</style>