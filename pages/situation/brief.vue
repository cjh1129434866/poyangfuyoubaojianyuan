<template>
	<view class="brief u-padding-20">
		<view class="u-padding-top-10 u-padding-bottom-40">
			<u-section title="医院简介" :right="false" font-size="40" color="#828282"></u-section>
		</view>
		<u-cell-group>
			<u-cell-item 
				v-for="item in briefList" :key="item.infoId" 
				:title="item.infoTitle" arrow-direction="right"
				@tap="handleClickBriefItem(item)"></u-cell-item>
		</u-cell-group>
		<view class="u-padding-top-80" v-show="!briefListLeng">
			<u-empty mode="data" text="暂时没有简介"></u-empty>
		</view>
		<view class="u-padding-top-20 u-padding-bottom-20" v-show="briefListLeng" @tap="handleLoadMoreBrief">
			<u-loadmore :status="loadStatusBrief" :load-text="loadTextBrief"/>
		</view>
		<NavItem :show.sync="show"/>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import NavItem from '@/components/navItem.vue';
	export default {
		name: 'Brief',
		components: { NavItem },
		data() {
			return {
				show: false,
				paginationBrief: {
					pageSize: 20,
					pageNum: 1
				},
				briefList: [],
				secondClickBrief: false,
				loadTextBrief: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				loadStatusBrief: 'loadmore',
				briefClassifyId: ''
			}
		},
		computed: {
			briefListLeng() {
				return this.briefList.length
			}
		},
		methods: {
			// 获取医院简介
			queryPyfbBriefInfoToMobile() {
				if (this.secondClickBrief) {
					return
				}
				this.secondClickBrief = true
				this.loadStatusBrief = 'loading'
				this.$u.api.queryPyfbBriefInfoToMobileApi({
					pageSize: this.paginationBrief.pageSize,
					pageNum: this.paginationBrief.pageNum,
					briefClassifyId: this.briefClassifyId
				}).then(res => {
					this.secondClickBrief = false
					this.loadStatusBrief = 'loadmore'
					if (res.list.length === 0 && this.paginationBrief.pageNum !== 1) {
						this.showToast({
							type: 'warning',
							title: '没有更多简介'
						})
						this.loadStatusBrief = 'nomore'
						return
					}
					this.briefList = this.briefList.concat(res.list)
					if (this.briefList.length === 1) {
						this.handleClickBriefItem(this.briefList[0])
					}
				}).catch(_ => {
					this.loadStatusBrief = 'loadmore'
					this.secondClickBrief = false
				})
			},
			// 加载更多简介
			handleLoadMoreBrief() {
				this.paginationBrief.pageNum++
				this.queryPyfbBriefInfoToMobile()
			},
			// 去简介详情页面
			handleClickBriefItem(item) {
				this.$u.route('/pages/situation/briefDetail', {
					infoId: item.infoId,
					infoTitle: item.infoTitle
				})
			},
			showToast(obj) {
				this.$refs.uToast.show(obj)
			}
		},
		onReachBottom() {
			this.paginationBrief.pageNum++
			this.queryPyfbBriefInfoToMobile()
		},
		onNavigationBarButtonTap(ev) {
			if (ev.type === 'menu') {
				this.show = true
			}
		},
		onLoad(params) {
			this.briefClassifyId = params.briefClassifyId
			uni.setNavigationBarTitle({
				title: params.classifyName
			})
			this.queryPyfbBriefInfoToMobile()
		}
	}
</script>