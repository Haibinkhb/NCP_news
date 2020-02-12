<template>
	<view class="daily-pics">
		<swiper class="trend-swiper" v-bind:style="{ height: imageHeight + 'px' }"  @change="currentChange" :current="currentIndex" :circular="true">
			<swiper-item  class="swiper-item" v-for="(trend, index) in trendChart" :key="index">
				<image class="swiper-image" :src="trend.imgUrl" mode="widthFix" ></image>
			</swiper-item>
		</swiper>
		<view class="trend-title">
			<view :class="['title-text',currentIndex===index?'current':'']" v-for="(trend, index) in trendChart" :key="index"
			 @click="switchPic(index)">{{trend.title}}</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			// 接受父组件传递的趋势图数据
			trendChart: {
				type: Array,
				require: true
			}
		},
		data() {
			return {
				currentIndex: 0, // 当前展示的趋势图
				imageHeight:0 // 图片默认高度
			};
		},
		mounted() {
			setTimeout(() => {
				this.getImageSize() // 异步获取图片高度（直接获取会失败）
			}, 200)
		},
		methods: {
			currentChange(e){
				// current 改变时修改title文字样式
				this.currentIndex = e.detail.current
			},
			switchPic(index) {
				// 点击 title 切换图片
				this.currentIndex = index
			},
			getImageSize() {
				// 动态获取图片高度，并给 swiper 组件赋值； swiper 组件默认高度为150 无法完整显示内容
				uni.createSelectorQuery()
				.select('.swiper-image')
					.boundingClientRect(res => {
						this.imageHeight = res.height
					}).exec()
			}
		}
	}
</script>

<style lang="scss">
	.daily-pics {
		background-color: #fff;
		padding: 0 $uni-spacing-row-base;
	}

	.trend-swiper {
		padding: 0 $uni-spacing-row-base;

	}

	.swiper-image {
		width: 100%;
	}

	.trend-title {
		display: flex;
		justify-content: space-around;
		font-size: $uni-font-size-sm;
		padding: $uni-spacing-col-base 0;
	}

	.title-text {
		color: $uni-text-color-grey;
		background-color: $uni-bg-color-grey;
		margin: 0 5rpx;
		padding: $uni-spacing-col-base;
	}

	.trend-title .current {
		color: $uni-color-primary;
		background-color: #f1f5ff;
		
	}
</style>
