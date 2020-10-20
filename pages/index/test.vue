<template>
	<view class="swiper-page" @touchmove="touchmove" @touchstart="touchstart" @touchend="touchend">
	  <view v-for="index in 7" :key="index" class="swiper-container">
	    <view class="item-container" :style="'z-index:'+indexArray[index]">
	      <view :class="'item'+(index-1)+' item-common'" :animation="animation[index]" @tap="tapItemFn" :data-text="textArray[index]">
	        <image class="background" :src="imgArray[index]" mode='aspectFit'></image>
	        <text class="item-text">{{textArray[index]}}</text>
	      </view>
	    </view>
	  </view>
	</view>
</template>

<script>
	const posOrgArray = [-360, -240, -120, 0, 120, 240, 360]
	let posArray = [-360, -240, -120, 0, 120, 240, 360]
	// 缩放列表
	let scaArray = [.8, .8, .9, 1, .9, .8, .8]
	// 透明度列表
	let opaArray = [0, 1, 1, 1, 1, 1, 0]
	// 高度列表
	let indArray = [1, 2, 3, 4, 3, 2, 1]
	// 当前位置列表
	let curPosArray = [-360, -240, -120, 0, 120, 240, 360]
	// 当前缩放列表
	let curScaArray = []
	// 当前透明度列表
	let curOpaArray = []
	// 当前高度列表
	let curIndArray = []
	let left = 0
	// 是否可点击，控制点击频率
	let canClick = true
	// px和rpx转换比例，用于横向滑动的时候计算滑动距离（rpx）
	let screenRate = 1
	let animationArr = []
	export default {
		props: {
			swiperList: {
				type: Array,
				default: function() {
					return [];
				}
			}
		},
		data() {
			return {
				 // 背景图列表
				imgArray: [
					'../../static/image1.png',
					'../../static/image2.png',
					'../../static/origin.png',
					'../../static/image4.png',
					'../../static/image5.png',
					'../../static/image6.png',
					'../../static/image7.png',
				],
				// 文字列表，和前面的图位置对应
				textArray: ["页面1", "页面2", "页面3", "页面4", "页面5", "页面6", "页面7"],
				animation: [],
				// 当前位置，这个。。和默认位置有关，不要随便改哦。
				currentIndex: 7,
				// index高度数组，中间的最高嘛~ 因为wxml里用style控制，所以写到了 data 里
				indexArray: [1, 2, 3, 4, 3, 2, 1],
				// 指示点数组（哈哈哈，写在了这里，没加上去）
				indicatorArray: []
			};
		},
		onLoad(options) {
			console.log('swiper onLoad...');
			uni.getSystemInfo({
				success: (res) => {
					// 750除以屏幕宽度，得到转换比。因为API用的和得到的大部分的单位都是px，所以还是要转一下
					screenRate = 750 / res.screenWidth
				}
			})
			// 初始化动画，注意这个数组和 this.animation不是同一个，而是一一对应的关系
			animationArr = []
			for (let i = 0; i < 7; i++) {
				let item = uni.createAnimation({
					duration: 500,
					timingFunction: 'ease-out',
				})
				animationArr.push(item)
			}
		},
		methods: {
			tapItemFn(e){
		        console.log(e.currentTarget.dataset.text)
		    },
		    touchstart(e) {
		        left = e.touches[0].pageX
		    },
		
		    touchmove(e) {
		        // 频率控制，一次移动完成后，才能进行下一次
		        if (this.isMove) {
		            return
		        }
		        let moveLength = (e.touches[0].pageX - left) * screenRate
		        moveLength = moveLength > 60 ? 60 : moveLength
		        moveLength = moveLength < -60 ? -60 : moveLength
		        let rate = moveLength / 60
		        if (rate == 1) { //从右往左滑
		            this.isMove = true
		            this.tapRight()
		        } else if (rate == -1) { //从左往右滑
		            this.isMove = true
		            this.tapLeft()
		        }
		    },
		
		    touchend(e) {
		        setTimeout(()=>{
		            this.isMove = false
		        },500)
		    },
		
		    // 往左移
		    tapLeft() {
		        if (!canClick) {
		            return
		        }
		        canClick = false
		        setTimeout(() => {
		            canClick = true
		        }, 500)
		        // 界面往左移，效果相当于数组向右移一位。比如，本来在位置2，向左移，就是2的位置去了1，也就是位置1的参数给到了位置2。。以此类推
		        curPosArray = this.rollRight(posArray, 1)
		                curScaArray = this.rollRight(scaArray, 1)
		                curOpaArray = this.rollRight(opaArray, 1)
		                curIndArray = this.rollRight(indArray, 1)
		                
		                for (let j = 0; j < 7; j++) {
		                    animationArr[j].scale(curScaArray[j], curScaArray[j]).left(curPosArray[j] + 'rpx').opacity(curOpaArray[j]).step()
		                    this.animation[j] = animationArr[j].export()
		                }
						console.log('animation', animationArr);
		                let currentIndex = --this.currentIndex == 0 ? 70 : this.currentIndex
		                //this.animation = animation;
		                this.currentIndex = currentIndex;
		                this.indexArray   = curIndArray;
		                
		    },
		    tapRight() {
		        if (!canClick) {
		            return
		        }
		        canClick = false
		        setTimeout(() => {
		            canClick = true
		        }, 500)
		        curPosArray = this.rollLeft(posArray, 1)
		        curScaArray = this.rollLeft(scaArray, 1)
		        curOpaArray = this.rollLeft(opaArray, 1)
		        curIndArray = this.rollLeft(indArray, 1)
		        
		        for (let j = 0; j < 7; j++) {
		            animationArr[j].scale(curScaArray[j], curScaArray[j]).left(curPosArray[j] + 'rpx').opacity(curOpaArray[j]).step()
		            this.animation[j] = animationArr[j].export()
		        }
		        let currentIndex = --this.currentIndex == 0 ? 70 : this.currentIndex
		        //this.animation = animation;
		         this.currentIndex = currentIndex;
		        this.indexArray = curIndArray;
		        
		    },
		
		    /**
		     * 把数组参数往左移，第一个参数是要改变的数组，第二个参数是移动的次数
		     * 保存位置0的，然后将数组整体左移，再把之前保存的位置0的值，赋值给数组末尾，下面的rollRight刚好反过来
		     */
		    rollLeft: function(array, times) {
		        for (let time = 0; time < times; time++) {
		            let length = array.length - 1
		            let temp = array[0]
		            for (let i = 0; i < length; i++) {
		                array[i] = array[i + 1]
		            }
		            array[length] = temp
		        }
		        return array.concat()
		    },
		
		    rollRight: function(array, times) {
		        for (let time = 0; time < times; time++) {
		            let length = array.length - 1
		            let temp = array[length]
		            for (let i = length; i > 0; i--) {
		                array[i] = array[i - 1]
		            }
		            array[0] = temp
		        }
		        return array.concat()
		    },
		}
	}
