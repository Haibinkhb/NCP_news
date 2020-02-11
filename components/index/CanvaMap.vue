<template>
	<view class="qiun-columns">
		<!--#ifdef H5 -->
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-dot-light">页面地址</view>
		</view>
		<!--#endif-->
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-dot-light">地图</view>
		</view>
		<view class="qiun-charts">
			<!--#ifdef MP-ALIPAY -->
			<canvas canvas-id="canvasMap" id="canvasMap" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio"
			 :style="{'width':cWidth+'px','height':cHeight+'px'}" @touchstart="touchMap"></canvas>
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasMap" id="canvasMap" class="charts" @touchstart="touchMap"></canvas>
			<!--#endif-->
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts/u-charts.js'
	const chinaMap = require('@/static/json/chinaMap.json')
	var _self;
	var canvaMap = null;
	export default {
		data() {
			return {
				color: ['#fdebcf', '#f59e83', '#e55a4e', '#cb2a2f', '#811c24', '#4f070d'],
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: ''
			}
		},
		props: {
			areaOfChina: {
				type:Array,
				require:true
			}
		},
		mounted() {
			this.$nextTick(function() {
				_self = this;
				//#ifdef MP-ALIPAY
				uni.getSystemInfo({
					success: function(res) {
						if (res.pixelRatio > 1) {
							//正常这里给2就行，如果pixelRatio=3性能会降低一点
							//_self.pixelRatio =res.pixelRatio;
							_self.pixelRatio = 2;
						}
					}
				});
				//#endif
				this.cWidth = uni.upx2px(750);
				this.cHeight = uni.upx2px(750);
				this.getServerData();
			})
		},
		methods: {
			getServerData() {
				let cMap = {
					series: []
				};
				cMap.series = chinaMap.features;
				cMap.series.forEach((item, index) => {
					this.areaOfChina.forEach(city => {
						
						switch (item.properties.name === city.provinceName) {
							case city.confirmedCount >= 0 && city.confirmedCount < 10:
								item.color = this.color[0]
								break;
							case city.confirmedCount >= 10 && city.confirmedCount < 99:
								item.color = this.color[1]
								break;
							case city.confirmedCount >= 100 && city.confirmedCount < 499:
								item.color = this.color[2]
								break;
							case city.confirmedCount >= 500 && city.confirmedCount < 999:
								item.color = this.color[3]
								break;
							case city.confirmedCount >= 1000 && city.confirmedCount < 9999:
								item.color = this.color[4]
								break;
							case city.confirmedCount >= 10000:
								item.color = this.color[5]
								break;
							default:
								item.color = '#ffffff'
						}
					})
					item.properties.name = item.properties.name.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, '')
				})
				console.log(cMap.series,this.areaOfChina)
				_self.showMap("canvasMap", cMap);
			},
			showMap(canvasId, chartData) {
				canvaMap = new uCharts({
					title: {
						name: '疫情地图'
					},
					$this: _self,
					canvasId: canvasId,
					type: 'map',
					fontSize: 6,
					padding: [10, 10, 10, 10],
					legend: {
						show: true,
						float: '左left',
						format: () => {
							return 'abcd'
						}
					},
					color:_self.color,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						map: {
							border: true,
							borderWidth: 1,
							borderColor: '#666666',
							fillOpacity: 0.6
						}
					}
				});
			},
			touchMap(e) {
				canvaMap.showToolTip(e, {
					format: function(item) {
						return item.properties.name
					}
				});
			}
		}
	}
</script>

<style>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 750upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 750upx;
		background-color: #FFFFFF;
	}
</style>
