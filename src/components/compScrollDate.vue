<template>
  <div class="scroll-date-wrap">
    <div class="date-back">
      <div class="back-block" @click="backToToday">
        <img src="@ASS/img/icons/icon_back.png" alt="" class="back-icon" />
        <span>回今天</span>
      </div>
    </div>
    <div class="scroll-date">
      <span class="el-icon-arrow-left" @click="changePage(-1)"></span>
      <div class="scroll-wrap">
        <ul
          class="scroll-content days"
          :style="'width:' + daysWidth + '%;transform:translate3d(' + tranX + '%, 0, 0);'"
        >
          <li
            v-for="(day, i) in days"
            :key="i"
            :class="{ active: i === index && day.planFlag != '0', gray: day.planFlag == '0' }"
            @click="dayClickHandle(day, i)"
            :style="'flex: 0 0 ' + liWidth + '%;'"
          >
            <div class="days-date">{{ day.date }}&nbsp;&nbsp;&nbsp;&nbsp;{{ day.weekOfDay }}</div>
            <div class="days-subtitle" :class="{ blue: i !== index && day.planFlag == '1' }">
              ({{ day.count }})
            </div>
            <!-- <div class="days-arrow" v-if="i === index"></div> -->
          </li>
        </ul>
      </div>
      <span class="el-icon-arrow-right" @click="changePage(1)"></span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["days"],
  data() {
    return {
      index: 0,
      liWidth: 14.28,
      daysWidth: 100,
      tranX: 0,
      currentRow: 1,
      rows: 1,
    };
  },
  watch: {
    days: {
      handler(v) {
        const len = v.length;
        const rows = Math.ceil(len / 7);
        this.rows = rows;
        this.daysWidth = rows * 100;
        this.liWidth = 100 / rows / 7;
      },
      immediate: true,
    },
  },
  methods: {
    dayClickHandle(day, i) {
      this.index = i;
      this.$emit("dayClick", day);
    },
    changePage(n) {
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
    backToToday() {
      this.index = 0;
      this.tranX = 0;
      this.$emit("dayClick", this.days[this.index]);
    },
  },
};
</script>
<style scoped lang="less">
@border-color: #4088fe;

.scroll-date-wrap {
  position: relative;
}

.date-back {
  position: relative;
  height: 50px;
  font-size: 14px;
  color: #4088fe;
}

.back-block {
  position: absolute;
  right: -10px;
  bottom: 0;
  padding: 10px;
  cursor: pointer;

  .back-icon {
    width: 14px;
    height: 14px;
    margin-right: 4px;
  }
}

.scroll-date {
  display: flex;
  font-weight: 500;
  border: 1px solid #c7d0da;
  border-radius: 0 0 4px 4px;

  .el-icon-arrow-left,
  .el-icon-arrow-right {
    display: flex;
    flex: 0 0 40px;
    align-items: center;
    justify-content: center;
    // font-size: 2em;
    font-size: 1.4em;
    cursor: pointer;

    &:hover {
      color: @border-color;
    }
  }

  .scroll-wrap {
    flex: 1;
    overflow: hidden;
  }
}

.days {
  display: flex;
  overflow: hidden;
  text-align: center;
  // background: #f3f7f8;
  background: #fff;
  transition: transform 0.4s;

  > li {
    position: relative;
    // padding: 10px;
    padding: 20px;
    font-size: 14px;
    cursor: pointer;
    // color: #666;
    // border-right: 1px solid #fff;
    // border-bottom: 1px solid #fff;

    border-right: 1px solid #c7d0da;

    &.active {
      font-weight: bold;
      color: #fff;
      background: @border-color;
    }

    .days-arrow {
      position: absolute;
      bottom: -8px;
      left: 52px;
      width: 16px;
      height: 16px;
      background: @border-color;
      border-top: 1px solid @border-color;
      border-left: 1px solid @border-color;
      transform: rotate(225deg);
    }

    .days-subtitle {
      font-size: 16px;

      &.blue {
        color: #4088fe;
      }
    }
  }
}

.gray {
  color: #c7d0da !important;
  pointer-events: none;
  // color: #c0c4cc !important;
  background: #eee;
}
</style>
