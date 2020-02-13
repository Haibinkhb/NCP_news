<template>
	<view class="area-box">
		<areaTitle></areaTitle>
		<view class="provinceTotal" v-for="item in area" :key='item.id' @click="showCities(item)">
			<view class="area-item">
				<view class="area">
					<text v-if="item.cities.length>0" :class="[item.showMore?'arrow-current':'','right-arrows']"></text>
					<text v-else class="right-arrows-opactiy"></text>
					<text>{{item.provinceShortName}}</text>
				</view>
				<text class="number current-confirmed">{{item.confirmedCount - item.curedCount - item.deadCount}}</text>
				<text class="number confirmed">{{item.confirmedCount}}</text>
				<text class="number cured">{{item.curedCount}}</text>
				<text class="number dead">{{item.deadCount}}</text>
			</view>
			<cities v-if="item.showMore" :showMore="item.showMore" :cities="item.cities"></cities>
		</view>
	</view>
</template>

<script>
	import cities from "@/components/common/cities.vue"
	import areaTitle from '@/components/common/area-title.vue'
	export default {
		props: {
			area: {
				type: Array,
				require: true
			}
		},
		data() {
			return {

			};
		},
		methods: {
			showCities(item) {
				item.showMore = !item.showMore
			}
		},
		components: {
			areaTitle,
			cities
		}
	}
</script>

<style lang="scss">
	.area-box {
		display: flex;
		flex-direction: column;
		padding: 0 $uni-spacing-row-base;
		background-color: #fff;
		margin: $uni-spacing-col-lg 0;
	}

	.provinceTotal {
		display: flex;
		flex-direction: column;
		font-size: $uni-font-size-base;
		text-align: center;
		background-color: #f7f7f7;
		
	}
	
	.area-item {
		display: flex;
		justify-content: space-around;
	}

	.provinceTotal .area {
		display: flex;
		text-align: left;
		align-items: center;
		color: $uni-text-color;
		width: 100%;
		padding: $uni-spacing-col-base 0;
	}

	.provinceTotal .number {
		width: 100%;
		padding: $uni-spacing-col-base 0;
	}

	.provinceTotal .confirmed {
		color: #f74c31;
	}

	.provinceTotal .cured {
		color: #28b7a3;
	}

	.provinceTotal .dead {
		color: #5d7092;
	}
	.provinceTotal .current-confirmed{
		color: #ae212c;
	}
	.right-arrows {
		width: 10rpx;
		height: 10rpx;
		border-top: 1px solid #c3c8d6;
		border-right: 1px solid #c3c8d6;
		transform: rotate(45deg);
		margin: 0 $uni-spacing-col-base;
	}

	.arrow-current {
		transform: rotate(135deg);
	}

	.right-arrows-opactiy {
		opacity: 0;
		width: 10rpx;
		height: 10rpx;
		margin: 0 $uni-spacing-col-base;
	}
</style>
