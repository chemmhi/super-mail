<template>
  <div class="check" :class="{active: isChecked}">
    <img src="~assets/img/cart/check.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props:{
    isChecked:{
      type: Boolean,
      default(){
        return false
      }
    }
  },

}
</script>

<style scoped>
  .check{
    border-radius: 50%;
    border: 2px solid var(--color-high-text);
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
  }
  .check img{
    width: 15px;
    height: 15px;
  }
  .active{
    background-color: var(--color-high-text);
  }
</style>
