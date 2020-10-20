<template>
	<view>
		
	</view>
</template>

<script>
	import util from '../../common/util.js';
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
				const value = util.getVersionValue();
				if (value) {
					// 如何已经有，直接去home首页
					uni.switchTab({
						url: '/pages/index/app_index',
						complete() {
							
						},
						fail(res) {
							console.log('fail res:', res);
						}
					});
				} else {
					// 没有值，跳到引导页，并存储，下次打开就不会进去引导页
					/*uni.setStorage({
						key: k,
						data: 1
					});*/
					uni.redirectTo({
						url: '/pages/index/guide_page',
						fail(res) {
							console.log('fail', res);
						}
					});
				}
				// #endif
				//#ifdef H5
				uni.switchTab({
					url: '/pages/index/app_index'
				});
				//#endif
				// 从本地缓存中同步获取指定 key 对应的内容，用于判断是否是第一次打开应用
				
			}
		}
	}
</script>

<style>

</style>
