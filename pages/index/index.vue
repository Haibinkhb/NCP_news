<template>
	<scroll-view class="content" :scroll-y="true" :enable-back-to-top="true">
		<OverallInfo :overall="overall"></OverallInfo>
		<dailyPics :dailyPics="overall.dailyPics"></dailyPics>
	</scroll-view>
</template>

<script>
	// OverallInfo 组件负责展示疫情信息
	import OverallInfo from "@/components/index/Overall-info.vue"
	import dailyPics from "@/components/dailyPics.vue"
	import cities from "@/components/common/cities.vue"
	export default {
		data() {
			return {
				overall: {},
			}
		},
		components: {
			OverallInfo,
			dailyPics,
			cities
		},
		onLoad() {
			// 获取最新全国疫情总体信息
			this.getOverall('overall')
		},
		methods: {
			getOverall(overall) {
				// 获取最新全国疫情总体信息
				uni.request({
						url: `${this.BaseUrl}${overall}`,
						data: {
							latest: 1
						},
						timeout:100000000,
					})
					.then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
						const [error, res] = data;
						this.overall = res.data.results[0]
					}).catch(error => {
						console.log(error)
					})
			},

		}
	}
</script>

<style lang="scss">
.content{
	background-color: $uni-bg-color-grey;
	
}
</style>
