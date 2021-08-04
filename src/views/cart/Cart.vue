<template>
  <div id="cart">
    <nav-bar class="cart-nav-bar">
      <template v-slot:center>
        <div>购物车({{itemCount}})</div>
      </template>
    </nav-bar>
    <scroll class="cart-scroll" ref="cartScroll">
      <cart-item-list/>
    </scroll>
    <cart-bottom-bar />

  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartItemList from "@/views/cart/cart-child-component/CartItemList";
import Scroll from "@/components/common/scroll/Scroll";
import CartBottomBar from "@/views/cart/cart-child-component/CartBottomBar";

import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  components:{
    NavBar,
    CartItemList,
    Scroll,
    CartBottomBar,
  },
  computed:{
    ...mapGetters(['itemCount'])
  },
  activated() {
    this.$refs.cartScroll.refresh()
  },

}
</script>

<style scoped>
  #cart{
    height: 100vh
  }
  .cart-nav-bar{
    background-color: var(--color-tint);
    font-weight: bold;
  }
  .cart-scroll{
    height: calc(100vh - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>
