<template>
  <div id="cart">
    <nav-bar class="cart-nav-bar">
      <template v-slot:center>
        <div>购物车({{itemCount}})</div>
      </template>
      <template v-slot:right  >
        <div class="edit" @click="editCart">{{ edit }}</div>
      </template>
    </nav-bar>
    <scroll class="cart-scroll" ref="cartScroll">
      <cart-item-list/>
    </scroll>
    <cart-bottom-bar :can-be-edit="canBeEdit"/>

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
    ...mapGetters(['itemCount']),
    edit(){
      return this.canBeEdit ? '管理' : (!this.canBeEdit ? ' 完成': '')
    }
  },
  data(){
    return {
      canBeEdit: true
    }
  },
  methods:{
    updateCart(){
      let data = {
        userName: this.$store.state.userName,
        cart: this.$store.state.cartList,
      }
      navigator.sendBeacon('http://127.0.0.1:8001/user/updatecart/',JSON.stringify(data))
    },
    editCart(){
      this.canBeEdit = !this.canBeEdit

    },
  },
  activated() {
    this.$refs.cartScroll.refresh()
    this.updateCart()
  },
  deactivated() {
    this.updateCart()
  }

}
</script>

<style scoped>
  #cart{
    height: 100vh;

  }
  .cart-nav-bar{
    background-color: var(--color-tint);
    font-weight: bold;
  }
  .cart-scroll{
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
  .edit{
    font-weight: normal;
    font-size: 13px;
  }
</style>
