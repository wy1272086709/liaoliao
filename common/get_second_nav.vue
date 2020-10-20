<template>
	<view :style="index==2?'flex-wrap:wrap':''">
		<template>
			<template v-if="index==0 || index == 5">
				<view  v-for="(nav,index2) in secondNav" class="second-nav-three-row" :style="'background-image:url('+nav.litpic+');'+(index2==0 ? 'margin-right:24rpx': (index2==1?'margin-right:26rpx':''))"  @tap="enter_huashu(nav.title, nav.navId);" :key="nav.navId">
					<text class="second-nav-text">{{nav.title}}</text>
				</view>
			</template>
			<template v-else-if="index == 1">
				<view style="flex-direction: row;">
					<view class="second-nav-three-left" :key="secondNav.length>0?secondNav[0].navId:'index_0'" :style="'background-image:url('+secondNav[0].litpic+');'" @tap="enter_huashu(secondNav[0].title, secondNav[0].navId);"> 
						<text class="second-nav-text-left">{{secondNav[0].title}}</text>
					</view>
					<view class="second-nav-three-right"> 
						<view class="second-nav-right-one" :key="secondNav.length>0?secondNav[1].navId:'index_1'" :style="'background-image:url('+secondNav[1].litpic+');'" @tap="enter_huashu(secondNav[1].title, secondNav[1].navId);">
							<text class="second-nav-right-one-text">{{secondNav[1].title}}</text>
							<text  class="second-nav-right-one-content">{{secondNav[1].content}} </text>
						</view>
						<view class="second-nav-right-two" :key="secondNav.length>0?secondNav[2].navId:'index_2'" :style="'background-image:url('+secondNav[2].litpic+');'" @tap="enter_huashu(secondNav[2].title, secondNav[2].navId);">
							<text class="second-nav-right-two-text">{{secondNav[2].title}}</text>
							<text  class="second-nav-right-two-content">{{secondNav[2].content}} </text>
						</view>
					</view>
				</view>
			</template>
			<template v-else-if="index == 2">
				<view class="six-nav-csss" :style="'background-image:url('+nav.litpic+');'+(index2%2==0?'margin-right:20rpx;':'')+(index2<=3?'margin-bottom:19rpx;':'')"  @tap="enter_huashu(nav.title, nav.navId);" v-for="(nav,index2) in secondNav" :key="nav.navId">
					<view class="six-nav-title">
						<text>{{nav.title}}</text>
					</view>
					<view class="six-nav-content">
						<text>{{nav.content}}</text>
					</view>
				</view>
			</template>
			<template v-else-if="index == 3">
				<view id="five-party-layout-view">
					<view class="five-party-view"  @tap="enter_huashu(nav.title, nav.navId);" :key="nav.navId"  v-for="(nav,index2) in secondNav" :style="'background-image:url('+nav.litpic+');'+(index2==0?'width:682rpx;height:157rpx;':'')+(index2<=2?'margin-bottom:18rpx;':'')+((index2==1||index2==3) ? 'margin-right:20rpx;':'')">
						<view class="five-party-view-title">{{nav.title}}</view>
						<view class="five-party-view-content">{{nav.content}}</view>
					</view>
				</view>
			</template>
			<template v-else-if="index == 4">
				<view id="four-part-layout-view">
					<view id="four-part-left">
						<view class="four-part-one" :key="secondNav[0].navId"  @tap="enter_huashu(secondNav[0].title, secondNav[0].navId);" >
							<text class="four-part-font-title title-one-position">{{secondNav[0].title}}</text>
							<view class="four-part-font-content content-one-position">{{secondNav[0].content}}</view>
						</view>
						<view class="four-part-three" :key="secondNav[2].navId" @tap="enter_huashu(secondNav[2].title, secondNav[2].navId);">
							<text class="four-part-font-title title-three-position">{{secondNav[2].title}}</text>
							<text class="four-part-font-content content-three-position">{{secondNav[2].content}}</text>
						</view>
					</view>
					
					<view id="four-part-right">
						<view class="four-part-two" :key="secondNav[1].navId"  @tap="enter_huashu(secondNav[1].title, secondNav[1].navId);">
							<text class="four-part-font-title title-two-position">{{secondNav[1].title}}</text>
							<text class="four-part-font-content content-two-position">{{secondNav[1].content}}</text>
						</view>
						<view class="four-part-four" :key="secondNav[3].navId"  @tap="enter_huashu(secondNav[3].title, secondNav[3].navId);">
							<text class="four-part-font-title title-four-position">{{secondNav[3].title}}</text>
							<text class="four-part-font-content content-four-position">{{secondNav[3].content}}</text>
						</view>
					</view>
				</view>
			</template>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props: {
		    index: {
				type: Number,
				default: 1
			},
			secondNav: {
				type: Array,
				default: function() {
					return [{},{}, {}, {}];
				}
			}
		},
		methods: {
			enter_huashu(title, navId) {
				uni.navigateTo({
					url:'/pages/index/huashu?title='+encodeURIComponent(title)+'&navId='+navId
				});
			},
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	.second-nav {
		flex-direction: row;
		flex-wrap: wrap;
		margin-top:10px;
	}

	/*.second-nav-label {
		width:206rpx;
		height:30px;
		background:rgba(255,255,255,1);
		border-radius:30rpx;
		opacity:0.4;
		justify-content: center;
		align-items: center;
	}*/
	
	.second-nav-three-row {
		width:212rpx;
		height:212rpx;
		background-size:contain;	
	}
	
	.second-nav-three-left {
		width:333rpx;
		height:322rpx;
		/*opacity:0.39;*/
		background-size: contain;
		margin-right:15rpx;
		border-radius:20rpx 20rpx 20rpx 20rpx;
	}
	
	.second-nav-three-right {
		flex-direction: column;
	}
	
	.second-nav-right-one {
		width:336rpx;
		height:153rpx;
		background-size: contain;
		margin-bottom:15rpx;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	
	.second-nav-right-two {
		background-size: contain;
		width:336rpx;
		height:153rpx;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}
	
	.second-nav-right-one-text {
		display: flex;
		margin-left:156rpx;
		margin-top:38rpx;
		font-size:34rpx;
		font-family:SourceHanSansSC;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	
	.second-nav-right-two-text {
		display: flex;
		margin-left:150rpx;
		margin-top:40rpx;
		font-size:34rpx;
		font-family:SourceHanSansSC;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	
	.second-nav-right-one-content {
		display: flex;
		margin-top:17rpx;
		margin-left:144rpx;
		padding-left:9rpx;
		padding-right:9rpx;
		height:30rpx;
		background:rgba(234,104,162,1);
		border-radius:15rpx;
		font-size:17rpx;
		padding-top:6rpx;
		padding-bottom:7rpx;
		font-family:DFYuanLightGB;
		font-weight:400;
		color:rgba(255,255,255,1);
		max-width:170rpx;
	}
	
	.second-nav-right-two-content {
		display: flex;
		margin-top:13rpx;
		margin-left:130rpx;
		padding-top:6rpx;
		padding-bottom:7rpx;
		height:30rpx;
		background:rgba(234,104,162,1);
		border-radius:15rpx;
		font-size:18rpx;
		font-family:DFYuanLightGB;
		font-weight:400;
		padding-left:20rpx;
		padding-right:10rpx;
		color:rgba(255,255,255,1);
		max-width:170rpx;
	}

	
	.six-nav-csss {
		background-size: contain;
		flex-direction: column;
		width:333rpx;
		height:158rpx;
	}
	
	.six-nav-title {
		margin-left:30rpx;
		margin-top:38rpx;
		font-size:26rpx;
		font-family:SourceHanSansSC;
		font-weight:500;
		color:rgba(23,8,13,1);
	}
	
	.six-nav-content {
		margin-left:29rpx;
		margin-top:19rpx;
		font-size:19rpx;
		font-family:PingFang;
		font-weight:400;
		color:rgba(23,8,13,1);
	}
	
	#five-party-layout-view {
		flex-direction: row;
		flex-wrap:wrap;
	}
	
	.five-party-view {
		flex-direction: column;
		background-size: contain;
		width:332rpx;
		height: 157rpx;;
	}
	
	.five-party-view-title {
		margin-top:38rpx;
		margin-left:31rpx;
		font-size:26rpx;
		font-family:SourceHanSansSC;
		font-weight:500;
		color:rgba(23,8,13,1);
	}
	
	.five-party-view-content {
		margin-top:19rpx;
		margin-left:29rpx;
		font-size:19rpx;
		font-family:PingFang;
		font-weight:400;
		color:rgba(23,8,13,1);
	}
	#four-part-layout-view {
		flex-direction: row;
	}
	
	#four-part-left {
		flex-direction: column;
	}
	
	#four-part-right {
		flex-direction: column;
	}
	
	.four-part-one,.four-part-two,.four-part-three,.four-part-four {
		flex-direction: column;
	}
	
	.four-part-one {
		width:325rpx;
		height:189rpx;
		background:linear-gradient(17deg,rgba(131,91,213,1),rgba(234,148,199,1));
		border-radius:10rpx;
		margin-right: 32rpx;
		margin-bottom: 23rpx;
		align-items: flex-start;
		justify-content: flex-start;

	}
	
	.four-part-two {
		width:329rpx;
		height:165rpx;
		background:linear-gradient(17deg,rgba(53,174,166,1),rgba(158,224,133,1));
		border-radius:10rpx;
		margin-bottom: 22rpx;
		align-items: flex-start;
		justify-content: flex-start;

	}
	
	.four-part-three {
		width:325rpx;
		height:189rpx;
		background:linear-gradient(17deg,rgba(255,115,137,1),rgba(255,180,140,1));
		border-radius:10rpx;
		margin-right: 32rpx;
		align-items: flex-start;
		justify-content: flex-start;

	}
	
	.four-part-four {
		width:330rpx;
		height:214rpx;
		background:linear-gradient(17deg,rgba(81,89,228,1),rgba(139,202,248,1));
		border-radius:10rpx;
		align-items: flex-start;
		justify-content: flex-start;

	}
	
	.four-part-font-title {
		font-size:31rpx;
		font-family:58;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	
	.four-part-font-content {
		font-size:22rpx;
		font-family:58;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	
	.title-one-position {
		margin-left:27rpx;
		margin-top:36rpx;
	}
	
	.title-two-position {
		margin-left:48rpx;
		margin-top:37rpx;
	} 
	
	.title-three-position {
		margin-left:28rpx;
		margin-top:38rpx;
	} 
	
	.title-four-position {
		margin-left:49rpx;
		margin-top:35rpx;
	} 
	
	.content-one-position {
		margin-top:30rpx;
		margin-left:27rpx;
		padding-left:10rpx;
		max-width:234rpx;
		word-wrap:break-word;
		padding-right:10rpx;
		background:rgba(131,79,232,1);
		border-radius:11rpx;
	}
	
	.content-two-position {
		margin-top:18rpx;
		margin-left:27rpx;
		padding-left:10rpx;
		padding-right:10rpx;
		max-width:234rpx;
		background: #3ABCA2;
		border-radius:11px;
	}
	
	.content-three-position {
		margin-top:32rpx;
		margin-left:25rpx;
		padding-left:10rpx;
		padding-right:10rpx;
		max-width:234rpx;
		background:rgba(253,97,122,1);
		border-radius:11px;
	}
	
	.content-four-position {
		margin-top:37rpx;
		margin-left:32rpx;
		padding-left:10rpx;
		padding-right:10rpx;
		max-width:234rpx;
		background:rgba(81,89,228,1);
		border-radius:11px;
	}
	
	/* 除了第一个元素外的元素,需要添加这个  */
	.second-nav-lable-margin {
		margin-right:32rpx;
	}
	
	.second-nav-lable-top {
		margin-top:12px;
	}
	
	.second-nav-text {
		display: flex;
		height:29rpx;
		margin-top:33rpx;
		padding-left:10rpx;
		padding-right:10rpx;
		border-top-right-radius:14rpx;
		border-bottom-right-radius:14rpx;
		font-size:20rpx;
		font-family:HeitiCSEG;
		font-weight:normal;
		background: #F23DA6;
		color:rgba(255,255,255,1);
		font-weight:400;
	}
	
	.second-nav-text-left {
		margin-left:106rpx;
		margin-top:243rpx;
		font-size:32rpx;
		font-family:SourceHanSansSC;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	
</style>
