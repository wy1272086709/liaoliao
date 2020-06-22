<script>
export default {
	onLaunch: function() {
		let _self = this;
		uni.getSystemInfo({
		      success: res => {
		        let modelmes = res.model;
		        if (modelmes.search('iPhone X') != -1) {
		          _self.globalData.isIphoneX = true;
		        }
		        uni.setStorageSync('modelmes', modelmes)
		      }
		})
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
		key: 'puiuytrew12q325skmsk2568i2699f66',
		auth: '376b66f9bedd4622522dce742adaaebc',
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
