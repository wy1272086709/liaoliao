<template>
	<view class="tabbar-view" :style="'padding-bottom:'+bottom+'rpx;'+'position:'+position+';'">
		<view class="tabbar-navigator"  @tap="switchTab(index)" v-for="(item,index) in tabList" :key="index">
			<view class="tabbar-icon">
				<image :src="item.iconPath" :class="item.defaultClass" v-if="index!=current"></image>
				<image :src="item.hoverPath" :class="item.defaultClass" v-if="index==current"></image>
			</view>
			<view class="tabbar-text">
				<text>{{item.text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bottom: 0,
				tabList: [
					{
						pagePath: '/pages/index/index',
						iconPath: '/static/img/tabbar/love_huashu.png',
						text: '',
						hoverPath: '/static/img/tabbar/love_huashu_active.png',
						defaultClass: 'tabbar-icon-class',
					},
					{
						pagePath: '/pages/cases/index',
						iconPath: '/static/img/tabbar/love_skills.png',
						text: '',
						hoverPath: '/static/img/tabbar/love_skills_active.png',
						defaultClass: 'tabbar-icon-class',
					},
					{
						pagePath: '/pages/user/index',
						iconPath: '/static/img/tabbar/user.png',
						text: '',
						hoverPath: '/static/img/tabbar/user_active.png',
						defaultClass: 'tabbar-icon-class',
					}
				]
			}
		},
		computed:{
			
		},
		mounted() {
			if(getApp().globalData.isIphoneX) {
				this.bottom = 30;
			}
		},
		methods:{
			switchTab(index) {
				const pagePath = this.tabList[index].pagePath;
				uni.switchTab({
					url: pagePath
				});
			}
		},
		props: {
			position: {
				type: String,
				default: 'relative',
			},
			current: { 
				type: [
					Number, String
				], 
				default: 0 ,
			},
			backgroundColor: { 
				type: String, 
				default: '#fbfbfb'
			},
			color: { 
				type: String, 
				default: '#999' ,
			},
			tintColor: { type: String, default: '#42b983' }
		}
	}
</script>



<style>
	.tabbar-view {
		display: flex;
		height: 60px;
		/*background:linear-gradient(90deg,rgba(34,121,239,1) 0%,rgba(61,177,242,1) 100%);*/
		background: rgba(255,255,255,1);
		border-top:1px solid #DCDCDC;
		bottom: 0rpx;
		justify-content: space-around;
	}
	.tabbar-icon-class {
		width: 38px;
		height: 38px;
	}
	
	
	.tabbar-navigator {
		display: flex;
		flex-direction: column;
		width:250rpx;
		justify-content: center;
		align-items: center;
	}
	
	.tabbar-icon {
		height:24px;
	}
	
	.tabbar-text {
		height: 20px;
		font-size:12px;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:20px;
	}
</style>
