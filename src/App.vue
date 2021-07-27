<template>
  <router-view v-slot="{ Component }">
    <keep-alive exclude="Details">
      <component :is=" Component " />
    </keep-alive>
  </router-view>

  <main-tab-bar/>
</template>

<script>
import MainTabBar from "@/components/content/tab-bar/MainTabBar";
export default {
  name: 'App',
  data(){
    return {

    }
  },
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import '~assets/css/base.css';

</style>
