<template>
  <div id="user-info" >
    <a href="#" class="info-bar">
      <div class="icon-info">
        <slot name="user-icon">
          <div class="user-icon">
            <img src="~assets/img/profile/user.svg" alt="" >
          </div>
        </slot>
        <div class="login-info" v-on:click="login">
          <slot name="user-nickname">
            <div>登录/注册</div>
          </slot>
          <div class="phone">
            <span>
              <img src="~assets/img/profile/mobile.svg" alt="">
            </span>
            <slot name="user-phone">暂无绑定手机号</slot>
          </div>
        </div>
      </div>
      <div class="arrow" @click="logout"></div>
    </a>
  </div>
</template>

<script>
	export default {
		name: "UserInfo",
    methods:{
		  login(e){
        if(!this.$store.state.isLogin){
          this.$router.push({
            path: '/login'
          })
        }
      },
      logout(){
		    this.$store.state.isLogin = false
		    this.$store.state.cartList = []
		    this.$store.state.userInfo = null
        location.reload()
      }
    }
	}
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }
  .info-bar{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .user-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .icon-info {
    display: flex;
    align-items: center;
  }
  #user-info .arrow {
    width: 15px;
    height: 15px;
    margin: 18px;
    font-size: 1.4rem;
    border-right: #999999 solid 3px;
    border-bottom: #999999 solid 3px;
    transform: rotateZ(-45deg);
    color: #999;
  }
  #user-info .login-info {
    font-size: .8rem;
    margin: 10px 0 0 10px;
  }
  #user-info .login-info .phone {
    position: relative;
    font-size: .7rem;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
    line-height: 1.2rem;
  }
  #user-info .login-info .phone img {
    position: absolute;
    width: 12px;
    height: 18px;
    left: -15px;
    top: 0;
  }
</style>
