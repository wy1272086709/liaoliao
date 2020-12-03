<template>
	<view id="root-view">
	<view id="user-header">
		<view v-for="(header,index) in headerList" :key="header.id" @tap="header.tap(index)" :class="[index==curTabIndex?'active-header-view':'user-header-view']">
			<view :class="[index==curTabIndex?'active-border':'']">
				<text>{{ header.text }}</text>
			</view>
		</view>
	</view>
	<view id="user-content">
		<template v-if="curTabIndex ==0 || curTabIndex == 2 || curTabIndex == 3">		
			<view class="mind-ask-view" v-for="(item,index) in mindList" :key="item.nid" @tap="gotoDetail(curTabIndex, item)">
				<view class="mind-title" v-if="curTabIndex == 2|| curTabIndex == 3">
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
					<view class="hidden-elipse-css">
						<text>{{item.description}}</text>
					</view>
					<navigator :url="'/pages/mind_square/ask-ques-list?nid='+item.nid">
						<text style="color:blue;" v-if="curTabIndex == 3">查看更多</text>
					</navigator>
				</view>
				<view class="mind-interact">
					<view class="mind-interact-left">
						<!--
						<view class="mind-nickName">{{item.nickName}}</view>
						
						<view class="mind-pubdate">{{item.pubdate}}</view>
						-->
					</view>
					<view class="mind-interact-right">
						<!-- @tap.stop="clickPraise(index)" -->
						<view class="praise-view" @tap.stop="clickPraise(index)">
							<!--
							<image :src="loveSrc" style="width: 28rpx;height:24rpx;margin-right:15.01rpx;"></image>
							-->
							<u-icon name="heart" size="32" :color="getColor(index)" style="margin-right:15.01rpx;"></u-icon>
							<text>{{item.fbsccs}}</text>
						</view>
						<view class="reply-view">
							<image src="../../static/img/mind_square/message.png" style="width: 24rpx;height:24rpx;margin-right:15.01rpx;"></image>
							<text>{{item.hfsccs}}</text>
						</view>
					</view>
				</view>
				
				<!--
				<view v-if="curTabIndex == 3" v-for="(answer,index2) in item.answerList">
					<view class="mind-first-line">
						<image :src="answer.headimg?answer.headimg:'../../static/img/user/people.png'" style="height:72rpx;width:72rpx;margin-right:21rpx;"></image>
						<view>
							<text class="mind-answer-nickName">{{answer.nickName}}</text>
							<text>{{answer.pubDate}}</text>
							<text>回复了你的回答</text>
						</view>
					</view>
					<view class="mind-second-line">
						<text>{{answer.replay}}</text>
					</view>
				</view>
				-->
			</view>
		</template>
		
		<!-- 收藏文章 -->
		<template v-if="curTabIndex == 1">
			<view class="mind-article-view" v-for="(item,index) in mindList" :key="item.nid" @tap="gotoDetail(curTabIndex,item)">
				<view class="content-img-view">
					<image :src="item.thumbUrl" class="thumb-class"></image>
				</view>
				<view class="content-titleinfo-view">
					<view class="content-title-view">
						<text>{{item.title}}</text>
					</view>
					<view class="content-stats-view">
						<text>{{item.description}}</text>
					</view>
				</view>
			</view>
		</template>
	</view>
	</view>
</template>

