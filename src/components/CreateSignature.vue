<template>
  <div class="signatureBox">
    <div class="canvasBox" ref="canvasHW">
      <canvas
        ref="canvasF"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @mouseup="mouseUp"
      ></canvas>
      <div class="btnbox">
        <div class="btn" @click="overwrite">重写</div>
        <div class="btn" @click="commit">提交签名</div>
      </div>
    </div>
  </div>
  <!-- <img class="imgCanvas" :src="imgUrl" /> -->
</template>
<style scoped>
.signatureBox {
  z-index: 100;
  display: flex;
  width: 100%;
  height: calc(100% - 50px);
  margin-left: 20px;
  overflow: hidden;
  background: #fff;
  box-sizing: border-box;
  flex-direction: column;
}
.canvasBox {
  box-sizing: border-box;
  flex: 1;
}
.btnbox {
  display: flex;
  height: 40px;
  margin-right: 50px;
  line-height: 40px;
}
.btn {
  width: 50%;
  text-align: center;

  /* background: #0097fd; */
  background: #eee;

  /* color: white; */
}
canvas {
  border: 1px solid #7d7d7d;
}
</style>
<script>
import { dataURLtoFile } from "@ASS/js/util";
import { comFiles, BS_imgUpload, BS_preViews, comTips } from "@API/api.ts";
export default {
  data() {
    return {
      imgUrl: "",
      client: {},
      points: [],
      canvasTxt: null,
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      endY: 0,
      endX: 0,
      w: null,
      h: null,
      isDown: false,
      isViewAutograph: this.$route.query.isViews > 0,
      contractSuccess: this.$route.query.contractSuccess,
      address: BS_imgUpload(), //comApi.BS_Upload(),
    };
  },
  mounted() {
    let canvas = this.$refs.canvasF;
    canvas.width = this.$refs.canvasHW.offsetWidth - 50;
    canvas.height = canvas.width * 0.8;
    this.canvasTxt = canvas.getContext("2d");
    this.canvasTxt.fillStyle = "#ffffff";
    this.canvasTxt.fillRect(0, 0, canvas.width, canvas.height);
    this.canvasTxt.strokeStyle = "#000000";
    this.canvasTxt.lineWidth = 2;
    this.canvasTxt.lineCap = "round";
  },
  methods: {
    //mobile
    touchStart(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clienX,
          y: ev.targetTouches[0].clientY - 50,
        };
        this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
      }
    },
    touchMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - 30,
          y: ev.targetTouches[0].clientY - 60,
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj);
      }
    },
    touchEnd(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX - 30,
          y: ev.targetTouches[0].clientY - 60,
        };
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
      }
    },
    //pc
    mouseDown(ev) {
      ev = ev || event;
      ev.preventDefault();
      console.log(ev);
      if (1) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY,
        };
        console.log(obj);
        this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.isDown = true;
      }
    },
    mouseMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (this.isDown) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY,
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj);
      }
    },
    mouseUp(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (1) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY,
        };
        this.canvasTxt.beginPath();
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.points.push({ x: -1, y: -1 });
        this.isDown = false;
      }
    },
    //重写
    overwrite() {
      this.canvasTxt.clearRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height);
      this.canvasTxt.fillStyle = "#ffffff";
      this.canvasTxt.fillRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height);
      this.points = [];
    },
    //提交签名
    commit() {
      this.imgUrl = this.$refs.canvasF.toDataURL();
      let file = dataURLtoFile(this.imgUrl, new Date().getTime() + ".png");
      let formData = new FormData();
      formData.append("file", file);
      formData.append("mode", "31");
      comFiles(this.address, formData)
        .then((res) => {
          comTips("1", "已上传 √ ");
          // var pics = {
          // 	'name': res.record.fileName,
          // 	'pid' : res.record.fileId
          // }
          if (!this.isMultiple) {
            this.receiveIds = [];
          }
          let objs = {
            name: "image" + res.record.fileId,
            url: BS_preViews(res.record.fileId), //comApi.BS_View(ele)
            fileId: res.record.fileId,
          };
          // this.fileList.push(objs);
          // this.receiveIds.push(res.record.fileId);
          this.$emit("getImgUrl", objs);
          // this.$emit("receiveFileList", this.fileList);
        })
        .catch((err) => {
          // comTips("0", "上传出错 × ");
        });
    },
  },
};
</script>
