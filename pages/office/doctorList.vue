<template>
	<view class="doctor_list u-padding-20" style="padding-bottom: 94rpx;">
		<ReactBtnItemGroup activeItemName="doctor"/>
		<view class="u-padding-top-20">
			<u-section title="科室医生" :right="false" font-size="40" color="#828282"></u-section>
			<view class="doctors">
				<view class="u-flex u-padding-top-20 u-padding-bottom-20" 
					v-for="item in doctorList" :key="item.doctorId"
					@tap="handlerClickDoctor(item)">
					<view class="u-flex-1" style="height: 240rpx;">
						<image :src="item.imageUrl" lazy-load style="width: 100%;height: 100%;" mode="scaleToFill"></image>
					</view>
					<view class="u-padding-left-20 u-flex-3 " style="height: 240rpx;">
						<view class="u-flex">
							<span class="u-margin-right-20">{{ item.doctorName }}</span>
							<view>
								<u-tag
									class="u-margin-right-20"
									v-for="(label, index) in item.doctorLabel" 
									:key="index" :text="label" mode="plain" size="mini" />
							</view>
						</view>
						<view class="u-line-3 u-font-32 u-padding-top-20">
							{{ item.doctorBrief }}
						</view>
					</view>
				</view>
				<view class="u-padding-top-80" v-show="!doctorListLeng" >
					<u-empty mode="data" text="暂时没有医生数据"></u-empty>
				</view>
				<view class="u-padding-top-20 u-padding-bottom-20" v-show="doctorListLeng">
					<u-loadmore :status="loadStatus" :load-text="loadText"/>
				</view>
			</view>
		</view>
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
		name: 'DoctorList',
		components: { ReactBtnItemGroup, NavItem, CopyRight },
		data() {
			return {
				departmentId: '',
				departmentName: '',
				pagination: {
					pageNum: 1,
					pageSize: 20
				},
				doctorList: [],
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				loadStatus: 'loadmore',
				secondClick: false,
				show: false
			}
		},
		computed: {
			doctorListLeng() {
				return this.doctorList.length
			}
		},
		methods: {
			// 获取医生列表
			queryPyfbDoctorToMobile() {
				if (this.secondClick) {
					return
				}
				this.secondClick = true
				this.$u.api.queryPyfbDoctorToMobileApi({
					departmentId: this.departmentId,
					pageSize: this.pagination.pageSize,
					pageNum: this.pagination.pageNum
				}).then(res => {
					console.log(res)
					this.secondClick = false
					this.loadStatus = 'loadmore'
					if (res.list.length === 0 && this.pagination.pageNum !== 1) {
						this.showToast({
							type: 'warning',
							title: '没有更多数据了'
						})
						this.loadStatus = 'nomore'
						return
					}
					this.doctorList = this.doctorList.concat(res.list)
					this.doctorList = this.doctorList.map(item => {
						return {
							...item,
							doctorLabel: item.doctorLabel.split('|')
						}
					})
				}).catch(_ => {
					this.secondClick = false
					this.loadStatus = 'loadmore'
				})
			},
			// 去详情页
			handlerClickDoctor(item) {
				this.$u.route('/pages/office/doctorDetail', {
					doctorId: item.doctorId,
					doctorName: item.doctorName
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
			this.queryPyfbDoctorToMobile()
		},
		onLoad(params) {
			this.departmentName = params.departmentName
			this.departmentId = params.departmentId
			uni.setNavigationBarTitle({
				title: this.departmentName
			})
			this.queryPyfbDoctorToMobile()
		}
	}
</script>

<style>
</style>
