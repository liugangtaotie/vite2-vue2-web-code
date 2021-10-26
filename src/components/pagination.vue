<template>
  <div class="block text-right">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="changePageNo"
      :page-sizes="pageArray"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="responseNums"
    ></el-pagination>
  </div>
</template>

<script>
import { comAxion, comAxios, comTips } from "@API/api.ts";
export default {
  name: "footer_Module",
  props: {
    pageArray: {
      type: Array,
      default: function () {
        return [10, 20, 50, 100];
      },
    },
    pageNo: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    params: {
      type: Object,
      default: function () {
        return {};
      },
    },
    isLoading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      responseData: [],
      responseNums: 0,
      changePageNo: 1,
    };
  },
  created() {
    //this.changePageNo = this.pageNo;
    this.changePageNo = parseInt(this.params.PAM.pageNo);
    const XID = this.params.XID;
    const MTH = this.params.MTH;
    const PAM = this.params.PAM;
    this.handleRefresh(XID, MTH, PAM);
  },
  methods: {
    refresh() {
      this.params.PAM.pageNo = 1;
      this.changePageNo = 1;
      this.handleRefresh(this.params.XID, this.params.MTH, this.params.PAM);
    },

    handleRefresh(XID, MTH, PAM) {
      this.isLoading
        ? comAxios(XID, MTH, `[${JSON.stringify(PAM)}]`)
            .then((res) => {
              if (res.code === 200) {
                this.responseData = res.body;
                this.responseNums = res.body.total || res.body.length;
                this.$emit("passResponse", res.body);
              } else {
                comTips("0", res.msg ? res.msg : "数据获取失败，请稍后再试···");
              }
            })
            .catch((err) => {
              // comTips("0", "服务器响应错误，稍后再试试···");
            })
        : comAxion(XID, MTH, `[${JSON.stringify(PAM)}]`)
            .then((res) => {
              if (res.code === 200) {
                this.responseData = res.body;
                this.responseNums = res.body.total || res.body.length;
                this.$emit("passResponse", res.body);
              } else {
                comTips("0", res.msg ? res.msg : "数据获取失败，请稍后再试···");
              }
            })
            .catch((err) => {
              // comTips("0", "服务器响应错误，稍后再试试···");
            });
    },

    handleSizeChange(val) {
      this.params.PAM.pageSize = val;
      this.handleRefresh(this.params.XID, this.params.MTH, this.params.PAM);
    },

    handleCurrentChange(val) {
      this.params.PAM.pageNo = val;
      this.changePageNo = val;
      this.handleRefresh(this.params.XID, this.params.MTH, this.params.PAM);
    },
  },
};
</script>

<style scoped>
.block {
  margin: 20px 0;
}
</style>
