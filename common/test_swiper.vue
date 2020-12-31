<template>
	<view id="slide-container">
		<view class="wrapper" v-for="(item, index) in list" :key="index" >
			<view
				:style="Tactive == index ? leftStyle : ''"
				ref="left"
				class="left flex-row"
				@touchstart="touchStart($event, index)"
				@touchmove="touchMove($event, index)"
				@touchend="touchEnd($event, index)"
				@click="checkAct(item,index)"
			>
				<text class="phone">{{item.phone}}</text>
				<!-- ./icon-2.png -->
				<image src="" mode="widthFix" style="width: 30rpx;height: 30rpx;" v-if="item.isCheck"></image>
				<!-- <text class="icon-bidui icon-1" v-if="item.isCheck">&#xe608;</text> -->
			</view>
			<view :style="Tactive == index ? rightStyle : ''" ref="deleteBtn" class="delete" @click.stop="deleteAct(item)">删除</view>
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			startX: null, //起始位置
			startM: null,
			startE: null, //结束位置
			left: null,
			deleteBtn: 100,
			leftStyle: {},
			rightStyle: {},
			Tactive: 0
		};
	},
	props:{
		list:{
			type:Array,
			default(){
				return [
					{ phone: '17781111111',isCheck:true }, 
					{ phone: '18711111111' ,isCheck:false},
				]
			}
		}
	},
	mounted() {
		// this.deleteBtn = this.$refs.deleteBtn.$el.offsetWidth;
	},
	methods: {
		deleteAct(row){
			this.$emit('deleteHandle',row)
		},
		checkAct(row,index){
			this.leftStyle = {}
			this.rightStyle = {}
			this.$emit('checkHandler',index)
		},
		
		
		touchStart(e, index) {
			this.Tactive = index;
			this.startX = e.touches[0].clientX;
		},
		touchMove(e, index) {
			this.startM = e.touches[0].clientX;
			this.left = this.startM - this.startX;
			if (this.left > this.deleteBtn) {
				//右滑     注意: 这里的100,是与删除div的width保持一致;
				this.left = this.deleteBtn; //转成正数
			}

			if (this.left < 0) {
				//左滑
				this.left = 0;
			}
			this.leftStyle = { left: this.left + 'px' };
			var temp = -this.deleteBtn + this.left;
			this.rightStyle = { left: temp + 'px' };
		},
		touchEnd(e, index) {
			if (this.left < this.deleteBtn) {
				//鼠标松开时, 如果长度小于.delete的width;
				this.left = 0;
				this.leftStyle = { left: this.left + 'px' };
				var temp = -this.deleteBtn + this.left;
				this.rightStyle = { right: temp + 'px' };
			}
		}
	}
};
</script>
<style scoped lang="scss">
#slide-container {
	.wrapper {
		line-height: 100rpx;
		height: 100rpx;
		font-size: 14px;
		overflow: hidden;
		display: flex;
		position: relative;
		border-bottom: 2rpx solid #f5f5f5;
		.left {
			align-items: center;
			padding: 0 30rpx;
			width: 100%;
			height: 100%;
			background: #fff;
			color: black;
			position: absolute;
			left: 0;
			z-index: 3;
			transition: all 0.1s;
			.phone{
				flex: 1;
			}
			.icon-1{
				font-size: 30rpx;
				color: #0B59D2;
			}
		}

		.delete {
			position: absolute;
			left: 0px;
			width: 200rpx;
			height: 100%;
			background: #ff4949;
			color: #fff;
			text-align: center;
			transition: all 0.1s;
		}
	}
}
</style>
