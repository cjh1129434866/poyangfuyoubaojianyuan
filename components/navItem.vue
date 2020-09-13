<template>
	<u-popup v-model="isShow" mode="right" width="600" @close="closeNavItem">
		<view class="u-flex u-flex-wrap u-padding-top-40">
			<OperateItem title="医院概况" iconClass="yiyuan" color="#DF5042" pageUrl="/pages/situation/index"/>
			<OperateItem title="交通指南" iconClass="jiaotong" color="#43A4FF" pageUrl="/pages/traffic/index"/>
			<OperateItem title="科室导航" iconClass="keshi" color="#A349A4" pageUrl="/pages/office/index"/>
			<OperateItem title="就诊指南" iconClass="jiuzhenrenguanli" color="#99D9EA"/>
			<OperateItem title="新闻中心" iconClass="xinwen" color="#1AFA29" pageUrl="/pages/newsCat/index"/>
		</view>
	</u-popup>
</template>

<script>
	import OperateItem from '@/components/operateItem.vue';
	export default {
		name: 'NavItem',
		components: { OperateItem },
		props: {
			show: {
				type: Boolean,
				default: false,
				required: true
			}
		},
		data() {
			return {
				
			};
		},
		computed: {
			isShow: {
				get() {
					return this.show
				},
				set() {}
			}
		},
		methods: {
			closeNavItem() {
				this.$emit('update:show', false)
			}
		}
	}
</script>

<style>

</style>
