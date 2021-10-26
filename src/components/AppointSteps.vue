<template>
  <div class="ps">
    <el-steps :active="current" align-center>
      <el-step title="选择科室医生"></el-step>
      <el-step title="填写问诊信息"></el-step>
      <el-step title="预约成功"></el-step>
      <el-step title="等待医生视频"></el-step>
      <el-step title="查看处置建议"></el-step>
      <el-step title="完成就诊"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 0
    }
  }
};
</script>
<style lang="less" scoped>
.ps {
  width: 80%;
  margin: 40px auto;
}
</style>

