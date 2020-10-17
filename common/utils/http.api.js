
// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
const queryPyfbBannerToMobile = '/com/pyfb/banner/queryPyfbBannerToMobile';
const queryPyfbNewsToMobile = '/com/pyfb/news/queryPyfbNewsToMobile'
const queryPyfbNewsToMobileIndex = '/com/pyfb/news/queryPyfbNewsToMobileIndex'
const queryPyfbNewsClassifyToMobile = 'com/pyfb/news/queryPyfbNewsClassifyToMobile'
const getPyfbNewsToMobile = 'com/pyfb/news/getPyfbNewsToMobile'
const queryPyfbDepartmentToMobile = 'com/pyfb/department/queryPyfbDepartmentToMobile'
const getPyfbDepartmentToMobile = 'com/pyfb/department/getPyfbDepartmentToMobile'
const queryPyfbBriefInfoToMobile = 'com/pyfb/brief/queryPyfbBriefInfoToMobile'
const queryPyfbBriefClassifyToMobile = 'com/pyfb/brief/queryPyfbBriefClassifyToMobile'
const getPyfbBriefInfoToMobile = 'com/pyfb/brief/getPyfbBriefInfoToMobile'
const queryPyfbDoctorToMobile = 'com/pyfb/doctor/queryPyfbDoctorToMobile'
const getPyfbDoctorToMobile = 'com/pyfb/doctor/getPyfbDoctorToMobile'
const queryPyfbEbookToMobile = 'com/pyfb/ebook/queryPyfbEbookToMobile'
const queryPyfbNewsDepartmentToMobile = 'com/pyfb/news/queryPyfbNewsDepartmentToMobile'
const getPyfbDepartmentWorkToMobile = 'com/pyfb/department/getPyfbDepartmentWorkToMobile'
// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 获取轮播图
	let queryPyfbBannerToMobileApi = (params = {}) => vm.$u.post(queryPyfbBannerToMobile);
	// 获取分类新闻列表
	let queryPyfbNewsToMobileApi = (params = {}) => vm.$u.post(queryPyfbNewsToMobile, params)
	// 获取首页新闻列表
	let queryPyfbNewsToMobileIndexApi = (params = {}) => vm.$u.post(queryPyfbNewsToMobileIndex, params)
	// 获取新闻列表分类
	let queryPyfbNewsClassifyToMobileApi = (params = {}) => vm.$u.post(queryPyfbNewsClassifyToMobile, params)
	// 获取新闻详情
	let getPyfbNewsToMobileApi = (params = {}) => vm.$u.post(getPyfbNewsToMobile, params)
	// 获取科室列表
	let queryPyfbDepartmentToMobileApi = (params = {}) => vm.$u.post(queryPyfbDepartmentToMobile, params)
	// 获取科室详情
	let getPyfbDepartmentToMobileApi = (params = {}) => vm.$u.post(getPyfbDepartmentToMobile, params)
	// 获取医院简介列表
	let queryPyfbBriefInfoToMobileApi = (params = {}) => vm.$u.post(queryPyfbBriefInfoToMobile, params)
	// 获取医院概括列表
	let queryPyfbBriefClassifyToMobileApi = (params = {}) => vm.$u.post(queryPyfbBriefClassifyToMobile, params)
	// 获取医院简介详情
	let getPyfbBriefInfoToMobileApi = (params = {}) => vm.$u.post(getPyfbBriefInfoToMobile, params)
	// 获取医生列表
	let queryPyfbDoctorToMobileApi = (params = {}) => vm.$u.post(queryPyfbDoctorToMobile, params)
	// 获取医生详情
	let getPyfbDoctorToMobileApi = (params = {}) => vm.$u.post(getPyfbDoctorToMobile, params)
	// 获取电子书列表
	let queryPyfbEbookToMobileApi = (params = {}) => vm.$u.post(queryPyfbEbookToMobile, params)
	// 科室动态 科室荣誉 科室风采 新闻列表
	let queryPyfbNewsDepartmentToMobileApi = (params = {}) => vm.$u.post(queryPyfbNewsDepartmentToMobile, params)
	// 科室排班
	let getPyfbDepartmentWorkToMobileApi = (params = {}) => vm.$u.post(getPyfbDepartmentWorkToMobile, params)
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		queryPyfbBannerToMobileApi,
		queryPyfbNewsToMobileApi,
		queryPyfbNewsToMobileIndexApi,
		queryPyfbNewsClassifyToMobileApi,
		getPyfbNewsToMobileApi,
		queryPyfbDepartmentToMobileApi,
		getPyfbDepartmentToMobileApi,
		queryPyfbBriefInfoToMobileApi,
		queryPyfbBriefClassifyToMobileApi,
		getPyfbBriefInfoToMobileApi,
		queryPyfbDoctorToMobileApi,
		getPyfbDoctorToMobileApi,
		queryPyfbEbookToMobileApi,
		queryPyfbNewsDepartmentToMobileApi,
		getPyfbDepartmentWorkToMobileApi
	};
}

export default {
	install
}