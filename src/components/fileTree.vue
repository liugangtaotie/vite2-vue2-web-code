<template>
  <div id="file-tree" oncontextmenu="self.event.returnValue=false">
    <el-input
      placeholder="搜索..."
      v-model="filterText"
      v-if="treeSet.showInput"
      size="small"
      style="width: 240px; margin-bottom: 10px"
    >
    </el-input>

    <el-tree
      :load="loadNodes"
      ref="tree"
      :lazy="treeSet.isLazys"
      :data="treeData"
      :accordion="treeSet.isOnly"
      :show-checkbox="treeSet.isCheck"
      :node-key="treeSet.treeKey"
      :default-expand-all="treeSet.expandAll"
      :default-expanded-keys="treeSet.expandChild"
      :default-checked-keys="treeSet.setChecked"
      :props="treeField"
      highlight-current
      @check-change="handleCheckChange"
      @node-click="handleNodeClick"
      @node-contextmenu="contextmenuTrigger"
      :filter-node-method="filterNode"
    >
    </el-tree>
    <el-card class="box-card" :style="menuStyle" v-show="promiseMenu">
      <div
        v-for="(OLE, index) in treeSet.rightGroup"
        :key="OLE"
        class="item"
        @click="handleRightTrigger(index)"
        v-text="OLE"
      ></div>
    </el-card>
  </div>
</template>

<script>
const eleCard = document.querySelector(".box-card");
import { comAxion, comTips } from "@API/api.ts";
// import { mapState } from 'vuex'
export default {
  name: "fileTrees",
  props: {
    // 配置
    treeSet: {
      // 唯一标识
      treeKey: {
        type: Number,
        default: 0,
      },
      // 请求ID(XID)
      treeXid: {
        type: String,
        default: "",
      },
      // 请求方法(MTH)
      treeMth: {
        type: String,
        default: "",
      },
      // 请求参数(PAM)
      treePam: {
        type: Array,
        default: [],
      },
      // 保持一个父节点
      isOnly: {
        type: Boolean,
        default: true,
      },
      // 是否请求数据
      isRequest: {
        type: Boolean,
        default: false,
      },
      // 是否右键菜单
      isRight: {
        type: Boolean,
        default: false,
      },
      // 是否允许复选
      isCheck: {
        type: Boolean,
        default: false,
      },
      // 是否懒加载
      isLazys: {
        type: Boolean,
        default: false,
      },
      // 默认展开All
      expandAll: {
        type: Boolean,
        default: false,
      },
      // 是否展示搜索框
      showInput: {
        type: Boolean,
        default: false,
      },
      // 默认展开节点ID数组
      expandChild: {
        type: Array,
        default: [],
      },
      // 默认选中节点ID数组
      setChecked: {
        type: Array,
        default: [],
      },
      // 默认选中节点ID数组
      rightGroup: {
        type: Array,
        default: [],
      },
    },
    // 数据
    treeData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    // 字段
    treeField: {
      // 标题字段
      label: {
        type: String,
        default: "label",
      },
      // 子节点字段
      children: {
        type: String,
        default: "children",
      },
      // 叶子节点
      isLeaf: {
        type: Boolean,
        default: false,
      },
    },
    // 机构，表单？
    isTypes: {
      type: String,
      default: "org", //org、form
    },
    // 是否是一次性加载完全
    isAllLoad: {
      type: Boolean,
      default: false, //org、form
    },
    // eslint-disable-next-line vue/require-prop-type-constructor
    filterText: "",
  },
  data() {
    return {
      reqParams: {
        XID: "pcn.pcnRoleService",
        MTH: "queryAllRoles",
        PAM: {
          pageNo: 1,
          pageSize: 10,
        },
      },
      menuStyle: {
        top: 0,
        left: 0,
      },
      promiseMenu: false,
      bodys: null,
      // Node Data
      NodeData: {},
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    document.oncontextmenu = () => {
      return false;
    };
  },
  mounted() {
    this.bodys = document.querySelector("body");
    this.bodys.addEventListener(
      "click",
      () => {
        this.promiseMenu = false;
      },
      false
    );
    // $(document).on('contextmenu', '.el-tree [role="treeitem"]', function (event) {
    //     event.stopPropagation();
    //     $(this).click();
    // });
  },
  beforeDestroy() {
    this.bodys.removeEventListener(
      "click",
      () => {
        this.promiseMenu = false;
      },
      false
    );
  },
  methods: {
    //改变状态后赋值
    setCheckedKey() {
      let item = "";
      if (this.treeSet.expandChild.length === 0) {
        item = "";
      } else {
        item = this.treeSet.expandChild[this.treeSet.expandChild.length - 1];
      }
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(item);
      });
    },
    // 改变选项
    handleCheckChange(data, checked, indeterminate) {
      let checkedArr = this.$refs.tree.getCheckedNodes();
      this.$emit("getCheckedArr", checkedArr);
    },

    // Reset Checked
    resetTreeChecked() {
      let ary = (this.treeSet.setChecked = []);
      this.$refs.tree.setCheckedNodes(ary);
      this.treeSet.expandChild = [];
      this.handleCloseExpand();
    },

    // Set Checked Node
    setTreeChecked(Node) {
      this.handleCloseExpand();
      this.$refs.tree.setCheckedKeys(Node);
    },

    // Node Click Event
    handleNodeClick(Node) {
      // console.log(Node);
      this.NodeData = Node;
      this.$emit("getCurNodes", Node); //Especial For appModule
      if (!this.treeSet.isLazys) {
        return false;
      } else {
        this.$emit("getNodes", Node);
      }
      this.getParentNode(Node.pid, Node.level);
    },

    // Right Menu
    contextmenuTrigger(event, data, node, coms) {
      this.promiseMenu = false;
      if (this.treeSet.isRight) {
        this.promiseMenu = true;
        this.menuStyle.left = event.clientX - 10 + "px";
        this.menuStyle.top = event.clientY - 10 + "px";
        document.querySelector(".el-card__body").style.cssText = "padding: 0px";
        this.handleNodeClick(data);
      } else {
        this.promiseMenu = false;
      }
      // 是否为异步
      /*if (!this.treeSet.isLazys) {
                    return false
                } else {
                    
                }*/
    },

    // 右键菜单索引
    handleRightTrigger(FAGS) {
      let FAGSS = this.treeSet.rightGroup[FAGS];
      this.$emit("getRightIndex", FAGSS);
    },

    // Handle Close All Expanded
    handleCloseExpand() {
      for (let i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
        this.$refs.tree.store._getAllNodes()[i].expanded = false;
      }
    },

    // Get Parent Node
    getParentNode(PID, LEV) {
      if (LEV > 1) {
        let parentNode = this.$refs.tree.getNode(PID);
        this.$emit("getPNode", parentNode.data);
      }
    },

    // Async Load Event(Async entry)
    loadNodes(node, resolve) {
      if (node.level == 0) {
        return false;
      }
      if (!this.treeSet.isLazys) {
        return false;
      }
      // 一次加载完
      if (this.isAllLoad) {
        resolve(node.data.treeNodeList);
        return true;
      }
      // console.log(node);
      let data = node.data;
      var PAMS = null;
      if (this.isTypes === "org") {
        let lev = data.level * 1 + 1 || 1;
        PAMS = `[${lev},"${data.id || "#"}","${data.children || "true"}"]`;
      } else if (this.isTypes === "form") {
        PAMS = `[${data.id || data.iid}]`;
      } else;
      comAxion(`${this.treeSet.treeXid}`, `${this.treeSet.treeMth}`, PAMS)
        .then((res) => {
          if (res.code === 200) {
            setTimeout(() => {
              const data = res.body;
              resolve(data);
            }, 500);
          }
        })
        .catch((err) => {
          //comTips("0", "数据获取出错,请稍后再试试···");
        });
    },

    // Refresh Async Node
    refreshChild(key, data) {
      this.$refs.tree.updateKeyChildren(key, data);
    },

    // 树形搜索
    filterNode(value, data) {
      console.log(value, data, "===================*****");
      if (!value) return true;
      return data.text.indexOf(value) !== -1;
    },
  },
};
</script>

