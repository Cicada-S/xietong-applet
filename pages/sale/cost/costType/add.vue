<template>
  <view class="container" :style="{ minHeight: $height() }">
    <view class="box">
      <u-form labelPosition="right" labelWidth="130" ref="uForm">
        <u-form-item label="排序编码" borderBottom border>
          <u-input
            v-model="formData.sortCode"
            placeholder="不填由系统自动带出"
            border="none"
          ></u-input>
        </u-form-item>
        <u-form-item label="类型名称" borderBottom border :required="true">
          <u-input
            v-model="formData.typeName"
            placeholder="请填写类型名称"
            border="none"
          ></u-input>
        </u-form-item>
        <u-form-item label="运算符号" borderBottom border>
          <u-radio-group v-model="formData.operratorSymbol" placement="row">
            <u-radio name="+" label="收入"></u-radio>
            <u-radio name="-" label="支出"></u-radio>
          </u-radio-group>
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
  </view>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        typeName: "", // 类型名称
        operratorSymbol: "", // 收入+ 支出-
        sortCode: 0, // 排序码
        remark: "", // 备注
      },
    }
  },

  onLoad(options) {
    if (options.result) {
      this.formData = this.$utils.decrypt(options.result)
      console.log("options", this.$utils.decrypt(options.result))
    }
    uni.setNavigationBarTitle({
      title: `${this.formData.id ? "编辑" : "新增"}成本类型`,
    })
  },
  methods: {
    submit() {
      const url = this.formData.id
        ? this.$api.editCostType
        : this.$api.addCostType

      if (this.formData.id) this.formData.name = this.formData.typeName
      this.$axios.request(url, "POST", this.formData).then((val) => {
        console.log("编辑新增数据", val)
        this.$msg.toastCallback("操作成功", () => {
          this.$backRefresh()
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
