<template>
	<view class="daily-pics">
		<swiper :indicator-dots="true" :autoplay="false" :interval="5000" :duration="1000">
			<swiper-item v-for="(pic, index) in dailyPics" :key="index">
				<view class="swiper-item">
					<image class="swiper-image" :src="pic" mode="widthFix" :lazy-load="true"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props:{
			dailyPics:{
				type:Array,
				require:true
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.daily-pics{
	background-color: #fff;
	padding: 0 $uni-spacing-row-base;
}

.swiper-image{
	width: 100%;
}
</style>
