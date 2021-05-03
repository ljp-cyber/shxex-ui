<template>
	<div>
		<p style="text-align: center;font-size: 25px;">{{models.name}}{{'-'+curModel.name}}</p>
		<el-container>
			<!-- 侧边栏 -->
			<el-aside width="auto">
				<el-switch
				  v-model="isCollapse"
				  active-color="#13ce66"
				  inactive-color="#ff4949">
				</el-switch>
				<el-menu :collapse="!isCollapse" :default-active="curAct" @select="select">
					<template v-for="(item,index) in models.childModels">
						<el-submenu :index="index+''">
			        <template slot="title">
			        	<i class="el-icon-menu"></i>
			        	<span slot="title">{{item.name}}</span>
			        </template>
		        	<template v-for="(item1,index1) in item.childModel">
		          	<el-menu-item :index="index+'-'+index1">{{item1.name}}</el-menu-item>
		          </template>
			        <template v-for="(item1,index1) in item.childModels">
				        <el-menu-item-group v-if="item.childModels.isGroup">
				          <template slot="title">{{item1.name}}</template>
				          <template v-for="(item2,index2) in item1.childModel">
				          	<el-menu-item :index="index+'-'+index1+'-'+index2">{{item2.name}}</el-menu-item>
				          </template>
				        </el-menu-item-group v-else>
		          	<el-submenu :index="index+'-'+index1">
		          		<template slot="title">{{item1.name}}</template>
		          		<template v-for="(item2,index1) in item1.childModel">
				          	<el-menu-item :index="index+'-'+index1+'-'+index2">{{item2.name}}</el-menu-item>
				          </template>
		          	</el-submenu>
			        </template>
			      </el-submenu>
					</template>
				</el-menu>
			</el-aside>
			<el-container>
				<!-- 头 -->
		    <el-header  height="auto">
		    	<auto-form :model="curModel.queryModel" @submit="doQuery" :inline="true">
		    		<template>
		    			<el-button @click="insert">添加</el-button>
		    		</template>
		    	</auto-form>
		    </el-header>
		    <!-- 主 -->
		    <el-main>
		    	<auto-table ref='myTable' :data="tableData" @delete="doDelete" @details="update" ></auto-table>
		    </el-main>
			</el-container>
		</el-container>
		<el-dialog title="添加" :visible.sync="insertFormVisible">
			<auto-form :model="insertData" @submit="doInsert" :inline="false">
			</auto-form>
		</el-dialog>
		<el-dialog title="编辑" :visible.sync="updateFormVisible">
			<auto-form :model="updateData" @submit="doUpdate" :inline="false"></auto-form>
		</el-dialog>
		<el-dialog title="登录" :visible.sync="loginFormVisible">
			<auto-form :model="models.loginModel" @submit="doLogin" :inline="false"></auto-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
  name: "auto-bg",
  data: () => {
    return {
      isCollapse: false,
      insertFormVisible: false,
      updateFormVisible: false,
      loginFormVisible: false,
      baseUrl: "",
      curAct: "",
      curModel: {},
      tableData: [],
      insertData: {},
      oldData: {},
      updateData: {},
      token: null
      // token:"Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbImFsbCJdLCJpZCI6MywiZXhwIjoxNjIwMDkyMzUzLCJhdXRob3JpdGllcyI6WyI1X-i2hee6p-euoeeQhuWRmCJdLCJqdGkiOiI0ODJkN2VlOC1jYzYxLTRlZDQtOTZjMS0yYWZhNzM1Y2M2OWIiLCJjbGllbnRfaWQiOiJhZG1pbi1hcHAifQ.cVCrEvqQYcYOMZYMrzc3exlLIQV0zc80twfudYEQl9BXRZGyx7q_jUfrBzpfSx_CfMnZ_r6Hd-KykGOFagO6Tf7-xQLwc-VyooPiZ0iqodofGnxjGmQQ2Z3D8jTp1cMSBZYOKNaDqFcUW7kK4o11T5LHc27QxFcgErlDjm8EX8I",
    };
  },
  props: {
    models: {
      type: Object,
      default: () => [],
    },
  },
  methods: {
    testData() {
      var res = [
        {
          id: 1,
          sex: "man",
          name: "ljp",
          address: "huazhou",
        },
        {
          id: 2,
          sex: "man",
          name: "ljh",
          address: "huazhou",
        },
        {
          id: 3,
          sex: "man",
          name: "ljw",
          address: "huazhou",
        },
      ];
      return res;
    },
    select(index, path) {
      //选择板块时绑定查询模型
      //console.log('select:'+index+','+path);
      this.baseUrl = this.models.url;
      var curModels = this.models;
      for (var i = 0; i < index.length; i += 2) {
        var curIndex = Number(index.substr(i, 1));
        //console.log(curIndex);
        if (i == index.length - 1) {
          this.curModel = curModels.childModel[curIndex];
          this.baseUrl += this.curModel.url;
        } else {
          curModels = curModels.childModels[curIndex];
          this.baseUrl += curModels.url;
        }
      }
      console.log(this.baseUrl);
      this.tableData = [];
    },
    doAjaxProcess(url, base, method, params, data, suc, fail) {
      console.log("请求即将执行，url是：" + base+url);
      console.log("请求参数是：" + params);
      console.log("请求数据是：" + data);
      console.log("请求token是：" + this.token);
      this.$axios({
        method: method,
        baseURL: base,
        url: url,
        params: params,
        data: data,
        headers: {
          'Authorization': this.token
        },
      })
        .then(suc)
        .catch(fail);
    },
    doGet(url, method, params, suc, fail) {
      this.doAjaxProcess(url, this.baseUrl, method, params, null, suc, fail);
    },
    doPost(url, method, data, suc, fail) {
      this.doAjaxProcess(url, this.baseUrl, method, null, data, suc, fail);
    },

    doAjax(url, method, data, suc, fail) {
      if (method == "GET") {
        this.doGet(url, method, data, suc, fail);
      } else {
        this.doPost(url, method, data, suc, fail);
      }
    },
    getTips(type, tips) {
      //加了type
      var ref = this;
      function fail() {
        ref.$message({
          type: type,
          message: tips,
        });
      }
      return fail;
    },
    writeObj(obj) {
      var description = "";
      for (var i in obj) {
        var property = obj[i];
        description += i + " = " + property + "\n";
      }
      console.log(description);
    },
    failTips() {
      var ref = this;
      function fail(err) {
        let res = err.response;
        ref.$message({
          type: "warning",
          message: "请求处理失败，err=" + err,
        });
        ref.responseFailHandler(res);
      }
      return fail;
    },
    doTips(tipsText, doSomething) {
      this.$confirm(tipsText, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(doSomething)
        .catch((error) => {
          console.log(error);
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    doDelete(data) {
      let that = this;
      function suc(response) {
        let resData = that.responseSuccessHandler(response);
        if(!resData||resData==0){
          return;
        }
        if (Array.isArray(data)) {
          for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < that.tableData.length; j++) {
              if (that.tableData[j] == data[i]) {
                that.tableData.splice(j, 1);
                break;
              }
            }
          }
          return;
        }
        for (let i = 0; i < that.tableData.length; i++) {
          if (that.tableData[i] == data) {
            that.tableData.splice(i, 1);
            return;
          }
        }
      }
      
      let method = this.curModel.deleteMethod
        ? this.curModel.deleteMethod
        : "POST";
      let url = this.curModel.deleteUrl;
      console.log(data);
      if (Array.isArray(data)) {
        let ids = [];
        for (let item of data) {
          ids.push(item.id);
        }
        this.doTips("删除不可恢复，确定删除吗？", () => {
          this.doAjax(this.curModel.deleteUrl, method, ids, suc, this.failTips());
        });
      } else {
        if(this.curModel.deleteUrlAppend){
          url= url + '/' + data.id;
        }
        this.doTips("删除不可恢复，确定删除吗？", () => {
          this.doAjax(url, method, null, suc, this.failTips());
        });
      }
    },
    doQuery(data) {
      var that = this;
      function suc(response) {
        let resData = that.responseSuccessHandler(response);
        if(!resData){
          return;
        }
        if (Array.isArray(resData)) {
          that.tableData = resData;
          return;
        }
        if (Array.isArray(resData.list)) {
          that.tableData = resData.list;
          return;
        }
        that.getTips('warning','结果不是列表，将此对象加入一个列表显示')();
        let res = []
        res.push(resData);
        that.tableData = res;
      }
      console.log(this.curModel.queryUrl);
      var method = this.curModel.queryMethod
        ? this.curModel.queryMethod
        : "POST";
      let url = this.curModel.queryUrl;
      if(this.curModel.queryUrlAppend){
        url = url + '/' + data[this.curModel.queryUrlAppend];
      }
      this.doAjax(url, method, data, suc, this.failTips());
    },
    doUpdate(data) {
      this.updateFormVisible = false;
      var that = this;
      function suc(response) {
        let resData = that.responseSuccessHandler(response);
        if(!resData||resData==0){
          return;
        }
        for (let i = 0; i < that.tableData.length; i++) {
          if (that.tableData[i] == that.oldDate) {
            that.$set(that.tableData, i, that.updateData);
            that.tableData[i] = that.updateData;
            return;
          }
        }
        
      }
      let method = this.curModel.updateMethod
        ? this.curModel.updateMethod
        : "POST";
      let url = this.curModel.updateUrl;
      if(this.curModel.updateUrlAppend){
        url= url + '/' + data.id;
      }
      this.doAjax(url, method, data, suc, this.failTips());
    },
    update(data) {
      this.oldDate = data;
      this.updateData = JSON.parse(JSON.stringify(data));
      this.updateFormVisible = true;
    },
    doInsert(data) {
      this.insertFormVisible = false;
      if (data.birthday) data.birthday = data.birthday[0];
      let that = this;
      function suc(response) {
        let resData = that.responseSuccessHandler(response);
        if(!resData){
          return;
        }
        that.tableData.push(data);
      }
      let method = this.curModel.insertMethod
        ? this.curModel.insertMethod
        : "POST";
      let url = this.curModel.insertUrl;
      this.doAjax(url, method, data, suc, this.failTips());
    },
    insert() {
      if (!this.curModel.insertModel) {
        if (this.tableData == null || this.tableData.length == 0) {
          this.$message({
            type: "warning",
            message: "没有数据模型，无法添加数据",
          });
          return;
        }
        this.curModel.insertModel = this.tableData[0];
        for (var item in this.curModel.insertModel) {
          this.curModel.insertModel[item] = null;
        }
      }
      this.insertData = JSON.parse(JSON.stringify(this.curModel.insertModel));
      this.insertFormVisible = true;
    },
    doLogin() {
      let that = this;
      function suc(response) {
        let resData = that.responseSuccessHandler(response);
        if(!resData){
          return;
        }
        let token = resData;
        if(typeof(resData) == 'object'){
          token = resData.token;
        }
        if(typeof(token) == 'string' && !token.startsWith('Bearer ')){
          that.token = 'Bearer ' + token;
        }
        that.setCookie('Authorization',that.token);
        that.getTips("warning", "登录成功")();
        for (let key in that.models.loginModel) {
          that.models.loginModel[key] = null;
        }
        that.loginFormVisible = false;
      }
      let method = this.models.loginMethod ? this.models.loginMethod : "POST";
      this.doAjaxProcess(
        this.models.loginUrl,
        this.models.url,
        method,
        that.models.loginModel,
        that.models.loginModel,
        suc,
        this.failTips()
      );
    },
    responseSuccessHandler(response) {
      console.log(response);
      let code = this.defExtractCodeFor(response);
      if(code == 200){
        return this.defExtractDataFor(response);
      }
      if(code == 401) {
        this.loginFormVisible = true;
      }
      return undefined;
    },
    responseFailHandler(response) {
      console.log(response);
      let code = this.defExtractCodeFor(response);
      if(code == 401) {
        this.loginFormVisible = true;
      }
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
    defExtractMesFor: (response) => {
      if (
        response == undefined ||
        (response.message == undefined &&
        response.data == undefined)
      ) {
        return undefined;
      }
      if (response.data != undefined && response.data.message != undefined) {
        return response.data.message;
      }
      return response.message;
    },
    defExtractCodeFor: (response) => {
      if (response == undefined || response.status == undefined) {
        return -1;
      }
      if (response.status != 200) {
        return response.status;
      } else if (
        response.data != undefined &&
        response.data.code != undefined
      ) {
        return response.data.code;
      }
      return response.status;
    },
    setCookie(name, value) {  
      var Days = 60; //cookie 将被保存两个月   
      var exp = new Date(); //获得当前时间   
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000); //换成毫秒  
      document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();  
    },
    getCookie(name) {  
      //取出cookie   
      var strCookie = document.cookie;  
      //cookie的保存格式是 分号加空格 "; "  
      var arrCookie = strCookie.split("; ");  
      for ( var i = 0; i < arrCookie.length; i++) {  
          var arr = arrCookie[i].split("=");  
          if (arr[0] == name) {  
              return arr[1];  
          }  
      }  
      return "";  
  }  
  },
  mounted(){
    console.log("mounted");
    this.token = decodeURIComponent(this.getCookie('Authorization'));
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  padding: 10px 10px 10px 10px;
  height: auto;
  line-height: 30px;
}
.el-aside {
  text-align: left;
  color: #333;
}
</style>