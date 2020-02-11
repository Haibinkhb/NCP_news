<template>
	<view class="overall-info">
		<text class="date-info">截至 {{updateTime}} 全国数据统计</text>
		<view class="overall-details">
			<view class="count">
				<text class="desc">确诊</text>
				<text class="total confirmed">{{overall.confirmedCount}}</text>
				<text class="compare">较昨日+<text class="confirmed">{{overall.confirmedIncr}}</text></text>
			</view>
			<view class="count">
				<text class="desc">疑似</text>
				<text class="total suspected">{{overall.suspectedCount}}</text>
				<text class="compare">较昨日+<text class="suspected">{{overall.suspectedIncr}}</text></text>
			</view>
			<view class="count">
				<text class="desc">治愈</text>
				<text class="total cured">{{overall.curedCount}}</text>
				<text class="compare">较昨日+<text class="cured">{{overall.curedIncr}}</text></text>
			</view>
			<view class="count">
				<text class="desc">重症</text>
				<text class="total serious">{{overall.seriousCount}}</text>
				<text class="compare">较昨日+<text class="serious">{{overall.seriousIncr}}</text></text>
			</view>
			<view class="count">
				<text class="desc">死亡</text>
				<text class="total dead">{{overall.deadCount}}</text>
				<text class="compare">较昨日+<text class="dead">{{overall.deadIncr}}</text></text>
			</view>
		</view>
		<view class="virus-info">
			<view class="note">
				<text v-for="(note, index) in overallNote" :key="index">{{note}}</text>
			</view>
			<view class="remark">
				<text v-for="(remark, index) in overallRemark" :key="index">{{remark}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			overall: Object,
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

			};
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

	.date-info {
		margin: $uni-spacing-col-base 0;
		font-size: $uni-font-size-xsm;
		color: $uni-text-color-grey;
	}

	.overall-details {
		display: flex;
		justify-content: space-between;
		padding: $uni-spacing-col-lg 0;
		border-bottom: 1rpx solid $uni-border-color;
	}
	
	.overall-details .count {
		display: flex;
		flex-direction: column;
		text-align: center;
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

	.overall-details .count .serious {
		color: #a25a41;
	}

	.overall-details .count .dead {
		color: #5d7092;
	}
	
	.virus-info {
		padding: $uni-spacing-col-lg 0;
		font-size: $uni-font-size-base;
		font-weight: 540;
	}
	.note,.remark {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.note text::before,
	.remark text::before{
		content: " * ";
		color: #f74c31;
	}
	.remark text::before{
		color: #f78207;
	}
	.note text,
	.remark text{
		padding: $uni-spacing-col-sm 0;
	}
</style>
