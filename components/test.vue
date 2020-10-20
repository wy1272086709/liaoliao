<template>
	<view>
		<view class="item" v-for="(value,index) in iconType" :key="index">
			<icon :type="value" size="26"/>
			<text>{{value}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iconType:  ['success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search','clear']
			};
		}
	}
</script>

<style>

</style>
