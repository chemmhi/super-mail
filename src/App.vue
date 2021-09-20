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
import {fetchapi} from "network/request";
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
  methods:{
    checkState(){
      let cookie = {}
      document.cookie.split(';').forEach((k_v) => {
        const k_v_ls = k_v.split('=')
        cookie[k_v_ls[0].trim()] = k_v_ls[1]

      })
      if(cookie['isLogin']){
        fetchapi(`user/getDetails/`,{
          method: 'POST',
          body:JSON.stringify(cookie),
          headers:{'Access-Control-Allow-Origin': '*'},
          cache: 'no-store',
        }).then((response) => {
          return response.text()
        }).then((value) => {
          value = JSON.parse(value)
          if(value.status){
            const userName = value.data.userName
            this.$store.commit('setUserInfo', value.data)
            this.$store.commit('changeToLogin')
            this.$store.commit('setUserName', userName)
            let cart = value.data.cart ? Array.from(value.data.cart) : []
            this.$store.commit('loadingCart', cart)
          }
        })
      }
    }
  },
  created() {
    this.checkState()
  }
}
</script>

<style>
  @import 'assets/css/base.css';
</style>
