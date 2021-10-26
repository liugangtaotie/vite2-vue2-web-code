<template>
  <div class="doctor-item" :style="'width:' + itemWidth + 'px;'">
    <div class="item-left" v-show="hideLeft">
      <div class="fl">
        <img :src="imgUrlFilter(item.avatarFileId)" alt />
      </div>
      <div class="doctor-item-right">
        <div class="title">{{ item.doctorName }}</div>
        <div class="subtext">{{ item.levelText || "-" }}</div>
        <div class="subtext lh20">擅长:{{ item.speciality | filterSpeciality }}</div>
        <div class="subtext">
          <el-button type="text" @click="toDoctorHome" size="mini">点击查看详情></el-button>
        </div>
      </div>
    </div>
    <div class="item-right">
      <!-- ampm -->
      <div class="ampm">
        <div class="color-gray" @click="changePage(-1)">
          <i class="el-icon-arrow-left" />
        </div>
        <div class>上午</div>
        <div class>下午</div>
        <div class>晚上</div>
      </div>
      <!-- days :style="'width:'+ daysWidth +'px'"-->
      <div class="days-wrap">
        <div
          class="days"
          :style="'width:' + daysWidth + 'px;transform:translate3d(' + tranX + '%, 0, 0);'"
        >
          <div
            class="day day-head"
            v-for="(day, i) in days"
            :key="'_header_' + i"
            :style="'flex: 0 0 ' + liWidth + '%;'"
          >
            {{ day.date | shortDate }}
            <div>{{ day.weekOfDay }}</div>
          </div>
          <!-- {{day.isActive ? '预约' : '&nbsp;'}} day.isActive-->
          <div
            class="day"
            :class="[
              { active: day.status == '0' },
              { gray: day.status == '1' },
              { cgray: day.status == '2' },
            ]"
            :key="'_middle_' + i"
            v-for="(day, i) in amDays"
            @click="selectTime(day)"
            :style="'flex: 0 0 ' + liWidth + '%;'"
          >
            {{ day.status | filterFlag }}
          </div>
          <div
            class="day"
            :class="[
              { active: day.status == '0' },
              { gray: day.status == '1' },
              { cgray: day.status == '2' },
            ]"
            :key="'_bottom_' + i"
            v-for="(day, i) in pmDays"
            @click="selectTime(day)"
            :style="'flex: 0 0 ' + liWidth + '%;'"
          >
            {{ day.status | filterFlag }}
          </div>
          <div
            class="day"
            :class="[
              { active: day.status == '0' },
              { gray: day.status == '1' },
              { cgray: day.status == '2' },
            ]"
            :key="'_end_' + i"
            v-for="(day, i) in pm2Days"
            @click="selectTime(day)"
            :style="'flex: 0 0 ' + liWidth + '%;'"
          >
            {{ day.status | filterFlag }}
          </div>
        </div>
      </div>
      <!--  -->
      <div class="ampm">
        <div class="color-gray" @click="changePage(1)">
          <i class="el-icon-arrow-right" />
        </div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
      </div>
    </div>

    <!-- modal1 -->
    <el-dialog :visible.sync="modal1" title="请选择就诊时段" width="550px">
      <div class="msg">
        <span class="fl color-info">
          {{ item.deptName }}
          <el-divider direction="vertical"></el-divider>
          {{ scheduleDate }} {{ timeFlag | timeFlagFilter }}
        </span>
      </div>
      <div class="content">
        <ul class="mt10 time-list">
          <li
            v-for="(val, i) in numbers"
            :key="'_numbers_' + i"
            @click="timeClickHandle(val, i)"
            :class="[{ active: i == numIdex }, { disabled: val.number == val.reservationsNumber }]"
          >
            {{ val.startTime.slice(11, 16) }} ~ {{ val.endTime.slice(11, 16) }}
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modal1 = false">取 消</el-button>
        <el-button type="primary" @click="timeSubmit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { BS_preViews, comAxios, comTips, getTimer } from "@API/api.ts";
import panda from "@ASS/img/avatar/doc_head.png";

