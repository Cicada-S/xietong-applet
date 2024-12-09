export default {
	data() {
		return {
			//设置默认的分享参数
			//如果页面不设置share，就触发这个默认的分享
			share: {
				title: '协同云工单',
				path: `/pages/index/index`,
				imageUrl: '',
				desc: '协同云工单是协同创芯数字化科技公司打造的工业MES一体化管理软件，助力企业快速实现数字化转型！',
				content: '协同云工单是协同创芯数字化科技公司打造的工业MES一体化管理软件，助力企业快速实现数字化转型！'
			}
		}
	},

	onShareAppMessage(res) {
		return {
			title: this.share.title,
			path: this.share.path,
			imageUrl: this.share.imageUrl,
			desc: this.share.desc,
			content: this.share.content,
		}
	},
	onShareTimeline(res){
		return {
			title: this.share.title,
			path: this.share.path,
			imageUrl: this.share.imageUrl,
			desc: this.share.desc,
			content: this.share.content,
		}
	}
}