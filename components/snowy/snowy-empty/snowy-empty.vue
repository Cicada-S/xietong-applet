<template>
	<tui-no-data v-bind="$attrs"  :fixed="fixed ? fixed : false" :imgUrl="imgUrl? imgUrl: image.base64Empty">
		<slot><view class="snowy-color-grey">没有数据哦~</view></slot>
	</tui-no-data>
</template>
<script>
	import image from '@/static/js/image'
	export default{
		props:{
			fixed:{
				type:Boolean,
				default:() => false
			},
			imgUrl:{
				type:String,
				default:() => image.base64Empty
			}
		}
	}
</script>
<style lang="scss" scoped>
</style>