</script>

<style>
	page {
	  width:100%;
	  height:100%;
	}
	.swiper-page {
	  display: flex;
	  flex-direction: column;
	  /*align-items: center;*/
	  /*justify-content: center;*/
	  height: 100%;
	}
	
	.swiper-container {
	  position: absolute;
	  left: 375rpx;
	}
	.item-common {
	  position: absolute;
	  
	}
	.background {
	  width: 210rpx;
	  height: 270rpx;
	  box-shadow: 0rpx 0rpx 15rpx rgba(0,0,0,0.5);
	}
	.item-text {
	  position: absolute;
	  top: 180rpx;
	  left: 0rpx;
	  width: 100%;
	  color: white;
	  font-size: 30rpx;
	  text-align: center;
	}
	.item-container {
	  left: -105rpx;
	  position: absolute;
	}
	.item0 {
	  left: -360rpx;
	  transform: scale(.8, .8);
	  opacity: 0;
	}
	.item1 {
	  left: -240rpx;
	  transform: scale(.8, .8);
	  opacity: 1;
	}
	.item2 {
	  left: -120rpx;
	  transform: scale(.9, .9);
	  opacity: 1;
	}
	.item3 {
	  left: 0rpx;
	  transform: scale(1, 1);
	  opacity: 1;
	}
	.item4 {
	  left: 120rpx;
	  transform: scale(.9, .9);
	  opacity: 1;
	}
	.item5 {
	  left: 240rpx;
	  transform: scale(.8, .8);
	  opacity: 1;
	}
	.item6 {
	  left: 360rpx;
	  transform: scale(.8, .8);
	  opacity: 0;
	}
</style>
