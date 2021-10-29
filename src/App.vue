<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view></router-view>
    </keep-alive>
    <router-view v-else></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "App",
})
export default class App extends Vue {
  private isFirst: Boolean = true;

  updated() {}

  created() {}
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 12px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nprogress .bar {
  height: 6px;
  background: #1dc499;
}
</style>
