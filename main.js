
import App from './App'
import share from 'common/js/share.js'
import uView from 'uview-ui';
import snowy from '@/plugins/snowy'

import XEUtils from '@/plugins/xe-utils'
Vue.use(uView);
Vue.mixin(share)

import axios from './util/request.js'
import store from './store/index.js'
import api from './util/api.js'
import utils from './util/utils.js'
import msg from './util/msg.js'

import {
	next
} from './util/next.js'

import {
	backRefresh
} from './util/backRefresh.js'

import {
	heights
} from './util/height.js'

Vue.prototype.$height = heights

Vue.prototype.$next = next
Vue.prototype.$backRefresh = backRefresh
// 全局请求接口的方法
Vue.prototype.$axios = axios
// 全局api地址的方法
Vue.prototype.$api = api

//把vuex定义成全局组件
Vue.prototype.$store = store

//全局工具箱
Vue.prototype.$utils = utils

//全局提示方法
Vue.prototype.$msg = msg

//全局提示方法
Vue.prototype.$snowy = snowy
//全局提示方法
Vue.prototype.$xeu = XEUtils

import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})
app.$mount()


