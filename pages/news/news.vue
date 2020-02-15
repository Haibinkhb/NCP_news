<template>
	<scroll-view :scroll-y="true" class="live-news" @scrolltolower="showEnd">
		<view class="news-header">
			<view class="bg-box"></view>
			<text>实时播报</text>
		</view>
		<view class="news" v-for="(item, index) in news" :key="index">
			<view class="time-line">
				<text class="time-diff">{{item.pubDate | capitalize}}</text>
				<text class="update-time">{{item.pubDate | updateTime}}</text>
				<text class="dot"></text>
			</view>
			<navigator class="news-content" :url="'/pages/navigate/navigate?src='+ item.sourceUrl">
				<text class="news-title">{{item.title}}</text>
				<text class="news-summary">{{item.summary}}</text>
				<text class="new-infoSource">信息来源：{{item.infoSource}}</text>
			</navigator>
		</view>
		<text v-if="end">没有更多内容了</text>
		<footerDesc></footerDesc>
	</scroll-view>
</template>

<script>
	import footerDesc from "@/components/footer-desc.vue"
	export default {
		data() {
			return {
				news: [],
				end: false
			}
		},

		onLoad() {
			// 获取全国最新总体疫情信息
			this.getNews()
		},
		filters: {
			updateTime(value) {
				// 数据更新截止时间
				const now = new Date(value);
				const M = (now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1);
				const D = now.getDate()
				const h = now.getHours()
				const m = now.getMinutes()
				return `${M}-${D} ${h}:${m}`
			},
			capitalize(value) {
				const dateEnd = new Date(); //获取当前时间
				const dateDiff = dateEnd.getTime() - value; //时间差的毫秒数
				const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
				const leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
				const hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
				//计算相差分钟数
				const leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
				const minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
				const timeFn = dayDiff ? dayDiff + '天前' : (hours ? hours + '小时前' : minutes + '分钟前')
				return timeFn;
			}
		},
		components: {
			footerDesc
		},
		methods: {
			// 显示已经到达底部的提示
			showEnd() {
				this.end = true
			},
			// 从缓存中获取全国各省市疫情数据
			getNews(params) {
				uni.request({
					url: 'https://api.haibinkhb.com/api/news'
				}).then(data => {
					const [error, res] = data
					
					this.news = res.data.results.slice(0,29) // 太多了...只截取最新的30条新闻
				})
			}
		}
	}
</script>

