<template>
	<view class="uni-popup-select">
		<view class="uni-select-content">
			<view class="uni-select-content-box">
				<view class="uni-select-content-item" :style="item.id==0?indexStyle:''" v-for="(item,index) in bottomData" :key="index" @tap.stop="select(item,index)">
					<image class="uni-select-image" :src="item.icon"></image>
					<text class="uni-select-text">{{item.text}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'UniPopupSelect',
		props: {
			bottomData: {
				default: function() {
					return [
						{ text:'更换头像', id:1 },
						{ text:'拍照', id:2 },
						{ text:'从相册获取', id:3 },
						{ text:'取消', id: 4 },
					];
				},
				type: Array
			},
			indexStyle: {
				type: String,
				default: 'font-weight:bolder;color:#333333;'
			}
		},
		inject: ['popup'],
		data() {
			return {
				
			}
		},
		created() {},
		methods: {
			/**
			 * 选择内容
			 */
			select(item, index) {
				this.$emit('select', {
					item,
					index
				}, () => {
					console.log('close');
					this.popup.close()
				})
			},
			/**
			 * 关闭窗口
			 */
			close() {
				this.popup.close()
			}
		}
	}
</script>
<style lang="scss" scoped>
	.uni-popup-select {
		background-color: #fff;
	}
	.uni-select-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 40px;
	}
	.uni-select-title-text {
		font-size: 14px;
		color: #666;
	}
	.uni-select-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
	}
	
	.uni-select-content-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		flex-wrap: wrap;
		width: 750rpx;
	}
	
	.uni-select-image {
		max-wdith:60px;
		max-height: 60px;
		margin-right:10px;
	}
	
	.uni-select-content-item {
		width: 100%;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: flex-start;
		padding: 25px 10px;
		align-items: center;
		border-bottom:1px solid #797979;
	}
	
	.uni-select-content-item:active {
		background-color: #f5f5f5;
	}
	
	.uni-select-image {
		width: 30px;
		height: 30px;
	}
	
	.uni-select-text {
		padding-top: 0px;
		font-size: 14px;
		color: #3B4144;
		padding-bottom: 0px;
	}
	
	.uni-select-button-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 10px 15px;
	}
	
	.uni-select-button {
		flex: 1;
		border-radius: 50px;
		color: #666;
		font-size: 16px;
	}
	
	.uni-select-button::after {
		border-radius: 50px;
	}
</style>