<script>
	let eMap = {};
	import uIcon from '../../uview-ui/components/u-icon/u-icon.vue'
	import http from '../../common/http.js';
	import util from '../../common/util.js';
	let nowpage = 1;
	let totalpage = 1;
	let interval;
	export default {
		data() {
			const _self = this;
			const tap = function(index) {
				if(index == _self.curTabIndex) {
					return;
				}
				_self.curTabIndex = index;
				const titleArr = [
					'我发布的',
					'收藏文章',
					'收藏问答',
					'收到评论'
				];
				uni.setNavigationBarTitle({
					title:titleArr[index],
				});
				const method = _self.tabMethod;
				nowpage = 1;
				method(1);
			};
			const headerList = [
				{
					id: 1,
					text: '我发布的',
					tap: tap,
				},
				{
					id: 2,
					text: '收藏文章',
					tap: tap,
				},
				{
					id: 3,
					text: '收藏问答',
					tap: tap
				},
				{
					id: 4,
					text: '收到评论',
					tap: tap
				}
			];
			
			
			return {
				// 我发布的...
				publishList: [
					/*{
						title: '',
						description: '',
						nid: 1,
						nickName: '',
						pubdate: '',
						fbsccs: '',
						hfsccs: '',
						// 当前问题是否被收藏
						isCollect: 0,
					}*/
				],
				collectCommentList: [
					/*
					{
						title: '最近心情不是很好',
						description: '女神突然说最近心情不好,我要怎么安慰他?',
						nid: 1,
						nickName: '小康',
						pubdate: '刚刚',
						fbsccs: 10,
						hfsccs: 20,
						// 当前问题是否被收藏
						isCollect: 0,
					}*/
				],
				// 收藏问答,
				quesAndAnswer:[
					/*{
						title: '最近心情不是很好',
						description: '女神突然说最近心情不好,我要怎么安慰他?',
						nid: 1,
						nickName: '小康',
						pubdate: '刚刚',
						fbsccs: 10,
						hfsccs: 20,
						// 当前问题是否被收藏
						isCollect: 0,
					}*/
				],
				articleList: [],
				curTabIndex: 0,
				headerList: headerList
			}
		},
		components:{
			uIcon
		},
		onShow() {
			const index = this.curTabIndex;
			if (index == 3) {
				this.getMyComment(1);
			}
		},
		computed:{
			headerClass() {
				
			},
			tabMethod: function() {
				const methods = [ 'getMyPublish', 'getMyCollectArticle', 'getMyCollectAskAndAnswer', 'getMyComment' ];
				const method = methods[this.curTabIndex];
				const func = this[method];
				return func;
			},
			uid: function() {
				if (this.$store.getters.userInfo.uid) {
					return this.$store.getters.userInfo.uid;
				}
				let uid = null;
				uid =  util.cache('app_userid', null);
				return uid ? uid: 0;	
			},
			mindList: function() {
				if (this.curTabIndex ==0 ) {
					// 我的发布列表
					return this.publishList;
				} else if (this.curTabIndex == 1 ) {
					// 收藏文章
					return this.articleList;
				} else if(this.curTabIndex == 2) {
					// 收藏问答
					return this.quesAndAnswer;
				} else if(this.curTabIndex == 3) {
					return this.collectCommentList;
				}
			}
		},
		onLoad(option) {
			console.log('option', option);
			if(typeof option.tab == 'string') {
				this.curTabIndex = option.tab;
			}
			const title = this.headerList[this.curTabIndex].text;
			uni.setNavigationBarTitle({
				title:title,
			});
			this.getMyCollectArticle(1);
			this.getMyPublish(1);
			this.getMyCollectAskAndAnswer(1);
			this.getMyComment(1);
		},
		methods: {
			gotoDetail(index,item) {
				if(index == 0) {
					uni.navigateTo({
						url:'/pages/mind_square/ask-ques-list?nid='+item.nid
					});
				} else if(index == 1) {
					uni.navigateTo({
						url:'/pages/cases/detail?cid='+item.cid+'&id='+item.nid+'&title='+item.title
					});
				} else if(index == 2) {
					uni.navigateTo({
						url:'/pages/mind_square/ask-ques-list?nid='+item.nid
					});
				} else {
					
				}
			},
			// 获取我发布的
			async getMyPublish(pageNo, isAppend) {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				console.log('myPublish', this.uid);
				const params = {
					uid: this.uid,
					auth: auth,
					nowpage: pageNo,
					filterData: true
				};
				console.log('myPublish params:', params);
				const route = '?mod=ndgc&ac=my_list';
				const url  = apiPrefix + route;
				const respData = await http.request(url,params);
				
				console.log('respData', respData);
				if(respData.status == 1) {
					if(!isAppend) {
						this.publishList = respData.data;
						
					} else {
						this.publishList = this.publishList.concat(respData.data);
					}
					totalpage = respData.totalpage;
				}
			},
			// 获取收藏文章
			async getMyCollectArticle(pageNo, isAppend) {
				console.log('isAppend', isAppend);
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const params = {
					uid: this.uid,
					auth: auth,
					nowpage: pageNo,
					filterData: true
				};
				console.log('getMyCollectArticle: pageNo, isAppend', pageNo, isAppend);
				console.log('params:',params);
				const route = '?mod=news&ac=wz_sc_list';
				const url  = apiPrefix + route;
				const respData = await http.request(url,params);
				
				console.log('respData', respData);
				if(respData.status == 1) {
					if(!isAppend) { 
						this.articleList = respData.data;
					} else {
						this.articleList = this.articleList.concat(respData.data);
					}
					totalpage = respData.totalpage;
				}
			},
			// 获取收藏问答
			async getMyCollectAskAndAnswer(pageNo, isAppend) {
				//?mod=ndgc&ac=my_wd
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const params = {
					uid: this.uid,
					auth: auth,
					nowpage: pageNo,
					filterData: true
				};
				const route = '?mod=ndgc&ac=my_fbsc';
				const url  = apiPrefix + route;
				const respData = await http.request(url,params);
				if(respData.status == 1) {
					if(!isAppend) { 
						this.quesAndAnswer = respData.data;
						
					} else {
						this.quesAndAnswer = this.quesAndAnswer.concat(respData.data);
					}
					totalpage = respData.totalpage;
				}
				console.log('my_fbsc', respData);
			},
			delMap(map) {
				if(!map) return;
				let m = Object.keys(map);
				if(m.length<=1) {
					return;
				}
				for(let i = 0;i<m.length;i++)
				{
					if(i == m.length -1) {
						continue;
					}
					// 删除最后一个元素之外的所有元素...
					delete map[m[i]];
				}
				return map;
			},
			// 获取收到的评论
			async getMyComment(pageNo, isAppend) {
				
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				const params = {
					uid: this.uid,
					auth: auth,
					nowpage: pageNo,
					filterData: true
				};
				const route = '?mod=ndgc&ac=my_wd';
				const url  = apiPrefix + route;
				const respData = await http.request(url,params);
				if(respData.status == 1) {
					if(!isAppend) { 
						this.collectCommentList = respData.data;
						
					} else {
						this.collectCommentList = this.collectCommentList.concat(respData.data);
					}
					totalpage = respData.totalpage;
				}
			},
			getColor(index) {
				let color = '';
				if(this.curTabIndex == 2) {
					return '#FF3300';
				}
				if (this.mindList[index].sfsc) {
					color = '#FF3300';
				} else { 
					color = '#A6A6A6';
				}
				return color;
			},
			// 这里其实是收藏
			async clickPraise(index) {
				if(this.curTabIndex == 2 || this.curTabIndex ==0) return;
				console.log('clickPraise...');
				// 只保留最后两个元素
				this.delMap(eMap);
				const t1 = parseInt(new Date().getTime()/1000);
				// 不允许连续点击两次或者更多次...
				if(eMap[t1]) {
					return;
				}
				if(!this.uid) {
					uni.showToast({
						icon:'none',
						title:'请先登录',
						complete() {
							uni.navigateTo({
								url:'/pages/user/login'
							});
						}
					});
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
					this.mindList[index].sfsc = type;
					this.mindList[index].fbsccs = resp.fbsccs;
				}
				console.log('this.mindList', this.mindList);
				const t = parseInt(new Date().getTime()/1000);
				eMap[t] = 1;
			},
			reply() {
				// 进入详情页面
				
			},
		},
		onReachBottom() {
			// 事件分页获取数据...
			if(nowpage>=totalpage && interval) {
				clearTimeout(interval);
				return;
			}
			const method = this.tabMethod;
			interval = setTimeout(function() {
				nowpage++;
				console.log('page....',nowpage);
				method(nowpage, 1);
			}, 500);
		}
	}
