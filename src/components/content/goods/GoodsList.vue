<template>
  <div class="goods-list">
    <goods-list-item v-for="item in goodList" :item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";
export default {
  name: "GoodsList",
  components:{
    GoodsListItem
  },
  props:{
    goodList:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods-list {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding-top: 15px;
  }
</style>
