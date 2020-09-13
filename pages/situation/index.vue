<template>
	<view class="situtation" style="padding-bottom: 94rpx;">
		<!-- 大背景图 -->
		<TopBg imgSrc="/static/images/bg1.jpg"/>
		<!-- 概况 -->
		<view class="content u-padding-top-20 u-padding-left-20 u-padding-right-20" style="padding-bottom: 94rpx;">
			
			<!--  -->
			<view class="u-padding-top-10 u-padding-bottom-40">
				<u-section title="医院概况" :right="false" font-size="40" color="#828282"></u-section>
			</view>
			<u-cell-group>
				<u-cell-item 
					v-for="item in situationList" :key="item.id" 
					:title="item.classifyName" arrow-direction="right"
					@tap="handleSituationItem(item)"></u-cell-item>
			</u-cell-group>
			<view class="u-padding-top-80" v-show="!situationListLeng">
				<u-empty mode="data" text="暂时没有概况"></u-empty>
			</view>
			<view class="u-padding-top-20 u-padding-bottom-20" v-show="situationListLeng" @tap="handleLoadMoreSituation">
				<u-loadmore :status="loadStatusSituation" :load-text="loadTextSituation"/>
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
		name: 'Situtation',
		components: { CopyRight, NavItem, TopBg },
		data() {
			return {
				show: false,
				paginationSituation: {
					pageSize: 20,
					pageNum: 1
				},
				situationList: [],
				secondClickSituation: false,
				loadTextSituation: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				loadStatusSituation: 'loadmore',
			}
		},
		computed: {
			situationListLeng() {
				return this.situationList.length
			}
		},
		methods: {
			// 获取概况列表
			queryPyfbBriefClassifyToMobile() {
				if (this.secondClickSituation) {
					return
				}
				this.secondClickSituation = true
				this.loadStatusSituation = 'loading'
				this.$u.api.queryPyfbBriefClassifyToMobileApi({
					pageSize: this.paginationSituation.pageSize,
					pageNum: this.paginationSituation.pageNum
				}).then(res => {
					this.secondClickSituation = false
					this.loadStatusSituation = 'loadmore'
					if (res.list.length === 0 && this.paginationSituation.pageNum !== 1) {
						this.showToast({
							type: 'warning',
							title: '没有更多概况'
						})
						return
					}
					this.situationList = this.situationList.concat(res.list)
				}).catch(_ => {
					this.secondClickSituation = false
					this.loadStatusSituation = 'loadmore'
				})
			},
			// 加载更多概况
			handleLoadMoreSituation() {
				this.paginationSituation.pageNum++
				this.queryPyfbBriefClassifyToMobile()
			},
			// 跳转到简介页面
			handleSituationItem(item) {
				this.$u.route('/pages/situation/brief', {
					briefClassifyId: item.briefClassifyId,
					classifyName: item.classifyName
				})
			},
			showToast(obj) {
				this.$refs.uToast.show(obj)
			}
		},
		onReachBottom() {
			this.paginationSituation.pageNum++
			this.queryPyfbBriefClassifyToMobile()
		},
		onNavigationBarButtonTap(ev) {
			if (ev.type === 'menu') {
				this.show = true
			}
		},
		onLoad() {
			this.queryPyfbBriefClassifyToMobile()
		}
	}
</script>

<style>
</style>
