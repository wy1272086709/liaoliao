<template>
	<view id="content">
		<!-- 头部header box -->
		<!--
		<view id="header-ask-box">
		-->
			<u-navbar :isBack="false" title="" :borderBottom="true" :isFixed="true"  :zIndex="10000000000000001" :height="platform == 1? 58: 54">
				<template v-slot:default="">
					<view class="slot-wrap">
						<view id="slot-title" @tap="gotoTop">妙语广场</view>
						<view id="slot-input">
							<!-- v-model="keyword"  -->
							<!--
							<input placeholder="大家都在搜" @blur="blurFunc" :value="keyword" @input="mindInput" placeholder-class="search-holder" id="mind-search-input" @confirm="searchList" />
							<uni-icons  type="search" id="search-icon" @tap="searchList"></uni-icons>
							-->
							<u-search placeholder="大家都在搜" @change="mindInput" v-model="keyword" :show-action="false"></u-search>
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
		
		<scroll-view :style="'height:'+scrollHeight+'px;'"  scroll-y="true"	 @scrolltolower="lower" @scrolltoupper="upper" @scroll="scroll" :scroll-top="scrollTop">
		<view id="mind-ask-box" class="content" v-if="mindList.length>0">
			<view class="mind-ask-view" v-for="(item,index) in mindList" :key="item.nid" @tap="gotoDetail(item.nid,index)">
				<view class="mind-title">
					<!--
					<text class="mz_shuo">妹子说: </text> 
					<text class="girl_title">{{item.title}} </text>
					-->
					<view class="mind-title-left">
						<view>
							<image :src="item.tx?item.tx:'../../static/img/user/people.png'" class="avatar-class"></image>
						</view>
						<view class="mind-nickName">{{item.fbr}}</view>
					</view>
					<view  class="mind-title-right">
						<view class="mind-pubdate">{{item.pubdate}}</view>
					</view>
				</view>
				<view class="mind-content">
					<text>{{item.description}}</text>
				</view>
				<view class="mind-interact">
					<view class="mind-interact-left">
						
					</view>
					<view class="mind-interact-right">
						<view class="praise-view" @tap.stop="clickPraise(index)">
							<!--
							<image :src="loveSrc" style="width: 28rpx;height:24rpx;margin-right:15.01rpx;"></image>
							-->
							
							<u-icon name="heart" size="32" :color="mindList[index].sfsc==1 ? '#FF3300':'#A6A6A6'" style="margin-right:15.01rpx;"></u-icon>
							<text>{{item.fbsccs}}</text>
						</view>
						<view class="reply-view">
							<image src="../../static/img/mind_square/message.png" style="width: 24rpx;height:24rpx;margin-right:15.01rpx;"></image>
							<text>{{item.hfsccs}}</text>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" />
		</view>
		<view id="search-result-view" v-if="mindList.length<=0 && isSearch">
			<view id="search-result-header">
				<view id="no-result-box">
					<text class="search-result-suggest">
						共搜索到 <text class="search-result-num">0</text> 条结果,您可以尝试以下方案
					</text>
				</view>
			</view>
		</view>
		</scroll-view>
		<u-no-network></u-no-network>
	</view>
</template>

