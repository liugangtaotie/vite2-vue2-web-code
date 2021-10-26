<template>
  <div>
    <iframe style="width: 100%; height: 90vh" :src="url" frameborder="0"></iframe>
  </div>
</template>

<script>
import { filterUrl } from "@ASS/js/filters";
export default {
  name: "iframeCom",
  props: ["type", "pageName"],
  data() {
    return {
      iframe: null,
      publicParams: {
        accessToken: sessionStorage.getItem("accessToken"),
      },
      baseUrl: "",
      url: "",
    };
  },
  mounted() {
    switch (this.type) {
      case "onlineConsult":
        this.baseUrl = this.$cfg.onlineConsultUrl;
        this.pagePath = filterUrl.filterOnlineConsult(this.pageName);
        break;
    }
    let randomNumber = Math.floor(Math.random() * 100000);
    const pagePath = this.baseUrl + "/#" + this.pagePath + "?";
    this.url =
      pagePath +
      "sparamstr=" +
      JSON.stringify(this.publicParams) +
      "&&randomNumber=" +
      randomNumber;
  },
  methods: {},
};
</script>