<style lang="less" scoped>
.el-tree {
  position: relative;
}

.box-card {
  position: fixed;
  z-index: 10;
  border-radius: 10px 30px;
}

.el-card__body {
  padding: 0 !important;
}

.item {
  width: 120px;
  height: 36px;
  padding: 0 10px;
  font-size: 14px;
  line-height: 36px;
  text-align: center;
  cursor: pointer;
  border-bottom: 1px dashed #ccc;
}

.item:last-child {
  border: 0;
}

.item:hover {
  color: @bs-color-primary;
  background: #eee;
  border-color: #fff;
}

.el-tree-node__content .el-tree-node__label {
  display: inline-block;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.icon-col {
  color: #5fa2dd;
}
</style>
<style lang="less">
// 小图标的颜色
@tree-icon-color: #008ef3;
//  字体的颜色
@tree-font-color: #8f8f8f;

// 是否有expanded决定树结构是否展开
// is-leaf决定是否还会有子元素
.el-tree-node__label {
  font-family: element-icons !important;
  color: @tree-font-color;
}

// 文件夹图标的配置
.el-tree-node__expand-icon:not(.is-leaf) + .el-tree-node__label::before {
  padding-right: 5px;
  color: @tree-icon-color;
  content: "\e784";
}

// 纸张图标的配置
.is-leaf + .el-tree-node__label::before {
  padding-right: 5px;
  color: @tree-icon-color;
  content: "\e789";
}

//  未展开树的图标
.el-tree-node__expand-icon:not(.expanded):not(.is-leaf)::before {
  color: white;
  background-color: @tree-icon-color;
  border-radius: 3px;
  content: "\e6d9";
}

//  已展开树的图标
.expanded::before {
  color: white;
  background-color: @tree-icon-color;
  border-radius: 3px;
  content: "\e6d8" !important;
}

.el-tree-node__expand-icon.expanded {
  transform: rotate(0deg) !important;
}
</style>
