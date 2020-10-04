<template>
	<view class="office">
		<TopBg imgSrc="/static/images/keshi.jpg"/>
		<!-- 科室中心 -->
		<view class="content u-padding-top-20 u-padding-left-20 u-padding-right-20" style="padding-bottom: 132rpx;">
			<view class="u-padding-top-10 u-padding-bottom-40">
				<u-section title="科室中心" :right="false" font-size="40" color="#828282"></u-section>
			</view>
			<u-cell-group>
				<u-cell-item 
				v-for="item in officeList" :key="item.departmentId" 
				:title="item.departmentName" arrow-direction="right" @tap="handleOfficeItem(item)"></u-cell-item>
			</u-cell-group>
			<view class="u-padding-top-80" v-show="!officeListLeng">
				<u-empty mode="data" text="暂时没有科室数据"></u-empty>
			</view>
			<view class="u-padding-top-20 u-padding-bottom-20" v-show="officeListLeng">
				<u-loadmore :status="loadStatus" :load-text="loadText"/>
			</view>
		</view>
		<CopyRight />
		<NavItem :show.sync="show" />
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import CopyRight from '@/components/copyRight.vue';
	import NavItem from '@/components/navItem.vue';
	import TopBg from '@/components/topBg.vue';
	export default {
		name: 'Office',
		components: { CopyRight, NavItem, TopBg },
		data () {
			return {
				show: false,
				pagination: {
					pageSize: 20,
					pageNum: 1
				},
				officeList: [],
				secondClick: false,
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				loadStatus: 'loadmore',
			}
		},
		computed: {
			officeListLeng() {
				return this.officeList.length
			}
		},
		methods: {
			// 获取科室列表
			queryPyfbDepartmentToMobile() {
				if (this.secondClick) {
					return
				}
				this.secondClick = true
				this.loadStatus = 'loading'
				this.$u.api.queryPyfbDepartmentToMobileApi({
					pageSize: this.pagination.pageSize,
					pageNum: this.pagination.pageNum
				}).then(res => {
					this.secondClick = false
					this.loadStatus = 'loadmore'
					if (res.list.length === 0 && this.pagination.pageNum !== 1) {
						this.showToast({
							type: 'warning',
							title: '没有更多科室了'
						})
						this.loadStatus = 'nomore'
						return
					}
					this.officeList = this.officeList.concat(res.list)
				}).catch(_ => {
					this.loadStatus = 'loadmore'
					this.secondClick = false
				})
			},
			// 进入科室详情
			handleOfficeItem(item) {
				this.$u.route('/pages/office/officeDetail', {
					departmentId: item.departmentId,
					departmentName: item.departmentName
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
		onReachBottom() {
			this.pagination.pageNum++
			this.queryPyfbDepartmentToMobile()
		},
		onLoad() {
			this.queryPyfbDepartmentToMobile()
		}
	}
</script>