<template>
  <div v-show="isShow" class="detail-toast">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props:{
    isShow: false,
    message: '',
  },

}
</script>

<style scoped>
  .detail-toast{
    position: fixed;
    top: 50%;
    left: 50%;
    padding: .8rem .6rem;
    background-color: rgba(0,0,0,.7);
    color: white;
    transform: translate(-50%,-50%);
    border-radius: 10px;
    z-index: 1000;
  }

</style>
