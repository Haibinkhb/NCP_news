<script>
	export default {
		methods: {
			// 节流函数
			thorttle(fn, wait) {
				let flag = true;
				return (...args) => {
					if (!flag) return
					flag = false
					setTimeout(() => {
						fn.apply(this, args)
						flag = true
					}, wait)
				}
			},
			getNewData(params){
				uni.request({
						 url: `${this.LocalUrl}${params}`
					})
					.then(data => { //data为一个数组，数组第一项为错误信息，第二项为返回数据
						const [error, res] = data;
						if (res.data.success) {
							uni.setStorage({
								key: params,
								data: res.data,
								success: function() {
									console.log('数据缓存成功');
								}
							})
						}
					}).catch(error => {
						throw new Error(error)
					})
			}
		},
		onLaunch: function() {
			// const params = ['area','overall','news']
			// params.forEach(item=>{
			// 	this.getNewData(item)
			// })
			// // 每 10 分钟请求一次数据更新缓存
			// setInterval(() => {
			// 	params.forEach(item=>{
			// 		this.getNewData(item)
			// 	})
			// }, 600000)
		},
		onShow: function() {

		},
		onHide: function() {

		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
