<template>
	<auto-form @submit="submit" :model="model" :inline="inline"></auto-form>
</template>

<script>
	export default{
		name:'auto-form-view',
		data:()=>{
			return {
				inline:true,
				model:{
					name:null,
					sex:null,
					date:null
				}
			}
		},
		methods:{
			submit(val){
				console.log('view submit');
			}
		}
	}
</script>