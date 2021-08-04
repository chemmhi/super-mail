<template>
  <div class="cart-item">
    <check-button
      @click="itemCheck"
      ref="checkBtn"
      :is-checked="item.isChecked"/>
    <div class="item-image">
      <img :src="item.image" alt="">
    </div>
    <div class="info">
      <p class="title" >{{item.title}}</p>
      <p class="desc">{{item.desc}}</p>
      <div class="price-count">
        <p class="price">¥{{item.price}}</p>
        <counter :item="item"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Counter from "@/components/content/counter/Counter";
  import CheckButton from "@/views/cart/cart-child-component/CheckButton";

  export default {
    name: "CartItem",
    props:{
      item:{
        type: Object,
        default(){
          return {}
        }
      }
    },
    components:{
      Counter,
      CheckButton,
    },
    methods:{
      itemCheck(){
        this.item.isChecked = !this.item.isChecked
      },
    }
  }
</script>

<style scoped>
  .cart-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    height: 20vh;
    padding: .5rem .6rem .5rem .6rem;
    border-bottom: 1px solid #dfdfdf;
    /*margin-top: .5rem;*/
  }
  .item-image{
    height: 100%;
    width: 25%;

  }
  .item-image img{
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .info{
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /*align-content: space-around;*/
    justify-content: space-between;
    /*align-content: space-between;*/
  }

  .price-count{
    display: flex;
    justify-content: space-around;
  }
  .info p{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .price{
    font-weight: bold;
  }
  .desc{
    font-size: .8rem;
  }
</style>
