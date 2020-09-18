<template>
	<view id="root-view" :style="'min-height:'+scrollHeight+'px;'">
		<view id="search-view">
			<input id="search-text" type="text" placeholder="输入表情包关键词" placeholder-class="search-class" v-model="searchKeyword" @confirm="searchMeme"/>
			<uni-icons type="search" :size="iconSize" @tap="searchMeme"></uni-icons>
		</view>
		<view id="meme-list-view">
			<view v-for="(item,index) in imageList" :class="item.class" @tap="previewImage(index)">
				<image :src="item.src" class="meme-image"></image>
			</view>
		</view>
		<!-- 这里 -->
		<view id="user-upgrade-vip-view" v-if="level<=1" @tap="upgrade_vip">
			<img src="https://imgmyqx.ofbei.com/images/user_upgrade_vip.png" id="user_upgrade_vip" />
		</view>
	</view>
</template>

<script>
	import http from '../../common/http.js';
	let page = 1;
	let totalPage = 1;
	let interval =  null;
	let interval2 = null;
	let isFixedHeight = false;
	let isFixedHeight2 = false;
	let isSearch = false;
	export default {
		data() {
			return {
				iconSize: 40,
				scrollHeight: 0,
				searchKeyword: '',
				imageList: [
				]
			}
		},
		beforeDestroy() {
			if(interval) {
				clearTimeout(interval);
			}
			if(interval2) {
				clearTimeout(interval2);
			}
		},
		computed: {
			uid: function() {
				if (this.$store.getters.userInfo.uid) {
					return this.$store.getters.userInfo.uid;
				}
				return 0;
			},
			level: function() {
				console.log('userInfo:', this.$store.getters.userInfo);
				if(this.$store.getters.userInfo.level) {
					return this.$store.getters.userInfo.level;
				} else {
					return 0;
				}
			},
		},
		mounted() {
			
		},
		onShareAppMessage() {
			let pages = getCurrentPages() //获取加载的页面
			let currentPage = pages[pages.length-1] //获取当前页面的对象
			let url = currentPage.route //当前页面url
			return {
				title: '表情包',
				path: url,
				success: function() {
				},
				fail: function() {
				}
			};
		},
		onLoad() {
			uni.showShareMenu({
			    withShareTicket: true
			});
			let info = uni.getSystemInfoSync();
			this.scrollHeight = info.windowHeight;
			this.getMemeList(1, false);
		},
		onPullDownRefresh() {
			//console.log('页面下拉刷新');
			let _self = this;
			setTimeout(function() {
				_self.getMemeList(page);
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			upgrade_vip() {
				// 这里跳转到登录界面
				if(this.level<2) {
					uni.switchTab({
						url: '/pages/user/index'
					});
					return;
				}
				uni.navigateTo({
					url:'/pages/user/upgrade_user_vip'
				});
			},
			previewImage(index) {
				let src = this.imageList[index].src;
				let list = this.imageList;
				let len  = list.length;
				let urls = [];
				for (let s =0;s<len;s++) {
					urls.push(list[s].src);
				}
				uni.previewImage({
					current: src,
					urls: urls,
					success:() => {
						console.log('success!');
					}
				})
				//console.log('src', src);
			},
			searchMeme() {
				if(!this.searchKeyword) {
					uni.showToast({
						title: '请输入关键词，且至少2个字符长度!',
						icon:"none",
						duration: 2000
					});
					return;
				}
				// 搜索为true
				isSearch = true;
				page = 1;
				this.getMemeList(page, false, true);
			},
			// 获取表情包列表
			getMemeList(page, isAppend, isSearch) {
				const data = getApp().globalData;
				const apiPrefix = data.serverUri;
				const auth = data.auth;
				let _self = this;
				let url = '';
				// 不搜索
				if(!isSearch) {
					url = apiPrefix + "?mod=hualang&ac=list";
				} else {
					// 搜索的时候
					url = apiPrefix + "?mod=hualang&ac=search";
				}
				let params = {
					auth: auth,
					uid: this.uid,
					nowpage: page,
					filterData:true,
				};
				if (isSearch && this.searchKeyword) {
					params.keyword = this.searchKeyword;
				}
				http.request(url, params).then(resp => {
					totalPage = resp.totalpage;
					let memeData = resp.data;
					if(!resp.data) {
						if (isSearch) {
							uni.showToast({
								title: '未查询到结果',
								icon:"none",
								duration: 2000
							});
						}
						_self.imageList = [];
						return;
					}
					let n = memeData.length;
					for(let m=0;m<n;m++) {
						memeData[m].src = "https://kuxou.com/" + memeData[m].src;
						if ((m-1)%3 == 0) {
							memeData[m].class = "meme-image-view meme-second-image-view";
						} else {
							memeData[m].class = "meme-image-view";
						}
					}
					if(isAppend) {
						for(let x=0;x<n;x++) {
							_self.imageList.push(memeData[x]);
						}
					} else {
						_self.imageList = memeData;
					}
				});
			}
		},
		onReachBottom() {
			console.log('reach bottom!');
			let _self = this;
			if(isSearch && (!this.searchKeyword || this.searchKeyword.length<2)) {
				// 显示空数据给用户
				return;
			}
			if (page>=totalPage) {
				clearTimeout(interval);
				//console.log('isFixedHeight', isFixedHeight);
				//console.log('isFixedHeight2', isFixedHeight2);
				if (!isFixedHeight && !isSearch) {
					let view = uni.createSelectorQuery().select("#meme-list-view");
					view.boundingClientRect(data => {
						console.log('data:', data);
						_self.scrollHeight = data.height+20;
						isFixedHeight  = true;
					}).exec();
				}
				else if (!isFixedHeight2 && isSearch) {
					let view = uni.createSelectorQuery().select("#meme-list-view");
					view.boundingClientRect(data => {
						//console.log('data:', data);
						_self.scrollHeight = data.height+20;
						isFixedHeight2  = true;
					}).exec();
				}
				return;
			}
			interval = setTimeout(function() {
				page++;
				_self.getMemeList(page, true, isSearch);
			}, 500);
		},
	}
</script>

<style>
view, scroll-view {
	display: flex;
	box-sizing: border-box;
}
#root-view {
	flex-direction: column;
	background:linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);
	height: 100%;
}
.search-class,#search-view>input {
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(170,170,170,1); 
}

#search-view {
	justify-content: center;
	align-items: center;
	width:686rpx;
	height:40px;
	margin-top: 8px;
	margin-left:32rpx;
	margin-right:32rpx;
	background:rgba(255,255,255,1);
	border-radius:20px;
}

#search-text {
	width:542rpx;
	margin-left: 5px;
}
.meme-image {
	max-width:206rpx;
	max-height: 206rpx;
}

#meme-list-view {
	display: flex;
	flex-direction: row;
	margin-top:4px;
	flex-wrap: wrap;
	margin-left:32rpx;
	margin-right:32rpx;
	justify-content: space-around;
}

.meme-image-view {
	height: 105px;
	max-width:208rpx;
	margin-top:16px;
	margin-bottom: 16px;
}

.meme-second-image-view {
	margin-left:32rpx;
	margin-right:32rpx;
}
#user_upgrade_vip {
	width:686rpx;
	height:100px;	
}

#user-upgrade-vip-view {
	justify-content: center;
	margin-bottom:57px;
	margin-top:16px;
}
</style>
