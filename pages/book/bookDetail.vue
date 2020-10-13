<template>
	<view class="bookDetail">
		<NavItem :show.sync="show" />
		<view>
			<web-view :webview-styles="webviewStyles" :src="ebookUrl"></web-view>
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
				ebookUrl: '',
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
			this.ebookUrl = params.ebookUrl
		}
	}
</script>

<style>
</style>


