<template>
  <div class="test">
    <test info="测试1"></test>
    <button @click="onClick">请求</button>
  </div>
</template>

<script>
var user = { username: "李俊鹏", password: "123456" };
export default {
  name: "testAxios",
  methods: {
    onClick() {
      var bcrypt = require("bcryptjs");
      var salt = bcrypt.genSaltSync(10);
      console.log(salt);
      var hash = bcrypt.hashSync("test", salt);
      console.log(hash);
      var res = bcrypt.compareSync("test", hash);
      console.log(res);

      this.$axios({
        method: "post",
        url: "http://localhost:8080/login",
        params: {
          username: "123123",
          password: bcrypt.hashSync("test", 10),
        },
        auth: {
          username: "123123",
          password: "123123",
        },
        data: user,
        responseType: "text",
        headers: {
          "Access-Control-Allow-Origin": "*",
          //'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept, client_id, uuid, Authorization',
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Method": "*",
        },
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
  },
};
</script>