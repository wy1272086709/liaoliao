<template>
	<view class="uni-popup-share" :style="{height: height+'px'}">
		<view class="uni-share-title"><text class="uni-share-title-text">{{title}}</text></view>
		<view class="uni-share-content" :style="reportData.length>0?'border-bottom:1px solid #F2F2F2':''">
			<view class="uni-share-content-box" :style="reportData.length>0?'justify-content:flex-start':''">
				<view class="uni-share-content-item" v-for="(item,index) in bottomData" :key="index" @tap="select(item,index)">
					<image class="uni-share-image" :src="item.icon" mode="aspectFill"></image>
					<text class="uni-share-text">{{item.text}}</text>
				</view>
			</view>
		</view>
		
		<view class="uni-share-content">
			<view class="uni-share-content-box" :style="reportData.length>0?'justify-content:flex-start':''">
				<view class="uni-share-content-item" v-for="(info,m) in reportData" :key="m" @tap="select2(info,m)">
					<image class="uni-share-image" :src="info.icon" mode="aspectFill"></image>
					<text class="uni-share-text">{{info.text}}</text>
				</view>
			</view>
		</view>
		
		<view class="uni-share-button-box">
			<button class="uni-share-button" @tap="close">取消</button>
		</view>
	</view>
</template>

<script>
	let defaultArr = [{
			text: '微信',
			icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-2.png',
			name: 'wx'
		},
		{
			text: '支付宝',
			icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-8.png',
			name: 'wx'
		},
		{
			text: 'QQ',
			icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/gird-3.png',
			name: 'qq'
		},
		{
			text: '新浪',
			icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-1.png',
			name: 'sina'
		},
		{
			text: '百度',
			icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-7.png',
			name: 'copy'
		},
		{
			text: '其他',
			icon: 'https://img-cdn-qiniu.dcloud.net.cn/uni-ui/grid-5.png',
			name: 'more'
		}
	];
	export default {
		name: 'UniPopupShare',
		props: {
			title: {
				type: String,
				default: '分享到'
			}, 
			bottomData : {
				type: Array,
				default: function() {
					return defaultArr;
				}
			},
			reportData: {
				type: Array,
				default: function() {
					return [];
				}
			},
			height: {
				type: [ String, Number ],
				default: ''
			},
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
				console.log('item', item, 'index', index);
				this.$emit('select', {
					item,
					index
				}, () => {
					this.popup.close()
				})
			},
			select2(item, index) {
				console.log('item', item, 'index', index);
				this.$emit('select', {
					item,
					index
				}, () => {
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
	.uni-popup-share {
		background-color: #fff;
		flex-direction: column;
	}
	.uni-share-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 40px;
	}
	.uni-share-title-text {
		font-size: 14px;
		color: #666;
	}
	.uni-share-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding-top: 10px;
		
	}
	
	.uni-share-content-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: flex-start;
		flex-wrap: wrap;
		width: 750rpx;
	}
	
	.uni-share-content-item {
		width: 187.5rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		padding: 10px 0;
		align-items: center;
	}
	
	.uni-share-content-item:active {
		background-color: #f5f5f5;
	}
	
	.uni-share-image {
		width: 30px;
		height: 30px;
	}
	
	.uni-share-text {
		margin-top: 10px;
		font-size: 14px;
		color: #3B4144;
	}
	
	.uni-share-button-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		height: 80px;
		align-items: center;
		boder: 1px solid #B2B2B2;
		padding: 10px 15px;
	}
	
	.uni-share-button {
		flex: 1;
		border-radius: 10px;
		color: #666;
		font-size: 16px;
	}
	
	.uni-share-button::after {
		border-radius: 50px;
	}
</style>
