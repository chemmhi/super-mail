<template>
  <div class="bottom-bar">
    <div class="select-all">
      <check-button
        class="cart-check-btn"
        :is-checked="isSelectAll"
        @click="selectAll"/>
      <span>全选</span>
    </div>
    <div>
      <span>合计:</span>
      <span>{{totalPrice}}</span>
    </div>
    <div class="to-calculate">去计算({{count}})</div>
  </div>
</template>

<script>
  import CheckButton from "@/views/cart/cart-child-component/CheckButton";
  import {mapGetters} from 'vuex'
export default {
  name: "CartBottomBar",
  components:{
    CheckButton,
  },
  computed:{
    ...mapGetters(['cartList']),
    totalPrice(){
      return "¥" + this.cartList.filter(item=>
        item.isChecked
      ).reduce((preValue,item)=>preValue+item.price*item.count,0).toFixed(2)
    },
    count(){
      return this.cartList.filter(item=>item.isChecked).length
    },
    isSelectAll(){
      if(!this.cartList.length) return false
      return !this.cartList.find(item=>!item.isChecked)
    },
  },
  methods:{
    selectAll(){
      if(this.isSelectAll){
        this.cartList.forEach(item=>item.isChecked = false)
      }else{
        this.cartList.forEach(item=>item.isChecked = true)
      }
    },
  }
}
</script>

<style scoped>
  .bottom-bar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-tint);
    position: relative;
    bottom: 0;
    height: 40px;
    font-size: .9rem;
    padding: 0 .6rem 0 .6rem;
    color: var(--color-high-text);
  }
  .cart-check-btn{
    display: inline-block;
  }
  .select-all{
    line-height: 25px;
  }
  .to-calculate{
    background-color: #ff0036;
    color: #fff;
    height: 30px;
    width: 90px;
    line-height: 30px;
    border-radius: 15px;
    text-align: center;
  }
</style>
