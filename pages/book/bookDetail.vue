<template>
	<view class="bookDetail">
		<NavItem :show.sync="show" />
		<view style="height: 100%; height: 100%;">
			<web-view :webview-styles="webviewStyles" :src="ebookUrl"></web-view>
		</view>
	</view>
</template>

<script>
	import NavItem from '@/components/navItem.vue';
	export default {
		name: 'BookDetail',
		components: { NavItem },
		data() {
			return {
				show: false,
				ebookUrl: '/static/pdf/web/viewer.html?file=',
				webviewStyles: {
					paddingBottom: '140px',
					progress: {
						color: '#FF3333'
					}
				},
				isAndroid: window.navigator.userAgent.indexOf('Android') > -1 || window.navigator.userAgent.indexOf('Adr') > -1,
				isIos: !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
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


