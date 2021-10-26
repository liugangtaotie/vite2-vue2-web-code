<template>
  <div id="bs-upload">
    <el-upload
      :class="{ 'ele-upload': true, hide: hideUpload && isOverHiden }"
      ref="bsUpload"
      :action="address"
      :accept="acceptType"
      :limit="maxNumber"
      :data="extraData"
      :headers="headerSet"
      :drag="promiseDrag"
      :list-type="displayStyle"
      :file-list="fileList"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :multiple="isMultiple"
      :auto-upload="autoUpload"
      :on-exceed="overMaxNumber"
      :before-upload="beforeUpload"
      :on-change="uploadCall"
      :on-success="uploadSuccess"
      :http-request="uploadMethod"
    >
      <!-- 
      class="ele-upload"     :class="{ 'ele-upload': true, hide: hideUpload && isOverHiden }"   -->
      <i class="el-icon-upload"></i>
    </el-upload>
    <el-button v-if="!autoUpload" type="primary" class="el-icon-more" @click="submitUpload"
      >我要上传</el-button
    >
    <el-dialog id="elep-dialogs" title="查看大图" append-to-body :visible.sync="dialogVisible">
      <img class="imgs-box" :src="dialogImageUrl" alt="暂无法查看，请稍后再试试！" />
    </el-dialog>
  </div>
</template>

