<template>
    <div v-if="Object.keys(goods).length !== 0" class="goods-info">
      <div class="title-info">
        <p>{{ goods.title }}</p>
        <div class="price">
          <span>{{ goods.newPrice }}</span>
          <span> {{ goods.oldPrice }} </span>
          <span v-if="goods.discount"> {{goods.discount }} </span>
        </div>
      </div>
      <div class="columns">
        <div v-for="item in goods.columns"> {{item}} </div>
      </div>
      <div class="services">
        <div v-for="index in goods.services.length" :key="index" class="services-items">
          <img :src="goods.services[index-1].icon" alt="">
          <span> {{goods.services[index-1].name }} </span>
        </div>
      </div>
    </div>

</template>

<script>
export default {
  name: "DetailsGoods",
  props:{
    goods:{
      type:Object,
      default (){
        return {}
      }
    },
  },
  data(){
    return {

    }
  },

}
</script>

<style scoped>

  .title-info {
    padding: 1rem .6rem 0 .6rem;
    font-size: 1rem;
  }
  .title-info p{
    padding-bottom: .6rem;
    /*border-bottom: 1px solid rgba(100,100,100,.2);*/
  }
  .price {
    text-align: left;
    height: 2rem;
    margin-top: .5rem;
  }
  .price span {
    line-height: 1.8rem;
  }

  .price span:nth-child(1) {
    font-size: 1.3rem;
    color: black;
    font-weight: bold;
  }
  .price span:nth-child(2) {
    /*font-style: italic;*/
    font-style: oblique;
    margin-left: .4rem;
    text-decoration: line-through;
    color: var(--color-high-text);
  }
  .price span:nth-child(3) {
    background-color: var(--color-high-text);
    color: #fff;
    border-radius: 18px;
    padding-left: .3em;
    padding-right: .3em;
    font-size: .8rem;
    margin-left: .2rem;
  }
  .columns {
    display: flex;
    justify-content: space-between;
    padding: .5rem .6rem .5rem .6rem;
    font-size: .8rem;
    border-bottom: 1px solid rgba(100,100,100,.2);
  }
  .services {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: .8rem;
    height: 4rem;
    padding: .5rem .6rem 0.5rem .6rem;
    border-bottom: 5px solid rgba(100,100,100,.2);
  }
  .services img{
    height: 1rem;
    width: 1rem;
  }
  .services-items {
    display: flex;
    align-items: center;
    width: 7rem;
  }
</style>
