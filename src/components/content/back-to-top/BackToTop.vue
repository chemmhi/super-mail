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
  .back-to-top img {
    position: fixed;
    right:4vw;
    bottom: 14vh;
    width:50px;
    height:50px;
    opacity: .7;
  }
</style>
