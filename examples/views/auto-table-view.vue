<template>
	<auto-table :data="data"></auto-table>
</template>

<script>
	export default{
		name:'auto-table-view',
		data:()=>{
			var item={
        date: "2016-05-01",
        name: "王小虎",
        img:
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        address: "上海市普陀区金沙江路 1518 弄"
		  }
		  var data = Array(20).fill(item);
			var res={
				data:data
			}
			return res;
		}
	}
</script>