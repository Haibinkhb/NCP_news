<template>
	<view class="map-legend">
		<view class="range" v-for="(legend, index) in mapColor " :key="index">
			<view class="bg-box" v-bind:style ="{backgroundColor:legend.color}"></view>
			<text>{{legend.range}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			mapColor:{
				type:Array,
				require: true
			}
		},
		data() {
			return {
			};
		}
	}
</script>

<style lang="scss">
.map-legend {
		display: flex;
		flex-direction: column;
		font-size: $uni-font-size-xsm;
		position: absolute;
		left: 30rpx;
		top: 450rpx;
	}
	.range{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.bg-box{
		width: 20rpx;
		height: 20rpx;
		margin-right: $uni-spacing-row-base;
	}
</style>
