<template>
  <div id="bs-area">
    <el-select
      ref="provis"
      id="provice-comp"
      v-model="valueP"
      value-key="id"
      :disabled="isChange"
      placeholder="请选择(省份)"
      :filterable="isFilter"
      :clearable="isClear"
      @clear="clearValue"
      @change="changeValue"
      :required="isRequired"
      :size="size"
    >
      <el-option
        v-for="item in provinceArray"
        :key="item.id"
        :value="item"
        :label="item.text"
      ></el-option>
    </el-select>
    <el-select
      ref="cities"
      id="city-comp"
      v-model="valueC"
      value-key="id"
      :disabled="isChange"
      :clearable="isClear"
      :filterable="isFilter"
      :required="isRequired"
      @clear="clearValue"
      @change="changeValue"
      placeholder="请选择(市级)"
      :size="size"
    >
      <el-option
        v-for="item in cityArray"
        :key="item.id"
        :value="item"
        :label="item.text"
      ></el-option>
    </el-select>
    <el-select
      ref="areas"
      id="area-comp"
      v-if="isArea"
      v-model="valueA"
      value-key="id"
      :disabled="isChange"
      :clearable="isClear"
      :filterable="isFilter"
      :required="isRequired"
      @clear="clearValue"
      @change="changeValue"
      placeholder="请选择(区县)"
      :size="size"
    >
      <el-option
        v-for="item in areaArray"
        :key="item.id"
        :value="item"
        :label="item.text"
      ></el-option>
    </el-select>
    <el-select
      ref="streets"
      id="street-comp"
      v-model="valueS"
      v-if="isStreet"
      value-key="id"
      :disabled="isChange"
      :clearable="isClear"
      :filterable="isFilter"
      :required="isRequired"
      @clear="clearValue"
      @change="changeValue"
      placeholder="请选择(街道)"
      :size="size"
    >
      <el-option
        v-for="item in street"
        :key="item.id"
        :value="item"
        :label="item.text"
      ></el-option>
    </el-select>
    <el-input
      auto-complete
      v-if="isDetail"
      v-model="detailCon"
      :disabled="isChange"
      :required="isRequired"
      :clearable="isClear"
      @blur="handleBlur"
      placeholder="详细地址···"
      :size="size"
    ></el-input>
  </div>
</template>

