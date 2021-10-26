<template>
  <div :class="borderBottom?'bs_section_head border_bottom':'bs_section_head '">
    <div class="context fontWeight">
      <slot
        name="icon"
        v-if="$slots.icon"
      />
      <!-- <i
        v-else
        class="w_icon w_icon_index_nav bs_icon mr5"
      ></i> -->
      <img
        src="../../assets/img/icons/index_nav.png"
        class="bs_icon"
      />
      <span> {{text}}</span>
    </div>
    <slot name="right"></slot>
  </div>
</template>

<script>
export default {
  name: "BsSectionHead",
  props: {
    text: {
      type: String,
      default: "",
    },
    borderBottom: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="less" scoped>
.bs_section_head {
  // background-color: #e4e4e4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  padding: 10px;
  overflow: hidden;

  .context {
    position: relative;
    height: 40px;
    font-size: 16px;
    line-height: 40px;

    .bs_icon {
      width: 5px;
      height: 20px;
      margin-right: 5px;
      vertical-align: middle;
    }

    span {
      font-size: 18px;
      color: #3d4864;
      vertical-align: middle;
    }
  }
}

.border_bottom {
  border-bottom: 1px solid #e4e4e4;
}
</style>