export default {
  data() {
    return {
      modal1: false,
      amDays: [],
      pmDays: [],
      pm2Days: [],
      scheduleDate: "",
      numbers: [],
      daysWidth: 728,
      itemWidth: 1052,
      days: [],
      timeFlag: "",
      numIdex: null,
      currentRow: 1,
      rows: 1,
      liWidth: 14.28,
      tranX: 0,
    };
  },
  props: {
    hideLeft: {
      type: Boolean,
      default: true,
    },
    // days: {
    //   type: Array,
    //   default: [],
    // },
    item: {
      type: Object,
      default: () => {
        return {
          listSchedule: [],
        };
      },
    },
  },
  watch: {
    item: {
      handler(newval) {
        this.item = newval;
        this.listScheduleCycle();
      },
      deep: true,
    },
    days: {
      handler(v) {
        const len = v.length;
        const rows = Math.ceil(len / 7);
        this.rows = rows;
        this.daysWidth = rows * 728;
        this.liWidth = 96 / rows / 7;
      },
      immediate: true,
    },
  },
  filters: {
    filterSpeciality(val) {
      if (val) {
        return val.length > 15 ? val.substr(0, 15) + "..." : val;
      } else {
        return "暂无";
      }
    },
    shortDate(val) {
      if (!val) {
        return "";
      }
      return val.slice(5, 10);
    },
    filterFlag(val) {
      if (val == "0") {
        return "预约";
      } else if (val == "1") {
        return "约满";
      } else if (val == "2") {
        return "停诊";
      } else {
        return "";
      }
    },
    timeFlagFilter(val) {
      if (val == "1") {
        return "上午";
      } else if (val == "2") {
        return "下午";
      } else {
        return "晚上";
      }
    },
  },
  mounted() {
    this.listScheduleCycle();
    if (this.hideLeft) {
      this.itemWidth = 1052;
    } else {
      this.itemWidth = 832;
    }
  },
  methods: {
    imgUrlFilter(val) {
      if (val) {
        return BS_preViews(val);
      } else {
        return panda;
      }
    },
    reset() {
      // val.listSchedule.forEach(item => {
      //   item.onlineQuestioningSchedulingId = val.onlineQuestioningSchedulingId
      // })
      let amDays = [];
      let pmDays = [];
      let pm2Days = [];
      this.days.forEach((d) => {
        let obj = { scheduleDate: d.date, status: "" };
        amDays.push(obj);
        pmDays.push(obj);
        pm2Days.push(obj);
      });

      let listSchedule = this.item.scheduleList;
      if (listSchedule) {
        listSchedule.forEach((v) => {
          amDays.forEach((vam, i) => {
            if (vam.scheduleDate === v.scheduleDate && v.timeFlag === 1) {
              amDays[i] = v;
            }
          });
          pmDays.forEach((vpm, i) => {
            if (vpm.scheduleDate === v.scheduleDate && v.timeFlag === 2) {
              pmDays[i] = v;
            }
          });
          pm2Days.forEach((vpm2, i) => {
            if (vpm2.scheduleDate === v.scheduleDate && v.timeFlag === 3) {
              pm2Days[i] = v;
            }
          });
        });
      }
      //填满空格
      const rows = Math.ceil(this.days.length / 7);
      if (this.days.length != rows * 7) {
        let num = rows * 7 - this.days.length;
        for (let i = 0; i < num; i++) {
          this.days.push({});
          amDays.push({});
          pmDays.push({});
          pm2Days.push({});
        }
      }
      this.amDays = amDays;
      this.pmDays = pmDays;
      this.pm2Days = pm2Days;
    },
    selectTime(day) {
      if (day.status != "0") {
        return;
      }
      this.listNumber(day);
    },
    toDoctorHome() {
      this.$router.push({
        path: "/apointment/doctorHome",
        query: {
          doctorId: this.item.doctorId,
          deptId: this.item.deptId,
          orgId: this.item.orgId,
        },
      });
    },
    timeClickHandle(val, i) {
      sessionStorage.selectedTime = {};
      this.numIdex = i;
      val.doctorName = this.item.doctorName;
      val.deptName = this.item.deptName;
      val.orgName = this.item.orgName;
      val.price = this.item.assistClinicDiscountPrice;
      val.level = this.item.level;
      val.orgDoctorId = this.item.orgDoctorId;
      sessionStorage.selectedTime = JSON.stringify(val);
    },
    timeSubmit() {
      if (this.numIdex == null) {
        comTips("00", "请选择排班!");
        return false;
      }
      this.$router.push("/collaborativeClinic/clinicComfirm");
    },
    //获取排班周期
    listScheduleCycle() {
      if (this.item && this.item.doctorId) {
        let param = [
          {
            orgId: this.item.orgId,
            beginDate: getTimer(),
            doctorId: this.item.doctorId,
            deptId: this.item.deptId,
          },
        ];
        // comAxios(`hco.cloudClinic`, `queryDoctorPlanDateList`, param).then((res) => {
        //   if (res.code == 200) {
        //     this.days = res.body || [];
        //     this.reset();
        //     let num = this.days.length == 0 ? 7 : this.days.length;
        //     this.daysWidth = num * 100;
        //   }
        // });
        comAxios(`hco.cloudClinic`, `queryOrgPlanDateList`, param).then((res) => {
          if (res.code == 200) {
            this.days = res.body || [];
            this.reset();
            let num = this.days.length == 0 ? 7 : this.days.length;
            this.daysWidth = num * 100;
          }
        });
      }
    },
    //获取号源
    listNumber(day) {
      let param = [
        {
          doctorId: this.item.doctorId,
          deptId: this.item.deptId,
          orgId: this.item.orgId,
          scheduleDate: day.scheduleDate,
          timeFlag: day.timeFlag,
        },
      ];
      comAxios(`hco.assistClinic`, `queryDoctorScheduleItemList`, param).then((res) => {
        if (res.code == 200) {
          this.modal1 = true;
          this.numbers = res.body;
          this.scheduleDate = day.scheduleDate;
          this.timeFlag = day.timeFlag;
        }
      });
    },
    changePage(n) {
      console.log(this.rows, this.daysWidth, this.liWidth, this.currentRow);
      var tranX = 0;
      if (n > 0) {
        // move right
        if (this.currentRow >= this.rows) {
          return;
        }

        tranX = -1 * (this.liWidth * 7) * this.currentRow;
        this.currentRow++;
      } else {
        // move left
        if (this.currentRow <= 1) {
          tranX = 0;
        } else {
          --this.currentRow;
          tranX = -1 * (this.liWidth * 7) * (this.currentRow - 1);
        }
      }
      this.tranX = tranX;
    },
  },
};
</script>
<style>
.el-dialog__header {
  text-align: left;
  border-bottom: 1px solid #f2f2f2;
}
</style>
<style lang="less" scoped>
@border-color: #edeef7;
@primary-color: #3556c1;

