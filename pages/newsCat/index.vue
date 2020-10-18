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
		</view>
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
				newsClassify: []
			}
		},
		methods: {
			// 获取新闻分类列表
			queryPyfbNewsClassifyToMobile() {
				this.$u.api.queryPyfbNewsClassifyToMobileApi({
					source: 0
				}).then(res => {
					this.newsClassify = res.list
					this.newsClassify = this.newsClassify.filter(item=> item.classifyName !== '科室动态')
				})
			},
			// 点击cell
			handleClickCell(ev) {
				this.$u.route('/pages/newsCat/newsList', {
					classifyId: ev.classifyId,
					classifyName: ev.classifyName
				});
			}
		},
		onNavigationBarButtonTap(ev) {
			if (ev.type === 'menu') {
				this.show = true
			}
		},
		onLoad() {
			this.queryPyfbNewsClassifyToMobile()
		}
	}
</script>
