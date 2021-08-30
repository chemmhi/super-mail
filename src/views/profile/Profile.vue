<template :key="1">
  <div id="profile">
    <nav-bar class="nav-bar">
      <template #center>我的档案</template>
    </nav-bar>
    <user-info>
      <template v-slot:user-nickname v-if="state">
        <div>{{userInfo.userName}}</div>
      </template>
      <template #user-phone v-if="state">
        <div>{{userInfo.phoneNumber}}</div>
      </template>
    </user-info>

    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">{{ balance }}</span>
        </div>
        <div class="account-info">余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">{{ coupon }}</span>
        </div>
        <div class="account-info">优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">{{ coinPoint }}</span>
        </div>
        <div class="account-info">积分</div>
      </div>
    </section>

    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>
  </div>
</template>

<script>
  import UserInfo from "@/views/profile/children-components/UserInfo";
  import ListView from "@/views/profile/children-components/ListView";
  import NavBar from "@/components/common/navbar/NavBar";
	export default {
		name: "Profile",
    components: {
		  NavBar,
      UserInfo,
      ListView,
    },
    data: function () {
		  return {
		    orderList: [
          {src: require('@/assets/img/profile/message.svg'), info: '消息'},
          {src: require('@/assets/img/profile/coins.svg'), info: '积分商城'},
          {src: require('@/assets/img/profile/crown.svg'), info: '会员卡'},
        ],
        serviceList: [
          {src:require('@/assets/img/profile/cart.svg'), info: '购物车'},
          {src:require('@/assets/img/profile/bag.svg'), info: '下载购物APP'},
        ],
        userInfo: null,
        state: false
      }
    },
    mounted: function () {
		  this.emitter.on('loginSuccess',(value)=>{
          this.userInfo = value
          this.state = true
      })
    },
    computed:{
		  balance(){
		    return this.state ? Number(this.userInfo.countBalance).toFixed(2) : Number(null).toFixed(2)
      },
      coupon(){
		    return this.state ? Number(this.userInfo.coupon) : 0
      },
      coinPoint(){
		    return this.state ? Number(this.userInfo.coinPoint) : 0
      }
    }
	}
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
  }
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: bold;
    color: black;
  }
  .account {
    display: flex;
  }
  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }
  .account-item:last-of-type {
    margin-right: 0;
  }
  .account-item {
    color: var(--color-high-text);
    font-size: 13px;
    padding: 18px;
  }
  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: black;
  }
  .account-info {
    margin-top: 6px;
  }
  .order-list, .service-list {
    margin-top: 12px;
  }
</style>