</script>

<style lang="scss">
#root-view {
	display: flex;
	flex-direction: column;
	
	
	#user-header {
		display: flex;
		padding-left: 46rpx;
		padding-right: 46rpx;
		border-bottom: 1px solid #F2F2F2;
		justify-content: space-between;
		margin-top:56rpx;
		padding-bottom: 69rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 800;
		color: #343434;
		.user-header-view {
			display: flex;
			flex-basis: 159rpx;
			flex-shrink: 1;
			view {
				display: flex;
			}
		}
		
		.active-header-view {
			display: flex;
			flex-basis: 159rpx;
			flex-shrink: 1;
			color: #A88FEF;
			view {
				display: flex;
			}
			.active-border {
				border-bottom: 1px solid #A88FEF;
			}
		}
	}

	#user-content {
		
	}
}
.mind-article-view {
	padding-bottom: 29rpx;
	padding-top: 29rpx;
	padding-left: 46rpx;
	padding-right: 46rpx;
	border-bottom: 1px solid #F2F2F2;
	display: flex;
	/*height: 200rpx;*/
	.content-img-view  {
		margin-right:22rpx;
	}
	
	.thumb-class {
		display: flex;
		width: 120rpx;
		height: 120rpx;
	}
	
	.content-titleinfo-view {
		display: flex;
		width:492rpx;
		height: 120rpx;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: space-between;
		.content-title-view {
			overflow: hidden;
			text-overflow:ellipsis; white-space: nowrap;
			display: block;
			
			line-height: 1;
			vertical-align: top;
			width:100%;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333232;
		}
		
		.content-stats-view{
			width:492rpx;
			overflow:hidden;
			/*margin-bottom: 8rpx;*/
			/*height: 60px;*/
			// 超出省略号...
			text-overflow:ellipsis;
			display: -webkit-box;
			word-break: break-all;
			-webkit-line-clamp: 2;
			overflow: hidden;
			-webkit-box-orient: vertical;
			
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #9A9A9A;
		}
	}
}

