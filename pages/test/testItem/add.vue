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
        <u-form-item label="项目名称" borderBottom border :required="true">
          <u-input
            v-model="formData.name"
            placeholder="请填写项目名称"
            border="none"
          ></u-input>
        </u-form-item>
        <u-form-item label="检验方式" borderBottom border>
          <u-radio-group v-model="formData.testType" placement="row">
            <u-radio name="0" label="定性"></u-radio>
            <u-radio
              name="1"
              label="定量"
              :customStyle="{ marginLeft: '40rpx' }"
            ></u-radio>
          </u-radio-group>
        </u-form-item>
        <u-form-item label="检验类型" borderBottom border>
          <u-input
            v-model="formData.testTypeName"
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
        <u-form-item label="检验标准" borderBottom border>
          <u-input
            v-model="formData.testStandardName"
            readonly
            placeholder="请选择检验标准"
            border="none"
          >
            <template slot="suffix">
              <u-icon
                name="search"
                @click="() => (showtestStandardName = true)"
                color="#eaeaea"
                size="24"
              ></u-icon>
            </template>
          </u-input>
        </u-form-item>
        <u-form-item label="检验仪器" borderBottom border>
          <u-input
            v-model="formData.testInstrumentName"
            readonly
            placeholder="请选择检验仪器"
            border="none"
          >
            <template slot="suffix">
              <u-icon
                name="search"
                @click="() => (showtestInstrumentName = true)"
                color="#eaeaea"
                size="24"
              ></u-icon>
            </template>
          </u-input>
        </u-form-item>
        <u-form-item label="排序" borderBottom border>
          <u-input
            v-model="formData.sortCode"
            placeholder="请输入排序"
            border="none"
            type="number"
          ></u-input>
        </u-form-item>

        <u-form-item label="检验方法" border style="margin-bottom: 30%">
          <u-textarea
            v-model="formData.way"
            placeholder="请输入检验方法"
          ></u-textarea>
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
      :show="showtestStandardName"
      mode="bottom"
      @close="() => (showtestStandardName = false)"
      round="10"
      :closeable="true"
    >
      <view class="modal-box">
        <scroll-view
          class="scroll"
          style="height: 100%"
          scroll-y="auto"
          @scrolltolower="() => this.$refs.testStandardName.loadMore()"
        >
          <testStandardName
            type="checkbox"
            ref="testStandardName"
          ></testStandardName>
        </scroll-view>
      </view>
      <view class="king-align__center modal-buttom">
        <u-button
          type="primary"
          :customStyle="{ width: '80%' }"
          @click="chooseStandardName"
          text="确认"
        ></u-button>
      </view>
    </u-popup>

    <u-popup
      :show="showtestInstrumentName"
      mode="bottom"
      @close="() => (showtestInstrumentName = false)"
      round="10"
      :closeable="true"
    >
      <view class="modal-box">
        <scroll-view
          class="scroll"
          style="height: 100%"
          scroll-y="auto"
          @scrolltolower="() => this.$refs.testInstrumentName.loadMore()"
        >
          <testInstrumentName
            type="checkbox"
            ref="testInstrumentName"
          ></testInstrumentName>
        </scroll-view>
      </view>
      <view class="king-align__center modal-buttom">
        <u-button
          type="primary"
          :customStyle="{ width: '80%' }"
          @click="chooseInstrumentName"
          text="确认"
        ></u-button>
      </view>
    </u-popup>

    <u-popup
      :show="showManageModal"
      mode="bottom"
      @close="() => (showManageModal = false)"
      round="10"
      :closeable="true"
    >
      <view class="modal-box">
        <scroll-view
          class="scroll"
          style="height: 100%"
          scroll-y="auto"
          @scrolltolower="() => this.$refs.manageModalRef.loadMore()"
        >
          <userModal
            type="checkbox"
            :value="formData.manageRight"
            ref="manageModalRef"
          ></userModal>
        </scroll-view>
      </view>
      <view class="king-align__center modal-buttom">
        <u-button
          type="primary"
          :customStyle="{ width: '80%' }"
          @click="chooseManage"
          text="确认"
        ></u-button>
      </view>
    </u-popup>

    <u-popup
      :show="showReportModal"
      mode="bottom"
      @close="() => (showReportModal = false)"
      round="10"
      :closeable="true"
    >
      <view class="modal-box">
        <scroll-view
          class="scroll"
          style="height: 100%"
          scroll-y="auto"
          @scrolltolower="() => this.$refs.reportModalRef.loadMore()"
        >
          <userModal
            type="checkbox"
            :value="formData.reportRight"
            ref="reportModalRef"
          ></userModal>
        </scroll-view>
      </view>
      <view class="king-align__center modal-buttom">
        <!--<u-button type="primary" :customStyle="{width:'80%'}" @click="chooseReport" text="确认" ></u-button> -->
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
      </view>
    </u-popup>
  </view>
