<template>
  <div :id="multipleId" class="multiple-class">
    <el-select
      ref="multiple"
      v-model="valueArray"
      multiple
      value-key="value"
      :disabled="isCanSelect"
      :collapse-tags="isCollTag"
      :filterable="isFilters"
      :multiple-limit="maxNumber"
      :remove-tag="removeTag"
      @change="changeValues"
      placeholder="请选择相应选项"
    >
      <el-option
        v-for="(item,index) in options"
        :key="index++"
        :label="item.label"
        :value="item"
        :disabled="item.disabled"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { comAxios, comTips } from "@API/api.ts";
export default {
  name: "multipleModule",
  props: {
    // Id
    multipleId: {
      type: String,
      default: "bs-multiple",
    },
    // 选项极限
    maxNumber: {
      type: Number,
      default: 3,
    },
    // 过滤/搜索
    isFilters: {
      type: Boolean,
      default: true,
    },
    // 合并选项
    isCollTag: {
      type: Boolean,
      default: true,
    },
    // Select允许选择
    isCanSelect: {
      type: Boolean,
      default: false,
    },
    // 数据
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 数据（选中）
    optionsSel: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // 禁用条件
    isCondition: {
      type: Boolean,
      default: false,
    },
    // 1:签约适合对象？2:人群分类（默认2）
    whichItem: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      /*options: [{
		          value: 'alibaba',
		          label: '阿里巴巴'
		        }, {
		          value: 'baidu',
		          label: '百度'
		        }, {
		          value: 'tencent',
		          label: '腾讯'
		        }],*/
      valueArray: [],
    };
  },
  created() {
    this.valueArray = this.optionsSel;
  },
  watch: {
    options(DTS) {
      this.options = DTS;
    },
    optionsSel(DTS) {
      this.valueArray = DTS;
    },
  },
  methods: {
    // 触发选项
    changeValues(arys) {
      this.$emit("receiveMuli", arys);
      if (this.isCondition) {
        return false;
      }
      // reset option
      for (let i of this.options) {
        i.disabled = false;
      }

      // 签约适合对象、人群分类
      if (this.whichItem == 1) {
        this.computedObject(arys);
      } else {
        this.computedPerson(arys);
      }
    },

    computedObject(arys) {
      for (let oa of [...arys]) {
        // 本市户籍居民
        if (oa.value == "03") {
          for (let ex of this.options) {
            if (ex.value == "04") {
              ex.disabled = true;
            } else {
              ex.disabled = ex.disabled ? ex.disabled : false;
            }
          }
        }
        // 本市非户籍居民
        if (oa.value == "04") {
          for (let ex of this.options) {
            if (ex.value == "03") {
              ex.disabled = true;
            } else {
              ex.disabled = ex.disabled ? ex.disabled : false;
            }
          }
        }

        // 孕产妇
        if (oa.value == "05") {
          for (let ex of this.options) {
            if (ex.value == "06" || ex.value == "07") {
              ex.disabled = true;
            } else {
              ex.disabled = ex.disabled ? ex.disabled : false;
            }
          }
        }

        // 0~6岁儿童
        if (oa.value == "06") {
          for (let ex of this.options) {
            if (ex.value == "05" || ex.value == "07") {
              ex.disabled = true;
            } else {
              ex.disabled = ex.disabled ? ex.disabled : false;
            }
          }
        }

        // 65岁以上老年人
        if (oa.value == "07") {
          for (let ex of this.options) {
            if (ex.value == "05" || ex.value == "06") {
              ex.disabled = true;
            } else {
              ex.disabled = ex.disabled ? ex.disabled : false;
            }
          }
        }
      }
    },

    computedPerson(arys) {
      for (let oa of [...arys]) {
        // 一般健康人群
        if (oa.value == "10") {
          for (let ex of this.options) {
            if (ex.value != 10) {
              ex.disabled = true;
            } else {
              ex.disabled = false;
            }
          }
        }

        // 孕产妇
        if (oa.value == "01") {
          for (let ex of this.options) {
            if (ex.value == "02" || ex.value == "03" || ex.value == "10") {
              ex.disabled = true;
            } else {
              ex.disabled = ex.disabled ? ex.disabled : false;
            }
          }
        }

        // 0~6岁儿童
        if (oa.value == "02") {
          for (let ex of this.options) {
            if (ex.value == "01" || ex.value == "03" || ex.value == "10") {
              ex.disabled = true;
            } else {
              ex.disabled = ex.disabled ? ex.disabled : false;
            }
          }
        }

        // 65岁以上老年人
        if (oa.value == "03") {
          for (let ex of this.options) {
            if (ex.value == "01" || ex.value == "02" || ex.value == "10") {
              ex.disabled = true;
            } else {
              ex.disabled = ex.disabled ? ex.disabled : false;
            }
          }
        }

        // 高血压人群/糖尿病人/重性精神疾病患者/肺结核患者/残疾人/重点人群
        if (
          oa.value == "04" ||
          oa.value == "05" ||
          oa.value == "06" ||
          oa.value == "07" ||
          oa.value == "08" ||
          oa.value == "11"
        ) {
          for (let ex of this.options) {
            if (ex.value == "10") {
              ex.disabled = true;
            } else {
              ex.disabled = ex.disabled ? ex.disabled : false;
            }
          }
        }
      }
    },
    // Remove Tag
    removeTag() {
      this.valueArray = [];
    },
  },
};
</script>

<style scoped>
#bs-multiple,
.multiple-class {
  width: 100%;
  height: 100%;
  margin-left: 20px;
}
</style>
