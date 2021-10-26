<template>
  <!-- 
 * 支持 折线图 柱状图 饼图
 * @——————以下为可接受参数———————
 * @showTitle 是否显示图标标题 Boolean
 * @title 图标标题详情 Object
 * @showLegend 是否显示图例 Boolean
 * @legend 图例详情 Object
 * @showTooltip 是否显示提示框 Boolean
 * @tooltip 提示框详情 Object
 * @series 图标数据 Array (核心数据 必传!)
 * @showXAxis 是否显示横坐标 Boolean
 * @xAxis 横坐标 Object
 * @showYAxis 是否显示纵坐标 Boolean
 * @yAxis 纵坐标 Object
 * @showGrid 是否显示直角坐标系网格 Boolean
 * @grid 直角坐标系网格 边框  Object
 * @large 图表大小 String
 * @chartName 图表名称 String (必传,且整个大项目的任何一个图表名称不得重复!)
  -->
  <div>
    <div :id="chartName" :style="large"></div>
  </div>
</template>

<script>
// 全局引入会将所有的echarts图表打包，导致体积过大，所以是按需引入。
import echarts from "echarts/lib/echarts"; // 引入基本模板
import "echarts/lib/chart/bar"; // 引入柱状图组件
import "echarts/lib/chart/pie"; // 引入饼图组件
import "echarts/lib/chart/line";
// 引入提示框和title组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";

export default {
  props: {
    showTitle: {
      type: Boolean,
      default: true, //是否显示图标标题
    },
    title: {
      type: Object,
      default: () => {
        return {
          text: "示例图表", //图表标题
          x: "50%", //图表标题位置
          y: "0%", //图表标题位置
        };
      },
    },
    showLegend: {
      type: Boolean,
      default: false, //是否显示图例
    },
    legend: {
      type: Object,
      default: () => {
        return {
          orient: "vertical", //图例列表的布局朝向('horizontal':水平,'vertical':垂直)
          align: "auto", //图例标记和文本的对齐。默认自动,可选left right
          x: "100%", //位置
          y: "50%", //位置
          type: "plain", //plain普通图例,scroll可滚动翻页的图例
        };
      },
    },
    showTooltip: {
      type: Boolean,
      default: false, //是否显示提示框
    },
    tooltip: {
      type: Object,
      default: () => {
        return {
          position: ["50%", "50%"], //位置
        };
      },
    },
    series: {
      //核心参数 必传
      type: Array,
      default: () => {
        return [
          {
            name: "示例",
            type: "bar",
            data: [
              Math.random() * 99,
              Math.random() * 99,
              Math.random() * 99,
              Math.random() * 99,
            ],
          },
        ];
      },
    },
    showXAxis: {
      type: Boolean,
      default: true, //是否显示横坐标
    },
    xAxis: {
      type: Object,
      default: () => {
        return {
          data: ["示例1", "示例2", "示例3", "示例4"],
          boundaryGap: true,
        };
      },
    },
    showYAxis: {
      type: Boolean,
      default: true, //是否显示纵坐标
    },
    yAxis: {
      type: Object,
      default: () => {
        return {
          boundaryGap: false,
        };
      },
    },
    showGrid: {
      type: Boolean,
      default: true,
    },
    grid: {
      type: Object,
      default: () => {
        return { borderwidth: 0 };
      },
    },
    large: {
      type: String,
      default: "width: 800px;height:400px;",
    },
    chartName: {
      type: String,
      default: "chart" + parseInt(Math.random() * 99999),
    },
    label: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  watch: {
    xAxis: {
      //深度监听，可监听到对象、数组的变化
      handler(newV, oldV) {
        this.initChart();
      },
      deep: true,
    },
    series: {
      handler(newV, oldV) {
        if (!this.showXAxis) {
          this.initChart();
        }
      },
      deep: true,
    },
  },
  mounted() {
    // this.initChart();
  },
  methods: {
    initChart() {
      echarts.init(document.getElementById(this.chartName)).setOption({
        title: {
          show: this.showTitle,
          ...this.title,
        },
        legend: {
          show: this.showLegend,
          ...this.legend,
        },
        tooltip: {
          show: this.showTooltip,
          ...this.tooltip,
        },
        xAxis: {
          show: this.showXAxis,
          ...this.xAxis,
        },
        yAxis: {
          show: this.showYAxis,
          ...this.yAxis,
        },
        grid: {
          show: this.showGrid,
          ...this.grid,
        },
        label: {
          formatter: (content) => {
            return (
              content.name +
              "\n" +
              content.value +
              "人次，共计￥" +
              content.data.totalPrice
            );
          },
        }, //this.label,
        series: this.series,
      });
    },
    // resize(){
    //   echarts.resize();//重绘
    // }
  },
};
</script>

<style scoped>
</style>
