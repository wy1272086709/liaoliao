<template>
	<view class="header-view" :title="title">
		<view class="header-goBack">
			<image src=""></image>
		</view>
		<view class="header-title">
			<text>{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			// 标题
			title: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.header-view {
	position: fixed;
	display: flex;
	width: 100%;
	height: 30px;
	justify-content: center;
	align-items: flex-end;
	top:5px;
	background:linear-gradient(150deg,rgba(35,105,230,1) 0%,rgba(21,185,218,1) 100%);
}
</style>
