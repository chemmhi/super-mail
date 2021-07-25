<template>
  <div class="wrap">
    <ul class="list">
      <slot name="item"></slot>
    </ul>
    <ul class="point-list">
      <slot name="point"></slot>
    </ul>
    <slot name="btn"></slot>
  </div>
</template>

<script>


export default {
  name: "Swiper"
}
</script>

<style scoped>
  .wrap {
    width:100%;
    height:200px;
    position: relative;
  }
  .list {
        list-style: none;
        position: relative;
        margin: 0;
        padding: 0;
    }
  .point-list {
      padding: 0;
      margin: 0;
      list-style: none;
      position: absolute;
      bottom: 20%;
      right:20% ;
      z-index: 100;
      display:flex;
      justify-content: space-between;
      width:200px;
  }




</style>
