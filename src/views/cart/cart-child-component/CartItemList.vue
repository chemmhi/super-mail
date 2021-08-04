<template>
  <div class="cart-list">
    <cart-item v-for="(item,index) in cartItemList"  :item="item" :key="index"/>
  </div>
</template>

<script>
  import CartItem from "@/views/cart/cart-child-component/CartItem";
export default {
  name: "CartItemList",
  components:{
    CartItem,
  },
  computed:{
    cartItemList(){
      return this.$store.state.cartList
    }
  }
}
</script>

<style scoped>
  .cart-list{
    margin-top: .5rem;
  }
</style>
