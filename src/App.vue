<template>
  <router-view v-slot="{ Component }">
    <keep-alive exclude="Details,Login,Register">
      <component :is=" Component " />
    </keep-alive>
  </router-view>

  <main-tab-bar/>
</template>

<script>
import MainTabBar from "@/components/content/tab-bar/MainTabBar";
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  data(){
    return {
      userName: null
    }
  },
  components: {
    MainTabBar
  },

}
</script>

<style>
  @import 'assets/css/base.css';
</style>
