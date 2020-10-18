<template>
	<view class="container">
		<!-- 轮播 -->
		<view class="u-padding-left-20 u-padding-right-20" style="padding-bottom: 140rpx;">
			<u-swiper
				:list="bannerList" 
				name="url" effect3d :title="false" bg-color="#fff" 
				interval="5000" @click="handleClickSwiper"></u-swiper>
			<!-- 便明服务 -->
			<view class="service u-padding-top-40 u-padding-bottom-40">
				<u-section title="便民服务" :right="false" font-size="40" color="#828282"></u-section>
				<view class="u-flex u-flex-wrap u-margin-top-20">
					<OperateItem title="医院概况" iconClass="yiyuan" color="#DF5042" pageUrl="/pages/situation/index"/>
					<OperateItem title="交通指南" iconClass="jiaotong" color="#43A4FF" pageUrl="/pages/traffic/index"/>
					<OperateItem title="科室导航" iconClass="keshi" color="#A349A4" pageUrl="/pages/office/index"/>
					<OperateItem title="就诊指南" iconClass="jiuzhenrenguanli" color="#99D9EA"/>
					<OperateItem title="电子书" iconClass="addressbook-copy" color="#09C6B6" pageUrl="/pages/book/index"/>
				</view>
			</view>
			<!-- 新闻咨询 -->
			<view class="news">
				<view class="u-padding-bottom-20">
					<u-section title="新闻资讯" font-size="40" color="#828282" sub-title="查看更多" @click="lookMoreNews"></u-section>
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
				<u-empty mode="news" text="暂时没有新闻资讯"></u-empty>
			</view>
			<view class="u-padding-top-20 u-padding-bottom-20" v-show="newsListLeng">
				<u-loadmore :status="loadStatus" :load-text="loadText"/>
			</view>
		</view>
		<!-- 备案号 -->
		<CopyRight />
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import OperateItem from '@/components/operateItem.vue';
	import CopyRight from '@/components/copyRight.vue'
	export default {
		name: 'Home',
		components: { OperateItem, CopyRight },
		data() {
			return {
				bannerList: [],
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
				secondClick: false
			}
		},
		computed: {
			newsListLeng() {
				return this.newsList.length
			}
		},
		methods: {
			// 获取banner
			getBanner() {
				this.$u.api.queryPyfbBannerToMobileApi().then(res => {
					this.bannerList = res
				})
			},
			// 获取首页新闻列表
			queryPyfbNewsToMobileIndex() {
				if (this.secondClick) {
					return
				}
				this.secondClick = true
				this.loadStatus = 'loading'
				this.$u.api.queryPyfbNewsToMobileIndexApi({
					pageSize: this.pagination.pageSize,
					pageNum: this.pagination.pageNum,
					source: 0
				}).then(res => {
					this.loadStatus = 'loadmore'
					this.secondClick = false
					if (res.length === 0 && this.pagination.pageNum !== 1) {
						this.showToast({
							type: 'warning',
							title: '没有更多数据了'
						})
						this.loadStatus = 'nomore'
						return
					}
					this.newsList = [...this.newsList.concat(res)];
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
					this.loadStatus = 'loadmore'
					this.secondClick = false
				})
			},
			// 查看更多
			lookMoreNews() {
				this.$u.route({
					url: 'pages/newsCat/index',
				})
			},
			// 点击轮播图
			handleClickSwiper(index) {
				// this.showToast({
				// 	title: index,
				// 	type: 'default'
				// })
			},
			// 去新闻详情页
			handlerClickItem(item) {
				this.$u.route('/pages/newsCat/newsDetail', {
					newsId: item.newsId,
					newsTitle: item.newsTitle
				});
			},
			showToast(obj) {
				this.$refs.uToast.show(obj)
			}
		},
		onReachBottom() {
			this.loadStatus = 'loading'
			this.pagination.pageNum++;
			this.queryPyfbNewsToMobileIndex()
		},
		onLoad() {
			this.getBanner()
			this.queryPyfbNewsToMobileIndex()
		}
	}
</script>

