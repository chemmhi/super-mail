<template>
  <div class="counter">
    <button
    @click="item.count--"
    :disabled="isDisabled"
    class="button">-</button>
    <div class="count">{{item.count}}</div>
    <button
      @click="item.count++"
      class="button">+</button>
  </div>
</template>

<script>
export default {
  name: "Counter",
  props:{
    item:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  computed:{
    isDisabled(){
      return this.item.count === 1
    }
  }
}
</script>

<style scoped>
  .counter{
    display: flex;
    font-size: 1rem;
  }
  .button{
    outline: none;
    background-color: #fff;
    width: 1.5rem;
    font-weight: bold;
    border: 0;
  }
  .count{
    width:2rem;
    text-align: center;
    background-color: #f6f6f6;
    border-radius: 3px;
  }
</style>