</template>

<script>
import testTypeName from "@/pages/test/testType/index.vue"
import testStandardName from "@/pages/test/testStandard/index.vue"
import testInstrumentName from "@/pages/test/testInstrument/index.vue"
import userModal from "@/components/userModal/userModal.vue"
export default {
  data() {
    return {
      formData: {},
      showtestTypeName: false,
      showtestStandardName: false,
      showtestInstrumentName: false,
      showManageModal: false,
      showReportModal: false,
    }
  },
  components: {
    testTypeName,
    testStandardName,
    testInstrumentName,
    userModal,
  },
  onLoad(options) {
    if (options.result) {
      this.formData = this.$utils.decrypt(options.result)
      console.log(this.formData)
    }
    uni.setNavigationBarTitle({
      title: `${this.formData.id ? "编辑" : "新增"}检验项目`,
    })
  },
  methods: {
    submit() {
      const url = this.formData.id
        ? this.$api.ediTtestItem
        : this.$api.addTestItem

      this.$axios.request(url, "POST", this.formData).then((val) => {
        this.$msg.toastCallback("操作成功", () => {
          this.$backRefresh()
        })
      })
    },
    chooseBadItem() {
      if (this.$refs.testTypeName.selectRows.length > 0) {
        let arr = new Array()
        this.$refs.testTypeName.selectRows.forEach((item, index) => {
          arr.push(item.name)
        })
        this.formData.testTypeId = this.$refs.testTypeName.selectRows[0].id
        this.formData.testTypeName = arr.join(",")
      } else {
        this.formData.testTypeName = ""
      }
      this.showtestTypeName = false
    },
    chooseStandardName() {
      if (this.$refs.testStandardName.selectRows.length > 0) {
        let arr = new Array()
        this.$refs.testStandardName.selectRows.forEach((item, index) => {
          arr.push(item.name)
        })
        this.formData.testStandardName = arr.join(",")
      } else {
        this.formData.testStandardName = ""
      }
      this.showtestStandardName = false
    },
    chooseInstrumentName() {
      if (this.$refs.testInstrumentName.selectRows.length > 0) {
        let arr = new Array()
        this.$refs.testInstrumentName.selectRows.forEach((item, index) => {
          arr.push(item.name)
        })
        this.formData.testInstrumentName = arr.join(",")
      } else {
        this.formData.testInstrumentName = ""
      }
      this.showtestInstrumentName = false
    },
    chooseManage() {
      if (this.$refs.manageModalRef.selectRows.length > 0) {
        let nameArr = new Array()
        let idArr = new Array()
        this.$refs.manageModalRef.selectRows.forEach((item, index) => {
          nameArr.push(item.account)
          idArr.push(item.id)
        })
        this.formData.manageRightName = nameArr.join(",")
        this.formData.manageRight = idArr.join(",")
      } else {
        this.formData.manageRightName = ""
        this.formData.manageRight = ""
      }
      this.showManageModal = false
    },
    chooseReport() {
      if (this.$refs.reportModalRef.selectRows.length > 0) {
        let nameArr = new Array()
        let idArr = new Array()
        this.$refs.reportModalRef.selectRows.forEach((item, index) => {
          nameArr.push(item.account)
          idArr.push(item.id)
        })
        this.formData.reportRightName = nameArr.join(",")
        this.formData.reportRight = idArr.join(",")
      } else {
        this.formData.reportRightName = ""
        this.formData.reportRight = ""
      }
      this.showReportModal = false
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
