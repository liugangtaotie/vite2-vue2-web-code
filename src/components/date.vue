<template>
  <div id="bs-date">
    <div class="mode-one" v-if="displayMode == 'one'">
      <el-date-picker
        v-model="dateObject.startDate"
        type="date"
        :readonly="isReadonly"
        :picker-options="bindObject"
        @change="changeDateOne"
        placeholder="选择日期"
      ></el-date-picker>
    </div>
    <div class="mode-two" v-if="displayMode == 'two'">
      <el-date-picker
        v-model="dateObject.startDate"
        type="date"
        :readonly="isReadonly"
        :picker-options="bindObject"
        @change="changeDateTwo1"
        placeholder="起始日期"
      ></el-date-picker>
      <el-date-picker
        v-model="dateObject.endDate"
        type="date"
        :readonly="isReadonly"
        :picker-options="bindObject"
        @change="changeDateTwo2"
        placeholder="结束日期"
      ></el-date-picker>
    </div>
    <div class="mode-merge" v-if="displayMode == 'merge'">
      <el-date-picker
        is-range
        type="daterange"
        :readonly="isReadonly"
        v-model="cacheMerge"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="changeDateMerge"
        placeholder="选择日期范围"
      ></el-date-picker>
    </div>
  </div>
</template>

<script>
import "@ASS/css/date.css";
import { getTimer } from "@API/api.ts";
export default {
  name: "dateModule",
  props: {
    // 显示模式
    // one:只有一个日期
    // two:两个日期节点
    // merge:两个日期节点的合并
    displayMode: {
      type: String,
      default: "merge",
    },
    isReadonly: {
      type: Boolean, // 只读
      defaul: false,
    },
    // 日期配置
    dateSet: {
      start: {
        type: String,
        default: "", // 开始日期
      },
      step: {
        type: String,
        default: "", // 日期间隔(步长)
      },
      end: {
        type: String,
        default: "", // 结束日期
      },
      minDate: {
        type: String, // 最小值
        default: "",
      },
      maxDate: {
        type: String, // 最大值
        default: "",
      },
    },
    // 是否允许快捷键
    isQuitKey: {
      type: Boolean,
      default: false,
    },
    // 是否默认当前系统时间
    isSysDefault: {
      type: Boolean,
      default: false,
    },
    // 设置时间(Start)
    setStartDate: {
      type: String,
      default: "",
    },
    // 设置时间(End)
    setEndDate: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // 日期对象
      dateObject: {
        startDate: "",
        endDate: "",
      },
      bindObject: {},
      // 快捷键对象
      quickLeys: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      // 日期对象(displayMode为merge时缓存)
      cacheMerge: [new Date(), new Date()],
    };
  },
  watch: {
    setStartDate(val) {
      this.cacheMerge = [val, this.setEndDate];
      this.dateObject.startDate = val;
    },
    setEndDate(val) {
      this.cacheMerge = [this.setStartDate, val];
      this.dateObject.endDate = val;
    },
    cacheMerge(val) {
      if (val === null) {
        this.dateObject.startDate = "";
        this.dateObject.endDate = "";
        this.backSelected();
      }
    },
  },
  mounted() {
    if (this.isQuitKey) {
      this.bindObject = this.quickLeys;
    } else {
      this.bindObject = this.dateSet;
    }
    // Set Date
    this.dateObject.startDate = this.setStartDate;
    this.dateObject.endDate = this.setEndDate;
    if (this.displayMode === "merge") {
      this.cacheMerge = [this.setStartDate, this.setEndDate];
    }
    this.backSelected();
  },
  methods: {
    // Change Time(one)
    changeDateOne(time) {
      let val = getTimer("YMD", "-", time);
      if (time && !this.isSysDefault) {
        this.dateObject.startDate = val;
      } else {
        this.dateObject.startDate = this.isSysDefault ? val : this.setStartDate;
      }
      this.backSelected();
    },

    // Change Time(two1)
    changeDateTwo1(time) {
      let val = getTimer("YMD", "-", time);
      this.dateObject.startDate = this.isSysDefault ? val : this.setStartDate;
      this.backSelected();
    },

    // Change Time(two2)
    changeDateTwo2(time) {
      let val = getTimer("YMD", "-", time);
      this.dateObject.endDate = this.isSysDefault ? val : this.setEndDate;
      this.backSelected();
    },

    // Change Time(merge)
    changeDateMerge(time) {
      let dataS = new Date(time[0]);
      let dataE = new Date(time[1]);
      let monthS =
        dataS.getMonth() < 9
          ? "0" + (dataS.getMonth() - 1 + 2)
          : dataS.getMonth() - 1 + 2;
      let monthE =
        dataE.getMonth() < 9
          ? "0" + (dataE.getMonth() - 1 + 2)
          : dataE.getMonth() - 1 + 2;
      let dayS = dataS.getDate() < 9 ? "0" + dataS.getDate() : dataS.getDate();
      let dayE = dataE.getDate() < 9 ? "0" + dataE.getDate() : dataE.getDate();
      this.dateObject.startDate =
        dataS.getFullYear() + "-" + monthS + "-" + dayS;
      this.dateObject.endDate = dataE.getFullYear() + "-" + monthE + "-" + dayE;
      this.backSelected();
    },

    // Back Selected
    backSelected() {
      this.$emit("receiveDate", this.dateObject);
    },
  },
};
</script>
<style scoped></style>
