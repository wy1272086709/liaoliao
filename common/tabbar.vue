<template>
	<view class="tabbar-view" :style="'bottom:'+bottom+'px;'">
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
						text: '恋爱话术',
						hoverPath: '/static/img/tabbar/love_huashu_active.png',
						defaultClass: 'tabbar-icon-class',
					},
					{
						pagePath: '/pages/cases/index',
						iconPath: '/static/img/tabbar/love_skills.png',
						text: '恋爱技巧',
						hoverPath: '/static/img/tabbar/love_skills_active.png',
						defaultClass: 'tabbar-icon-class',
					},
					{
						pagePath: '/pages/user/new_user_page',
						iconPath: '/static/img/tabbar/new_user.png',
						text: '新手必看',
						hoverPath: '/static/img/tabbar/new_user_active.png',
						defaultClass: 'tabbar-icon-class',
					},
					{
						pagePath: '/pages/user/index',
						iconPath: '/static/img/tabbar/user.png',
						text: '个人中心',
						hoverPath: '/static/img/tabbar/user_active.png',
						defaultClass: 'tabbar-icon-class',
					}
				]
			}
		},
		mounted() {
			if(getApp().globalData.isIphoneX) {
				this.bottom = 34;
			}
		},
		methods:{
			switchTab(index) {
				const pagePath = this.tabList[index].pagePath;
				console.log('switchTab', index);
				console.log(pagePath);
				let pages = getCurrentPages();
				console.log('pages', pages);
				console.log('pages', pages[0].route);
				if (("/"+pages[0].route)!=pagePath) {
					uni.reLaunch({
						url:pagePath,
					});
				} else {
					// 可以用于更改颜色,以及字体图标
					
				}
			}
		},
		props: {
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
		height: 82px;
		background:linear-gradient(90deg,rgba(34,121,239,1) 0%,rgba(61,177,242,1) 100%);
		bottom: 0rpx;
		justify-content: space-around;
		position: absolute;
	}
	.tabbar-icon-class {
		width: 24px;
		height: 24px;
	}
	
	
	
	.tabbar-navigator {
		display: flex;
		flex-direction: column;
		width:187.5rpx;
		justify-content: center;
		align-items: center;
	}
	.tabbar-icon {
		
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
