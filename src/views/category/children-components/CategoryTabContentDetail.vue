<template>
  <grid-view>
    <goods-list-item v-for="(item, index) in categoryDetail" :key="index" :item="item"></goods-list-item>
  </grid-view>
</template>

<script>
  import GridView from "@/components/common/grid-view/GridView";
  import GoodsListItem from "@/components/content/goods/GoodsListItem";
  export default {
    name: "CategoryTabContentDetail",
    components: {
      GridView,
      GoodsListItem
    },
    props: {
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
</style>
