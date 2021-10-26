<template>
  <div class="home">
    <div class="menus">
      <div class="menus-title">功能入口</div>
      <div class="mt10" v-for="(item, i) in list" :key="i">
        <el-button :type="i == current ? 'primary' : 'default'" @click="onClickNextStep(item, i)">{{
          item.title
        }}</el-button>
      </div>
    </div>

    <div class="example">
      <pre class="example-content">
      模块对接示例：

      模块名称：{{ currentItem.title }}
      模块地址：{{ currentItem.url }}
      模块入参：

                   {{ sparamstr }}
      </pre>
    </div>

    <div class="enter">
      <el-button type="success" @click="onEnter">进入模块测试 >></el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentItem: {},
      current: "",
      sparamstr: {
        // accessToken: "6a1a2c74-b73d-42a3-81e2-d130b96fbaff", // 方洪全 - dev
        accessToken: "0d92c110-aada-4005-9e14-4361c13f6e96", // 方洪全 - zk
        // accessToken: '279d0456-bea0-408e-bb0a-a9e0d9ebc9ad' // admin'
      },
      list: [
        {
          title: "公共模块",
          url: "/home/home",
        },
      ],
    };
  },
  methods: {
    // 点击下一步
    onClickNextStep(item, index) {
      this.currentItem = item;
      this.current = index;
      if (item.sparamstr) {
        this.sparamstr = item.sparamstr;
      }
    },

    onEnter() {
      console.info("2222222");
      this.$router.push(this.currentItem.url + "?sparamstr=" + JSON.stringify(this.sparamstr));
    },
  },
};
</script>
<style lang="less" scoped>
.home {
  display: flex;
  height: 100vh;

  .menus {
    flex: 240px 0 0;
    padding: 20px;
    overflow-y: scroll;
  }

  .menus-title {
    font-size: 20px;
    color: "#333";
    text-align: center;
  }

  .example {
    flex: 1;
    background: #f2f2f2;
    border-left: 1px solid #f2f2f2;
  }
}

.error {
  color: "#333";
}

.enter {
  position: fixed;
  top: 20px;
  right: 20px;
}

.example-content {
  font-size: 2em;
}
</style>
