<template>
  <div class="simpleFooter">
    <p>
      今日访问人数：{{ userCount }}|累计访问人次：{{ cumCount }}|总次数：{{
        accessCount
      }}
    </p>
    <slot></slot>
    <p>
      Copyright © {{ startYear }}-{{ new Date().getFullYear() }}
      <a :href="'http://' + domainName">{{ domainName }}.</a> All Rights
      Reserved.
    </p>
    <P>
      <a href="https://beian.miit.gov.cn" target="_blank">{{ ICP }}</a>
    </P>
    <a
      target="_blank"
      :href="
        'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=' +
        extractNumber(PS)
      "
      style="
        display: inline-block;
        text-decoration: none;
        height: 20px;
        line-height: 20px;
      "
    >
      <img :src="PSImg" style="height: 20px; width: 20px" />
      {{ PS }}
    </a>
  </div>
</template>

<script>
export default {
  name: "auto-simple-footer",
  data() {
    return {
      userCount: 0,
      cumCount: 0,
      accessCount: 0,
    };
  },
  props: {
    accessInfoUrl: {
      type: String,
      default: () => "http://localhost:8080",
    },
    startYear: {
      type: Number,
      default: () => new Date().getFullYear(),
    },
    domainName: {
      type: String,
      default: () => "shxex.cn",
    },
    ICP: {
      type: String,
      default: () => "粤ICP备2021021846号",
    },
    PS: {
      type: String,
      default: () => "粤公网安备44030602005573号",
    },
    PSImg: {
      type: String,
      default: () => "http://shxex.cn/images/备案图标.png",
    },
  },
  methods: {
    extractNumber(str) {
      return str.replace(/[^\d]/g, "");
    },
    getAccessInfo() {
      let that = this;
      this.$axios({
        method: "GET",
        url: that.accessInfoUrl,
      })
        .then((res) => {
          let data = that.defExtractDataFor(res);
          console.log("getRes");
          console.log(data);
          if (data) {
            (that.cumCount = data.cumCount),
              (that.accessCount = data.accessCount),
              (that.userCount = data.userCount);
          } else {
            console.log("???");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    defExtractDataFor: (response) => {
      if (response == undefined || response.data == undefined) {
        return undefined;
      }
      if (response.data.data == undefined) {
        return response.data;
      }
      return response.data.data;
    },
  },
  beforeMount() {
    console.log("beforeMount");
    this.getAccessInfo();
  },
};
</script>

<style>
.simpleFooter{
  font-size: 14px;
}
.simpleFooter p {
  margin: 3px;
  line-height: 15px;
}
</style>