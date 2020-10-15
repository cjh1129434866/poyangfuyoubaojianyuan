<template>
	<view class="react_btn_item_group">
		<view class="u-flex u-flex-wrap u-row-between">
			<u-button
				:type="activeItemName === 'brief' ? '' : 'success'" 
				class="u-margin-bottom-20" @tap="handleRectBtnClick('brief')">科室简介</u-button>
			<u-button 
				:type="activeItemName === 'dynamic' ? '' : 'success'" 
				class="u-margin-bottom-20" @tap="handleRectBtnClick('dynamic')">科室动态</u-button>
			<u-button 
				:type="activeItemName === 'doctor' ? '' : 'success'" 
				class="u-margin-bottom-20" @tap="handleRectBtnClick('doctor')">科室医生</u-button>
			<u-button 
				:type="activeItemName === 'work' ? '' : 'success'" 
				class="u-margin-bottom-20" @tap="handleRectBtnClick('work')">科室排班</u-button>
			<u-button
				:type="activeItemName === 'elegant' ? '' : 'success'" 
				class="u-margin-bottom-20" @tap="handleRectBtnClick('elegant')">科室风采</u-button>
			<u-button 
				:type="activeItemName === 'honor' ? '' : 'success'" 
				class="u-margin-bottom-20" @tap="handleRectBtnClick('honor')">科室荣誉</u-button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default{
		name: 'ReactBtnItemGroup',
		props: {
			activeItemName: {
				type: String
			}
		},
		computed: {
			...mapState({
				'departmentId': state => state.office.departmentId,
				'departmentName': state => state.office.departmentName
			})
		},
		methods: {
			handleRectBtnClick(key) {
				switch (key) {
					case 'brief':
						this.$u.route('/pages/office/departmentBrief', {
							departmentId: this.departmentId,
							departmentName: this.departmentName
						})
						break;
					case 'dynamic':
						this.$u.route('/pages/office/dynamic')
						break;
					case 'doctor':
						this.$u.route('/pages/office/doctorList', {
							departmentId: this.departmentId,
							departmentName: this.departmentName
						})
						break;
					case 'work':
						this.$u.route('/pages/office/work')
						break;
					case 'elegant':
						this.$u.route('/pages/office/elegant')
						break;
					case 'honor':
						this.$u.route('/pages/office/honor')
						break;
				}
			},
			showToast(obj) {
				this.$refs.uToast.show(obj)
			}
		}
	}
</script>

<style>
</style>
