<template :key="2">
    <login-frame>
      <template #top>
        <div>登录</div>
      </template>
    </login-frame>
    <form id="form1" name="form1" :action="formUrl" class="form1" method="post">
      <form-item>
        <label for="loginUserName" id="forLoginUserName">用户名</label>
        <input type="text" id="loginUserName" placeholder="请输入用户名" name="loginUserName">
      </form-item>
      <form-item>
        <label for="pwd" id="forPwd">密码</label>
        <input type="password" id="pwd" placeholder="请输入密码" name="pwd">
      </form-item>
      <form-item>
        <label for="loginCode" id="forLoginCode">验证码</label>
        <div class="verify-container">
          <input type="text" id="loginCode" placeholder="验证码" name="loginCode">
          <img use-credentials="true"
               id="loginImg"
               alt="" @click="imgChange">
        </div>
      </form-item>
      <form-item class="other">
        <div class="left">
          <input type="checkbox" name="freeLogin" value="yes">
          <span class="">一个月内免登录</span>
        </div>
        <span class="forget">忘记密码?</span>
      </form-item>
      <form-item class="button">
        <button type="submit">登录</button>
        <span @click="switchState">>>去注册?</span>
      </form-item>
    </form>
</template>

<script>
import FormItem from "./childcomponent/FormItem";
import LoginFrame from "./childcomponent/LoginFrame";
import {fetchapi,baseUrl} from "network/request";

export default {
  name: "Login",
  components:{
    FormItem,
    LoginFrame,
  },
  data(){
    return {
      isUserName: false,   //用来验证用户是否可以提交
      url: baseUrl
    }
  },
  methods:{
    switchState(){
      this.$router.push('/register')
    },
    getImgUrl(event){
      const imgEl = event.target ? event.target : event
      fetchapi('user/verifycode/img/',{
        cache: 'no-store',
      }).then((response) => response.blob())
      .then((value) => imgEl.src = window.URL.createObjectURL(value) )
    },
    imgChange(event){
      this.getImgUrl(event)
    },
    handle(event){
      let userName = event.target
      let payload = {
        userName: userName.value
      }
      fetchapi('user/username/validation/',{
          method:'POST',
          cache: 'no-store',
          body: JSON.stringify(payload)
        })
        .then((response)=>{
             return response.text()
        })
        .then((val)=>{
        val = JSON.parse(val)
        let usernameLabel = document.getElementById('forLoginUserName')
            if(val.isExistence){
              usernameLabel.innerText = '用户名'
              usernameLabel.style.color = ''
              this.isUserName = true
              }else{   //说明服务器里没有数据
                usernameLabel.innerText = '用户名不存在,去注册？'
                usernameLabel.style.color = 'red'
              }
          })
        },
  },
  computed:{
    currentState(){
      return this.state === 'login'? '登录' : (this.state === 'register'? '注册' : '登录')
    },
    reverseCurrentState(){
      return this.state === 'login'? '注册' : (this.state === 'register'? '登录' : '登录')
    },
    formUrl(){
      return this.url + 'user/login/'
    }
  },
  mounted() {
    let imgEl = document.getElementById('loginImg')
    this.getImgUrl(imgEl)
    let form = document.getElementById('form1')
    let forPwdEl = document.getElementById('pwd')
    let labelForPwdEl = document.getElementById('forPwd')
    form.loginUserName.addEventListener('change',this.handle)
    form.loginUserName.addEventListener('blur',this.handle)
    forPwdEl.addEventListener('blur',(e)=>{
      e.target.style.borderColor = ''
      labelForPwdEl.innerText = '密码'
      labelForPwdEl.style.color = ''
    })
    forPwdEl.addEventListener('change',(e)=>{
      e.target.style.borderColor = ''
      labelForPwdEl.innerText = '密码'
      labelForPwdEl.style.color = ''
    })
    form.addEventListener('submit', (e)=>{
      if(this.isUserName){
        let form = e.target
        let url = form.action
        let newForm = new FormData(form)
        let obj = Object.fromEntries(newForm.entries())  //将formData数据转换为普通的对象格式，这一步很重要
        let forLoginCode = document.getElementById('forLoginCode')
        fetch(url,{
            method:'POST',
            cache: "no-store",
            body: JSON.stringify(obj),
            // credentials: 'include',
            // mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then((response)=>{
            return response.text()})
            .then((value)=>{
              value = JSON.parse(value)
              if(value.status){  //说明请求到了数据
                this.$store.commit('setUserInfo', value.data)
                this.$store.commit('changeToLogin')
                const userName = value.data.userName
                const t_id = value.data['t_id']
                const c_id = value.data['c_id']
                this.$store.commit('setUserName', userName)
                let cart = value.data.cart ? Array.from(value.data.cart) : []
                this.$store.commit('loadingCart', cart)
                this.$router.push('/profile')
                document.cookie = `UserName=${userName}; max-age= 2592000`
                document.cookie = `t_id=${t_id}; max-age= 2592000`
                document.cookie = `c_id=${c_id}; max-age= 2592000`
                document.cookie = `isLogin=true; max-age= 2592000`
              }else if(value.msg === '密码错误'){
                forPwdEl.style.borderColor = 'red'
                labelForPwdEl.innerText = '密码错误'
                labelForPwdEl.style.color = 'red'
                forLoginCode.innerText = '验证码'
                forLoginCode.style.color = ''
                this.imgChange({target: document.getElementById('loginImg')})
              }else{
                forLoginCode.innerText = '验证码错误'
                forLoginCode.style.color = 'red'
                this.imgChange({target: document.getElementById('loginImg')})
              }
          })
      }
      e.preventDefault()
})
  }
}
</script>

<style scoped>
  #form1{
    position: relative;
    z-index: 101;
    overflow: hidden;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    width: 250px;
    margin-top: 30px;
    padding-bottom: 30px;
    border: solid #5555 1px;
    align-content: space-evenly;
    -webkit-align-content: space-around;
    flex-direction: column;
    justify-content: space-evenly;
    flex-wrap: wrap;
    font-size: 14px;
  }
  #form1 label{
    display: block;
  }
  .form1 input{
    height: 28px;
    padding-left: 10px;
    margin-top: 5px;
    font-size: 13px;
  }

  .left{
    display: flex;
    align-items: center;
    font-size: 13px;
    margin-right: 30px;
  }
  .left input{
    margin: 0 5px 0 0;
    width: 14px;
    height: 14px;
  }
  .other{
    height: 30px;
    line-height: 30px;
  }
  .other .forget{
    font-style: italic;
  }

  .button{
    place-self: center;
  }
  .button button{
    height: 28px;
    width: 46px;
    margin-right: 30px;
  }
  .button span{
    font-style: italic;
  }
  #loginCode{
    width: 80px;
  }
  .verify-container{
    display: flex;
    align-items: center;
  }
  .form1 div img{
    width: 80px;
    height: 28px;
    margin-top: 5px;
  }
</style>
