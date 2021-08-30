<template :key="2">
    <login-frame>
      <template #top>
        <div>登录</div>
      </template>
    </login-frame>
    <form id="form1" name="form1" action="http://127.0.0.1:8001/user/login/" class="form1" method="post">
      <form-item>
        <label for="loginUserName" id="forLoginUserName">用户名</label>
        <input type="text" id="loginUserName" placeholder="请输入用户名" name="loginUserName">
      </form-item>
      <form-item>
        <label for="pwd">密码</label>
        <input type="password" id="pwd" placeholder="请输入密码" name="pwd">
      </form-item>
      <form-item>
        <label for="loginCode" id="forLoginCode">验证码</label>
        <div class="verify-container">
          <input type="text" id="loginCode" placeholder="验证码" name="loginCode">
          <img use-credentials="true"
               src="http://127.0.0.1:8001/user/verifycode/img"
               alt="" @click="imgChange">
        </div>
      </form-item>
      <form-item class="other">
        <div class="left">
          <input type="checkbox" name="freelogin">
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
export default {
  name: "Login",
  components:{
    FormItem,
    LoginFrame,
  },

  methods:{
    switchState(){
      this.$router.push('/register')
    },
    imgChange(event){
      // console.log(event);
      let target = event.target
      target.src = target.src + "?"
    },
    getVeryficode(form){
      fetch('http://127.0.0.1:8001/user/getverifycode/').then((response)=>{
                 return response.text()
            }).then((val)=>{
        let labelForCode = document.getElementById('forLoginCode')
        if(form.loginCode.value && val.toLowerCase() === form.loginCode.value.toLowerCase()){
          this.canBeSubmit = true
          labelForCode.style.color = 'black'
          labelForCode.innerText = '验证成功'
          }else{
            labelForCode.innerText = '验证码不正确'
            labelForCode.style.color = 'red'
            this.canBeSubmit = false
          }
         }).catch((e)=>{
        console.log(e);
      })

    },
    handle(event){
      let userName = event.target
      let payload = {
        userName: userName.value
      }
      fetch('http://127.0.0.1:8001/user/username/validation/',{
          method:'POST',
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
              this.canBeSubmit = true
              }else{   //说明服务器里没有数据
                usernameLabel.innerText = '用户名不存在,去注册？'
                usernameLabel.style.color = 'red'
                this.canBeSubmit = false
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
    }
  },
  mounted() {
    let form = document.getElementById('form1')
        // form.code.addEventListener('blur',this.getVeryficode)
        // form.code.addEventListener('change',this.getVeryficode)
        form.loginUserName.addEventListener('change',this.handle)
        form.loginUserName.addEventListener('blur',this.handle)
        form.addEventListener('submit', (e)=>{
          if(this.canBeSubmit){
            let form = e.target
            let url = form.action
            let newForm = new FormData(form)
            let obj = Object.fromEntries(newForm.entries())  //将formData数据转换为普通的对象格式，这一步很重要
            fetch(url,{
                method:'POST',
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
                  console.log(value);
                  value = JSON.parse(value)
                  if(value.status){  //说明请求到了数据
                    this.$router.go(-1)
                    this.emitter.emit('loginSuccess', value.data)
                    this.$store.commit('changeToLogin')
                    this.$store.commit('setUserName', value.data.userName)
                    let cart = value.data.cart ? Array.from(value.data.cart) : []
                    this.$store.commit('loadingCart', cart)
                  }else if(value.msg === '密码错误'){
                    let forPwdEl = document.getElementById('pwd')
                    forPwdEl.style.borderColor = 'red'
                  }else{
                    let forLoginCode = document.getElementById('forLoginCode')
                    forLoginCode.innerText = '验证码错误'
                    forLoginCode.style.color = 'red'
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
