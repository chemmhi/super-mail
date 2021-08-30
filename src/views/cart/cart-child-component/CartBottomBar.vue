<template>
  <div class="bottom-bar">
    <div class="select-all">
      <check-button
        class="cart-check-btn"
        :is-checked="isSelectAll"
        @click="selectAll"/>
      <span>全选</span>
    </div>
      <div v-if="canBeEdit">
        <span>合计:</span>
        <span>{{totalPrice}}</span>
      </div>
      <bottom-button v-if="canBeEdit">
        <div>去计算({{ totalPrice }})</div>
      </bottom-button>
    <bottom-button v-else class="delete" @click="deleteItem">
        <div >删除</div>
    </bottom-button>
  </div>
</template>

<script>
  import CheckButton from "@/views/cart/cart-child-component/CheckButton";
  import BottomButton from "./BottomButton";
  import {mapGetters} from 'vuex'
export default {
  name: "CartBottomBar",
  components:{
    CheckButton,
    BottomButton,
  },
  props:{
    canBeEdit:{
      type: Boolean,
      default(){
        return true
      }
    }
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
    deleteItem(){
      this.$store.commit('deleteItem')
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
  .delete{
    width: 60px;
  }
</style>
