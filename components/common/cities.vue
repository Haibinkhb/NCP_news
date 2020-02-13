<template>
	<view class="cities">
		<view class="city" v-for="(city, index) in cities" :key="index">
			<text :class="[showMore?'padding-left':'', 'area']">{{city.cityName}}</text>
			<text class="confirmed">{{city.confirmedCount}}</text>
			<text class="current-confirmed">{{city.currentConfirmedCount}}</text>
			<text class="cured">{{city.curedCount}}</text>
			<text class="dead">{{city.deadCount}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			cities: {
				type: Array,
				require: true
			},
			showMore: Boolean
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.padding-left {
		margin-left: $uni-spacing-row-base;
		box-sizing: border-box;
	}

	.cities {
		display: flex;
		flex-direction: column;
		background-color: #fff;
	}

	.cities .title {
		font-size: $uni-font-size-lg;
		font-weight: bolder;
		background-color: #e3e7f3;
	}

	.cities .title text,
	.cities .city text,
		{
		padding: $uni-spacing-col-base 0;
		width: 100%;
		text-align: center;
	}

	.city,
	.title {
		display: flex;
		justify-content: space-around;

	}

	.city text {
		padding: $uni-spacing-col-sm 0;
		font-size: $uni-font-size-base;
	}

	.area-bg {
		background-color: #e3e7f3;
	}

	.confirmed-bg {
		background-color: #f74c31;
	}

	.cured-bg {
		background-color: #28b7a3;
	}

	.dead-bg {
		background-color: #5d7092;
	}

	.area {
		color: $uni-text-color;
	}

	.current-confirmed {
		color: #ae212c;
	}

	.confirmed {
		color: #f74c31;
	}

	.cured {
		color: #28b7a3;
	}

	.dead {
		color: #5d7092;
	}
</style>
