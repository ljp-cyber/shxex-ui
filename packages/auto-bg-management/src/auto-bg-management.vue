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
		    <el-header>
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
			<auto-form :model="user" @submit="doLogin" :inline="false"></auto-form>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		name: 'auto-bg-management',
		data:()=>{
			return {
				isCollapse:true,
				insertFormVisible:false,
				updateFormVisible:false,
				loginFormVisible:false,
				baseUrl:'',
				curAct:'',
				curModel:{},
				tableData:[],
				insertData:{},
				oldData:{},
				updateData:{},
				user:{username:null,password:null},
				token:''
				// token:'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJhZG1pbiJ9XSwibmFtZSI6IjEyMzEyMyIsImV4cCI6MTU5MjYzOTAxNSwiaWF0IjoxNTkyMDM0MjE1fQ.VgrvtjkNiyZsVKt0oMQychQQ4-_U46tGIN6h0Zt1u_o'
			}
		},
		props:{
			models:{
				type:Object,
				default:()=>[]
			}
		},
		methods:{
			testData(){
				var res=[{
					id:1,
					sex:'man',
					name:'ljp',
					address:'huazhou'
				},{
					id:2,
					sex:'man',
					name:'ljh',
					address:'huazhou'
				},{
					id:3,
					sex:'man',
					name:'ljw',
					address:'huazhou'
				}];
				return res;
			},
			select(index,path){
				//console.log('select:'+index+','+path);
				this.baseUrl=this.models.url;
				var curModels=this.models;
				for(var i=0;i<index.length;i+=2){
					var curIndex=Number(index.substr(i,1));
					//console.log(curIndex);
					if(i==index.length-1){
						this.curModel=curModels.childModel[curIndex];
						this.baseUrl+=this.curModel.url;
					}else{
						curModels=curModels.childModels[curIndex];
						this.baseUrl+=curModels.url;
					}
				}
				console.log(this.baseUrl);
				this.tableData=[];
			},
			doAjaxProcess(url,base,method,params,data,suc,fail){
				console.log("请求即将执行，url是："+this.baseUrl+url)
				console.log("请求参数是："+params)
				console.log("请求数据是："+data)
				this.$axios({
					method:method,
					baseURL:base,
					url:url,
					params:params,
					data:data,
					headers:{
						'jwt-token':this.token,
						// 'Access-Control-Allow-Origin':'*',
						// 'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept, client_id, uuid, Authorization',
						// 'Access-Control-Allow-Method':'GET,POST,PUT,DELETE',
						'User-Agent' : 'WEB'
					}
				}).then(suc).catch(fail);
				// .then((response) => {
				// 	console.log('success')
				// 	this.responseSuccessHandler(response);
				// 	suc(response);
				// }).catch(function (error) { // 请求失败根据状态码处理
				// 	console.log('error'+error);
				// });
			},
			doGet(url,method,params,suc,fail){
				this.doAjax1(url,this.baseUrl,method,params,null,suc,fail);
			},
			doPost(url,method,data,suc,fail){
				this.doAjax1(url,this.baseUrl,method,null,data,suc,fail);
			},
			getTips(type,tips){//加了type
				var ref=this;
				function fail(){
					ref.$message({
            type: 'warning',
            message: tips
          });
				}
				return fail;
			},
			failTips(){
				var ref=this;
				function fail(){
					ref.$message({
            type: 'warning',
            message: '请求处理失败，请检查网络后重试'
          });
				}
				return fail;
			},
			doTips(tipsText,doSomething){
				this.$confirm(tipsText, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(doSomething)
        .catch((error) => {
        	console.log(error);
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
			},
			doDelete(data){
				var that=this;
				function suc(response){
					console.log('response.data'+response.data);
					if(response.data==true){
						if(Array.isArray(data)){
							for(var i=0;i<data.length;i++){
								for(var j=0;j<that.tableData.length;j++){
									if(that.tableData[j]==data[i]){
										that.tableData.splice(j,1);
										break;
									}
								}
							}
							return;
						}
						for(var i=0;i<that.tableData.length;i++){
							if(that.tableData[i]==data){
								that.tableData.splice(i,1);
								return;
							}
						}
					}
				}
				var ids=[];
				if(Array.isArray(data)){
					for(var item of data){
						ids.push(item.id);
					}
				}else{
					ids.push(data.id);
				}
				// function fail(){
				// 	console.log('fail');
				// 	suc({data:true});
				// }
				var method=this.curModel.deleteMethod?this.curModel.deleteMethod:'POST';
				this.doTips('删除不可恢复，确定删除吗？',()=>{
					this.doAjax(this.curModel.deleteUrl,method,ids,suc,this.failTips());
				})
			},
			doQuery(data){
				var that=this;
				function suc(response){
					console.log(response.data);
					if(Array.isArray(response.data))
						that.tableData=response.data;
				}
				// function fail(){
				// 	console.log('fail');
				// 	that.tableData=that.testData();
				// }
				var method=this.curModel.queryMethod?this.curModel.queryMethod:'POST';
				this.doAjax(this.curModel.queryUrl,method,data,suc,this.failTips());
			},
			doUpdate(data){
				this.updateFormVisible=false;
				var that=this;
				function suc(response){
					console.log(response.data);
					if(response.data==true){
						for(var i=0;i<that.tableData.length;i++){
							if(that.tableData[i]==that.oldDate){
								that.$set(that.tableData,i,that.updateData);
								that.tableData[i]=that.updateData;
								return;
							}
						}
					}
				}
				// function fail(){
				// 	console.log('fail');
				// 	suc({data:true});
				// }
				var method=this.curModel.updateMethod?this.curModel.updateMethod:'POST';
				this.doAjax(this.curModel.updateUrl,method,data,suc,this.failTips());
			},
			update(data){
				this.oldDate=data;
				this.updateData=JSON.parse(JSON.stringify( data ));;
				this.updateFormVisible=true;
			},
			doInsert(data){
				this.insertFormVisible=false;
				if(data.birthday)data.birthday=data.birthday[0];
				var that=this;
				function suc(response){
					console.log(response.data);
					if(response.data==true){
						that.tableData.push(data);
					}
				}
				// function fail(){
				// 	console.log('fail');
				// 	suc({data:true});
				// }
				var method=this.curModel.insertMethod?this.curModel.insertMethod:'POST';
				this.doAjax(this.curModel.insertUrl,method,data,suc,this.failTips());
			},
			insert(){
				if(!this.curModel.insertModel){
					if(this.tableData==null||this.tableData.length==0){
						this.$message({
	            type: 'warning',
	            message: '没有数据模型，无法添加数据'
	          });
						return;
					}
					this.curModel.insertModel=this.tableData[0];
					for(var item in this.curModel.insertModel){
						this.curModel.insertModel[item]=null;
					}
				}
				this.insertData=JSON.parse(JSON.stringify( this.curModel.insertModel));
				this.insertFormVisible=true;
			},
			doLogin(){
				var that=this;
				function suc(response){
					console.log(response.data)
					that.token=response.data;
					var temp =  that.getTips("登录成功");
					temp();
					that.user.username=null;
					that.user.password=null;
				}
				var method=this.models.loginMethod?this.models.loginMethod:'POST';
				console.log(this.user+','+this.models.url );
				this.doAjax1(this.models.loginUrl,this.models.url ,method,this.user,suc,this.failTips());
			},
			responseSuccessHandler(response){
				console.log("回应处理方法responseSuccessHandler(response)：数据是："+response.data)
				if(response.data=="false"||response.data==false){
					this.loginFormVisible=true;
				}
			},
			responseFailHandler(response){
				console.log("回应处理方法responseFalseHandler(response)：数据是："+response.status)
				if(response.status==407){
					this.loginFormVisible=true;
				}
			}
		}
	}
</script>

<style>
	.el-header {
    background-color: #B3C0D1;
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