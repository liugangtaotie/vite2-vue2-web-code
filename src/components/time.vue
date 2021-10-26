<template>
  <div id="bs-time">
    <div class="mode-one" v-if="displayMode == 'one'">
      <el-time-select
        v-model="timeObject.startTime"
        :format="format"
        :picker-options="timeSet"
        @change="changeTimeOne"
        placeholder="选择时间"
      >
      </el-time-select>
    </div>
    <div class="mode-two" v-if="displayMode == 'two'">
      <el-time-select
        v-model="timeObject.startTime"
        :format="format"
        :picker-options="timeSet"
        @change="changeTimeTwo1"
        placeholder="起始时间"
      >
      </el-time-select>
      <el-time-select
        v-model="timeObject.endTime"
        :format="format"
        :picker-options="timeSet"
        @change="changeTimeTwo2"
        placeholder="结束时间"
      >
      </el-time-select>
    </div>
    <div class="mode-merge" v-if="displayMode == 'merge'">
      <el-time-picker
        is-range
        v-model="cacheMerge"
        :format="format"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        @change="changeTimeMerge"
        placeholder="选择时间范围"
      >
      </el-time-picker>
    </div>
  </div>
</template>

<script>
export default {
  name: "timeModule",
  props: {
    // 显示模式
    // one:只有一个时间
    // two:两个时间节点
    // merge:两个时间节点的合并
    displayMode: {
      type: String,
      default: "one",
    },
    // 时间配置
    timeSet: {
      start: {
        type: String,
        default: "08:30", // 开始时间
      },
      step: {
        type: String,
        default: "00:15", // 时间间隔(步长)
      },
      end: {
        type: String,
        default: "18:30", // 结束时间
      },
      minTime: {
        type: String, // 最小值
        default: "",
      },
      maxTime: {
        type: String, // 最大值
        default: "",
      },
    },
    format: {
      type: String,
      default: "HH:mm", // 显示格式
    },
  },
  data() {
    return {
      // 时间对象
      timeObject: {
        stratTime: "",
        endTime: "",
      },
      // 时间对象(displayMode为merge时缓存)
      cacheMerge: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
    };
  },
  methods: {
    // Change Time(one)
    changeTimeOne(time) {
      this.timeObject.stratTime = time;
      this.backSelected();
    },

    // Change Time(two1)
    changeTimeTwo1(time) {
      this.timeObject.stratTime = time;
      this.backSelected();
    },

    // Change Time(two2)
    changeTimeTwo2(time) {
      this.timeObject.endTime = time;
      this.backSelected();
    },

    // Change Time(merge)
    changeTimeMerge(time) {
      let dataS = new Date(time[0]);
      let dataE = new Date(time[1]);
      this.timeObject.stratTime = dataS.getHours() + ":" + dataS.getMinutes();
      this.timeObject.end = dataE.getHours() + ":" + dataE.getMinutes();
      this.backSelected();
      console.log(this.timeObject);
    },

    // Back Selected
    backSelected() {
      this.$emit("receiveTime", this.timeObject);
    },
  },
};
</script>
