<template>
  <div id="bs-map">
    <div id="map-box"></div>
  </div>
</template>

<script>
import { comTips } from "@API/api.ts";
export default {
  name: "baiDuMapV3",
  props: {
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

    // 获取经纬度(clickEvent)
    getClickMsg: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // 根据检索内容/点击事件返回信息
      backMsgSer: {
        backLon: 0, // 经度
        backLat: 0, // 纬度
      },
      // 根据点击事件返回经纬度信息
      backMsgCli: {
        backLon: 0,
        backLat: 0,
      },
      // 根据当前定位返回所在经纬度
      backMsgNow: {
        backLon: 0,
        backLat: 0,
      },
    };
  },
  watch: {
    indexCon(vals) {
      this.baiduMap();
    },
  },
  mounted() {
    let bsMap = document.querySelector("#bs-map");
    bsMap.style.width = this.mapWidth + "px";
    bsMap.style.height = this.mapHeight + "px";
    this.baiduMap();
  },
  methods: {
    // 初始地图(Async Load)
    loadJScript() {
      // var script = document.createElement("script");
      // 	script.type = "text/javascript";
      // 	// script.src = `http://api.map.baidu.com/api?v=3.0&ak=${comApi.MAPKEYS}&callback=init`;
      // 	script.src = `http://api.map.baidu.com/api?v=3.0&ak=${comApi.MAPKEYS}`;
      // 	document.body.appendChild(script);
    },

    // 百度地图API(定位/检索)
    baiduMap() {
      let this_ = this;
      setTimeout(() => {
        // Map Init
        var map = new BMap.Map("map-box");
        var local = new BMap.LocalSearch(map, {
          renderOptions: { map: map },
        });

        // Map Center Set
        map.centerAndZoom(new BMap.Point(116.4035, 39.915), 8);

        // Map Control
        map.addControl(
          new BMap.MapTypeControl({
            mapTypes: [
              BMAP_NORMAL_MAP,
              BMAP_HYBRID_MAP,
              // BMAP_SATELLITE_MAP
            ],
          })
        );

        // Map SetZoom And WheelZoom
        setTimeout(function() {
          map.setZoom(14);
        }, 2000);
        map.enableScrollWheelZoom(true);

        // Search Content
        setTimeout(() => {
          local.search(this.indexCon);
          // 覆盖区域图层测试
          map.addTileLayer(new BMap.PanoramaCoverageLayer());
          var stCtrl = new BMap.PanoramaControl();
          stCtrl.setOffset(new BMap.Size(10, 36));
          map.addControl(stCtrl);

          // 获取经纬度(根据检索值)
          local.setSearchCompleteCallback(function(searchResult) {
            let poi = searchResult.getPoi(0);
            if (poi != undefined) {
              this_.backMsgSer.backLon = poi["point"].lng;
              this_.backMsgSer.backLat = poi["point"].lat;
              this_.receiveLonLat();
              // 创建标注
              var marker = new BMap.Marker(poi["point"].lng, poi["point"].lat);
              map.addOverlay(marker); // 将标注添加到地图中
              marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            }
          });
        }, 500);

        // 点击获取经纬度
        if (this_.getClickMsg) {
          map.addEventListener("click", function(e) {
            this_.backMsgCli.backLon = e.point.lng;
            this_.backMsgCli.backLat = e.point.lat;
            this_.$emit("receiveMsgCli", this_.backMsgSer);
          });
        }
      }, 500);
    },

    receiveLonLat() {
      return this.backMsgSer;
    },
  },
};
</script>

<style scoped>
#bs-map {
  background-color: #fff;
  border-radius: 5px;
}

#bs-map #map-box {
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  border-radius: 20px;
}
</style>