.doctor-item {
  display: inline-block;
  float: left;
  width: 1052px;
  margin: 10px 10px 0;
  margin-bottom: 10px;
  overflow: hidden;
  font-family: Microsoft YaHei;
  border: 1px solid @border-color;

  img {
    float: left;
    width: 80px;
    height: 120px;
  }

  .item-left {
    float: left;
    width: 220px;
    padding: 40px 0;
  }

  .doctor-item-right {
    float: left;
    width: 130px;
    margin-left: 10px;
    text-align: left;

    .title {
      font-size: 1.3em;
      font-weight: bold;
    }

    .subtext {
      margin-top: 6px;
      font-size: 0.9em;
    }
  }

  .item-right {
    float: left;
    //width: 800px;
    width: 830px;
    text-align: left;
  }
}

.ampm {
  float: left;
  //width: 78px;
  width: 65px;
  text-align: center;

  > div {
    height: 50px;
    margin-top: -1px;
    line-height: 50px;
    border-top: 1px solid @border-color;
    border-left: 1px solid @border-color;
  }
}

.days-wrap {
  float: left;
  width: 700px;
  //overflow-x: auto;
  overflow-x: hidden;
  overflow-y: hidden;
}

.days {
  width: 3100px;
  height: 150px;
  text-align: center;

  .day {
    float: left;
    width: 100px;
    height: 50px;
    margin-top: -1px;
    line-height: 50px;
    cursor: pointer;
    border-top: 1px solid @border-color;
    border-left: 1px solid @border-color;

    &.day-head {
      line-height: 25px;
      color: #888;
      background: #eaeeff;
      border-top: none;
    }

    &.active {
      color: #fff;
      background: #58ace3;
    }
  }
}

.time-list {
  margin: 0 auto;
  overflow: hidden;

  li {
    display: block;
    float: left;
    width: 100px;
    padding: 10px 8px;
    margin: 10px;
    color: #000;
    text-align: center;
    border: 1px solid @border-color;
    border-radius: 5px;
    // border: 1px solid #dadfe8;
    // background: #E8EFFE;
    transition: all 0.6s;

    &.active {
      color: #5786ee;
      background: #e8effe;
    }

    &.disabled {
      padding: 10px 8px;
      color: #ccc;
      background: #f6f6f6;
    }
  }
}

// scroll bar theme
.days-wrap::-webkit-scrollbar {
  /* 滚动条整体样式 */
  width: 10px;

  /* 高宽分别对应横竖滚动条的尺寸 */
  height: 6px;
}

.days-wrap::-webkit-scrollbar-thumb {
  background: #999;

  /* 滚动条中的滚动块 */
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}

.days-wrap::-webkit-scrollbar-track {
  background: #ededed;
  border-radius: 10px;

  /* 滚动条里面的轨道 */
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}

.msg {
  height: 30px;
}

.content {
  font-size: 0.9rem;
  border: 1px solid #f2f2f2;
  //padding: 20px;
  border-radius: 5px;
}

.gray {
  color: #999;
  pointer-events: none;
  background: #f6f6f6;
  border: 1px solid @border-color;
}

.cgray {
  color: #999;
  pointer-events: none;
}
</style>
