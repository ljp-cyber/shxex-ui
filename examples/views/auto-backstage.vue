<template>
	<auto-backstage :models="models"></auto-backstage>
</template>

<script>
	export default{
		name:'auto-backstage-view',
		data:()=>{
			return {
				getModelsByBG:false,
				models:{
					name:'商城后台管理系统',
					// url:'http://localhost:8101',
					url:'/api',
					loginUrl:'/blade-auth/oauth/token',
					loginModel:{
						username:'admin',
						password:'21232f297a57a5a743894a0e4a801fc3',
						tenantId: '000000',
						// grant_type: 'password',
						// scope: 'all',
						// client_id:'admin-app',
						// client_secret:'123456'
					},
					loginHeaders:{
						Authorization: 'Basic c2FiZXI6c2FiZXJfc2VjcmV0',
						// tenantId: '000000'
					},
					childModels:[{
						name:'企业管理',
						url:'/company',
						childModel:[{
							name:'企业默认人员',
							url:'/companyProjectDefault',
							queryUrl:'/list',
							queryMethod:'POST',
							queryModel:{
								current: 1,
								size: 10
							}
						}]
					}],
				}
			}
		}
	}
</script>