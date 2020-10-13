<template>
	<view class="book">
		<NavItem :show.sync="show" />
		<view class="wrap" style="padding-bottom: 140rpx;">
			<u-waterfall v-model="flowList" ref="uWaterfall">
				<template v-slot:left="{leftList}">
					<view class="demo-warter" v-for="(item, index) in leftList" :key="item.id" @tap="lookBookDetail(item.ebookUrl)">
						<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
						<u-lazy-load threshold="-450" border-radius="10" :image="item.ebookImgUrl" :index="index"></u-lazy-load>
						<view class="demo-title">
							{{item.ebookName}}
						</view>
						<view class="demo-time u-tips-color">
							{{ item.updateDt }}
						</view>
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view class="demo-warter" v-for="(item, index) in rightList" :key="item.id" @tap="lookBookDetail(item.ebookUrl)">
						<u-lazy-load threshold="-450" border-radius="10" :image="item.ebookImgUrl" :index="index"></u-lazy-load>
						<view class="demo-title">
							{{item.ebookName}}
						</view>
						<view class="demo-time u-tips-color">
							{{ item.updateDt }}
						</view>
					</view>
				</template>
			</u-waterfall>
			<view class="empty u-padding-top-80" v-show="!flowListLeng">
				<u-empty text="暂无电子书列表" mode="list"></u-empty>
			</view>
			<view v-show="flowListLeng" class="u-padding-top-80 u-padding-bottom-40">
				<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="loadMore"></u-loadmore>
			</view>
		</view>
		<u-toast ref="uToast" />
		<!-- 备案号 -->
		<CopyRight />
	</view>
</template>

<script>
	import CopyRight from '@/components/copyRight.vue'
	import NavItem from '@/components/navItem.vue';
	export default {
		name: 'Book',
		components: { NavItem, CopyRight },
		data() {
			return {
				show: false,
				loadStatus: 'loadmore',
				flowList: [],
				list: [],
				pagination: {
					pageSize: 20,
					pageNum: 1
				},
				secondClick: false
			}
		},
		computed: {
			flowListLeng() {
				return this.flowList.length
			}
		},
		methods:{
			// 获取电子书列表
			getBook () {
				if (this.secondClick) {
					return
				}
				this.secondClick = true
				this.loadStatus = 'loading'
				this.$u.api.queryPyfbEbookToMobileApi({
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
						this.loadStatus = 'nomore'
						return
					}
					this.flowList = this.flowList.concat(res.list.filter(item => item.status == '1'))
				}).catch(_ => {
					this.loadStatus = 'loadmore'
					this.secondClick = false
				})
			},
			loadMore() {
				this.pagination.pageNum++
				this.getBook()
			},
			// 查看电子书
			lookBookDetail(ebookUrl) {
				this.$u.route('/pages/book/bookDetail', {
					ebookUrl
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
			this.loadMore()
		},
		onLoad() {
			this.getBook();
		}
	}
</script>
<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
</style>
<style lang="scss" scoped>
	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}
	
	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}
	
	.demo-image {
		width: 100%;
		border-radius: 4px;
	}
	
	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}
</style>

