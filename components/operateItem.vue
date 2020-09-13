<template>
	<view class="operate_item u-flex u-flex-col u-margin-top-20" @tap="toAccountsReceivable">
		<view class="operate_item_icon u-text-center">
			<u-icon :name="iconClass" custom-prefix="custom-icon" size="60" :color='color'></u-icon>
		</view>
		<view class="operate_item_title u-font-28"><text class="">{{title}}</text></view>
    <u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String
			},
			iconClass: {
				type: String
			},
			pageUrl: {
				type: String,
				default: ''
			},
			color: {
				type: String,
				default: '#fff'
			}
		},
		data() {
			return {}
		},
		methods: {
			toAccountsReceivable() {
				if (!this.pageUrl) {
          this.showToast({
            title: '暂未开放',
            type: 'warning'
          })
					return
				}
				uni.navigateTo({
					url: this.pageUrl
				})
			},
			showToast(obj) {
			  this.$refs.uToast.show(obj)
			}
    }
	}
</script>

<style lang="scss" scoped>
	.operate_item{
		width: 25%;
		.operate_item_icon{
			line-height: 60rpx;
		}
		.operate_item_title{
			line-height: 60rpx;
		}
	}
</style>
