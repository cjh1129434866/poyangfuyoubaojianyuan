<template>
	<view class="traffice_guide" style="padding-bottom: 132rpx;">
		<view style="width: 100%; height: 400rpx;">
			<image src="/static/images/map.png" style="width: 100%;height: 100%;" mode="scaleToFill"></image>
		</view>
		<view class="u-padding-20">
			<u-section class="u-margin-top-20" title="鄱阳妇幼保健院 " :right="false" font-size="40" color="#828282"></u-section>
			<view class="u-padding-top-40 u-padding-bottom-40 u-font-32">
				市内乘 101 路车可到达鄱阳县妇幼保健院
			</view>
			<view class="u-padding-20 u-margin-top-40 u-text-center" style="background: #19BE6B; border-radius: 20rpx;">
					<u-link
						href="https://map.baidu.com/poi/%E9%84%B1%E9%98%B3%E5%8E%BF%E5%A6%87%E5%B9%BC%E4%BF%9D%E5%81%A5%E9%99%A2/@12992736.775263166,3353744.895964912,17.96z?uid=060f5e53237910d7081cc77d&ugc_type=3&ugc_ver=1&device_ratio=2&compat=1&querytype=detailConInfo&da_src=shareurl"
						color="#fff"
						font-size="32"
					>去这里
					</u-link>
				
			</view>
		</view>
		<!-- 备案号 -->
		<CopyRight />
		<NavItem :show.sync="show" />
	</view>
</template>

<script>
	// 
	
	import CopyRight from '@/components/copyRight.vue'
	import NavItem from '@/components/navItem.vue';
	export default {
		name: 'TrafficGuide',
		components: { NavItem, CopyRight },
		data() {
			return {
				show: false
			}
		},
		methods: {},
		onNavigationBarButtonTap(ev) {
			if (ev.type === 'menu') {
				this.show = true
			}
		}
	}
</script>

<style>
</style>