.mind-ask-view {
	display: flex;
	flex-direction: column;
	padding-left: 46rpx;
	padding-right: 46rpx;
	border-bottom: 1px solid #F2F2F2;
	padding-top: 39rpx;
	padding-bottom:39rpx;
	.mind-title {
		display: flex;
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
		/*.mz_shuo {
			display: block;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #A890F0;
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
			width:454rpx;
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
		
	}
	
	.mind-content {
		display: block;
		margin-top:43rpx;
		margin-bottom: 27rpx;
		font-size: 28rpx;
		margin-left: 9rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
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
			width:50%;
			display: flex;
			.mind-nickName {
				margin-right:47rpx;
			}
		}
		.mind-interact-right {
			width:50%;
			.praise-view {
				margin-right:20rpx;
			}
			.reply-view {
				
			}
			display: flex;
			justify-content: flex-end;
		}
	}

	.mind-first-line {
		
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #9A9A9A;
		display: flex;
		margin-top: 61rpx;
		view {
			display: flex;
			align-items: center;
			.mind-answer-nickName {
				display: flex;
				margin-right:25rpx;
				color: #A88FEF;
			}
		}
	}
	
	.mind-second-line {
		display: flex;
		margin-top:58rpx;
		margin-left:22rpx;
		
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
	}
}
.hidden-elipse-css {
	overflow: hidden;
	text-overflow:ellipsis; white-space: nowrap;
	display: block;
}
</style>
