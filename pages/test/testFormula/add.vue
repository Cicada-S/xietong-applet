<template>
  <view class="container" :style="{ minHeight: $height() }">
    <view class="box">
      <u-form labelPosition="right" labelWidth="100" ref="uForm">
        <u-form-item label="编码" borderBottom border>
          <u-input
            v-model="formData.code"
            placeholder="不填由系统自动带出"
            border="none"
          ></u-input>
        </u-form-item>
        <u-form-item label="方案名称" borderBottom border :required="true">
          <u-input
            v-model="formData.name"
            placeholder="请填写方案名称"
            border="none"
          ></u-input>
        </u-form-item>
        <u-form-item label="检验方式" borderBottom border>
          <u-radio-group v-model="formData.testType" placement="row">
            <u-radio name="0" label="工序首检"></u-radio>
            <u-radio name="1" label="工序末检"></u-radio>
            <u-radio name="2" label="工序巡检"></u-radio>
            <u-radio name="3" label="出库检"></u-radio>
            <u-radio
              name="4"
              label="入库检"
              :customStyle="{ marginLeft: '10rpx' }"
            ></u-radio>
          </u-radio-group>
        </u-form-item>

        <u-form-item label="方案执行时间" borderBottom border :required="true">
          <u-input
            readonly
            v-model="formData.buyTime"
            placeholder="请选择方案执行时间"
            border="none"
          >
            <view slot="suffix">
              <u-button
                type="primary"
                @click="chooseTime('buyTime')"
                size="mini"
                text="请选择"
              ></u-button>
            </view>
          </u-input>
        </u-form-item>
        <u-form-item label="方案结束时间" borderBottom border :required="true">
          <u-input
            readonly
            v-model="formData.usedTime"
            placeholder="请选择方案结束时间"
            border="none"
          >
            <view slot="suffix">
              <u-button
                type="primary"
                @click="chooseTime('usedTime')"
                size="mini"
                text="请选择"
              ></u-button>
            </view>
          </u-input>
        </u-form-item>

        <u-form-item label="检验类型" borderBottom border>
          <u-input
            v-model="formData.testItemName"
            readonly
            placeholder="请选择检验类型"
            border="none"
          >
            <template slot="suffix">
              <u-icon
                name="search"
                @click="() => (showtestTypeName = true)"
                color="#eaeaea"
                size="24"
              ></u-icon>
            </template>
          </u-input>
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
      text="确认"
    ></u-button>
    <u-datetime-picker
      :show="show"
      v-model="time"
      mode="datetime"
      @close="closeTime"
      @confirm="confirmTime"
    ></u-datetime-picker>
    <u-popup
      :show="showUserModal"
      v-if="showUserModal"
      mode="bottom"
      @close="() => (showUserModal = false)"
      round="10"
      :closeable="true"
    >
      <view class="modal-box">
        <scroll-view
          class="scroll"
          style="height: 100%"
          scroll-y="auto"
          @scrolltolower="() => this.$refs.userModalRef.loadMore()"
        >
          <userModal
            :value="formData.productionUser"
            type="checkbox"
            :idList="reportRightIds"
            ref="userModalRef"
          ></userModal>
        </scroll-view>
      </view>
      <view class="king-align__center modal-buttom">
        <u-button
          type="primary"
          :customStyle="{ width: '80%' }"
          @click="chooseUser"
          text="确认"
        ></u-button>
      </view>
    </u-popup>

    <u-popup
      :show="showtestTypeName"
      mode="bottom"
      @close="() => (showtestTypeName = false)"
      round="10"
      :closeable="true"
    >
      <view class="modal-box">
        <scroll-view
          class="scroll"
          style="height: 100%"
          scroll-y="auto"
          @scrolltolower="() => this.$refs.testTypeName.loadMore()"
        >
          <testTypeName type="checkbox" ref="testTypeName"></testTypeName>
        </scroll-view>
      </view>
      <view class="king-align__center modal-buttom">
        <u-button
          type="primary"
          :customStyle="{ width: '80%' }"
          @click="chooseBadItem"
          text="确认"
        ></u-button>
      </view>
    </u-popup>
    <u-popup
      :show="showtestItemName"
      mode="bottom"
      @close="() => (showtestItemName = false)"
      round="10"
      :closeable="true"
    >
      <view class="modal-box">
        <scroll-view
          class="scroll"
          style="height: 100%"
          scroll-y="auto"
          @scrolltolower="() => this.$refs.testItemName.loadMore()"
        >
          <testItemName type="checkbox" ref="testItemName"></testItemName>
        </scroll-view>
      </view>
      <view class="king-align__center modal-buttom">
        <u-button
          type="primary"
          :customStyle="{ width: '80%' }"
          @click="chooseBadItem1"
          text="确认"
        ></u-button>
      </view>
    </u-popup>

    <u-popup
      :show="showWorkTaskModal"
      mode="bottom"
      @close="() => (showWorkTaskModal = false)"
      round="10"
      :closeable="true"
    >
      <view class="modal-box">
        <scroll-view
          class="scroll"
          style="height: 100%"
          scroll-y="auto"
          @scrolltolower="() => this.$refs.workTaskModalRef.loadMore()"
        >
          <workTaskModal type="radio" ref="workTaskModalRef"></workTaskModal>
        </scroll-view>
      </view>
      <view class="king-align__center modal-buttom">
        <u-button
          type="primary"
          :customStyle="{ width: '80%' }"
          @click="chooseWorkTask"
          text="确认"
        ></u-button>
      </view>
    </u-popup>
  </view>
