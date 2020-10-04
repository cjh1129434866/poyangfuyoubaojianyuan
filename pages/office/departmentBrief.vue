<template>
	<view class="department_brief u-padding-top-20 u-padding-left-20 u-padding-right-20" style="padding-bottom: 132rpx;">
		<ReactBtnItemGroup activeItemName="brief"/>
		<view class="content">
			<u-section title="科室简介" :right="false" font-size="40" color="#828282"></u-section>
			<u-parse :html="departmentCont.departmentBrief" class="u-tips-color u-font-30 u-padding-top-20"></u-parse>
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
		name: 'DepartmentBrief',
		components: { ReactBtnItemGroup, NavItem, CopyRight },
		data() {
			return {
				departmentId: '',
				departmentCont: {},
				show: false
			}
		},
		methods: {
			// 获取科室简介
			getPyfbDepartmentToMobile() {
				this.$u.api.getPyfbDepartmentToMobileApi({
					departmentId: this.departmentId
				}).then(res => {
					this.departmentCont = res
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
			uni.setNavigationBarTitle({
				title: params.departmentName
			})
			this.getPyfbDepartmentToMobile()
		}
	}
</script>
