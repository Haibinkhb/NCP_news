<template>
	<view class="footer-desc">
		<view class="navigator-box">
			<text>本页面数据来源为:</text>
			<navigator class="navigator" url="/pages/navigate/navigate?src=https://ncov.dxy.cn/ncovh5/view/pneumonia">丁香园</navigator>
		</view>
		<view class="navigator-box">
			<text>接口来自:</text>
			<navigator class="navigator" url="/pages/navigate/navigate?src=https://lab.isaaclin.cn/nCoV">DXY-COVID-19-Crawler</navigator>
		</view>
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
.navigator-box{
		display: flex;
		color: $uni-text-color-grey;
		font-size: $uni-font-size-xsm;
		padding: 0 0;
		margin: $uni-spacing-col-base 0;
	}
	.navigator{
		color: #007aff;
		padding: 0 $uni-spacing-row-base;
	}
</style>
