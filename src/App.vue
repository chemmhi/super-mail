<template>
  <router-view></router-view>
<!--  <router-link></router-link>-->
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
