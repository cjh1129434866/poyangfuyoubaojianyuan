<template>
	<view class="doctor_detail u-padding-top-20 u-padding-left-20 u-padding-right-20" style="padding-bottom: 132rpx;">
		<!-- 头像 -->
		<view class="u-flex u-padding-top-20 u-padding-bottom-20">
			<view class="u-flex-1" style="height: 240rpx;">
				<image :src="doctorInfo.imageUrl" style="width: 100%;height: 100%;" mode="scaleToFill"></image>
			</view>
			<view class="u-padding-left-20 u-flex-3 " style="height: 240rpx;">
				<view class="u-flex">
					<span class="u-margin-right-20 u-font-36">{{ doctorInfo.doctorName }}</span>
					<!-- <view>
						<u-tag
							class="u-margin-right-20"
							v-for="(label, index) in doctorInfo.doctorLabel" 
							:key="index" :text="label" mode="plain" size="mini" />
					</view> -->
				</view>
				<view class="u-flex u-line-3 u-font-32 u-padding-top-20">
					<span class="u-flex-1 u-margin-right-20"><text class="u-tips-color u-margin-right-10">性别:</text>{{ doctorInfo.sex === '1' ? '男' : '女' }}</span>
					<span class="u-flex-1 u-margin-right-20"><text class="u-tips-color u-margin-right-10">职称:</text>{{ doctorInfo.doctorDuty }}</span>
<!-- 					<span class="u-flex-1 u-margin-right-20"><text class="u-tips-color u-margin-right-10">领域:</text>{{ doctorInfo.major }}</span>
					<span class="u-flex-1 u-margin-right-20"><text class="u-tips-color u-margin-right-10">毕业院校:</text>{{ doctorInfo.graduateSchool }}</span>
					<span class="u-flex-1 u-margin-right-20"><text class="u-tips-color u-margin-right-10">民族:</text>{{ doctorInfo.nation }}</span>
					<span class="u-flex-1 u-margin-right-20"><text class="u-tips-color u-margin-right-10">出生地:</text>{{ doctorInfo.nativePlace }}</span>
					<span class="u-flex-1 u-margin-right-20"><text class="u-tips-color u-margin-right-10">出生日期:</text>{{ doctorInfo.birthday }}</span> -->
				</view>
			</view>
		</view>
		<!--  -->
		<!-- <u-gap height="20" bg-color="#F3F4F6" margin-top='20' margin-bottom="20"></u-gap>
		<u-section title="医生二维码" :right="false" font-size="40" color="#828282"></u-section>
		<view class="u-margin-top-20" style="width: 200rpx;height: 200rpx;">
			<image :src="doctorInfo.qrcodeUrl" style="width: 100%; height: 100%;" mode=""></image>
		</view> -->
		<u-gap height="20" bg-color="#F3F4F6" margin-top='20' margin-bottom="20"></u-gap>
		<u-section title="擅长治疗" :right="false" font-size="40" color="#828282"></u-section>
		<view class="u-padding-top-20 u-padding-bottom-20">{{ doctorInfo.absorbedContent }}</view>
		<u-gap height="20" bg-color="#F3F4F6" margin-top='20' margin-bottom="20"></u-gap>
		<u-section title="医生简介" :right="false" font-size="40" color="#828282"></u-section>
		<view class="u-padding-top-20 u-padding-bottom-20">{{ doctorInfo.doctorBrief }}</view>
		<!-- 备案号 -->
		<CopyRight />
	</view>
</template>

<script>
	import CopyRight from '@/components/copyRight.vue'
	export default {
		name: 'DoctorDetail',
		components: { CopyRight },
		data() {
			return {
				doctorId: '',
				doctorInfo: {}
			}
		},
		methods: {
			getPyfbDoctorToMobileApi() {
				this.$u.api.getPyfbDoctorToMobileApi({
					doctorId: this.doctorId
				}).then(res => {
					this.doctorInfo = {
						...res,
						doctorLabel: res.doctorLabel.split('|')
					}
				})
			}
		},
		onLoad(params) {
			this.doctorId = params.doctorId
			uni.setNavigationBarTitle({
				title: params.doctorName
			})
			this.getPyfbDoctorToMobileApi()
		}
	}
</script>

<style>
</style>
