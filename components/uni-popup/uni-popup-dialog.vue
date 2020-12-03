<template>
	<view class="uni-popup-dialog">
		<view class="uni-dialog-title" v-if="!isHideTitle" >
			<text class="uni-dialog-title-text" :style="mode === 'input'? 'color:#000000;':''" :class="['uni-popup__'+dialogType]">{{title}}</text>
		</view>
		<view class="uni-dialog-content" :style="(isHideTitle?'margin-top: 10px;':'')+ (mode=='input'?' padding:5px 30px 5px 30px':'')">
			<text class="uni-dialog-content-text" v-if="mode === 'base'">{{content}}</text>
			<input v-else-if="mode=='input'" class="uni-dialog-input" v-model="val" type="text" :placeholder="placeholder" :focus="focus">
			<textarea v-else class="uni-dialog-textarea" v-model="val"  :placeholder="placeholder" :focus="focus"></textarea>
		</view>
		<view class="uni-dialog-button-group">
			<view :class="'uni-dialog-button uni-dialog-cancel'+(isGetPhoneButton ? ' uni-dialog-phone-button':'')" @click="close">
				<text class="uni-dialog-button-text">{{cancelText}}</text>
			</view>
			<view :class="'uni-dialog-button uni-border-left uni-dialog-ok'+(isGetPhoneButton ? ' uni-dialog-phone-button':'')" @click="onOk">
				<template v-if="isGetPhoneButton">
					<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="phone-button">
						<text class="uni-dialog-button-text uni-button-color" :style="'color:'+okColor">{{okText}}</text>
					</button>
				</template>
				<template v-else>
					<!-- uni-button-color -->
					<text class="uni-dialog-button-text uni-button-color">{{okText}}</text>
				</template>
			</view>
		</view>

	</view>
</template>

<script>
	/**
	 * PopUp 弹出层-对话框样式
	 * @description 弹出层-对话框样式
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=329
	 * @property {String} value input 模式下的默认值
	 * @property {String} placeholder input 模式下输入提示
	 * @property {String} type = [success|warning|info|error] 主题样式
	 *  @value success 成功
	 * 	@value warning 提示
	 * 	@value info 消息
	 * 	@value error 错误
	 * @property {String} mode = [base|input] 模式、
	 * 	@value base 基础对话框
	 * 	@value input 可输入对话框
	 * @property {String} content 对话框内容
	 * @property {Boolean} beforeClose 是否拦截取消事件
	 * @event {Function} confirm 点击确认按钮触发
	 * @event {Function} close 点击取消按钮触发
	 */

	export default {
		name: "uniPopupDialog",
		props: {
			value: {
				type: [String, Number],
				default: ''
			},
			placeholder: {
				type: [String, Number],
				default: '请输入内容'
			},
			/**
			 * 对话框主题 success/warning/info/error	  默认 success
			 */
			type: {
				type: String,
				default: 'error'
			},
			/**
			 * 对话框模式 base/input
			 */
			mode: {
				type: String,
				default: 'base'
			},
			/**
			 * 对话框标题
			 */
			title: {
				type: String,
				default: '提示'
			},
			/**
			 * 对话框内容
			 */
			content: {
				type: String,
				default: ''
			},
			/**
			 * 拦截取消事件 ，如果拦截取消事件，必须监听close事件，执行 done()
			 */
			beforeClose: {
				type: Boolean,
				default: false
			},
			cancelText: {
				type: String,
				default: '取消'
			},
			okText: {
				type: String,
				default: '确定'
			},
			okColor: {
				type: String,
				default: '#FFFFFF'
			},
			isGetPhoneButton: {
				type: Boolean,
				default: false
			},
			isHideTitle: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				dialogType: 'error',
				focus: false,
				val: ""
			}
		},
		inject: ['popup'],
		watch: {
			type(val) {
				this.dialogType = val
			},
			mode(val) {
				if (val === 'input') {
					this.dialogType = 'info'
				}
			},
			value(val) {
				this.val = val
			}
		},
		created() {
			// 对话框遮罩不可点击
			
			if (this.mode === 'input') {
				this.dialogType = 'info'
				this.val = this.value
			} else {
				this.popup.mkclick = false
				this.dialogType = this.type
			}
		},
		mounted() {
			this.focus = true
		},
		methods: {
			/**
			 * 点击确认按钮
			 */
			onOk() {
				this.$emit('confirm', () => {
					this.popup.close()
					console.log('this.mode', this.mode, 'type:..', typeof this.mode);
					if (this.mode === 'input') this.val = this.value
					console.log('this.val', this.val);
				}, this.mode === 'input' ? this.val : '')
			},
			/**
			 * 点击取消按钮
			 */
			close() {
				if (this.beforeClose) {
					this.$emit('close', () => {
						this.popup.close()
					})
					return
				}
				this.popup.close()
			},
			getPhoneNumber(e) {
				this.$emit('getPhoneNumber', e.detail);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-popup-dialog {
		width: 300px;
		border-radius: 15px;
		background-color: #fff;
	}

	.uni-dialog-title {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		padding-top: 15px;
		padding-bottom: 5px;
	}

	.uni-dialog-title-text {
		font-size: 16px;
		font-weight: 500;
	}

	.uni-dialog-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 5px 15px 15px 15px;
	}

	.uni-dialog-content-text {
		font-size: 14px;
		color: #6e6e6e;
	}

	.uni-dialog-button-group {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		border-top-color: #f5f5f5;
		border-top-style: solid;
		border-top-width: 1px;
		margin-left:25px;
		margin-right:25px;
		padding-bottom: 15px;
		justify-content: space-between;
	}
	
	.phone-button {
		background-color: transparent;
		padding-left: 0px;
		padding-right: 0px;
		display: flex;
		line-height: 1;
		height:30px;
		align-items: center;
	}

	.uni-dialog-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */

		flex: 1;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 45px;
	}

	.uni-dialog-phone-button {
		height:30px;
		padding-left: 10px;
		padding-right: 10px;
		flex:none;
	}
	
	.uni-border-left {
		border-left-color: #f0f0f0;
		border-left-style: solid;
		border-left-width: 1px;
	}

	.uni-dialog-button-text {
		font-size: 14px;
	}

	.uni-button-color {
		color: $uni-color-primary;
	}

	.uni-dialog-input {
		flex: 1;
		font-size: 14px;
		color:#716a6A;
	}

	.uni-popup__success {
		color: $uni-color-success;
	}

	.uni-popup__warn {
		color: $uni-color-warning;
	}

	.uni-popup__error {
		color: $uni-color-error;
	}

	.uni-popup__info {
		color: #909399;
	}
</style>
