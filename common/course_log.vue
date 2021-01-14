<template>
	<view class="course-log" @touchstart="$emit('study', $props)">
		<view class="course-log-left">
			<view>
				<text>{{title}}</text>
			</view>
			<view class="course-log-left-progress">
				<template v-if="courseType == 2 || courseType == 3">
					<text>已学{{studyProgress}}%</text>
				</template>
				<!-- 文章 -->
				<template v-if="courseType == 1">
					<text>已学完</text>
				</template>
			</view>
		</view>
		<view class="course-log-right">
			<label>{{studyProgress!=100&&courseType!=1?'继续学习': '重新学习'}}</label>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			studyProgress:function() {
				if (!this.duration_value) {
					return 0;
				}
				console.log('this.current_value'+this.current_value+','+this.duration_value);
				return Math.round(parseFloat(this.current_value)*100/parseFloat(this.duration_value), 2);
			}
		},
		props: {
			id: {
				default: 1,
				type: [Number,String]
			},
			courseType: {
				type: Number,
				default:1,//1 表示文章,2表示音频,3表示视频
			},
			title: {
				type: String,
				default: ''
			},
			src: {
				type: String,
				default: ''
			},
			cid: {
				type: [Number, String],
				default: 1,
			},
			current_value: {
				// 学习到的位置
				type: [ Number , String],
				default: 0
			},
			duration_value: {
				// 课程总共时长
				type: [ Number,String ],
				default: 0
			}
		}
	}
</script>

<style lang="scss">
	.course-log {
		background-color: #F2F2F2;
		padding:10px;
		margin-left: 32rpx;
		margin-right: 32rpx;
		margin-bottom: 16px;
		display: flex;
		&-left {
			display: flex;
			flex-direction: column;
			width: 70%;
			view {
				display: flex;
				
			}
			&-progress {
				color: red;
			}
		}
		&-right {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			width: 30%;
		}
	}
</style>