</template>

<script>
import testTypeName from "@/pages/test/testType/index.vue"
import testItemName from "@/pages/test/testItem/index.vue"
import dynamicItem from "@/components/dynamicItem/dynamicItem.vue"
import userModal from "@/components/userModal/userModal.vue"
import workTaskModal from "@/pages/index/taskList.vue"
import file from "@/components/file/index.vue"
export default {
  data() {
    return {
      showtestTypeName: false,
      showtestItemName: false,
      showUserModal: false,
      showWorkTaskModal: false,
      reportRightIds: "",
      workOrder: {},
      taskList: [],
      showTask: false,
      formData: {
        goodNum: 0,
        reportNum: 0,
        badNum: 0,
      },
      dynamicList: [],
      mulBadItem: [], //当前工序不良品名字
      taskName: "",
      checkedUserIds: [], //报工用户人
      userList: [], //用户列表
      show: false,
      timeField: "",
      time: uni.$u.date(new Date().getTime(), "yyyy-mm-dd hh:MM"),
    }
  },
  components: {
    testTypeName,
    testItemName,
    dynamicItem,
    userModal,
    workTaskModal,
    file,
  },
  onLoad() {
    this.$axios.request(this.$api.getWorkReportDynamic, "GET").then((val) => {
      this.dynamicList = val.data
    })
  },
  onLoad(options) {
    if (options.result) {
      this.formData = this.$utils.decrypt(options.result)
    }
    uni.setNavigationBarTitle({
      title: `${this.formData.id ? "编辑" : "新增"}检验项目`,
    })
  },
  methods: {
    submit() {
      const url = this.formData.id
        ? this.$api.editTestFormula
        : this.$api.addTestFormula

      this.$axios.request(url, "POST", this.formData).then((val) => {
        this.$msg.toastCallback("操作成功", () => {
          this.$backRefresh()
        })
      })
    },
    scan() {
      uni.scanCode({
        scanType: ["qrCode", "barCode"],
        success: (res) => {
          this.formData.workOrderId = res.result
          this.load()
        },
        fail: (res) => {
          this.$msg.toast("扫码失败")
        },
      })
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
      this.getTaskList()
    },
    chooseBadItem() {
      if (this.$refs.testTypeName.selectRows.length > 0) {
        let arr = new Array()
        this.$refs.testTypeName.selectRows.forEach((item, index) => {
          arr.push(item.name)
        })
        this.formData.itemList = this.$refs.testTypeName.selectRows
        this.formData.testItemName = arr.join(",")
      } else {
        this.formData.testItemName = ""
      }
      this.showtestTypeName = false
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
      if (this.formData.startTime && this.formData.endTime) {
        let start = new Date(this.formData.startTime).getTime()
        let end = new Date(this.formData.endTime).getTime()
        this.formData.workTime = Math.floor((end - start) / 60000)
      }
    },
    chooseWorkTask() {
      if (this.$refs.workTaskModalRef.selectRows.length > 0) {
        let task = this.$refs.workTaskModalRef.selectRows[0]
        this.formData.workOrderId = task.workOrderId
        this.formData.taskId = task.id
        this.load()
      }
      this.showWorkTaskModal = false
    },
    chooseUser() {
      let ids = new Array()
      let nameArr = new Array()
      this.$refs.userModalRef.selectRows.forEach((item, index) => {
        ids.push(item.id)
        nameArr.push(item.account)
      })
      this.formData.productionUserText = nameArr.join(",")
      this.formData.productionUser = ids.join(",")
      this.showUserModal = false
    },
    //获取工单信息
    getWorkOrder() {
      this.$axios
        .request(this.$api.getWorkOrder, "GET", {
          id: this.formData.workOrderId,
        })
        .then((val) => {
          this.workOrder = val.data
          this.formData.proPlanCode = val.data.proPlanCode
          this.formData.proId = val.data.proId
          this.formData.proImage = val.data.proImage
          this.formData.goodNum = val.data.plaNum
          this.formData.reportNum = val.data.plaNum
        })
    },

    close() {
      this.show = false
    },
    closeTask() {
      this.showTask = false
    },
    change() {
      this.formData.reportNum =
        parseInt(this.formData.goodNum || 0) +
        parseInt(this.formData.badNum || 0)
    },
    changeBad() {
      let total = 0
      this.mulBadItem.forEach((item, index) => {
        let num = item.num || 0
        total += parseInt(num)
      })
      this.formData.badNum = total
      this.change()
    },
    changeTask(e) {
      let value = e.detail.value
      if (this.taskList[value]) {
        let task = this.taskList[value]
        this.formData.taskId = task.id
        this.formData.taskRemark = task.remark

        if (!this.formData.id) {
          this.formData.productionUserText = task.reportRightName
          this.formData.productionUser = task.reportRight
        }

        this.formData.workStepId = task.workStepId
        this.formData.unitPrice = task.unitPrice
        this.taskName = `${task.workStepName}【顺序：${task.sortNum}】【执行中】`
        if (task.mulBadItem) {
          let arr = new Array()
          task.mulBadItem.split(",").forEach((item, index) => {
            arr.push({
              name: item,
              num: 0,
            })
          })
          this.mulBadItem = arr
          this.changeBad()
        }
        if (task.reportRight) {
          this.reportRightIds = task.reportRight
        }
      }

      this.closeTask()
    },
    getTaskList() {
      this.$axios
        .request(this.$api.getTaskList, "GET", {
          workOrderId: this.formData.workOrderId,
        })
        .then((val) => {
          val.data.forEach((item, index) => {
            let status = item.status
            let statusText = ""
            if (status == 0) {
              statusText = "未开始"
            } else if (status == 1) {
              statusText = "执行中"
            } else if (status == 2) {
              statusText = "已结束"
            } else if (status == 3) {
              statusText = "已取消"
            }
            item.title = `${item.workStepName}【顺序：${item.sortNum}】【${statusText}】`
          })
          this.taskList = val.data

          //处理选择逻辑
          if (this.formData.taskId) {
            let index = this.$utils.findArrIndex(val.data, this.formData.taskId)
            let e = {
              detail: {
                value: index,
              },
            }
            this.changeTask(e)
          }
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
