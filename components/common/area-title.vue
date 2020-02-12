<template>
	<view class="title">
		<text class="area-bg">地区</text>
		<text class="confirmed-bg">确诊</text>
		<text class="cured-bg">治愈</text>
		<text class="dead-bg">死亡</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.title {
		font-size: $uni-font-size-lg;
		font-weight: bolder;
		background-color: #e3e7f3;
	}

	.title text {
		padding: $uni-spacing-col-base 0;
		width: 100%;
		text-align: center;
	}

	.title {
		display: flex;
		justify-content: space-around;
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
</style>
