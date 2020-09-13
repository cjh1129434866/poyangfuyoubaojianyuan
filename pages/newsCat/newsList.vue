<template>
	<view class="news_list">
		<view class="list">
			<view class="news_list_item u-padding-20 borderBottom1" v-for="item in newsList" :key="item.newsId" @tap="handleClickItem(item)">
				<view class="u-line-1 u-font-36" style="line-height: 60rpx;">{{ item.newsTitle }}</view>
				<view class="news_list_item_cont">
					<view class="u-flex-1" style="width: 100%; height: 200rpx;" v-if="item.imageUrl">
						<image style="width: 100%;height: 100%;" lazy-load :src="item.imageUrl" mode="scaleToFill"></image>
					</view>
				</view>
				<view class="u-flex u-padding-top-16 u-row-between u-tips-color">
					<span>{{ item.newsClassifyName }}</span><span>{{ item.updateDt }}</span>
				</view>
			</view>
			<view v-show="!newsListLeng" class="u-padding-top-80">
				<u-empty mode="news" text="暂时没有新闻资讯"></u-empty>
			</view>
			<view class="u-padding-top-20 u-padding-bottom-20" v-show="newsListLeng" @click="loadMore">
				<u-loadmore :status="loadStatus" :load-text="loadText"/>
			</view>
		</view>
		<NavItem :show.sync="show" />
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import NavItem from '@/components/navItem.vue';
	export default {
		name: 'NewsList',
		components: { NavItem },
		data() {
			return {
				classifyId: '',
				show: false,
				newsList: [],
				secondClick: false,
				pagination: {
					pageSize: 20,
					pageNum: 1
				},
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				loadStatus: 'loadmore'
			}
		},
		computed: {
			newsListLeng() {
				return this.newsList.length
			}
		},
		methods: {
			// 获取新闻列表
			queryPyfbNewsToMobile() {
				if (this.secondClick) {
					return
				}
				this.secondClick = true
				this.$u.api.queryPyfbNewsToMobileApi({
					pageSize: this.pagination.pageSize,
					pageNum: this.pagination.pageNum,
					newsClassifyId: this.classifyId
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
					this.newsList = [...this.newsList.concat(res.list)];
					this.newsList = this.newsList.map(item => {
						let imageData = null;
						let	index = 0;
						let	imageUrl = '';
						try {
							imageData = item.content.match(/(src|SRC)=(\"|\')(.*?)(\"|\')/);
							if (imageData != null) {
								index = imageData[0].indexOf('=') + 1
								imageUrl = JSON.parse(imageData[0].substring(index))
							}
						} catch(err) {
							console.log(err)
						}
						return {
							...item,
							imageUrl: imageUrl ? imageUrl : ''
						}
					})
				}).catch(_ => {
					this.secondClick = false
				})
			},
			// 加载更多
			loadMore() {
				this.pagination.pageNum++
				this.queryPyfbNewsToMobile()
			},
			// 进去新闻详情
			handleClickItem(item) {
				this.$u.route('/pages/newsCat/newsDetail', {
					newsId: item.newsId,
					newsTitle: item.newsTitle
				});
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
			this.queryPyfbNewsToMobile()
		},
		onLoad(params) {
			console.log(params)
			this.classifyId = params.classifyId
			this.queryPyfbNewsToMobile()
			uni.setNavigationBarTitle({
				title: params.classifyName
			})
		}
	}
</script>

<style>
</style>
