<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			this.init();
		},
		methods: {
			init() {
				//#ifdef APP-PLUS 
				plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
					console.log(wgtinfo);
					let v = wgtinfo.version;   //版本号
					let k = 'app_version_'+v;
					let value = uni.getStorageSync(k);
					console.log('value',value);
					if (value) {
						// 如何已经有，直接去home首页
						uni.switchTab({
							url: '/pages/index/index',
							complete() {
								
							},
							fail(res) {
								console.log('fail res:', res);
							}
						});
					} else {
						// 没有值，跳到引导页，并存储，下次打开就不会进去引导页
						uni.setStorage({
							key: k,
							data: 1
						});
						uni.redirectTo({
							url: '/pages/index/guide_page',
							fail(res) {
								console.log('fail', res);
							}
						});
					}
				});
				//#endif
				
				//#ifdef H5
				uni.switchTab({
					url: '/pages/index/index'
				});
				//#endif
				// 从本地缓存中同步获取指定 key 对应的内容，用于判断是否是第一次打开应用
				
			}
		}
	}
</script>

<style>

</style>
