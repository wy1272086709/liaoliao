import { mapMutations } from 'vuex';
export default {
	methods: {
		...mapMutations([ 'set_playinfo','setVideoInfo' ]),
		// callback 为扣除积分的回调...扣除积分之后,跳转到详情页面
		canVisit(uid, info,  type) {
			if(!uid) {
				uni.showToast({
					icon:'none',
					title:'请先登录!',
					complete() {
						uni.navigateTo({
							url:'/pages/user/login_v2'
						});
					}
				});
				return;
			}
			// 标志这个文章，这个用户是否已经购买了的，没有购买,则始终显示加锁图标...
			// 这个值,其实是从列表中获取的。
			const redirectUrl = this.getRedirectUrl(info, type);
			console.log('info'+JSON.stringify(info)+',url'+redirectUrl);
			// 无锁的时候,就跳转到文章或者音频的详情页面...
			if (!info.isShowLock) {
				if (type == 1) {
					this.setAudioVuex(info);
				} else if (type == 2) {
					this.setVideoVuex(info);
				}
				uni.navigateTo({
					url: redirectUrl,
					complete:(res)=> {
						
					},
					fail:(res) => {
						console.log('navigate:'+JSON.stringify(res));
					}
				});
				return;
			}
			return true;
		},
		setAudioVuex(info) {
			let playinfo = {
				id: info.id,
				title: info.title,
				src: info.src,
				singer: info.singer,
				fromLog: 0,
				isContinue: 0,
				coverImgUrl: info.thumbUrl,
			};
			const curPlayId = uni.getStorageSync('audio_play_id');
			console.log('curPlayId:'+curPlayId+',id:'+info.id);
			if(curPlayId!=info.id) {
				
			} else {
				// 相同的,对应的值...
				playinfo.isContinue = 1;
			}
			console.log('view_course playinfo:'+JSON.stringify(playinfo));
			this.set_playinfo(playinfo);
		},
		setVideoVuex(info) {
			this.setVideoInfo(info);
		},
		getRedirectUrl(info, type) {
			let redirectUrl = '';
			// 文章或者音频的详情地址
			if(type == 0) {
				redirectUrl = '/pages/course/article_detail?id='+info.id+'&cid='+info.cid+'&title='+info.title;
			} else if(type == 1){
				redirectUrl = '/pages/course/audio_detail?id='+info.id;
			} else if(type == 2) {
				redirectUrl = '/pages/course/video_detail?isFromIndex=1';
			}
			return redirectUrl;
		},
		scoreJudge(score, info, redirectUrl, callback) {
			const num = info.score_num;
			console.log('num'+num+';score:'+score);
			if (parseInt(num) > parseInt(score)) {
				uni.showModal({
					title:'积分不够,是否需要先充值?',
					showCancel:true,
					complete(res) {
						// 点击了确定按钮
						if(res.confirm) {
							uni.navigateTo({
								url:'/pages/user/score_pay?redirectUrl='+redirectUrl
							});
						} else {
							// 点击了取消按钮
							
						}
					}
				});
				return;
			} else {
				console.log('hehe:score Judge...');
				uni.showModal({
					title:'需要扣除'+num+'积分,是否继续?',
					showCancel:true,
					fail(res) {
						console.log('res:'+JSON.stringify(res));
					},
					complete(res) {
						console.log('ffff')
						// 点击了确定按钮
						if(res.confirm) {
							if (typeof callback == 'function') {
								callback(info);
							} else {
								
							}
						} else {
							// 点击了取消按钮
							
						}
					}
				});
			}
			return true;
		}
	}
}

