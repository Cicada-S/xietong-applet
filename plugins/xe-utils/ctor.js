'use strict'

import setupDefaults from './setupDefaults'

import arrayEach from './arrayEach'
import each from './each'
import isFunction from './isFunction'

import assign from './assign'

var XEUtils = function () {}

function mixin () {
  arrayEach(arguments, function (methods) {
    each(methods, function (fn, name) {
      XEUtils[name] = isFunction(fn) ? function () {
        var result = fn.apply(XEUtils.$context, arguments)
        XEUtils.$context = null
        return result
      } : fn
    })
  })
}

function setup (options) {
  return assign(setupDefaults, options)
}

XEUtils.VERSION = '3.5.12'
XEUtils.mixin = mixin
XEUtils.setup = setup

export default XEUtils
