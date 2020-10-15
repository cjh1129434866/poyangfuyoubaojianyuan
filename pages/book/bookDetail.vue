<template>
	<view class="bookDetail" style="padding-bottom: 140rpx;">
		<NavItem :show.sync="show" />
		<view style="height: 100%; height: 100%;">
			<web-view :webview-styles="webviewStyles" :src="ebookUrl"></web-view>
			<!-- <iframe width="100%" height="100%" :src="ebookUrl" frameborder="0"></iframe> -->
		</view>
		<!-- 备案号 -->
		<CopyRight />
	</view>
</template>

<script>
	import CopyRight from '@/components/copyRight.vue'
	import NavItem from '@/components/navItem.vue';
	export default {
		name: 'BookDetail',
		components: { NavItem, CopyRight },
		data() {
			return {
				show: false,
				ebookUrl: '/static/pdf2/web/viewer.html?file=',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				}
			}
		},
		onNavigationBarButtonTap(ev) {
			if (ev.type === 'menu') {
				this.show = true
			}
		},
		onLoad(params) {
			this.ebookUrl = this.ebookUrl + encodeURIComponent(params.ebookUrl)
		}
	}
</script>

<style>
</style>


