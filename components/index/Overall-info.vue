<template>
	<view class="overall-info">
		<view class="data-info">
			<text>截至 {{overall.updateTime | capitalize}} 全国数据统计</text>
			<!-- <view class="data-desc"> <text class="icon">?</text> <text class="data-desc-tetx">数据说明</text></view> -->
		</view>
		<view class="overall-details">
			<view class="count">
				<text class="desc">现存确诊</text>
				<text class="total confirmed">{{overall.currentConfirmedCount}}</text>
				<text class="compare">较昨日<text class="confirmed">{{overall.currentConfirmedIncr | compare}}</text></text>
			</view>
			<view class="count">
				<text class="desc">累计确诊</text>
				<text class="total current-confirmed">{{overall.confirmedCount}}</text>
				<text class="compare">较昨日<text class="current-confirmed">{{overall.confirmedIncr | compare}}</text></text>
			</view>
			<view class="count">
				<text class="desc">现存疑似</text>
				<text class="total suspected">{{overall.suspectedCount}}</text>
				<text class="compare">较昨日<text class="suspected">{{overall.suspectedIncr | compare}}</text></text>
			</view>
			<view class="count">
				<text class="desc">治愈</text>
				<text class="total cured">{{overall.curedCount}}</text>
				<text class="compare">较昨日<text class="cured">{{overall.curedIncr | compare}}</text></text>
			</view>
			<view class="count">
				<text class="desc">现存重症</text>
				<text class="total serious">{{overall.seriousCount}}</text>
				<text class="compare">较昨日<text class="serious">{{overall.seriousIncr | compare}}</text></text>
			</view>
			<view class="count">
				<text class="desc">死亡</text>
				<text class="total dead">{{overall.deadCount}}</text>
				<text class="compare">较昨日<text class="dead">{{overall.deadIncr | compare}}</text></text>
			</view>
		</view>
		<!-- <view class="virus-info">
			<view class="note">
				<text v-for="(note, index) in overallNote" :key="index">{{note}}</text>
			</view>
			<view class="remark">
				<text v-for="(remark, index) in overallRemark" :key="index">{{remark}}</text>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		props: {
			overall: Object,
		},
		filters: {
			compare(value) {
				// 判断正负
				return value > 0 ? '+' + value : value
			},
			capitalize(value) {
				// 数据更新截止时间
				const now = new Date(value);
				const Y = now.getFullYear()
				const M = (now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1);
				const D = now.getDate()
				const h = now.getHours()
				const m = now.getMinutes()
				return `${Y}-${M}-${D} ${h}:${m}`
			}
		},
		computed: {
			updateTime() {
				// 数据更新截止时间
				const timestamp = this.overall.updateTime
				const newDate = new Date();
				newDate.setTime(timestamp);
				return timestamp ? newDate.toLocaleString() : newDate
			},
			overallNote() {
				// 病毒的基本信息
				const noteArr = []
				if (this.overall) {
					for (let key in this.overall) {
						if (key.indexOf('note') > -1) {
							noteArr.push(this.overall[key])
						}
					}
				}
				return noteArr
			},
			overallRemark() {
				// 预防病毒相关提示
				const remarkArr = []
				if (this.overall) {
					for (let key in this.overall) {
						if (key.indexOf('remark') > -1 && this.overall[key]) {
							remarkArr.push(this.overall[key])
						}
					}
				}
				return remarkArr
			}
		},
		data() {
			return {
				showCard:false
			};
		},
		methods:{
			showDescCard(){
				this.showCard = true
			},
			closeDescCard(){
				this.showCard = false
			}
		}
	}
</script>

<style lang="scss">
	.overall-info {
		color: $uni-text-color;
		margin: $uni-spacing-col-base 0;
		padding: 0 $uni-spacing-row-base;
		background-color: $uni-bg-color;
	}

	.desc_card {
		font-size: $uni-font-size-sm;
		background-color:  #fff;
		position: fixed;
		width: 100%;
		height: 700rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		z-index: 999;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: $uni-spacing-col-lg $uni-spacing-row-lg;
		margin: 0 $uni-spacing-row-lg;
		box-sizing: border-box;
	}
	.close-button{
		width: 100%;
		background-color: red;
		position: absolute;
		bottom: 0;
	}
	
	.data-info {
		padding: $uni-spacing-col-lg 0;
		font-size: $uni-font-size-xsm;
		color: $uni-text-color-grey;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.data-desc {
		font-size: $uni-font-size-xsm;
		background-color: $uni-bg-color-grey;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-shadow: 0 0 1rpx 0 rgba(0, 0, 0, .3);
		border-top-left-radius: $uni-border-radius-lg;
		border-bottom-left-radius: $uni-border-radius-lg;
	}

	.data-desc-tetx {
		padding: 0 5rpx;
		font-size: $uni-font-size-xsm;
	}

	.icon {
		padding: 2rpx 10rpx;
		border: 2rpx solid $uni-text-color-grey;
		border-radius: 50%;
		margin: 5rpx 10rpx;
		font-size: $uni-font-size-xsm;
	}

	.overall-details {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: $uni-spacing-col-lg 0;
		border-bottom: 1rpx solid $uni-border-color;
		box-shadow: 0 0 5rpx 0 $uni-text-color-grey;
		border-radius: $uni-border-radius-lg;
	}

	.overall-details .count {
		display: flex;
		flex-direction: column;
		text-align: center;
		width: 30%;
		margin: $uni-spacing-col-base 0;
		border-right: 4rpx solid $uni-bg-color-grey;
	}

	.overall-details .count:nth-child(3n) {
		border: none;
	}

	.overall-details .desc {
		color: #000;
		font-weight: bolder;
		font-size: $uni-font-size-sm;
	}

	.overall-details .total {
		font-weight: bolder;
		font-size: $uni-font-size-base;
		padding: $uni-spacing-col-sm 0;
	}

	.overall-details .compare {
		font-size: $uni-font-size-xsm;
	}

	.overall-details .count .confirmed {
		color: #f74c31;
	}

	.overall-details .count .suspected {
		color: #f78207;
	}

	.overall-details .count .cured {
		color: #28b7a3;
	}

	.current-confirmed {
		color: #ae212c;
	}

	.overall-details .count .serious {
		color: #a25a41;
	}

	.overall-details .count .dead {
		color: #5d7092;
	}

	.virus-info {
		margin: $uni-spacing-col-lg 0;
		padding: $uni-spacing-col-base $uni-spacing-row-base;
		font-size: $uni-font-size-base;
		font-weight: 540;
		box-shadow: 0 0 5rpx 0 $uni-text-color-grey;
		border-radius: $uni-border-radius-lg;
	}

	.note,
	.remark {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.note text::before,
	.remark text::before {
		content: " * ";
		color: #f74c31;
	}

	.remark text::before {
		color: #f78207;
	}

	.note text,
	.remark text {
		padding: $uni-spacing-col-sm 0;
	}
</style>
