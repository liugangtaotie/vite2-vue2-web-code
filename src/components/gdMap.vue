<template>
  <div class="gd-map">
    <div id="gd-container"></div>
    <div id="panel"></div>
  </div>
</template>

<script>
import { comTips, convertToBd, convertToGd } from "@API/api.ts";
export default {
  name: "gdMap",
  props: {
    mapId: {
      type: String,
      default: "gd-map",
    },
    mapWidth: {
      type: String,
      default: "100%",
    },
    mapHeight: {
      type: Number,
      default: 400,
    },
    // 经度
    longitude: {
      type: Number,
      default: 116.4035,
    },
    // 纬度
    latitude: {
      type: Number,
      default: 39.915,
    },
    // 检索内容
    indexCon: {
      type: String,
      default: "",
    },
    // 是否允许获取经纬度(点击触发时)
    canClick: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ysGdMap: null,
      // Index Content => Lng + Lat
      backMsgSer: {
        backLon: 0, // 经度
        backLat: 0, // 纬度
      },
      // Click Content => Lng + Lat
      backMsgCli: {
        backLon: 0,
        backLat: 0,
      },
      // Current Position => Lng + Lat
      backMsgNow: {
        backLon: 0,
        backLat: 0,
      },
    };
  },
  watch: {
    indexCon(vals) {
      this.searchContent(vals);
    },
  },
  mounted() {
    let gdMap = document.querySelector(".gd-map");
    gdMap.style.width = this.mapWidth + "px";
    gdMap.style.height = this.mapHeight + "px";
    this.initGdMap();
    if (this.canClick) {
      this.mapClick();
    }
  },
  beforeDestroy() {
    this.ysGdMap && this.ysGdMap.destroy();
  },
  methods: {
    initGdMap() {
      // Create & Init Map
      this.ysGdMap = new AMap.Map("gd-container", {
        zoom: 11,
        pitch: 80,
        zooms: [3, 20],
        rotation: -15,
        viewMode: "3D",
        pitchEnable: true,
        rotateEnable: true,
        resizeEnable: true,
        buildingAnimation: true,
        expandZoomRange: true,
        center: [116.397428, 39.90923],
      });

      this.ysGdMap.setDefaultCursor("pointer");

      this.ysGdMap.addControl(
        new AMap.Scale({
          visible: true,
        })
      );

      this.ysGdMap.addControl(
        new AMap.ToolBar({
          visible: true,
        })
      );

      this.ysGdMap.addControl(
        new AMap.ControlBar({
          showZoomBar: false,
          showControlButton: true,
          position: {
            right: "10px",
            top: "10px",
          },
        })
      );

      // Create ContextMenu
      const contextMenu = new AMap.ContextMenu();

      // Amplification
      contextMenu.addItem(
        "放大一级",
        () => {
          this.ysGdMap.zoomIn();
        },
        0
      );

      // Shrink
      contextMenu.addItem(
        "缩小一级",
        () => {
          this.ysGdMap.zoomOut();
        },
        1
      );

      // Nationwide Range
      contextMenu.addItem(
        "缩放至全国范围",
        (e) => {
          this.ysGdMap.setZoomAndCenter(4, [108.946609, 34.262324]);
        },
        2
      );

      // Bind Right Event
      var contextMenuPositon = null;
      this.ysGdMap.on("rightclick", (e) => {
        contextMenuPositon = e.lnglat;
        contextMenu.open(this.ysGdMap, e.lnglat);
      });

      // Add Marker
      contextMenu.addItem(
        "添加标记",
        (e) => {
          let marker = new AMap.Marker({
            map: this.ysGdMap,
            position: contextMenuPositon,
          });
        },
        3
      );

      setTimeout(() => {
        let cpyRg = document.querySelector(".gd-map .amap-copyright");
        cpyRg.style.bottom = "7px";
        cpyRg.innerText += "(xxxx标准版)";
        this.searchContent(this.indexCon);
      }, 1000);
    },

    searchContent(value = "北京大学") {
      var this_ = this;
      AMap.service(["AMap.PlaceSearch"], function () {
        // Constructor Address By Search Class
        let placeSearch = new AMap.PlaceSearch({
          pageSize: 5, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: "", // 兴趣点城市
          citylimit: true, // 是否强制限制在设置的城市内搜索
          map: this_.ysGdMap, // 展现结果的地图实例
          panel: "panel", // 结果列表将在此容器中进行展示。
          autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        placeSearch.search(value);

        // Get Longitude、Latitude
        let ysCenter = this_.ysGdMap.getCenter();
        // this_.backMsgSer.backLon = ysCenter.lng;
        // this_.backMsgSer.backLat = ysCenter.lat;
        let baidu = convertToBd(ysCenter.lng, ysCenter.lat);
        this_.backMsgSer.backLon = baidu.bd_lng.toString().substr(0, 15); //Math.round((baidu.bd_lng).toFixed(7)).toFixed(6);
        this_.backMsgSer.backLat = baidu.bd_lat.toString().substr(0, 15); //Math.round((baidu.bd_lat).toFixed(7)).toFixed(6);
        this_.receiveLonLat();
      });
    },

    mapClick() {
      var this_ = this;
      this.ysGdMap.on("click", function (e) {
        // this_.backMsgCli.backLon = e.lnglat.getLng();
        // this_.backMsgCli.backLat = e.lnglat.getLat();
        let baidu = convertToBd(e.lnglat.getLng(), e.lnglat.getLat());
        this_.backMsgCli.backLon = baidu.bd_lng.toString().substr(0, 15); //Math.round((baidu.bd_lng).toFixed(7)).toFixed(6);
        this_.backMsgCli.backLat = baidu.bd_lat.toString().substr(0, 15); //Math.round((baidu.bd_lat).toFixed(7)).toFixed(6);
        this_.$emit("receiveMsgCli", this_.backMsgCli);

        // this_.ysGdMap.convertFrom(e.lnglat.getLng(),e.lnglat.getLat(), 'baidu',(status,result)=>{
        //     console.log(result)
        // })
      });
    },

    receiveLonLat() {
      return this.backMsgSer;
    },
  },
};
</script>

<style scoped>
.gd-map {
  background-color: #fff;
  border-radius: 5px;
}

.gd-map #gd-container {
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  border-radius: 20px;
}

.gd-map #panel {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 220px;
  max-height: 44%;
  overflow-y: auto;
  text-align: left;
  background-color: white;
  border-radius: 20px;
}
</style>
