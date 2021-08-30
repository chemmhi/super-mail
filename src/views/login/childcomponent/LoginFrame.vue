<template>
  <div>
    <div class="mask"></div>
    <div class="title">
      <slot name="top"></slot>
    </div>
    <div>
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginFrame"
}
</script>

<style scoped>
  .mask{
    background-color: white;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right:0;
    z-index: 100;
  }
  .title{
    font-size: 20px;
    font-weight: 600;
    color: #444444;
    height: 80px;
    text-align: center;
    line-height: 80px;
    width: 100%;
    margin-bottom: 20px;
    position: relative;
    z-index: 101;
    background-color: #f0f0f0;
  }
</style>
