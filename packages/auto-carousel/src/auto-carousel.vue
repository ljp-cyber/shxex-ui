<template>
  <div>
    <div style="font-size: 20px">{{ title }}</div>
    <el-carousel
      v-if="hasSrc()"
      :interval="interval"
      indicator-position="none"
      :arrow="srcRow() > 1 ? 'hover' : 'never'"
      :height="heigthSrc"
    >
      <el-carousel-item v-for="(item, key) in dataSrc" :key="'dataSrc' + key">
        <template v-if="isImage(item)">
          <img :src="item" class="cardImg" />
        </template>
        <template v-else-if="isAudio(item)">
          <button class="audioBtn" @click="audioPlay(key)"></button>
          <audio :id="key">
            <source :src="item" />
          </audio>
        </template>
      </el-carousel-item>
      <el-carousel-item v-if="dataStrMerge.length >= 3">
        <p
          class="carStrP"
          v-for="(val, key) in dataStrMerge"
          :key="'dataStrMerge' + key"
        >
          {{ val }}
        </p>
      </el-carousel-item>
      <el-carousel-item v-for="(item, key) in dataLong" :key="'dataLong' + key">
        <p class="carStrP">{{ item }}</p>
      </el-carousel-item>
    </el-carousel>
    <el-carousel
      v-if="hasStr() > 0"
      :interval="interval"
      indicator-position="none"
      :arrow="strRow() > 1 ? 'hover' : 'never'"
      :height="heigthStr"
    >
      <el-carousel-item v-for="(item, key) in dataStr" :key="'dataStr' + key">
        <p>{{ item }}</p>
      </el-carousel-item>
      <el-carousel-item v-if="dataDate.length > 0">
        <p
          v-for="(date, key) in dataDate"
          :key="'dataDate' + key"
          class="carStrP"
        >
          {{ date.content }}:{{ date.timestamp }}
        </p>
      </el-carousel-item>
      <el-carousel-item v-if="dataStrMerge.length > 0 && dataStrMerge.length < 3">
        <p
          v-for="(val, key) in dataStrMerge"
          :key="'dataStrMerge' + key"
          class="carStrP"
        >
          {{ val }}
        </p>
      </el-carousel-item>
      <el-carousel-item v-if="dataUrl.length > 0">
        <a
          v-for="(val, key) in dataUrl"
          :key="'dataUrl' + key"
          :href="val"
          target="_blank"
        >
          <p class="carStrP">{{ val }}</p>
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "auto-carousel",
  props: {
    source: {},
    interval: {
      type: Number,
      default: 9000,
    },
    heigthSrc_: {
      type: String,
      default: null,
    },
    heigthStr_: {
      type: String,
      default: null,
    }
  },
  data() {
    return {
      title: "",
      dataUrl: [],
      dataStr: [],
      dataSrc: [],
      dataDate: [],
      dataLong: [],
      dataStrMerge: [],
      heigthSrc: this.heigthSrc_ == null ? "270px" : this.heigthSrc_,
      heigthStr: this.heigthStr_ == null ? "80px" : this.heigthStr_,
    };
  },
  methods: {
    getLength(str) {
      let bytesCount = 0;
      for (let i = 0, n = str.length; i < n; i++) {
        let c = str.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
          bytesCount += 1;
        } else {
          bytesCount += 2;
        }
      }
      return bytesCount;
    },
    setFixStrHeight(maxLength) {
      if (!this.hasSrc()) {
        if (maxLength > 80) this.heigthStr = "350px";
      }
    },
    strRow() {
      let len =
        this.dataStrMerge.length > 0 && this.dataStrMerge.length <= 2 ? 1 : 0;
      let res =
        this.dataStr.length + (this.dataDate.length>0?1:0) + (this.dataUrl.length>0?1:0) + len;
      console.log("strRow" + res+len);
      return res;
    },
    srcRow() {
      let len = parseInt(this.dataStrMerge.length / 8) + 1;
      if (this.dataStrMerge.length < 3) len = 0;
      let res = this.dataLong.length + this.dataSrc.length + len;
      console.log("srcRow" + res);
      return res;
    },
    hasSrc() {
      return this.srcRow() > 0;
    },
    hasStr() {
      return this.strRow() > 0;
    },

    isSource(url) {
      return this.isImage(url) || this.isAudio(url);
    },
    isImage(url) {
      // url = 'asdfa.jpg'
      // url = 'data:image'
      // console.log(url);
      let reg1 = /\.(png|jpg|gif|jfif)$/;
      let reg2 = /^data:image/;
      let res1 = reg1.test(url);
      let res2 = reg2.test(url);
      // console.log(res1 + "," + res2);
      return res1 || res2;
    },
    isData(str) {
      let reg = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
      let res = reg.test(str);
      return res;
    },
    isAudio(url) {
      let reg1 = /\.(aac|mp3)$/;
      let reg2 = /^data:audio/;
      let res1 = reg1.test(url);
      let res2 = reg2.test(url);
      // console.log(res1 + "," + res2);
      return res1 || res2;
    },
    isLink(str) {
      let reg1 = /^(http|https)/;
      let reg2 = /\.(htm|html)$/;
      let res1 = reg1.test(str);
      let res2 = reg2.test(str);
      // console.log(res1 + "," + res2);
      return res2 || res1;
    },
    audioPlay(id) {
      let audio = document.getElementById(id);
      console.log("audio play:" + audio.paused);
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
      // this.$refs.res;
    },
    processData(
      curSource,
      dataSrc,
      dataStr,
      dataDate,
      dataUrl,
      dataLong,
      deep
    ) {
      for (let key in curSource) {
        let val = curSource[key];
        // console.log(key);
        // console.log(typeof key);
        // console.log(val)
        // console.log(typeof val)

        let tempKey = key.toLowerCase();
        if (
          !val ||
          val == "" ||
          tempKey.indexOf("id") >= 0 ||
          tempKey.indexOf("role") >= 0 ||
          tempKey.indexOf("state") >= 0 ||
          typeof val == "number"
        ) {
          // console.log("is unuseful");
          continue;
        }
        if (this.title == "" && tempKey.indexOf("name") >= 0) {
          this.title = val;
          continue;
        }
        if (typeof val == "object") {
          // console.log("is array or obj");
          this.processData(val, dataSrc, dataStr);
          continue;
        }
        if (this.isSource(val)) {
          // console.log("is source");
          let urls = val.split(",");
          for (let i in urls) {
            dataSrc.push(urls[i]);
          }
          continue;
        }
        if (this.isData(val)) {
          dataDate.push({
            content: key,
            timestamp: val,
          });
          continue;
        }
        if (this.isLink(val)) {
          dataUrl.push(val);
          continue;
        }
        if (val.length > 90) {
          dataLong.push(val);
          continue;
        }
        dataStr.push(val);
      }
    },
  },
  beforeUpdate() {
    console.log("carousel beforeUpdate");
    // let dataSrc = [];
    // let dataStr = [];
    // this.processData(this.source, dataSrc, dataStr);
    // this.dataSrc = dataSrc;
    // this.dataStr = dataStr;
    // console.log(dataSrc);
  },
  beforeMount() {
    console.log("carousel beforeMount");
    // let dataSrc = [];
    // let dataStr = [];
    // this.processData(this.source,dataSrc,dataStr);
    // this.dataSrc = dataSrc;
    // this.dataStr = dataStr;
    // console.log(dataSrc)
  },
  created() {
    console.log("carousel created, source:");
    console.log(this.source);
    let dataSrc = [];
    let dataStr = [];
    let dataDate = [];
    let dataUrl = [];
    let dataLong = [];
    this.processData(
      this.source,
      dataSrc,
      dataStr,
      dataDate,
      dataUrl,
      dataLong
    );
    let dataStrMerge = [];
    let maxLength = 0;
    for (let i = 0; i < dataStr.length; i++) {
      let temp = this.getLength(dataStr[i]);
      maxLength = temp > maxLength ? temp : maxLength;
      if (temp < 40) {
        dataStrMerge.push(dataStr[i]);
        dataStr.splice(i, 1);
        i--;
      }
    }
    this.dataSrc = dataSrc;
    this.dataStr = dataStr;
    this.dataDate = dataDate;
    this.dataStrMerge = dataStrMerge;
    this.dataUrl = dataUrl;
    this.dataLong = dataLong;
    this.setFixStrHeight(maxLength);
    console.log(dataSrc);
  },
};
</script>

<style>
.cardImg {
  max-height: 100%;
  max-width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.cardStrP {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.audioBtn {
  height: 74px;
  border-style: solid;
  border-width: 37px 0 37px 60px;
  border-color: transparent transparent transparent black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background : rgb(74, 152, 248);
}
</style>