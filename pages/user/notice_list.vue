<template>
	<view >
		<u-swipe-action :show="curIndex === index" :index="index" 
			v-for="(item, index) in list" :key="item.nid" 
			 @open="open" @click="click"
			:options="options" class="swiper-action" @content-click="swiperClick">
			<view class="item u-border-bottom">
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="title-first-line">
					<view v-if="!item.isRead" class="red-dot">
						
					</view>
					<view class="u-line-1" style="width:600rpx;">
						<text>{{ item.title}}</text>
					</view>
				</view>
				<view class="title-wrap">
					<text class="title u-line-2">{{ item.description }}</text>
				</view>
			</view>
		</u-swipe-action>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	import http from '../../common/http.js';
	let nowpage = 1;
	let totalpage = 1;
	export default {
		data() {
			return {
				list: [
					{
						nid: 1,
						title: '通知',
						description: '长安回望绣成堆，山顶千门次第开，一骑红尘妃子笑，无人知是荔枝来',
						
						isRead:1,
					},
					{
						nid: 2,
						title: '通知2',
						description: '新丰绿树起黄埃，数骑渔阳探使回，霓裳一曲千峰上，舞破中原始下来',
						
						isRead:0,
					},
					{
						nid: 3,
						title: '通知3',
						description: '登临送目，正故国晚秋，天气初肃。千里澄江似练，翠峰如簇',
						
						isRead:1,
					}
				],
				isShow: false,
				curIndex: '',
				options: [
					{
						text: '已读',
						style: {
							backgroundColor: '#007aff'
						}
					},{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			}
		},
		// 页面加载的时候执行
		async onLoad(option) {
			
		},
		onShow() {
			const resp = util.cache('notice_list', null);
			console.log('resp', resp);
			const k = 'notice_list';
			// 获取通知中缓存的消息
			let list = util.cache(k, null);
			list = list ? JSON.parse(list): [];
			if(list.length>100) {
				const m = list.length - 100;
				list = list.splice(100, m);
				// 将最多100个元素写入缓存...
				const listStr = JSON.stringify(list);
				util.cache(k, listStr);
			}			
			if( list.length>10) {
				list = list.slice(0, 10);
			}
			this.list  = list;
		},
		//todo...等接口写完了之后，写这一段...
		onReachBottom() {
			// 事件分页获取数据...
			if(nowpage>=totalpage && interval) {
				clearTimeout(interval);
				return;
			}
			const k = 'notice_list';
			// 获取通知中缓存的消息
			let list = util.cache(k, null);
			list = list ? JSON.parse(list): [];
			if(list.length<=0) {
				return;
			}
			interval = setTimeout(() => {
				nowpage++;
				const offset = (nowpage -1)*10;
				list   = list.slice(offset, offset+10);
				this.list    = list;
			}, 500);
		},
		methods: {
			click(index, btnIndex) {
				console.log(`index, ${index}, btnIndex, ${btnIndex}`);
				if(btnIndex == 0) {
					// 已经已读，则返回...
					if (this.list[index].isRead == 1) {
						this.curIndex = '';
						return;
					}
					// 标为已读
					const k = 'notice_list';
					const listStr = util.cache(k, null);
					const list    = listStr ? JSON.parse(listStr): [];
					this.listSort(list, index);
					
					const newListStr = JSON.stringify(list);
					util.cache(k, newListStr);
					// 写进缓存，然后更改数据
					this.list = list;
					const unReadCnt = util.cache('notice_unread_cnt', null);
					// unreadCnt
					let n = parseInt(unReadCnt);
					if(n>0) n--;
					//console.log('set 0 value', n+"");
					util.cache('notice_unread_cnt', n+"");
					// 需要发送请求到服务端
				} else if(btnIndex == 1) {
					//delete this.list[index];,将这条消息删除掉...
					// 需要发送请求到服务端
					// 从缓存中删除这条数据
					const k = 'notice_list';
					const listStr = util.cache(k, null);
					const list    = listStr ? JSON.parse(listStr): [];
					if(list.length>0) {
						list.splice(index, 1);
						const newListStr = JSON.stringify(list);
						util.cache(k, newListStr);						
						this.list.splice(index, 1);
					}
					//this.list[index].show = false;
				}
				this.curIndex = '';
			},
			open(index) {
				this.curIndex = index;
			},
			swiperClick(index) {
				console.log('index', index);
				const nid = this.list[index].nid;
				uni.navigateTo({
					url: '/pages/user/notice_detail?nid='+nid+'&index='+index
				});
			},
			// 将index 位置处的元素移动到末尾...
			listSort(list, index) {
				
				const readLastIndex = this.searchIndex(list);
				console.log('index'+index+',readLastIndex:'+readLastIndex);
				if(readLastIndex!=index) {
					const tmp   = list[index];
					list[index] = list[readLastIndex];
					list[readLastIndex] = tmp;
				}
				list[readLastIndex].isRead = 1;
			},
			// 从列表最后已读元素开始寻找,寻找第一个未读的就停止
			searchIndex(list) {
				const n = list.length;
				let m = n - 1;
				console.log('searchIndex:', list);
				if(list[m].isRead == 0) {
					return m;
				}
				while(m>0&&list[m].isRead == 1) {
					m--;
				}
				return m;
			}
		}
	}
</script>

<style lang="scss">
.swiper-action {
	width: 100%;
}
.item {
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 30rpx;
	
}
/deep/ .u-swipe-content {
	width: 100%;
}

.title-first-line {
	font-weight: 600;
	display: flex;
	align-items: center;
}

.red-dot {
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: red;
	margin-right:7px;
}

.title {
	text-align: left;
	font-size: 28rpx;
	color: $u-content-color;
	margin-top: 20rpx;
}
</style>
