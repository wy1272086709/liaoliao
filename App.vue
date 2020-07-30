<script>

export default {
	onLaunch: function() {
		let _self = this;
		console.log('on Launch!');
		uni.getSystemInfo({
		      success: res => {
				console.log('res', res);
		        let modelmes = res.model;
				let platform = res.platform.toLowerCase();
				//android: 安卓, ios: IOS, devtools:PC
				if (platform == 'android' ) {
					_self.globalData.platform = 1;	
				} else if(platform == 'ios' || platform == 'devtools'){
					_self.globalData.platform = 2;
				}
		        if (modelmes.search('iPhone X') != -1) {
		          _self.globalData.isIphoneX = true;
		        }
		        uni.setStorageSync('modelmes', modelmes)
		      }
		});
		/*if(this.globalData.count ==0) {
			uni.setBackgroundFetchToken({
				token: 'hssjhssj123'
			});
			console.log('ssss');
			this.globalData.count++;
		} 
		uni.getBackgroundFetchData({
			fetchType: 'periodic',
			success(res) {
				console.log(res.fetchedData) // 缓存数据
				console.log(res.timeStamp) // 客户端拿到缓存数据的时间戳
				console.log(res.path) // 页面路径
				console.log(res.query) // query 参数
				console.log(res.scene) // 场景值
			}
		});*/
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	globalData: {
		serverUri: "https://kuxou.com/index.php",
		hostUrl: 'https://kuxou.com',
		isRecharge: 0, // 是否通过充值返回个人中心...
		key: 'puiuytrew12q325skmsk2568i2699f66',
		auth: '376b66f9bedd4622522dce742adaaebc',
		count: 0,
		platform: 0,
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
