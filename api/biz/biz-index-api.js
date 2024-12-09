import request from '@/utils/request'
export default {
	// 获取轮播图列表
	bizIndexSlideshowList(data) {
		return request({
			url: '/biz/index/slideshow/list',
			method: 'GET',
			data: data
		})
	},
	// 获取通知公告列表
	bizIndexNoticeList(data) {
		return request({
			url: '/biz/index/notice/list',
			method: 'GET',
			data: data
		})
	},
	// 获取通知公告详情
	bizIndexNoticeDetail(data) {
		return request({
			url: '/biz/index/notice/detail',
			method: 'GET',
			data: data
		})
	},
}