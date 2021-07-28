<template>
  <div class="back-to-top">
    <img src="~assets/img/back-top.png" alt="">
  </div>
</template>

<script>
export default {
  name: "BackToTop"
}
</script>

<style scoped>
  .back-to-top {
    position: fixed;
    right:4vw;
    bottom: 14vh;
    opacity: .7;
    z-index: 100;
  }
  .back-to-top img {
    width:50px;
    height:50px;
  }
</style>