<script>
import * as comApi from "@STA/activeJas/comApi.js";
import "@ASS/css/upload-css.css";
import { comAxios, comTips, comFiles, ACKEN, BS_imgUpload, BS_preViews } from "@API/api.ts";
export default {
  name: "fileUpload",
  props: {
    showUrl: {
      type: Boolean,
      default: false,
    },
    // 文件上传地址
    /*address: {
				type: String,
				default: `${comApi.BS_View_Img}`
			},*/
    // 文件属性(类型:image、text)
    fileType: {
      type: String,
      default: "image",
    },
    // 是否多文件上传
    isMultiple: {
      type: Boolean,
      default: true,
    },
    // 选取文件自动上传
    autoUpload: {
      type: Boolean,
      default: false,
    },
    // 最大上传数
    maxNumber: {
      type: Number,
      default: 3,
    },
    // 拖拽上传
    promiseDrag: {
      type: Boolean,
      default: false,
    },
    // 文件类型(选择中)
    // Windows Or MacOs 弹窗时过滤
    acceptType: {
      type: String,
      default: function () {
        if (this.fileType === "image") {
          return comApi.supportType_Imgs;
        } else {
          return comApi.supportType_File;
        }
      },
    },
    // 文件大小(M)
    acceptSize: {
      type: Number,
      default: 2,
    },
    // 文件/图像Id(预览时)
    arrayIds: {
      type: Array,
      default: () => [],
    },
    isOriginImage: {
      type: Boolean,
      default: false,
    },
    // 是否需要超出限制限制隐藏上传效果
    isOverHiden: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hideUpload: false,
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      displayStyle: "picture-card",
      address: BS_imgUpload(), //comApi.BS_Upload(),
      headerSet: {
        "X-Access-Token": ACKEN,
      },
      // 附加参数
      extraData: {
        mode: "31",
      },
      // Get Pic Array
      receiveIds: [],
    };
  },
  watch: {
    arrayIds(val) {
      this.handleOnlyPre();
    },
  },
  created() {
    //console.log(this.address)
  },
  mounted() {
    this.handleOnlyPre();
  },
  methods: {
    // Previews
    handleOnlyPre() {
      if (this.arrayIds.length > 0) {
        let arrs = [];
        for (let ele of this.arrayIds) {
          let objs = {
            name: "image" + ele,
            url: this.isOriginImage ? ele : BS_preViews(ele),
            fileId: ele,
          };
          if (this.showUrl) {
            objs.url = ele;
          }
          arrs.push(objs);
        }
        this.fileList = arrs;
      } else {
        this.fileList = [];
      }
      //根据需求，提供上传指定数量隐藏上传图标功能
      this.hideUpload = this.fileList.length >= this.maxNumber;
    },

    // Remove
    handleRemove(file, fileList) {
      console.log(file, fileList, "&&&&&&");
      // console.log(this.receiveIds)
      if (fileList.length < 1) {
        this.displayStyle = "picture-card";
        this.resetUpload();
      } else {
        if (this.fileType === "text") {
          this.displayStyle = "text";
        }
      }
      for (const i in this.fileList) {
        if (this.fileList[i].name === file.name) {
          this.fileList.splice(i, 1);
        }
      }
      //根据需求，提供上传指定数量隐藏上传图标功能
      this.hideUpload = fileList.length >= this.maxNumber;

      this.$emit("receiveFileList", this.fileList);
    },

    // Preview
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    // 上传校验(选择后)
    beforeUpload(file) {
      if (file.type !== "image") {
        const isText =
          file.type === "text/plain" ||
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        const isTextSize = file.size / 1024 / 1024 < this.acceptSize;
        if (!isText) {
          this.$message.error("上传文件只能是 text、doc、sheet 格式!");
        }
        if (!isTextSize) {
          this.$message.error("上传文件大小不能超过 " + this.acceptSize + "MB!");
        }
        return isText && isTextSize;
      } else {
        const isType = file.type === "image/jpeg" || "image/gif" || "image/png" || "image/bmp";
        const isLtSize = file.size / 1024 / 1024 < this.acceptSize;
        if (!isType) {
          this.$message.error("上传头像图片只能是 JPG、GIF、BMP、PNG 格式!");
        }
        if (!isLtSize) {
          this.$message.error("上传头像图片大小不能超过 " + this.acceptSize + "MB!");
        }
        return isType && isLtSize;
      }
    },

    // 上传方法(重写覆盖)
    uploadMethod(items) {
      let formData = new FormData();
      formData.append("file", items.file);
      formData.append("mode", "31");
      comFiles(this.address, formData)
        .then((res) => {
          comTips("1", "已上传 √ ");
          // var pics = {
          // 	'name': res.record.fileName,
          // 	'pid' : res.record.fileId
          // }
          // this.hideUpload = true;
          if (!this.isMultiple) {
            this.receiveIds = [];
          }
          let objs = {
            name: "image" + res.record.fileId,
            url: BS_preViews(res.record.fileId), //comApi.BS_View(ele)
            fileId: res.record.fileId,
          };
          this.fileList.push(objs);
          this.receiveIds.push(res.record.fileId);
          this.$emit("receiveFidList", this.receiveIds);
          this.$emit("receiveFileList", this.fileList);
          this.hideUpload = this.fileList.length >= this.maxNumber;
          console.log(
            "上传方法已触发",
            "当前状态上传按钮状态",
            this.fileList.length,
            this.maxNumber
          );
          // console.log(this.receiveIds)
          // this.$set(this.receiveIds,index,arrss)
        })
        .catch((err) => {
          //comTips("0", "上传出错 × ");
        });
    },

    // 上传服务器
    submitUpload() {
      this.$refs.bsUpload.submit();
      this.uploadSuccess();
    },

    // 文件选择(上传)回调
    uploadCall(file, fileList) {
      if (this.fileType !== "image") {
        this.displayStyle = "text";
      } else {
        this.displayStyle = "picture-card";
      }
    },

    // 上传成功
    uploadSuccess(response, file, fileList) {
      //数组深复制，不考虑循环引用的情况
      /*function cloneArr(from) {
      			    return from.map((n) => clone(n));
      			}
      			// 复制输入值
      			function clone(from) {
      			    if (from instanceof Array) {
      			        return cloneArr(from);
      			    } else if (from instanceof Object) {
      			        return cloneObj(from);
      			    } else {
      			        return (from);
      			    }
      			}
      			let obj2 = clone(this.receiveIds);console.log(obj2)*/
      // console.log(this.receiveIds)

      //根据需求，提供上传指定数量隐藏上传图标功能
      // this.hideUpload = fileList.length >= this.maxNumber;
      this.hideUpload = this.fileList.length >= this.maxNumber;
      console.log("上传成功回调函数已触发", "当前状态上传按钮应消失", this.hideUpload);
      console.log(
        " fileList.length",
        fileList.length,
        " this.fileList.length",
        this.fileList.length,
        "this.maxNumber",
        this.maxNumber
      );

      this.$emit("receiveFidList", this.receiveIds);
    },

    // 超出最大上传值钩子
    overMaxNumber(files, fileList) {
      comTips("00", "最大上传数为：" + this.maxNumber);
    },

    // 重置上传列表数据
    resetUpload() {
      this.receiveIds = [];
      this.$refs.bsUpload.clearFiles();
      this.$emit("receiveFidList", this.receiveIds);
    },

    // 取消上传操作
    cancelUpload() {
      this.$refs.bsUpload.abort();
    },
  },
};
</script>

<style scoped>
#bs-upload {
  width: auto;
  height: 95px;
  min-width: 500px;
  overflow: auto;
  background-color: #fff;
}

#bs-upload .ele-upload,
#bs-upload .el-button {
  float: left;
  height: 80px;
  margin-left: 10px;
}

#bs-upload .el-button {
  width: 120px;
  height: 40px;
  padding: 0;
  margin-top: 20px;
  text-align: center;
}

#bs-upload .el-icon-more::before {
  width: 120px;
  padding-right: 4px;
}

#elep-dialogs .imgs-box {
  width: 90%;
  height: 30%;
  margin-left: 5%;
}
.hide >>> .el-upload--picture-card {
  display: none;
}
</style>
