<template>
	<view class="bg" style="width: 750rpx; height: 240rpx;">
		<image :src="imgSrc" mode="" style="width: 100%; height: 100%;"></image>
	</view>
</template>

<script>
	export default {
		name: 'TopBg',
		props: {
			imgSrc: {
				type: String,
				required: true
			}
		}
	}
</script>
