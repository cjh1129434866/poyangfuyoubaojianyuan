<template>
	<view class="honor">
		<ReactBtnItemGroup activeItemName="honor"/>
		<NavItem :show.sync="show" />
		<u-toast ref="uToast" />
		<!-- 备案号 -->
		<CopyRight />
	</view>
</template>

<script>
	import CopyRight from '@/components/copyRight.vue'
	import ReactBtnItemGroup from '@/components/reactBtnItemGroup.vue';
	import NavItem from '@/components/navItem.vue';
	export default {
		name: 'Honor',
		components: { ReactBtnItemGroup, NavItem, CopyRight },
		data() {
			return {
				show: false
			}
		},
		onNavigationBarButtonTap(ev) {
			if (ev.type === 'menu') {
				this.show = true
			}
		},
	}
</script>

<style>
</style>

