<template>
	<view class="u-content">
		<u-parse :html="content"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//content: `
				//	<p>露从今夜白，月是故乡明</p><p>呵呵</p><img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />
				//`
				content: '<p>1、可以依赖恋人，但是不能依附男人</p><p>2、恋爱很美，但它不是理所当然的存在</p><p>3、别轻易和“好人”在一起</p><p>4、安全感是自己给的</p><p>5、恋爱中，不要试图改变对方</p>'
			}
		},
	}
</script>

<style lang="scss" scoped>
	#view-article {
		margin-left:32rpx;
		margin-right:32rpx;
		width:686rpx;
		overflow-x: hidden;
		justify-content: center;
		align-items: center;
		word-break: break-all;
	}
	
	.u-content {
		margin-top: 100rpx;
	}
</style>