<template>
	<view class="news_detail u-padding-20">
		<view class="u-row-between u-tips-color u-font-36">
			{{ newsDetail.newsTitle }}
		</view>
		<view class="u-font-28 u-tips-color">
			{{ newsDetail.createDt }}
		</view>
		<u-parse :html="newsDetail.content" class="u-padding-top-40" style="overflow: hidden; line-height: 60rpx;text-align: left;"></u-parse>
	</view>
</template>

<script>
	
	export default {
		name: 'NewsDetail',
		data() {
			return {
				newsId: '',
				newsDetail: {}
			}
		},
		methods: {
			// 获取新闻详情
			getPyfbNewsToMobile() {
				this.$u.api.getPyfbNewsToMobileApi({
					newsId: this.newsId
				}).then(res => {
					this.newsDetail = res
					console.log(this.newsDetail.content)
				})
			}
		},
		onLoad(params) {
			this.newsId = params.newsId
			this.getPyfbNewsToMobile()
			uni.setNavigationBarTitle({
				title: params.newsTitle
			})
		}
	}
</script>

<style lang="scss" scoped>
	p span{
		display: inline-block;
		width: 100% !important;
	}
	p img{
		width: 100% !important;
	}
</style>
