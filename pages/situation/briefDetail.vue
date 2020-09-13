<template>
	<view calss="brief_detail" class="u-padding-20">
		<u-parse :html="info.content"></u-parse>
	</view>
</template>

<script>
	export default {
		name: 'BriefDetail',
		data() {
			return {
				show: false,
				infoId: '',
				info: {}
			}
		},
		methods: {
			// 获取简介
			getPyfbBriefInfoToMobile() {
				this.$u.api.getPyfbBriefInfoToMobileApi({
					infoId: this.infoId
				}).then(res =>{
					this.info = res
				})
			}
		},
		onLoad(params) {
			this.infoId = params.infoId
			uni.setNavigationBarTitle({
				title: params.infoTitle
			})
			this.getPyfbBriefInfoToMobile()
		}
	}
</script>
