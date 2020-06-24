<template>
	<view id="root-view">
		<view class="padding-style" :style="'min-height:'+height+'px'">
			敬请期待...
		</view>
		<tabbar :current="2"></tabbar>
		<scorll-view>
		     <view style="height:34px;" v-if="isIphoneX">
				
			 </view>
		</scorll-view>
    </view>
</template>


<script>
import tabBar from '../../common/tabbar.vue';
	
export default {
    data() {
        return {
			height: 0,
			isIphoneX: false,
        }
    },
	onLoad() {
		let winHeight      = uni.getSystemInfoSync().windowHeight;
		this.height = winHeight -82;
		this.isIphoneX = getApp().globalData.isIphoneX;
		if(this.isIphoneX) {
			this.height = this.height - 34;
		}	
	},
	mounted() {
		
	},
	components: {
		tabbar: tabBar
	},
    methods: {  
		preview() {
			
		},
		navigate() {
			
		}
    }
}
</script>

<style>
	.padding-style {
		
	}
	#root-view {
		background:linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);
	}
</style>