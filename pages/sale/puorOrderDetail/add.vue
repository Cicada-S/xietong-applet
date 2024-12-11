<template>
  <view class="container" :style="{ minHeight: $height() }">
    <view class="box">
      <u-form labelPosition="right" labelWidth="100" ref="uForm">
        <u-form-item label="编号" borderBottom border>
          <u-input
            v-model="formData.code"
            placeholder="不填由系统自动带出"
            border="none"
          ></u-input>
        </u-form-item>
        <u-form-item label="项目编号" borderBottom border :required="true">
          <u-input
            v-model="formData.projectCode"
            placeholder="请填写项目编号"
            border="none"
          ></u-input>
        </u-form-item>

        <u-form-item label="供应商" borderBottom border>
          <u-input
            v-model="formData.partnersName"
            readonly
            placeholder="请选择供应商"
            border="none"
          >
            <template slot="suffix">
              <u-icon
                name="search"
                @click="showsuppData"
                color="#eaeaea"
                size="24"
              ></u-icon>
            </template>
          </u-input>
        </u-form-item>

        <u-form-item label="下单人" borderBottom border :required="true">
          <u-input
            v-model="formData.nextPersonName"
            readonly
            placeholder="请选择下单人"
            border="none"
          >
            <template slot="suffix">
              <u-icon
                name="search"
                color="#eaeaea"
                @click="showuser"
                size="24"
              ></u-icon>
            </template>
          </u-input>
        </u-form-item>

        <u-form-item label="附件" borderBottom border v-if="formData.proImage">
          <file :urlList="formData.proImage"></file>
        </u-form-item>

        <u-form-item label="下单时间" borderBottom border :required="true">
          <u-input
            readonly
            v-model="formData.createTime"
            placeholder="请选择下单时间"
            border="none"
          >
            <view slot="suffix">
              <u-button
                type="primary"
                @click="chooseTime('createTime')"
                size="mini"
                text="请选择"
              ></u-button>
            </view>
          </u-input>
        </u-form-item>
        <u-form-item label="交货时间" borderBottom border :required="true">
          <u-input
            readonly
            v-model="formData.orderTime"
            placeholder="请选择交货时间"
            border="none"
          >
            <view slot="suffix">
              <u-button
                type="primary"
                @click="chooseTime('orderTime')"
                size="mini"
                text="请选择"
              ></u-button>
            </view>
          </u-input>
        </u-form-item>
        <u-form-item label="产品清单" borderBottom border :required="true">
          <view class="king-flex king-flex__column">
            <view
              class="search-item king-flex"
              style="width: 50%; margin: 10rpx 0px"
            >
              <u-button
                type="primary"
                size="small"
                @click="() => (showProModal = true)"
                text="新增"
              ></u-button>
              <u-button
                type="error"
                size="small"
                :customStyle="{ marginLeft: '10rpx' }"
                @click="del"
                text="删除"
              ></u-button>
            </view>
            <u-table align="left">
              <u-tr>
                <u-th style="width: 13%">选择</u-th>
                <u-th style="width: 61%">产品名称</u-th>
                <u-th style="width: 13%">数量</u-th>
                <u-th style="width: 13%">备注</u-th>
              </u-tr>
              <u-checkbox-group placement="column" @change="changeCheckBox">
                <u-tr v-for="(item, index) in detailList" :key="index">
                  <u-td style="width: 13%">
                    <u-checkbox
                      :name="item.proId"
                      :checked="selectRowKeys.includes(item.proId)"
                    ></u-checkbox>
                  </u-td>
                  <u-td style="width: 61%"
                    ><input :disabled="true" v-model="item.proName" type="text"
                  /></u-td>
                  <u-td style="width: 13%"
                    ><input v-model="item.num" type="text"
                  /></u-td>
                  <u-td style="width: 13%"
                    ><input v-model="item.remark" type="text"
                  /></u-td>
                </u-tr>
              </u-checkbox-group>
            </u-table>
          </view>
        </u-form-item>
        <u-form-item label="数量" borderBottom border :required="true">
          <u-input
            v-model="formData.num"
            type="number"
            placeholder="请填写"
            border="none"
          ></u-input>
        </u-form-item>
        <u-form-item label="总计" borderBottom border :required="true">
          <u-input
            v-model="formData.totalPrice"
            type="znumber"
            placeholder="请填写"
            border="none"
          ></u-input>
        </u-form-item>
        <u-form-item label="备注" border style="margin-bottom: 30%">
          <u-textarea
            v-model="formData.remark"
            placeholder="请输入内容"
          ></u-textarea>
        </u-form-item>
      </u-form>
    </view>
    <u-button
      @click="submit"
      :customStyle="{
        width: '80%',
        position: 'fixed',
        left: '10%',
        bottom: '20px',
        zIndex: '999',
      }"
      type="primary"
      text="确定"
    ></u-button>
    <u-datetime-picker
      :show="show"
      v-model="time"
      mode="datetime"
      @close="closeTime"
      @confirm="confirmTime"
    ></u-datetime-picker>

    <u-popup
      :show="userShow"
      mode="bottom"
      @close="() => (userShow = false)"
      round="10"
      :closeable="true"
    >
      <view class="modal-box">
        <scroll-view class="scroll" style="height: 100%" scroll-y="auto">
          <userModal
            :value="formData.userId"
            @change="changeuser"
            ref="userModalRef"
            type="checkbox"
          ></userModal>
        </scroll-view>
      </view>
      <view class="king-align__center modal-buttom">
        <u-button
          type="primary"
          :customStyle="{ width: '80%' }"
          @click="() => (userShow = false)"
          text="确认"
        ></u-button>
      </view>
    </u-popup>

    <u-popup
      :show="showProModal"
      mode="bottom"
      @close="() => (showProModal = false)"
      round="10"
      :closeable="true"
    >
      <view class="modal-box">
        <scroll-view
          class="scroll"
          style="height: 100%"
          scroll-y="auto"
          @scrolltolower="() => this.$refs.proList.loadMore()"
        >
          <proListModal ref="proList" type="checkbox"></proListModal>
        </scroll-view>
      </view>
      <view class="king-align__center modal-buttom">
        <u-button
          type="primary"
          :customStyle="{ width: '80%' }"
          @click="choosePro"
          text="确认"
        ></u-button>
      </view>
    </u-popup>

    <u-popup
      :show="stepShow"
      mode="bottom"
      @close="() => (stepShow = false)"
      round="10"
      :closeable="true"
    >
      <view class="modal-box">
        <scroll-view class="scroll" style="height: 100%" scroll-y="auto">
          <suppData
            @change="changeWorkStep"
            :value="formData.workStepId"
            ref="suppDataRef"
            type="checkbox"
          ></suppData>
        </scroll-view>
      </view>
      <view class="king-align__center modal-buttom">
        <u-button
          type="primary"
          :customStyle="{ width: '80%' }"
          @click="() => (stepShow = false)"
          text="确认"
        ></u-button>
      </view>
    </u-popup>
  </view>
