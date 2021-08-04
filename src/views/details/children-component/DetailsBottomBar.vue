<template>
	<div class="bot-bar-wrap">
		<div class="bot-bar-item">
			<p><img src="~assets/img/details/headset.svg" alt=""></p>
			<p>客服</p>
		</div>
		<div class="bot-bar-item">
			<p><img src="~assets/img/details/store.svg" alt=""></p>
			<p>店铺</p>
		</div>
		<div class="bot-bar-item" @click="collectClick">
			<p v-if="!collectActive">
        <img src="~assets/img/details/star-regular.svg" alt="" >
      </p>
			<p v-else >
        <img src="~assets/img/details/star-solid.svg" alt="" >
      </p>
			<p>收藏</p>
		</div>
		<div class="btn cart-btn" @click="addToCart">加入购物车</div>
		<div class="btn buy-btn">购买</div>
	</div>
</template>

<script>
	export default {
		name: "DetailsBottomBar",
		methods: {
			addToCart() {
				this.$emit('addToCart')
			},
      collectClick(){
			  this.collectActive = !this.collectActive;
      },
		},
    data(){
		  return {
		    collectActive: false
      }
    }
	}
</script>

<style scoped>
	.bot-bar-wrap {
    display: flex;
		height: 49px;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
	}
  .bot-bar-item {
			width: 16%;
			font-size: 12px;
			color: #333;
			text-align: center;
		}
  .bot-bar-item img{
    width: 22px;
    height: 22px;
    margin: 4px 0;
    vertical-align: middle;
    }
  .btn {
    width: 26%;
    font-size: 13px;
    line-height: 49px;
    text-align: center;
  }
  .cart-btn {
    background-color: #dedede;
    line-height: 49px;
  }
  .buy-btn {
    color: black;
    background-color: #debc80;
  }
</style>
