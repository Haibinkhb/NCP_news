<template>
    <view>
        <web-view :webview-styles="webviewStyles" :src="src"></web-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
				src:'',
                webviewStyles: {
                    progress: {
                        color: '#FF3333'
                    }
                }
            }
        },
		onLoad(option){
			try{
				this.src = option.src
			}catch(e){
				throw new Error('404 not found')
			}
		}
    }
</script>

<style>

</style>