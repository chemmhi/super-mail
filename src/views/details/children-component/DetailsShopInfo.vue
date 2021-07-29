<template>
	<div class="detail-shop-info" v-if="Object.keys(shop).length !== 0">
		<div class="shop-name-info">
			<img :src="shop.logo" alt="" class="shop-img">
			<div>{{shop.name}}</div>
		</div>
		<div class="shop-other-info">
			<div class="shop-other-sell">
				<div>
					<p class="f16">{{saveNum(shop.sells)}}</p>
					<p>总销量</p>
				</div>
				<div>
					<p class="f16">{{shop.goodsCount}}</p>
					<p>全部宝贝</p>
				</div>
			</div>
			<div class="shop-other-right">
				<div v-for="item in shop.score">
					{{item.name}}&ensp;
					<span class="score" :class="{active:item.isBetter}">{{item.score}}</span>
					<span class="score-bg" :class="{active:item.isBetter}">{{item.isBetter? '高' : '低'}}</span>
				</div>
			</div>
		</div>
		<div class="enter-shop-wrap">
			<div class="enter-shop">进店逛逛</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DetailsShopInfo',
		props: {
			shop: {
				type: Object,
				default() {
					return {}
				}
			}
		},

		computed: {
			saveNum(){
				return (value)=>{
				  if(value < 10000) return value;
				  return (value/10000).toFixed(1)+'万'
        }
			}
		}
	}
</script>

<style scoped>
  .f16 {
    font-size: 1rem;
  }
	.detail-shop-info {
    background-color: #fff;
  }
	.shop-name-info {
    display: flex;
		align-items: center;
		margin: 1.1rem 0.8rem .5rem;
	}
  .shop-name-info .shop-img {
    border-radius: 100%;
    width: 50px;
    height: 50px;
    margin-right: 10px;
    vertical-align: middle;
  }
	.shop-other-info {
    font-size: 12px;
    display: flex;
    align-items: center;
    line-height: 22px;
  }
  .shop-other-sell {
    border-right: 1px solid rgba(100,100,100,.2);
    display: flex;
    flex: 1;
  }
  .shop-other-sell div {
    flex: 1;
    text-align: center;
  }
  .shop-other-right {
    flex: 1;
    padding-left: 40px;
  }
  .score {
    display: inline-block;
    width: 30px;
    color: #006666;
  }
  .active{
    color: #880000;
  }

  .score-bg {
    background-color: #006666;
    color: #fff;
    padding: 1px 4px;
    font-size: 12px;
  }
  .score-bg.active{
    background-color: #880000;
  }
	.enter-shop-wrap{
		text-align: center;
	}
  .enter-shop {
    display: inline-block;
    background-color: #f2f2f2;
    font-size: 12px;
    padding: 6px 30px;
    border-radius: 100px;
    margin: 10px;
		}

</style>
