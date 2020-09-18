<template>
	<view id="root-view">
		<view id="result">
			<view>{{result }}</view>
		</view>
		
		<view id="detail">
			<rich-text :nodes="detail"></rich-text>
		</view>
		
		<view id="bottom">
			<view>
				
			</view>
			<view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				result: '适合恋爱',
				detail: '长沙这边面试了几个三年的前端，给我整哭了，简历简历不带，问点基础题，一问三不知，问个水平垂直居中布局，支支吾吾半天说不出来，还有个弟弟说你这样问我不知道怎么回答，累了。我只想说，这真的有三年的经验嘛'
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
#root-view {
	display: flex;
	flex-direction: column;
	margin-left:32rpx;
	margin-right:32rpx;
	#result {
		view {
			display: flex;
			justify-content: center;
		}
		margin-top:40px;
		margin-bottom: 20px;
		font-weight: bolder;
		font-size:24px;
	}
	
	#detail {
		margin-top:20px;
		font-size:16px;
	}
}
</style>
