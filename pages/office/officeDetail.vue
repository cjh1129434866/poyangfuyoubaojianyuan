<template>
	<view class="office_detail" style="padding-bottom: 94rpx;">
		<view class="u-padding-20">
			<ReactBtnItemGroup/>
			<view class="brief">
				<view class="u-padding-top-20 u-padding-bottom-20">
					<u-section title="科室简介" :right="false" font-size="40" color="#828282"></u-section>
				</view>
				<view class="u-font-34" style="line-height: 60rpx;"><span>{{ departmentCont.departmentName }}</span></view>
				<u-parse :html="departmentCont.departmentBrief" class="u-tips-color u-font-30"></u-parse>
			</view>
		</view>
		<NavItem :show.sync="show" />
		<!-- 备案号 -->
		<CopyRight />
	</view>
</template>

<script>
	import CopyRight from '@/components/copyRight.vue'
	import ReactBtnItemGroup from '@/components/reactBtnItemGroup.vue';
	import NavItem from '@/components/navItem.vue';
	export default {
		name: 'OfficeDetail',
		components: { NavItem, ReactBtnItemGroup, CopyRight },
		data() {
			return {
				show: false,
				departmentId: '',
				departmentCont: {}
			}
		},
		methods: {
			// 获取科室简介
			getPyfbDepartmentToMobile() {
				this.$u.api.getPyfbDepartmentToMobileApi({
					departmentId: this.departmentId
				}).then(res => {
					this.departmentCont = res
					this.$store.dispatch('office/save_departmentId', res.departmentId)
					this.$store.dispatch('office/save_departmentName', res.departmentName)
				})
			}
		},
		onNavigationBarButtonTap(ev) {
			if (ev.type === 'menu') {
				this.show = true
			}
		},
		onLoad(params) {
			this.departmentId = params.departmentId
			this.getPyfbDepartmentToMobile()
			uni.setNavigationBarTitle({
				title: params.departmentName
			})
		}
	}
</script>
