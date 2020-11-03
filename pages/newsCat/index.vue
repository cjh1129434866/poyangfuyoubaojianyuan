<template>
	<view class="news_cat">
		<!-- 大背景图 -->
		<TopBg imgSrc="/static/images/newcenter.jpg"/>
		<!-- 新闻分类列表 -->
		<!-- 概况 -->
		<view class="content u-padding-top-20 u-padding-left-20 u-padding-right-20" style="padding-bottom: 132px;">
			<view class="u-padding-top-10 u-padding-bottom-40">
				<u-section title="新闻中心" :right="false" font-size="40" color="#828282"></u-section>
			</view>
			<u-cell-group>
				<u-cell-item 
					v-for="item in newsClassify" :key="item.classifyId" :title="item.classifyName" 
					arrow-direction="right" @tap="handleClickCell(item)"></u-cell-item>
			</u-cell-group>
			<view v-show="!newsClassifyLeng" class="u-padding-top-80">
				<u-empty mode="news" text="暂时没有新闻列表"></u-empty>
			</view>
			<view class="u-padding-top-20 u-padding-bottom-20" v-show="newsClassifyLeng" @click="loadMore">
				<u-loadmore :status="loadStatus" :load-text="loadText"/>
			</view>
		</view>
		<u-toast ref="uToast" />
		<!-- 版权 -->
		<CopyRight />
		<NavItem :show.sync="show" />
	</view>
</template>

<script>
	import CopyRight from '@/components/copyRight.vue';
	import NavItem from '@/components/navItem.vue';
	import TopBg from '@/components/topBg.vue';
	export default {
		name: 'NewsCat',
		components: { CopyRight, NavItem, TopBg },
		data() {
			return {
				show: false,
				newsClassify: [],
				pagination: {
					pageSize: 20,
					pageNum: 1
				},
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				loadStatus: 'loadmore',
				secondClick: false
			}
		},
		computed: {
			newsClassifyLeng() {
				return this.newsClassify.length
			}
		},
		methods: {
			// 获取新闻分类列表
			queryPyfbNewsClassifyToMobile() {
				if (this.secondClick) {
					return
				}
				this.$u.api.queryPyfbNewsClassifyToMobileApi({
					source: 0,
					pageSize: this.pagination.pageSize,
					pageNum: this.pagination.pageNum
				}).then(res => {
					this.loadStatus = 'loadmore'
					this.secondClick = false
					if (res.list.length === 0 && this.pagination.pageNum !== 1) {
						this.showToast({
							type: 'warning',
							title: '没有更多数据了'
						})
						return
					}
					this.newsClassify = [...this.newsClassify.concat(res.list)];
					this.newsClassify = this.newsClassify.filter(item=> item.classifyName !== '科室动态')
				}).catch(_ => {
					this.secondClick = false
				})
			},
			// 点击cell
			handleClickCell(ev) {
				this.$u.route('/pages/newsCat/newsList', {
					classifyId: ev.classifyId,
					classifyName: ev.classifyName
				});
			},
			// 加载更多
			loadMore() {
				this.pagination.pageNum++
				this.queryPyfbNewsClassifyToMobile()
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
			this.loadStatus = 'loading'
			this.pagination.pageNum++;
			this.queryPyfbNewsClassifyToMobile()
		},
		onLoad() {
			this.queryPyfbNewsClassifyToMobile()
		}
	}
</script>