<script>
import { comAxion, comTips, ACKEN } from "@API/api.ts";
export default {
  name: "areaModules",
  props: {
    //输入框大小
    size: {
      type: String,
      default: "",
    },
    // 选择后立即显示
    displayNows: {
      type: Boolean,
      default: false,
    },
    // 允许筛选
    isFilter: {
      type: Boolean,
      default: false,
    },
    // 是否必填(form下有效)
    isRequired: {
      type: Boolean,
      default: true,
    },
    // 是否清空(RADIO)
    isClear: {
      type: Boolean,
      default: true,
    },
    // 是否区县
    isArea: {
      type: Boolean,
      default: true,
    },
    // 是否街道
    isStrt: {
      type: Boolean,
      default: true,
    },
    // 显示详细地址
    isDetail: {
      type: Boolean,
      default: true,
    },
    // 显示对象
    isObject: {
      type: Array,
      default: function() {
        return [];
      },
    },
    // 是否切换
    isChange: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 继承字段
      propsField: {
        value: "id",
        label: "text",
        children: "childrens",
      },
      // 省份
      provinceArray: [],
      // 市级
      cityArray: [],
      // 县级
      areaArray: [],
      // 街道
      street: [],
      // 区县级下是否有街道
      isStreet: true,
      valueP: {},
      valueC: {},
      valueA: {},
      valueS: {},
      detailCon: "",

      // 数据返回
      backMsg: [
        { text: "", id: "" }, // 省
        { text: "", id: "" }, // 市
        { text: "", id: "" }, // 区/县
        { text: "", id: "" }, // 街道
        { detail: "" }, // 详细(号)
        { complete: "" }, // 完整地址
      ],
    };
  },
  watch: {
    isObject(val) {
      let isObject = [...this.isObject];
      this.waitChildLoad(isObject);
      for (let os of isObject) {
        os.children = true;
        if (os.level == 4) {
          os.children = false;
          this.detailCon = os.text;
        }
      }
    },
  },
  created() {
    let PAMS = `["1","#","true"]`;
    this.asyncChildLoad(PAMS, "init");
  },
  mounted() {
    this.isStreet = this.isStrt;
  },
  methods: {
    // Change Items 省
    changeValue(items) {
      let item = { ...items };
      if (!item) {
        return false;
      }
      let level = item.level * 1 + 1 || 1;
      let PAMS = `["${level}","${item.id}","${item.children}"]`;
      this.asyncChildLoad(PAMS, level);
      // console.log(this.$refs.provis.selectedLabel)
      // let index = level - 1;
      // this.backMsg[index].id = item.id;
      // this.backMsg[index].text = item.text;
      // Clear Event Instedof Watch
      // Judge
      this.detailCon = "";
      if (item.level == 1) {
        this.valueC = {};
        this.valueA = {};
        this.valueS = {};
        this.cityArray = [];
        this.areaArray = [];
        this.street = [];
      } else if (item.level == 2) {
        this.valueA = {};
        this.valueS = {};
        this.areaArray = [];
        this.street = [];
      } else if (item.level == 3) {
        this.valueS = {};
        this.street = [];
      } else if (item.level == 4) {
        // this.detailCon = ''; //  ?
      }
      this.getSelectMsg();
    },

    watchValue(items) {
      let item = { ...items };
      if (!item) {
        return false;
      }
      let level = item.level * 1 + 1 || 1;
      let PAMS = `["${level}","${item.id}","${item.children}"]`;
      this.asyncChildLoad(PAMS, level);
      if (this.isObject.length > 0) {
        this.backMsg = [
          { text: this.isObject[0].text, id: "" }, // 省
          { text: this.isObject[1].text || "", id: this.isObject[1].id }, // 市
          { text: this.isObject[2].text || "", id: this.isObject[2].id }, // 区/县
          { text: this.isObject[3].text || "", id: this.isObject[3].id }, // 街道
          { detail: this.isObject[4].text || "" }, // 详细(号)
          {
            complete:
              (this.isObject[0].text || "") +
              (this.isObject[1].text || "") +
              (this.isObject[2].text || "") +
              (this.isObject[3].text || "") +
              (this.isObject[4].text || ""),
          }, // 完整地址
        ];
        this.$emit("receiveAddress", this.backMsg);
      }
    },

    // Async Load
    asyncChildLoad(PAMS, level) {
      comAxion(`hcn.regionService`, `getListByPid`, PAMS).then((res) => {
        if (res.code === 200) {
          if (level == 2) {
            this.cityArray = [...res.body];
          } else if (level == 3) {
            this.areaArray = [...res.body];
          } else if (level == 4) {
            this.street = [...res.body];
          } else if (level === "init" || level == "1") {
            this.provinceArray = [...res.body];
          } else;
        }
      });
    },

    // Wait Load
    waitChildLoad(arrs) {
      comAxion(
        `hcn.regionService`,
        `getListByPid`,
        `["${arrs[0].level * 1 + 1}","${arrs[0].id}","true"]`
      ).then((res) => {
        if (res.code === 200) {
          this.provinceArray = [...res.body];
          for (let pv of this.provinceArray) {
            if (this.isObject[1].id == pv.id) {
              this.valueP = { ...pv };
            }
          }
          comAxion(
            `hcn.regionService`,
            `getListByPid`,
            `["${arrs[1].level * 1 + 1}","${arrs[1].id}","true"]`
          ).then((res) => {
            if (res.code === 200) {
              this.cityArray = [...res.body];
              for (let ct of this.cityArray) {
                if (this.isObject[2].id == ct.id) {
                  this.$nextTick(() => {
                    this.valueC = { ...ct };
                  });
                }
              }
              comAxion(
                `hcn.regionService`,
                `getListByPid`,
                `["${arrs[2].level * 1 + 1}","${arrs[2].id}","true"]`
              ).then((res) => {
                if (res.code === 200) {
                  this.areaArray = [...res.body];
                  for (let ar of this.areaArray) {
                    if (this.isObject[3].id == ar.id) {
                      this.$nextTick(() => {
                        this.$set(this.$data, "valueA", { ...ar });
                        setTimeout(() => {
                          this.getSelectMsg();
                        }, 500);
                      });
                    }
                  }
                  comAxion(
                    `hcn.regionService`,
                    `getListByPid`,
                    `["${arrs[3].level * 1 + 1}","${arrs[3].id}","true"]`
                  ).then((res) => {
                    if (res.code === 200) {
                      this.street = [...res.body];
                      for (let st of this.street) {
                        if (this.isObject[4].id == st.id) {
                          this.$nextTick(() => {
                            this.$set(this.$data, "valueS", { ...st });
                            setTimeout(() => {
                              this.getSelectMsg();
                            }, 500);
                          });
                        }
                      }
                    }
                  });
                }
              });
            }
          });
        }
      });
    },

    // 详细地址(BLUR)
    handleBlur() {
      this.getSelectMsg();
    },

    // 获取所选的省市县/区街道信息
    getSelectMsg() {
      this.backMsg = [
        { text: this.valueP.text || "", id: this.valueP.id }, // 省
        { text: this.valueC.text || "", id: this.valueC.id }, // 市
        { text: this.valueA.text || "", id: this.valueA.id }, // 区/县
        { text: this.valueS.text || "", id: this.valueS.id }, // 街道
        { detail: this.detailCon || "" }, // 详细(号)
        {
          complete:
            (this.valueP.text || "") +
            (this.valueC.text || "") +
            (this.valueA.text || "") +
            (this.valueS.text || "") +
            (this.detailCon || ""),
        }, // 完整地址
      ];
      this.$emit("receiveAddress", this.backMsg);
    },

    // 清空
    clearValue() {
      // 预留
    },
  },
};
</script>

<style scoped>
#bs-area {
  display: flex;
  display: -webkit-flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
}

#bs-area .el-input {
  display: inline-block;
}

#bs-area .el-select {
  margin-right: 10px;
}
</style>
