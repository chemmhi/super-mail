<template>
  <div id="user-info" >
    <a href="#" class="info-bar">
      <div class="icon-info">
        <slot name="user-icon">
          <div class="user-icon">
            <input type="file" class="profile-picture" @change="changeProfile" @click="profileClick">
            <img :src="profileUrl" alt="" id="profile-img">
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
  import {fetchapi, baseUrl} from "network/request";

  export default {
		name: "UserInfo",
    data(){
		  return {
		    imgurl: require('assets/img/profile/user.svg')
      }
    },
    methods:{
		  login(e){
        if(!this.$store.state.isLogin){
          this.$router.push({
            path: '/login'
          })
        }
      },
      logout(){
		    document.cookie = 'isLogin='
		    this.$store.state.isLogin = false
		    this.$store.state.cartList = []
		    this.$store.state.userInfo = null
        location.reload()
      },
      changeProfile(e){
        const imgEl = document.getElementById('profile-img')
        const url = window.URL.createObjectURL(e.target.files[0])
        console.log('success');
        imgEl.src = url
        const formData = new FormData()
        formData.append('image', e.target.files[0])
        formData.append('userName', this.$store.state.userName)
        fetchapi('user/putProfileImg/',{
          method: 'POST',
          body: formData
        })
          // .then((response) => response.text() )
          // .then((value) => console.log('ok'))
      },
      profileClick(e){
		    if(!this.$store.state.isLogin){
		      e.preventDefault()
		      this.$router.push({
            path:'/login'
          })
        }
      }
    },
    computed:{
		  profileUrl(){
		    if(this.$store.state.isLogin && this.$store.state.userInfo.profileImgUrl){
          return baseUrl + this.$store.state.userInfo.profileImgUrl;
        }else{
		       return this.imgurl
        }
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
    position: relative;
  }
  .profile-picture{
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    opacity: 0;
  }
  #profile-img{
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
