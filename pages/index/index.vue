<template>
	<scroll-view class="content" :scroll-y="true" :enable-back-to-top="true">
		<OverallInfo :overall="overall"></OverallInfo>
		<view class="chart-title">全国疫情趋势图</view>
		<trendChart :trendChart="overall.quanguoTrendChart"></trendChart>
		<view class="chart-title">湖北/非湖北疫情趋势图</view>
		<trendChart :trendChart="overall.hbFeiHbTrendChart"></trendChart>
		<provinceList :area="area"></provinceList>
		<footerDesc class='footerDesc'></footerDesc>
	</scroll-view>
</template>

<script>
	import footerDesc from "@/components/footer-desc.vue"
	import OverallInfo from "@/components/index/Overall-info.vue" // OverallInfo 组件负责展示疫情信息
	import trendChart from "@/components/index/trendChart.vue" // trendChart 组件负责展示疫情趋势图
	import provinceList from "@/components/index/province-list.vue"
	export default {
		data() {
			return {
				overall: {}, // 存放全国最新总体疫情信息
				area: [],
				showMore: false
			}
		},
		components: {
			OverallInfo,
			trendChart,
			provinceList,
			footerDesc
		},
		onLoad() {
			this.getArea()
			this.getOverall()
		},
		methods: {
			// 从缓存中获取全国最新总体疫情信息
			getArea() {
				uni.request({
					url: 'https://api.haibinkhb.com/api/area'
				}).then(data => {
					const [error, res] = data
					let id = 1
					if (res.data.success) {
						res.data.results.forEach(item => {
							if (item.country === '中国') {
								item.id = id++ // 为每一项增加 id 方便循环
								item.showMore = false // // 为每一项增加 showMore 方便折叠显示
								// 保存全国的疫情数据
								this.area.push(item)
								// 按确诊数排序
								this.area.sort(function(a, b) {
									return b.confirmedCount - a.confirmedCount
								})
							}
						})
					}
				})
			},
			// 从缓存中获取全国各省市疫情数据
			getOverall() {
				uni.request({
					url: 'https://api.haibinkhb.com/api/overall'
				}).then(data => {
					const [error, res] = data
					this.overall = res.data.results[0]
				})
			},
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: #fff;
	}

	.chart-title {
		font-size: $uni-font-size-lg;
		background-color: $uni-bg-color-grey;
		margin: $uni-spacing-col-lg 0;
		padding: $uni-spacing-col-base $uni-spacing-col-base;
		font-weight: bolder;
	}

	.footerDesc {
		padding: 0 $uni-img-size-sm;
	}
</style>
