<template>
  <div id="tab-bar">
    <tab-bar>
      <tab-bar-item path="/home">
        <template #item-icon>
          <img src="~assets/img/tabbar/home.svg" alt="">
        </template>
        <template #item-icon-active>
          <img src="~assets/img/tabbar/home_active.svg" alt="">
        </template>
        <template #item-text>
          <div>首页</div>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <template #item-icon>
          <img src="~assets/img/tabbar/category.svg" alt="">
        </template>
        <template #item-icon-active>
          <img src="~assets/img/tabbar/category_active.svg" alt="">
        </template>
        <template #item-text>
          <div>分类</div>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <template #item-icon>
          <img src="~assets/img/tabbar/cart.svg" alt="">
        </template>
        <template #item-icon-active>
          <img src="~assets/img/tabbar/cart_active.svg" alt="">
        </template>
        <template #item-text>
          <div>购物车</div>
        </template>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <template #item-icon>
          <img src="~assets/img/tabbar/profile.svg" alt="">
        </template>
        <template #item-icon-active>
          <img src="~assets/img/tabbar/profile_active.svg" alt="">
        </template>
        <template #item-text>
          <div>我的</div>
        </template>
      </tab-bar-item>
    </tab-bar>
  </div>

</template>

<script>
  import TabBar from "@/components/common/tab-bar/TabBar";
  import TabBarItem from "@/components/common/tab-bar/TabBarItem";
export default {
  name: "MainTabBar",
  components:{
      TabBar,
      TabBarItem
    },
}
</script>

<style scoped>
  @import '~@/assets/css/base.css';
  #tab-bar {
    z-index: 100;
  }
  .tab-bar-item img {
    width:24px;
    height:24px;
    margin-top: 3px;
    vertical-align: middle;
  }
</style>
