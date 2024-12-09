<template>
	<view :style="{minHeight:$height(),padding:'0px 3%'}">
		<u-radio-group placement="column" iconPlacement="right" @change="change" :value="value">
			<u-radio v-for="(item,index) in data" :key="index" :customStyle="{marginBottom: '8px'}"
				:label="`${item}`" :name="index+''">
			</u-radio>
		</u-radio-group>
	</view>

</template>

<script>
	export default {
		name: "statusModal",
		data() {
			return {
				
			};
		},
		props: {
			value: {
				type: String,
				default: null
			},
			data: {
				type: Array,
				default: []
			}
		},

		methods: {

			change(e) {
				this.$emit("change", e)
			},
			close() {
				this.$emit("close")
			},
		}
	}
</script>

<style lang="scss" scoped>

	.org-name {
		color: #606266;
		font-size: 15px;
		line-height: 15px;
		margin-bottom: 8px;
	}

	.active {
		color: #0083ff;
	}


</style>