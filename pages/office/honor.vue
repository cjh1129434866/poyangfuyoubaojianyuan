<template>
	<view class="honor" style="padding-bottom: 140rpx;">
		<ReactBtnItemGroup activeItemName="honor"/>
		<NavItem :show.sync="show" />
		<view class="news u-padding-20">
			<view class="u-padding-bottom-20">
				<u-section title="科室荣誉" font-size="40" color="#828282" :right="false"></u-section>
			</view>
			<view class="news_list">
				<view class="news_list_item u-padding-20 borderBottom1" v-for="item in newsList" :key="item.newsId" @tap="handlerClickItem(item)">
					<view class="u-line-1 u-font-36" style="line-height: 60rpx;">{{ item.newsTitle }}</view>
					<view class="news_list_item_cont">
						<view class="u-flex-1" style="width: 100%; height: 200rpx;" v-if="item.imageUrl">
							<image style="width: 100%;height: 100%;" lazy-load :src="item.imageUrl" mode="aspectFill"></image>
						</view>
					</view>
					<view class="u-flex u-padding-top-16 u-row-between u-tips-color">
						<span>{{ item.newsClassifyName }}</span><span>{{ item.updateDt }}</span>
					</view>
				</view>
			</view>
		</view>
		<view class="u-padding-top-80" v-show="!newsListLeng" >
			<u-empty mode="news" text="暂时没有科室荣誉"></u-empty>
		</view>
		<view class="u-padding-top-20 u-padding-bottom-20" v-show="newsListLeng" @tap="loadMore">
			<u-loadmore :status="loadStatus" :load-text="loadText"/>
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
		name: 'Honor',
		components: { ReactBtnItemGroup, NavItem, CopyRight },
		data() {
			return {
				show: false,
				secondClick: false,
				pagination: {
					pageSize: 20,
					pageNum: 1
				},
				newsList: [],
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				loadStatus: 'loadmore',
			}
		},
		computed: {
			newsListLeng() {
				return this.newsList.length
			}
		},
		methods: {
			// 获取新闻列表
			queryPyfbNewsDepartmentToMobile() {
				if (this.secondClick) {
					return
				}
				this.secondClick = true
				this.$u.api.queryPyfbNewsDepartmentToMobileApi({
					pageSize: this.pagination.pageSize,
					pageNum: this.pagination.pageNum,
					newsClassifyName: '科室荣誉'
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
			// 去新闻详情页
			handlerClickItem(item) {
				this.$u.route('/pages/newsCat/newsDetail', {
					newsId: item.newsId,
					newsTitle: item.newsTitle
				});
			},
			loadMore() {
				this.loadStatus = 'loading'
				this.pagination.pageNum++;
				this.queryPyfbNewsDepartmentToMobile()
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
			this.loadMore()
		},
		onLoad() {
			this.queryPyfbNewsDepartmentToMobile()
		}
	}
</script>

<style>
</style>

