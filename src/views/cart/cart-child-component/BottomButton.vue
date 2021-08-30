<template>
  <div class="button">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BottomButton"
}
</script>

<style scoped>
  .button{
    background-color: #ff0036;
    color: #fff;
    height: 30px;
    width: 90px;
    line-height: 30px;
    border-radius: 15px;
    text-align: center;
  }
</style>
