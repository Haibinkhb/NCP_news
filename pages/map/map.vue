<template>
	<view class="qiun-columns">
		<view class="qiun-charts">
			<!--#ifdef MP-ALIPAY -->
			<canvas canvas-id="canvasMap" id="canvasMap" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio"
			 :style="{'width':cWidth+'px','height':cHeight+'px'}" @touchstart="touchMap"></canvas>
			<!--#endif-->
			<!--#ifndef MP-ALIPAY -->
			<canvas canvas-id="canvasMap" id="canvasMap" class="charts" @click="touchMap" @touchstart="touchMap"></canvas>
			<!--#endif-->
		</view>
		<mapLegen :mapColor="mapColor"></mapLegen>
		<areaTitle></areaTitle>
		<cities :cities="cities"></cities>
		<footerDesc></footerDesc>
	</view>
</template>

<script>
	import footerDesc from "@/components/footer-desc.vue"
	import areaTitle from '@/components/common/area-title.vue'
	// 城市详细数据组件（公用）
	import cities from '@/components/common/cities.vue'
	// 地图图例组件
	import mapLegen from '@/components/map/map-legend.vue'
	// 使用 uCharts 插件绘制地图
	import uCharts from '@/components/u-charts/u-charts/u-charts.js'
	// 渲染地图所需的中国地图 json 数据
	const chinaMap = require('@/static/json/chinaMap.json')
	var _self;
	var canvaMap = null;
	export default {
		data() {
			return {
				// 存放全国疫情数据
				area: [],
				// 存放各省内的疫情数据
				cities: [],
				// 疫情地图背景颜色
				mapColor: [{
					color: '#4f070d',
					range: '> 10000'
				}, {
					color: '#811c24',
					range: '1000 - 10000',
				}, {
					color: '#cb2a2f',
					range: '500 - 999'
				}, {
					color: '#e55a4e',
					range: '100 - 499'
				}, {
					color: '#f59e83',
					range: '10 - 99'
				}, {
					color: '#fdebcf',
					range: '1 - 9'
				}, {
					color: '#ffffff',
					range: '0'
				}],
				// uCharts 绘制地图所需的一部分数据
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: '',
				location: '',

			}
		},
		onLoad() {
			_self = this
			// uCharts map 组件的部分参数
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: (res) => {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						// _self.pixelRatio = res.pixelRatio;
						_self.pixelRatio = 3;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(690); // 减去左右 padding 后应为690rpx
			this.cHeight = uni.upx2px(750);
			// 请求全国各省市疫情数据
			this.getArea()
		},
		methods: {
			// 请求全国各省市疫情数据
			getArea() {
				uni.request({
					url: 'https://api.haibinkhb.com/api/area'
				}).then(data => {
					const [error, res] = data
					res.data.results.forEach(item => {
						if (item.country === '中国') {
							// 保存全国的疫情数据
							this.area.push(item)
							// 保存湖北省的数据
							if (item.provinceShortName === '湖北') {
								this.cities = item.cities
							}
						}
					})
					this.getServerData();
				})
			},
			// 准备数据用来初始化 uCharts 地图组件
			getServerData() {
				let cMap = {
					series: []
				};
				cMap.series = chinaMap.features;
				cMap.series.forEach(item => {
					// 去除省、市、自治区等后缀
					item.properties.name = item.properties.name.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, '')
					this.area.forEach(city => {
						// 比对地图数据和疫情数据
						if (item.properties.name === city.provinceShortName) {
							// 保存各省的确诊人数
							item.confirmedCount = city.confirmedCount
							// 保存省内个市的疫情数据
							item.cities = city.cities
							// 如果已经获取到地址，则显示当前地址的疫情数据，否则显示湖北省的疫情数据
							this.cities = this.lcoation && city.provinceName === this.location ? city.cities : this.cities
							// 根据各地区确诊人数修改地图背景颜色
							if (item.confirmedCount >= 0 && item.confirmedCount < 10) item.color = this.mapColor[5].color
							if (item.confirmedCount >= 10 && item.confirmedCount < 99) item.color = this.mapColor[4].color
							if (item.confirmedCount >= 100 && item.confirmedCount < 499) item.color = this.mapColor[3].color
							if (item.confirmedCount >= 500 && item.confirmedCount < 999) item.color = this.mapColor[2].color
							if (item.confirmedCount >= 1000 && item.confirmedCount < 9999) item.color = this.mapColor[1].color
							if (item.confirmedCount >= 10000) item.color = this.mapColor[0].color
						}
					})
				})
				_self.showMap("canvasMap", cMap);
			},
			// 初始化 uCharts 地图组件
			showMap(canvasId, chartData) {
				canvaMap = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'map',
					fontSize: 11,
					padding: [10, 10, 10, 10],
					background: '#F7F7F7',
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
			// 地图点击事件回调函数
			touchMap(e) {
				let that = this
				canvaMap.showToolTip(e, {
					format: function(item) {
						// 点击地图显示该地区的详细数据
						that.cities = item.cities
						// 返回该地区的确诊人数
						return `省份:${item.properties.name}  确诊:${item.confirmedCount}`
					}
				});
			}
		},
		components: {
			cities,
			mapLegen,
			areaTitle,
			footerDesc
		}
	}
</script>

<style lang="scss">
	.qiun-columns {
		padding: 0 $uni-spacing-row-lg;
		box-sizing: border-box;
		position: relative;
		background-color: #F7F7F7;
	}

	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 690upx;
		height: 750upx;
		background-color: #F7F7F7;
	}

	.charts {
		width: 750upx;
		height: 750upx;
		background-color: #F7F7F7;
	}
</style>
