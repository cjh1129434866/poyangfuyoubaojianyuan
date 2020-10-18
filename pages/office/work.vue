<template>
	<view class="work" style="padding-bottom: 140rpx;">
		<ReactBtnItemGroup activeItemName="work"/>
		<NavItem :show.sync="show" />
		<view class="u-padding-20">
			<view class="u-padding-bottom-20">
				<u-section title="科室排班" font-size="40" color="#828282" :right="false"></u-section>
			</view>
			<view class="u-padding-top-20">
				<u-parse :html="workUrl" class="u-tips-color u-font-30"></u-parse>
			</view>
			<view v-show="!workUrl" class="u-padding-top-80">
				<u-empty text="暂无内容" mode="data"></u-empty>
			</view>
		</view>
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
		name: 'Work',
		components: { ReactBtnItemGroup, NavItem, CopyRight },
		data() {
			return {
				show: false,
				departmentId: '',
				workUrl: ''
			}
		},
		methods: {
			getPyfbDepartmentWorkToMobile() {
				this.$u.api.getPyfbDepartmentWorkToMobileApi({
					departmentId: this.departmentId
				}).then(res => {
					if (res) {
						this.workUrl = res.workUrl
					} else {
						this.showToast({
							type: 'warning',
							title: '暂时没有排班信息'
						})
					}
				})
			},
			showToast(obj) {
				this.$refs.uToast.show(obj)
			}
		},
		onNavigationBarButtonTap(ev) {
			if (ev.type === 'menu') {
				this.show = true
			}
		},
		onLoad(params) {
			this.departmentId = params.departmentId
			this.getPyfbDepartmentWorkToMobile()
			uni.setNavigationBarTitle({
				title: params.departmentName
			})
		}
	}
</script>

<style>
</style>

