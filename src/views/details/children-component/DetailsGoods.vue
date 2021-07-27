<template>
  <div>
    <p>{{ goods.title }}</p>
    <span>{{ goods.newPrice }}</span>
    <span> {{ goods.oldPrice }} </span>
    <span v-if="goods.discount"> {{goods.discount }} </span>
  </div>
  <div>
<!--    <div v-for="item in goods.columns"> {{item}}</div>-->
<!--    <div> {{goods.columns[0]}} </div>-->
<!--    <div> {{goods.columns[1]}}</div>-->
  </div>
<!--  <div v-for="item in goods.services.slice(0,2)"> {{item.name}} </div>-->
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
  }
}
</script>

<style scoped>

</style>
