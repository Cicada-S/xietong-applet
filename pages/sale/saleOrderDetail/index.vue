<template>
  <view class="container" :style="{ minHeight: $height() }">
    <view class="search-box">
      <view class="search-item king-flex" v-if="type == 0">
        <u-button
          v-if="$utils.hasPerm('saleOrderDetailAdd')"
          type="primary"
          size="small"
          @click="$next(`/pages/sale/saleOrderDetail/add?type=${type}`)"
          text="新增"
        ></u-button>
        <u-button
          v-if="$utils.hasPerm('saleOrderDetailEdit')"
          type="error"
          size="small"
          @click="edit"
          text="编辑"
        ></u-button>
        <u-button
          v-if="$utils.hasPerm('saleOrderDetailBatchDelete')"
          type="primary"
          size="small"
          @click="del"
          text="删除"
        ></u-button>
      </view>
      <view class="search-item king-flex" v-if="type == 1">
        <u-button
          v-if="$utils.hasPerm('puorOrderDetailAdd')"
          type="primary"
          size="small"
          @click="$next(`/pages/sale/saleOrderDetail/add?type=${type}`)"
          text="新增"
        ></u-button>
        <u-button
          v-if="$utils.hasPerm('puorOrderDetailEdit')"
          type="error"
          size="small"
          @click="edit"
          text="编辑"
        ></u-button>
        <u-button
          v-if="$utils.hasPerm('puorOrderDetailBatchDelete')"
          type="primary"
          size="small"
          @click="del"
          text="删除"
        ></u-button>
      </view>

      <u-search
        placeholder="请输入名称"
        :clearabled="true"
        :showAction="false"
        @search="search"
        @clear="clear"
        v-model="formData.name"
        :customStyle="{ margin: '10rpx 10rpx' }"
      ></u-search>
    </view>
    <view class="box">
      <u-radio-group
        v-if="type == 'radio'"
        placement="column"
        @change="checkRadio"
      >
        <view class="item" v-for="(item, index) in list" :key="index">
          <view class="order-no king-align__center king-flex__between">
            <view class="left king-align__center">
              <view class="line"></view>
              <text>单号：{{ item.orderCode }}</text>
            </view>
            <view class="right king-align__center">
              <u-checkbox
                :name="item.id"
                :checked="selectRowKeys.includes(item.id)"
              />
            </view>
          </view>
          <u-line margin="20rpx 0px"></u-line>
          <view class="info">
            <view class="king-flex king-flex__column">
              <view class="king-align__center info-item">
                <text>项目编号：</text>
                <text>{{ item.projectCode || "" }}</text>
              </view>
              <view class="king-align__center info-item">
                <text>客户名称：</text>
                <text>{{ item.partnersName || "" }}</text>
              </view>
              <view class="king-align__center info-item">
                <text>客户编号：</text>
                <text>{{ item.partnersCode || "" }}</text>
              </view>
              <view class="king-align__center info-item">
                <text>产品名称：</text>
                <text>{{ item.proName || "" }}</text>
              </view>
              <view class="king-align__center info-item">
                <text>产品编码：</text>
                <text>{{ item.proCode || "" }}</text>
              </view>
              <view class="king-align__center info-item">
                <text>单价：</text>
                <text>{{ item.unitPrice || "" }}</text>
              </view>
              <view class="king-align__center info-item">
                <text>下单人：</text>
                <text>{{ item.nextPersonName || "" }}</text>
              </view>
              <view class="king-align__center info-item">
                <text>数量：</text>
                <text>{{ item.totalNum || "" }}</text>
              </view>
              <view class="king-align__center info-item">
                <text>小计：</text>
                <text>{{ item.totalPrice || "" }}</text>
              </view>
              <view class="king-align__center info-item">
                <text>下单时间：</text>
                <text>{{ item.orderTime || "" }}</text>
              </view>
              <view class="king-align__center info-item">
                <text>交货时间：</text>
                <text>{{ item.deliveryTime || "" }}</text>
              </view>
              <view class="king-align__center info-item">
                <text>备注：</text>
                <text>{{ item.remark }}</text>
              </view>
            </view>
          </view>
          <u-line margin="20rpx 0px"></u-line>
          <view class="footer king-align__center king-flex__between">
            <view class="createTime u-line-1">
              {{ item.createTime }}
            </view>
            <!-- <u-radio :name="item.id"></u-radio> -->
          </view>
        </view>
      </u-radio-group>

      <u-checkbox-group v-else placement="column" @change="changeCheckBox">
        <view class="item" v-for="(item, index) in list" :key="index">
          <view class="order-no king-align__center king-flex__between">
            <view class="left king-align__center">
              <view class="line"></view>
              <text>单号：{{ item.orderCode }}</text>
            </view>
            <view class="right king-align__center">
              <u-checkbox
                :name="item.id"
                :checked="selectRowKeys.includes(item.id)"
              />
            </view>
          </view>
          <u-line margin="20rpx 0px"></u-line>
          <view class="info">
            <view class="king-flex king-flex__column">
              <view class="king-align__center info-item">
                <text>项目编号：</text>
                <text>{{ item.projectCode || "" }}</text>
              </view>
              <view class="king-align__center info-item">
                <text>客户名称：</text>
                <text>{{ item.partnersName || "" }}</text>
              </view>
              <view class="king-align__center info-item">
                <text>客户编号：</text>
                <text>{{ item.partnersCode || "" }}</text>
              </view>
              <view class="king-align__center info-item">
                <text>产品名称：</text>
                <text>{{ item.proName || "" }}</text>
              </view>
              <view class="king-align__center info-item">
                <text>产品编码：</text>
                <text>{{ item.proCode || "" }}</text>
              </view>
              <view class="king-align__center info-item">
                <text>单价：</text>
                <text>{{ item.unitPrice || "" }}</text>
              </view>
              <view class="king-align__center info-item">
                <text>下单人：</text>
                <text>{{ item.nextPersonName || "" }}</text>
              </view>
              <view class="king-align__center info-item">
                <text>数量：</text>
                <text>{{ item.totalNum || "" }}</text>
              </view>
              <view class="king-align__center info-item">
                <text>小计：</text>
                <text>{{ item.totalPrice || "" }}</text>
              </view>
              <view class="king-align__center info-item">
                <text>下单时间：</text>
                <text>{{ item.orderTime || "" }}</text>
              </view>
              <view class="king-align__center info-item">
                <text>交货时间：</text>
                <text>{{ item.deliveryTime || "" }}</text>
              </view>

              <view class="king-align__center info-item">
                <text>备注：</text>
                <text>{{ item.remark }}</text>
              </view>
            </view>
          </view>
          <u-line margin="20rpx 0px"></u-line>
          <view class="footer king-align__center king-flex__between">
            <view class="createTime u-line-1">
              {{ item.createTime }}
            </view>
            <!-- <u-radio :name="item.id"></u-radio> -->
          </view>
        </view>
      </u-checkbox-group>

      <u-loadmore
        v-if="list.length !== 0"
        :status="more"
        :load-text="loadText"
      />
      <u-empty
        v-else
        :icon="$utils.imagePath('/assets/img/data.png')"
        mode="data"
        marginTop="30%"
      ></u-empty>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      loadText: {
        loadmore: "轻轻上拉，加载更多",
        loading: "努力加载中",
        nomore: "我也是有底线的",
      },
      formData: {},
      page: 1,
      list: [],
      selectRowKeys: [],
    }
  },
  created() {
    this.getSaleOrderDetailRes()
  },
  props: {
    type: {
      type: String,
      default: "checkbox",
    },
  },
  /* onLoad(options) {
    if (options.type) this.type = options.type

    uni.setNavigationBarTitle({
      title: this.type === 0 ? "销售订单" : "采购订单",
    })
  }, */
  onShow() {
    uni.$on("refresh", (val) => {
      this.refresh()
    })
  },
  methods: {
    //下拉刷新
    onPullDownRefresh() {
      this.page = 1
      this.getSaleOrderDetailRes()
    },
    //上拉加载
    onReachBottom() {
      if (this.page == 1) {
        return
      }
      if (this.more == "loadmore") {
        this.getSaleOrderDetailRes()
      }
    },
    refresh() {
      this.page = 1
      this.getSaleOrderDetailRes()
    },
    loadMore() {
      if (this.page == 1) {
        return
      }
      if (this.more == "loadmore") {
        this.getSaleOrderDetailRes()
      }
    },
    checkRadio(e) {
      let idx = this.$utils.findArrIndex(this.list, e)
      this.selectRows = [this.list[idx]]
      this.$emit("change")
    },
    changeCheckBox(e) {
      let arr = new Array()
      e.forEach((item, index) => {
        let idx = this.$utils.findArrIndex(this.list, item)
        arr.push(this.list[idx])
      })
      this.selectRowKeys = arr
      this.$emit("change")
    },
    edit() {
      if (this.selectRowKeys.length === 0) {
        this.$msg.toast("请选择一条数据")
        return
      }
      this.$next(
        `./add?result=${this.$utils.encryption(this.selectRowKeys[0])}`
      )

      /* this.$axios
        .request(this.$api.getSaleOrderDetailRes, "GET", {
          id: this.selectRowKeys[0].orderId,
        })
        .then((val) => [
          this.$next(`./add?result=${this.$utils.encryption(val.data)}`),
        ]) */
    },
    del() {
      if (this.selectRowKeys.length == 0) {
        this.$msg.toast("请选择数据")
        return
      }
      let params = this.formDataParam()
      this.$axios
        .request(this.$api.delSaleOrderDetail, "POST", params)
        .then((val) => {
          this.$msg.toastCallback("操作成功", () => {
            this.page = 1
            this.getSaleOrderDetailRes()
          })
        })
    },
    formDataParam() {
      let arr = new Array()
      this.selectRowKeys.forEach((item) => {
        let idx = this.$utils.findArrIndex(this.list, item)
        let res = this.list[idx]
        if (!arr[res.orderId]) {
          arr[res.orderId] = {
            id: res.orderId,
            orderDetailList: [],
          }
          arr[res.orderId].orderDetailList.push({
            id: res.id,
          })
        } else {
          arr[res.orderId].orderDetailList.push({
            id: res.id,
          })
        }
      })
      return Object.values(arr)
    },
    search() {
      this.page = 1
      this.getSaleOrderDetailRes()
    },
    clear() {
      this.formData.name = ""
      this.search()
    },
    getSaleOrderDetailRes() {
      this.more = "loading"
      let params = Object.assign(
        {
          current: this.page,
          size: 20,
          // sortField: "id",
          // sortOrder: "descend",
          type: 0,
        },
        this.formData
      )
      this.$axios
        .request(this.$api.getSaleOrderDetailRes, "GET", params)
        .then((val) => {
          uni.stopPullDownRefresh()
          this.list =
            this.page == 1
              ? val.data.records
              : this.list.concat(val.data.records)
          if (this.page / 1 < val.data.total / 20) {
            this.more = "loadmore"
            this.page++
          } else {
            this.more = "nomore"
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.box {
  width: 96%;
  margin: 10px auto;
  margin-top: 20%;
  .item {
    background-color: #ffffff;
    margin: 20rpx auto;
    width: 100%;
    box-shadow: 0px 2px 6px 2px #eaeaea;
    border-radius: 10rpx;
    border-radius: 10rpx;
    box-sizing: border-box;
    padding: 20rpx;
    font-size: 14px;

    .left {
      .line {
        width: 9rpx;
        height: 30rpx;
        background-color: #0081ff;
      }

      text {
        margin: 0 5px;
        font-size: 18px;
        font-weight: bold;
      }
    }

    .right {
      text {
        color: #0081ff;
        font-size: 28rpx;
      }

      .progress {
        width: 156rpx;
      }
    }

    .info {
      font-size: 14px;
    }

    .info-item {
      margin-bottom: 5px;
      justify-content: space-between;
    }

    .info-item:last-child {
      margin-bottom: 0px;
    }

    .footer {
      .createTime {
        font-size: 28rpx;
        width: 80%;
      }
    }
  }
}
</style>