<style lang="scss">
	.news-header {
		display: flex;
		font-size: $uni-font-size-lg;
		color: #000;
		background-color: #fff;
		padding: $uni-spacing-col-lg $uni-spacing-row-base;
		margin-bottom: $uni-spacing-col-lg;
	}

	.dot {
		position: absolute;
		top: $uni-spacing-col-lg;
		right: -($uni-font-size-base/2 + 3);
		z-index: 2;
		display: inline-block;
		width: $uni-font-size-base;
		height: $uni-font-size-base;
		background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABMRJREFUaAXVWs9rXVUQnjnvPdKmECtoaG0lIVCKG7sQXGlboa3YKuifoRA3unKVP0A3FvTPUNAq1kJ/uSp00W6kFEJCiy2xYC00bXjvnXG+SW56G9+Zc1/euw33bN7NmTkz33d+z5wwjaEcX5A23V86GAK/Jkx7A4UpijIhQTowz5G7FHgtUnzEQg9jlL9o3+zdSwvcG9U9b9fAB/O3J572WrPM7RkFfVABt4eyFbinZO6K9JZ3tftLv549tDZU+w3loQksaG9f+Xv5TYrhiNB6D2/HcbkNE0Yo3jj66szNhSFHpTIBBR7+WFk+LNJ6S6fCZBnAuL516q0y96+/Mz1zS4nEKnYrETj15f093dWn75PwK1WMjqzD8qAzueu381/ve5yzlSWg4Kf7j7un6ur1FECMRmtP57ySWEnpoN4lcPLzO4dij45GiS3PSF2ywKEf2nTl929fv53ykSQA8L1ufC/V8EXWtzvhYorEQAI2bVa7Hw3T8xy4RSKHo4QjanQ/sezVNfOSEWX5V78fCtG9wPEGMd+SKP2qnYCRaE12fho0nf5HAAtW5/wnVec8M0+J0Ic6Gd8mod2VQDE9Ud1rzPSziDyq0mZjTfywdWE/RwBb5eWV5Y8r7TaR23q6nmaSE9qzE1VAbNVR52tCfEEPwV8oSP5U1t3p2PTMj+UtNpSNYp+vAh69ToG+IJIz2wUPv+tt5Qxsmc0ymEHfuo0bxpJskwBOWBxSJVnq80AU+kqFcymFbdTPbdg8kGsLjMBa6G0SwPUgN+9tvhPP69C/XBgY1y9s6nSaz40EMNpVZsOxEcDFDHcbF4zOeV2sn9YBvvBrJNQHYX15RbEaZtUxArhVZi9mumBVf5zTJgVxDptDSoh6YAVmfBsBXInxR6pgWLHbpOTjroev3FQqMIfjWLy4zzsF+/wou41jeqAIvuxsGShdrwRmYA+IpLxgxE5YHFIvuqhP853yiwDKokANA1M6Vq/XA5101U5Y19CQQviEb6cghA2IYR0dHZzM7uQ1HlGW8w3sQe8YU54f3dr2e/I6ZTnfwB60i/17DG6VO1VyvhV7KFIfSYzFlTipUKMg4xvY7RyoEcKIpnVDzRSNLzSl4RUEIztVmFzfwK7rgP2EkkZSO4UfUZzrW7EHvd25EZEO4j3XSI3CnG9gD8hVehgshvUUapTlfAN7sESrB0IDcI13n3gqtcjgE76dAuwBWWJdB8l41LIHGoA7duoRqU83cwHMij0gxY0ssYcC2QM9Ff3F7hkYUgZf8Ok1A2Zgt3MAKW5PGakPyx54SmOUwVcu3VJgNgLIz1uK2wOB1AfRoqcyJtmipVkcY8AKzFAxAva4oPl5p41qSk+H9Xvd2v5x9UYQwjZ8ZHNEirV4ENm8SuBxQU+1Vc8/hlXDvbN1kDDwsJ3J1AEjsBY4db08Kyc+W3qjL/zus5rBX5ZeQfZgfEH+oo1uBjzQtFiuXvhu9s8C2eYIoAIvI5qUfVAIU7/WS5G+0ez8uVF2p/W2fI7UVq7nDYtiM4wlYM+NAOobndwtiDU6vV6QaPQDR5lEY5+YChI2nZr6yFci0dxn1oKE5uSb+9BdkMAvHhca+a8GZRL4buw/e2wlgr+RJd6pf7f5D2ekfj9S76oCAAAAAElFTkSuQmCC") no-repeat;
		background-size: auto;
		background-size: cover;
	}

	.bg-box {
		width: 10rpx;
		height: auto;
		background-color: #007aff;
		margin: 0 $uni-spacing-row-base;
	}

	.live-news {
		background-color: #f7f7f7;
	}

	.news {
		display: flex;

	}

	.time-line {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 30%;
		margin: 0 $uni-spacing-col-base;
		border-right: 6rpx solid #ebebeb;
		padding: 0 $uni-spacing-row-base;
		font-size: $uni-font-size-base;
		box-sizing: border-box;
	}

	.time-diff {
		margin-top: $uni-spacing-col-lg;
		color: #000;
	}

	.update-time {
		padding: $uni-spacing-col-sm 0;
		color: $uni-text-color-grey;
		font-size: $uni-font-size-sm;
	}

	.news-content {
		width: 70%;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		margin: 0 $uni-spacing-row-base;
		margin-bottom: $uni-spacing-col-lg;
		border-radius: $uni-border-radius-lg;
	}

	.news-content text {
		padding: $uni-spacing-col-base $uni-spacing-row-base;
	}

	.news-title {
		font-weight: bolder;
		font-size: $uni-font-size-lg;
		color: #000;
	}

	.news-summary {
		font-size: $uni-font-size-base;
		color: $uni-text-color-grey;
	}

	.new-infoSource {
		font-size: $uni-font-size-base;
		color: $uni-text-color-grey;
		text-align: right;
	}
</style>
