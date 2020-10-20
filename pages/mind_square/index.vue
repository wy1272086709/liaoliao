<template>
	<view id="content">
		<!-- 头部header box -->
		<!--
		<view id="header-ask-box">
		-->
			<u-navbar :isBack="false" title="" :borderBottom="true" :isFixed="isFixed"  :zIndex="10000000000000001">
				<template v-slot:default="">
					<view class="slot-wrap">
						<view id="slot-title" @tap="gotoMindList">脑洞广场</view>
						<view id="slot-input">
							<input placeholder="大家都在搜" placeholder-class="search-holder" id="mind-search-input" v-model.trim="keyword" @confirm="searchList" />
							<uni-icons  type="search" id="search-icon" @tap="searchList"></uni-icons>
						</view>
						<view id="slot-img" @tap="askQues">
							<!--
							<image src="../../static/img/mind_square/question_active.png" style="width:100%;height:100%"></image>
							-->
							<view>
								<text>提问</text>
							</view>
						</view>
					</view>
				</template>
			</u-navbar>
		<!--
		</view>
		-->
		<scroll-view :style="'height:'+scrollHeight+'px;'"  scroll-y="true"	 @scrolltolower="lower">
		<view id="mind-ask-box" class="content" v-if="mindList.length>0">
			<view class="mind-ask-view" v-for="(item,index) in mindList" :key="item.nid" @tap="gotoDetail(item.nid,index)">
				<view class="mind-title">
					<text class="mz_shuo">妹子说: </text> 
					<text class="girl_title">{{item.title}} </text>
				</view>
				<view class="mind-content">
					<text>{{item.description}}</text>
				</view>
				<view class="mind-interact">
					<view class="mind-interact-left">
						<view class="mind-nickName">{{item.fbr}}</view>
						<view class="mind-pubdate">{{item.pubdate}}</view>
					</view>
					<view class="mind-interact-right">
						<view class="praise-view" @tap.stop="clickPraise(index)">
							<!--
							<image :src="loveSrc" style="width: 28rpx;height:24rpx;margin-right:15.01rpx;"></image>
							-->
							<u-icon name="heart" size="32" :color="item.sfsc ? '#FF3300':'#A6A6A6'" style="margin-right:15.01rpx;"></u-icon>
							<text>{{item.fbsccs}}</text>
						</view>
						<view class="reply-view">
							<image src="../../static/img/mind_square/message.png" style="width: 24rpx;height:24rpx;margin-right:15.01rpx;"></image>
							<text>{{item.hfsccs}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view id="search-result-view" v-if="mindList.length<=0">
			<view id="search-result-header">
				<view id="no-result-box">
					<text class="search-result-suggest">
						共搜索到 <text class="search-result-num">0</text> 条结果,您可以尝试以下方案
					</text>
				</view>
			</view>
			<view class="search-result-title">
				<text>精简关键词</text>
			</view>
			<view>
				<text class="search-result-suggest">建议使用简单的关键词,比如说女生说【你吃晚饭了吗?】,搜索时输入【晚饭】即可。 \n  也可以尝试相近的关键词,比如【你想干嘛?】可以搜索【干嘛】、【干什么】等相近的搜索词。</text>
			</view>
		</view>
		</scroll-view>
		
		<!--
		<view id="absolute-view" :class="maskClass" @touchmove.stop.prevent="moveHandle">
			<uni-transition :show="isShowMask" :modeClass="['slide-top']">
				<view class="mask-view" :style="'position:absolute;top:'+searchInputTop+'px;left:'+searchInputLeft+'px;'">
					<image src="../../static/img/mask/index/search_border_h.png" style="width: 400rpx;height:60rpx;"></image>
				</view>
				<view :style="'position:absolute;top:'+arrowTop+'px;left:'+arrowLeft+'px;'">
					<image src="../../static/img/mask/index/arrow1.png" style="width: 50rpx;height:37rpx;"></image>
				</view>
				<view :style="'position:absolute;top:'+arrow2Top+'px;left:'+arrow2Left+'px;width:287rpx;'">
					<image src="../../static/img/mask/index/arrow2.png" style="width: 51rpx;height:40rpx;"></image>
				</view>
				
				<view :style="'position:absolute;top:'+infoTop+'px;left:42rpx;width:287rpx;'">
					<text>话术库搜不到,没关系,这里有更多的助力,集思广益,总会有的 </text>
				</view>
				
				<view :style="'position:absolute;top:'+askInfoTop+'px;left:'+askInfoLeft+'rpx;width:278rpx;'">
					<text>点击提问,可获取更精准的回复哦</text>
				</view>
				
				<view :style="'position:absolute;top:'+nextTop+'px;left:0rpx;width:100%;z-index:100000000000'" id="nextBtn" @tap="gotoNext">
					<view>
						<text>下一步</text>
					</view>
				</view>
			</uni-transition>
		</view>
		-->
	</view>
</template>

<script>
	import uNavbar  from '../../uview-ui/components/u-navbar/u-navbar.vue';
	import uIcon from '../../uview-ui/components/u-icon/u-icon.vue';
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	let eMap = {};
	let isDbCollect = 0;
	let nowpage = 1;
	let totalpage = 1;
	let isSearch = 0;
	let interval;
	export default {
		data() {
			return {
				keyword: '',
				mindList: [
					{
						title: '最近心情不是很好',
						description: '女神突然说最近心情不好,我要怎么安慰他?',
						cid: 1,
						nid: 1,
						fbr: '小康',
						pubDate: '刚刚',
						fbsccs: 10,
						hfsccs: 20,
						// 当前问题是否被收藏
						sfsc: 0,
					}
				],
				/*searchInputTop: '',
				searchInputLeft: '',
				arrowTop: '',
				arrowLeft: '',
				arrow2Top: '',
				arrow2Left: '',
				infoTop: '',
				askInfoLeft: '',
				askInfoTop: '',*/
				color: '#A6A6A6',
				loveSrc: '../../static/img/mind_square/love.png',
				isFixed: true,
				//isShowMask: false,
				scrollHeight: '',
				/*nextTop: '',
				nextLeft: '',
				maskClass: '',*/
			}
		},
		computed:{
			uid: function() {
				if (this.$store.getters.userInfo.uid) {
					return this.$store.getters.userInfo.uid;
				}
				let uid = null;
				uid =  util.cache('app_userid', null);
				return uid ? uid: 0;	
			}
		},
		onLoad() {
			const info = uni.getSystemInfoSync();
			this.scrollHeight = info.windowHeight - info.statusBarHeight - 44;
		},
		onShow() {
			/*const v = util.getVersionValue();
			console.log('v', v);
			if(v) {
				this.maskClass = '';
				this.isShowMask= false;
			} else {
				this.maskClass = 'maskClass';
				this.isShowMask= true;
			}*/
			this.getMindList(1, false);
		},
		components:{
			uNavbar,
			uIcon
		},
		onHide() {
			eMap = {};
		},
		onPullDownRefresh() {
			const stopRefresh = true;
			this.getMindList(1, false, stopRefresh);
		},
		onReady() {
			/*
			console.log('onReady...');
			const m = uni.createSelectorQuery().select('#slot-input');
			m.boundingClientRect((data)=>{
				console.log('data', data)
				this.searchInputTop = data.top;
				this.searchInputLeft= data.left;
				this.arrowTop       = data.top+uni.upx2px(80);
				this.arrowLeft      = data.left - uni.upx2px(25);
				this.infoTop        = data.top+uni.upx2px(107);
				this.askInfoTop     = data.top+uni.upx2px(115);
				this.askInfoLeft    = 442;
				this.arrow2Top      = this.arrowTop;
				this.arrow2Left     = data.left+uni.upx2px(406);
				//this.maskClass = 'maskClass';
				//this.isShowMask= true;
				this.nextTop   = uni.getSystemInfoSync().windowHeight - 60;
				
			}).exec();*/
		},
		methods: {
			async searchList() {
				this.searchMindList(1);
			},
			gotoNext() {
				uni.switchTab({
					url: '/pages/user/user_index'
				});
			},
			moveHandle(e) {
				
			},
			gotoMindList() {
				this.getMindList(1, false, true);
			},
			async searchMindList(pageNo, isAppend) {
				isSearch = 1;
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const k = this.keyword;
				const params = {
					keyword:k,
					uid: this.uid,
					filterData: true
				};
				params.auth = auth;
				params.nowpage = nowpage = 1;
				const url = apiPrefix +'?mod=ndgc&ac=search';
				const res = await http.request(url, params);
				if(res.status == 1) {
					if(!isAppend) {
						this.mindList = res.data;
						totalpage = res.totalpage;
					} else {
						this.mindList = this.mindList.concat(res.data);
					}
				}
			},
			async getMindList(pageNo, isAppend, stopRefresh) {
				isSearch = 0;
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const params = {
					filterData: true,
					uid: this.uid
				};
				params.auth = auth;
				params.nowpage = pageNo;
				let url = apiPrefix + "?mod=ndgc&ac=list";
				const res = await http.request(url, params);
				console.log('res', res);
				if(res.status == 1) {
					if(!isAppend) {
						this.mindList = res.data;
						totalpage = res.totalpage;
					} else {
						this.mindList = this.mindList.concat(res.data);
					}
					console.log('stopRefresh', stopRefresh);
					if(stopRefresh) {
						console.log('gor here! stop!');
						uni.stopPullDownRefresh();
					}
				}
			},
			// 拉到最底部的时候,请求第二页的脑洞广场
			lower() {
				console.log('to lower!');
				let _self = this;
				console.log('page',nowpage);
				if(nowpage>=totalpage) {
					clearTimeout(interval);
					return;
				}
				interval = setTimeout(function() {
					nowpage++;
					console.log('page....',nowpage);
					if(isSearch) {
						_self.searchMindList(nowpage, true);
					} else {
						_self.getMindList(nowpage, true);
					}
				}, 500);
			},
			askQues() {
				uni.navigateTo({
					url:'/pages/mind_square/publish'
				})
			},
			getColor(index) {
				let color = '';
				if (this.mindList[index].sfsc) {
					color = '#FF3300';
				} else { 
					color = '#A6A6A6';
				}
				return color;
			},
			delMap() {
				const keys = Object.keys(eMap);
				const n    = keys.length;
				// 只保留最后两个元素
				for( let m = 0;m<n-2;m++) {
					delete eMap[keys[m]];
				}
			},
			gotoDetail(askId,index) {
				const info = this.mindList[index];
				// 缓存信息到
				const str  = JSON.stringify(info);
				console.log('str', str);
				util.cache('mind_question_info', str);
				setTimeout(()=> {
					uni.navigateTo({
						url:'/pages/mind_square/ask-ques-list?nid='+askId
					});
				}, 200);
			},
			// 这里其实是收藏
			async clickPraise(index) {
				// 只保留最后两个元素
				this.delMap();
				const t1 = parseInt(new Date().getTime()/1000);
				// 不允许连续点击两次或者更多次...
				if(eMap[t1]) {
					return;
				}
				if(!this.uid) {
					uni.showToast({
						icon:'none',
						title:'请先登录',
						duration:2000,
						complete() {
							uni.navigateTo({
								url:'/pages/user/login_v2'
							});
						}
					});
					return;
				}
				// this.color = '#FF3300';
				
				// 这里需要将问题ID,当前用户,收藏,还是取消收藏,传递给后台
				// 表示已经点赞过...
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const type = 1- this.mindList[index].sfsc;
				const params = {
					nid:this.mindList[index].nid,
					uid: this.uid,
					type: type,
					auth: auth,
					filterData: true
				};
				const route = '?mod=ndgc&ac=fb_sc';
				const url  = apiPrefix + route;
				const resp = await http.request(url, params);
				if(resp.status == 1) {
					if(type == 1) {
						this.mindList[index].isCollect = true;
					} else if(type == 0){
						this.mindList[index].isCollect = false;
					}
					this.mindList[index].sfsc = 1 - this.mindList[index].sfsc;
					this.mindList[index].fbsccs = resp.fbsccs;
				}
				const t = parseInt(new Date().getTime()/1000);
				eMap[t] = 1;
				// 当后台相应成功后,点赞数+1.
			},
			reply() {
				// 进入详情页面
				
			},
			// 获取问题列表
			getAskList() {
				
			}
		}
	}
</script>

<style lang="scss">
	
.search-holder {
	margin-left:21rpx;
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #CCCCCC; 
}

#content {
	/*#header-ask-box {*/
		.slot-wrap {
			display: flex;
			align-items: center;
			margin-top:55rpx;
			padding-left:32rpx;
			padding-right:34rpx;
			padding-bottom: 20rpx;
			margin-bottom:31rpx;
			border-bottom: 1px solid #F2F2F2;
			justify-content: space-between;
			#slot-title {
				display: flex;
				width:160rpx;
				/*flex-shrink: 1;*/
				height: 60rpx;
				font-size: 40rpx;
				font-family: PingFang SC;
				font-weight: 800;
				color: #343434; 
			}
			
			#slot-input {
				display: flex;
				box-sizing: border-box;
				width:400rpx;
				height: 60rpx;
				margin-left:20rpx;
				padding-left: 20rpx;
				align-items: center;
				background: #F2F2F2;
				border-radius: 30rpx;
				#search-icon {
					margin-left:21rpx;
					margin-right: 17rpx;
				}
			}
			
			#slot-img {
				/*width:60rpx;
				height: 60rpx;*/
				display: flex;
				height: 60rpx;
				
				margin-left:20rpx;
				align-items: center;
				line-height: 60rpx;
				font-size: 40rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #343434;
				view {
					height: 60rpx;
					display: block;
					line-height: 60rpx;
				}
			}
		}
	/*}*/
	#mind-ask-box {
		padding-top:39rpx;
		.mind-ask-view {
			display: flex;
			flex-direction: column;
			padding-bottom:20rpx;
			margin-top:20rpx;
			border-bottom: 1px solid #F2F2F2;
			padding-left:46rpx;
			padding-right: 46rpx;
			.mind-title {
				display: block;
				// 超出省略号...
				.mz_shuo {
					font-size:32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #A890F0;
					
					display: block;
					height: 60rpx;
					background: #F3F3F3;
					border-radius: 30rpx;
					text-align: center;
					line-height: 60rpx;
					width: 160rpx;
					margin-right: 24rpx;
					float: left;
				}
				.girl_title {
					/*width: 500rpx;*/
					width:474rpx;
					display: block;
					overflow: hidden;
					height: 60rpx;
					line-height: 60rpx;
					vertical-align: center;
					text-overflow:ellipsis; 
					white-space: nowrap;
					float: left;
				
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333232;
				}
			}
			
			.mind-content {
				margin-top:43rpx;
				margin-bottom: 27rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;
				margin-left: 9rpx;
				margin-right: 9rpx;
				overflow:hidden;
				
				/*height: 60px;*/
				// 超出省略号...
				text-overflow:ellipsis;
				display: -webkit-box;
				word-break: break-all;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				color: #A3A3A3;
			}
			.mind-interact {
				display: flex;
				margin-left: 9rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #9A9A9A;
				.mind-interact-left {
					width:70%;
					display: flex;
					.mind-nickName {
						/*margin-right:47rpx;*/
						display: flex;
						width:40%;
					}
					.mind-pubdate {
						display: flex;
						width:60%;
					}
				}
				.mind-interact-right {
					width:30%;
					.praise-view {
						margin-right:20rpx;
					}
					.reply-view {
						
					}
					display: flex;
					justify-content: flex-end;
				}
			}
		}
	}
}


#search-result-view {
	margin-left: 32rpx;
	margin-right: 32rpx;
	display:flex;
	/*height: 300px;*/
	flex-direction:column;
	justify-content:center;
}

#search-result-header {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height:60px;
	align-items: center;
	/*margin-bottom: 10px;*/
	padding-bottom: 21rpx;
	border-bottom: 2px solid #F1F0F0;
}

.search-result-title {
	margin-top: 20px;
	margin-bottom: 10px;
}

.search-result-title>text {
	font-size: 32rpx;
	font-family: PingFang SC;
	font-weight: 800;
	color: #333333;
}


.search-total-rows {
	color: rgb(27, 26, 26);
	font-weight: bold;
	margin-left: 5px;
	margin-right: 5px;
}

.search-result-suggest {
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: 400;
	color: #616161;
}

.search-result-num {
	color: #A88FEF;
	margin-left:10rpx;
	margin-left:10rpx;
}

</style>