<script>
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	let eMap = {};
	let isDbCollect = 0;
	let nowpage = 1;
	let totalpage = 1;
	
	let interval;

	export default {
		data() {
			return {
				keyword: '',
				platform: '',
				mindList: [
					
				],
				isSearch: '',
				color: '#A6A6A6',
				loveSrc: '../../static/img/mind_square/love.png',
				isFixed: true,
				scrollHeight: '',
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				status: 'loadmore'
			}
		},
		beforeDestroy() {
			console.log('beforeDestroy');
			this.isSearch = '';
		},
		onTabItemTap(obj) {
			console.log('onTabItemTap', obj);
			
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
			this.platform = getApp().globalData.platform;
			this.scrollHeight = info.windowHeight - info.statusBarHeight - (this.platform == 1? 58: 54);
			
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
			//this.keyword = '';
			this.$nextTick(()=>{
				console.log('keyword...', this.keyword);
				this.keyword = '';
			});
			nowpage = 1;
			this.getMindList(1, false);
		},
		components:{
			
		},
		onHide() {
			eMap = {};
		},
		onPullDownRefresh() {
			const stopRefresh = true;
			this.getMindList(1, false, stopRefresh);
		},
		onReady() {
			
		},
		methods: {
			async searchList() {
				this.searchMindList(1);
			},
			blurFunc() {
				console.log('blur');
				
			},
			upper() {
				uni.showNavigationBarLoading();
				nowpage = 1;
				this.getMindList(1, false, true);
			},
			gotoNext() {
				uni.switchTab({
					url: '/pages/user/user_index'
				});
			},
			scroll(e) {
				this.old.scrollTop = e.detail.scrollTop
			},
			// 脑洞广场搜索框输入的...
			mindInput(e) {
				console.log('input e', e);
				/*const v = e.detail.value;
				// 发送请求去搜索
				this.keyword = v;*/
				const v = e;
				if(v!= "") {
					nowpage = 1;
					this.searchMindList(1);
				} else {
					this.getMindList();
				}
			},
			moveHandle(e) {
				
			},
			gotoTop() {
				this.scrollTop = this.old.scrollTop
				//在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进Vue.nextTick()的回调函数中。
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			},
			gotoMindList() {
				this.getMindList(1, false, true);
			},
			async searchMindList(pageNo, isAppend) {
				this.isSearch = 1;
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
				params.nowpage = pageNo;
				const url = apiPrefix +'?mod=ndgc&ac=search';
				const res = await http.request(url, params);
				if(res.status == 1) {
					if(!isAppend) {
						this.mindList = res.data;
					} else {
						this.mindList = this.mindList.concat(res.data);
					}
					console.log('this.mindList', this.mindList);
					totalpage = res.totalpage;
				}
			},
			async getMindList(pageNo, isAppend, stopRefresh) {
				this.isSearch = 0;
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
				//console.log('res', res);
				if(res.status == 1) {
					if(!isAppend) {
						this.mindList = res.data;
					} else {
						this.mindList = this.mindList.concat(res.data);
					}
					totalpage = res.totalpage;
					console.log('stopRefresh', stopRefresh);
					if(stopRefresh) {
						console.log('gor here! stop!');
						//uni.stopPullDownRefresh();
						setTimeout(()=> {
							uni.hideNavigationBarLoading();
						}, 2000);
					}
				}
			},
			// 拉到最底部的时候,请求第二页的脑洞广场
			lower() {
				console.log('to lower!');
				let _self = this;
				console.log('page',nowpage, 'totalpage', totalpage);
				if(nowpage>=totalpage) {
					clearTimeout(interval);
					return;
				}
				this.status = 'loading';
				interval = setTimeout(() => {
					nowpage++;
					if(nowpage==totalpage) {
						this.status = 'nomore';
					} else if(nowpage>totalpage) {
						return;
					}
					console.log('page....',nowpage);
					if(_self.isSearch) {
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
				// 也不允许1.3内连续点击两次
				const keys = Object.keys(eMap);
				if ( parseInt(t1) - parseInt(keys[0])<=1.3 ) {
					return;
				}
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
				const uid = this.mindList[index].uid;
				if (uid== this.uid) {
					uni.showToast({
						icon:'none',
						title:'不能收藏自己发布的!',
						duration:2000,
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
				let list = this.mindList[index];
				if(resp.status == 1) {
					//list.sfsc  = type;
					//list.fbsccs = resp.fbsccs;
					//this.$set(this.mindList, index, list);
					//console.log('this.mindList[index].sfsc', this.mindList[index].sfsc);
					this.mindList[index].sfsc = type;
					this.mindList[index].fbsccs = resp.fbsccs;
				}
				console.log('this.mindList', this.mindList);
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
.u-navbar-inner {
	border-bottom: 1px solid #F2F2F2;
}
scroll-view::-webkit-scrollbar {  
	display: none !important;  
	width: 0 !important;  
	height: 0 !important;  
	-webkit-appearance: none;  
	background: transparent;  
}
//第二种
::-webkit-scrollbar{
	  display: none;
}
#content {
	/*#header-ask-box {*/
		.slot-wrap {
			display: flex;
			align-items: center;
			margin-top:35rpx;
			padding-left:32rpx;
			padding-right:34rpx;
			/*padding-bottom: 20rpx;*/
			margin-bottom:31rpx;
			
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
				flex-direction: row-reverse;
				box-sizing: border-box;
				width:360rpx;
				height: 60rpx;
				margin-left:20rpx;
				/*padding-left: 20rpx;*/
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
				font-size: 14px;
				font-family: PingFang SC;
				font-weight: 400;
				background-color: #F2F2F2;
				padding:0rpx 28rpx;
				border-radius: 18rpx;
				view {
					height: 60rpx;
					display: block;
					line-height: 60rpx;
					color: #A890F0;
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
				display: flex;
				/*padding-bottom: 10rpx;
				border-bottom: 1px solid #F2F2F2;*/
				// 超出省略号...
				/*.mz_shuo {
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
					/*width:474rpx;
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
				}*/
				justify-content: space-between;
				.mind-title-left {
					display: flex;
					/*width: 40%;*/
					.avatar-class {
						width: 38px;
					    height: 38px;
					    border-radius: 50%; 
					}
					align-items: center;
					.mind-nickName {
						/*margin-right:47rpx;*/
						font-weight: 600;
						margin-left:35rpx;
					}
				}
				.mind-title-right {
					display: flex;	
					/*width: 60%;*/
					align-items: center;
					justify-content: flex-end;
					.mind-pubdate {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color:#A3A3A3;
					}
				}
			}
			
		
			.mind-content {
				display: block;
				margin-top:43rpx;
				margin-bottom: 27rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				/*color: #666666;*/
				margin-left: 9rpx;
				margin-right: 9rpx;
				overflow:hidden;
				
				/*height: 60px;*/
				// 超出省略号...
				text-overflow:ellipsis;
				display: -webkit-box;
				word-break: break-all;
				-webkit-line-clamp: 6;
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
				/*
				padding-top:10px;
				border-top: 1px solid #F3F3F3;*/
				.mind-interact-left {
					width:70%;
					display: flex;
					
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
