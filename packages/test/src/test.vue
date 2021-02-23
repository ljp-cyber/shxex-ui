<template>
	<p>{{info}}</p>
</template>

<script>
	export default{
		name:'test',
		props:{
			info:{
				type:String,
				default:()=>{
					return 'info';
				}
			}
		}
	}
</script>