</template>

<script>
import userModal from "@/components/userModal/userModal.vue"
import suppData from "@/pages/crm/supp/suppData/index.vue"
import proListModal from "@/pages/mes/pro/index.vue"
import { nextTick } from "vue"
export default {
  data() {
    return {
      workStepName: "",
      stepShow: false,
      userName: "",
      selectRowKeys: [],
      userShow: false,
      showProModal: false,
      show: false,
      timeField: "",
      proList: [],
      formData: {
        invDetailList: [],
      },
      time: uni.$u.date(new Date().getTime(), "yyyy-mm-dd hh:MM"),
    }
  },
  components: {
    userModal,
    suppData,
    proListModal,
  },
  computed: {
    detailList() {
      return this.formData.id
        ? this.formData.orderDetailList
        : this.formData.invDetailList
    },
  },
  onLoad(options) {
    if (!options.result) {
      this.formData = Object.assign(this.formData, options)
    } else {
      this.formData = Object.assign(
        this.formData,
        this.$utils.decrypt(options.result)
      )
      this.workStepName = this.formData.workStepName
      this.userName = this.formData.userName
      this.load()
    }
    uni.setNavigationBarTitle({
      title: `${this.formData.id ? "编辑" : "新增"}采购订单`,
    })
  },
  methods: {
    changeWorkStep(e) {
      this.formData.workStepId = e.id
      this.formData.partnersName = e.sortName
    },
    load() {
      this.formData.startTime = uni.$u.date(
        new Date().getTime(),
        "yyyy-mm-dd 08:30:00"
      )
      this.formData.endTime = uni.$u.date(
        new Date().getTime(),
        "yyyy-mm-dd 17:30:00"
      )
      this.sumWorkTime()
      this.getWorkOrder()
      // this.getTaskList()
    },
    getWorkOrder() {
      this.$axios
        .request(this.$api.getSaleOrderDetail, "GET", {
          id: this.formData.orderId,
        })
        .then((val) => {
          this.formData = val.data
        })
    },
    choosePro() {
      this.showProModal = false
      let arr = new Array()
      this.$refs.proList.selectRows.forEach((item, index) => {
        arr.push({
          proName: item.name,
          proId: item.id,
          num: 1,
          remark: "",
        })
      })
      this.formData.invDetailList = arr
    },
    del() {
      if (this.selectRowKeys.length == 0) {
        this.$msg.toast("请选择")
        return
      }
      this.selectRowKeys.forEach((item, index) => {
        let idx = this.formData.invDetailList.findIndex((pro) => {
          if (pro.proId == item) {
            return true
          }
        })

        this.formData.invDetailList.splice(idx, 1)
      })
    },
    chooseTime(field) {
      this.timeField = field
      this.show = true
    },
    closeTime() {
      this.show = false
    },
    confirmTime(e) {
      this.show = false
      this.$set(
        this.formData,
        this.timeField,
        uni.$u.date(e.value, "yyyy-mm-dd hh:MM:ss")
      )
      this.sumWorkTime()
    },
    sumWorkTime() {
      if (this.formData.orderTime && this.formData.deliveryTime) {
        let start = new Date(this.formData.orderTime).getTime()
        let end = new Date(this.formData.deliveryTime).getTime()
        this.formData.workTime = Math.floor((end - start) / 60000)
      }
    },
    changeCheckBox(e) {
      this.selectRowKeys = e
    },
    close() {
      this.userShow = false
    },
    showuser() {
      this.userShow = true
    },
    showsuppData() {
      this.stepShow = true
    },
    closesuppData() {
      this.stepShow = false
    },
    changeuser(e) {
      this.formData.nextPerson = e.id
      this.formData.nextPersonName = e.name
    },
    submit() {
      const url = this.formData.id
        ? this.$api.editPuorOrderDetail
        : this.$api.addPuorOrderDetail

      if (this.formData.id) {
        this.formData.orderDetailList = this.detailList
      } else {
        this.formData.invDetailList = this.detailList
      }

      this.$axios
        .request(url, "POST", { ...this.formData, type: 1 })
        .then((val) => {
          this.$msg.toastCallback("添加成功", () => {
            uni.$emit("refresh")
            this.$nextTick(() => {
              uni.navigateBack()
            })
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.box {
  padding: 20px;
  padding-bottom: 100px;
}

.submit {
  .u-button {
    margin-top: 20px;
  }
}
</style>
