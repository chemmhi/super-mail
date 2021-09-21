<template :key="3">
  <login-frame>
    <template #top>
      <div>注册</div>
    </template>
  </login-frame>
  <form id="form1" name="form1" action="javascript:viod(0)">
    <form-item>
      <label for="userName" id="forUserName">用户名</label>
      <input type="text" id="userName" placeholder="请输入用户名" name="userName">
    </form-item>
    <form-item>
      <label for="registerPhoneNum" id="forRegisterPhoneNum" >手机号</label>
      <input type="text" id="registerPhoneNum" placeholder="请输入手机号" name="registerPhoneNum">
    </form-item>
    <form-item>
      <label for="pwd1">密码</label>
      <input type="password" id="pwd1" placeholder="请输入密码" name="pwd1">
    </form-item>
    <form-item>
      <label for="pwd2">密码</label>
      <input type="password" id="pwd2" placeholder="请输入密码" name="pwd2">
    </form-item>
    <form-item>
        <label for="registerCode" id="forRegisterCode">验证码</label>
        <div class="verify-container">
          <input type="text" id="registerCode" placeholder="验证码" name="registerCode">
          <img use-credentials="true"
               :src="imgUrl"
               id="registerImg"
               alt="" @click="imgChange">
        </div>
      </form-item>
    <form-item class="button">
      <button type="submit">注册</button>
      <span @click="switchState">>>已有账号, 去登录?</span>
    </form-item>
  </form>
</template>

<script>
import LoginFrame from "../login/childcomponent/LoginFrame";
import FormItem from "../login/childcomponent/FormItem";
import {baseUrl,fetchapi} from "network/request";

export default {
  name: "Register",
  components:{
    LoginFrame,
    FormItem,
  },
  methods: {
    switchState() {
      this.$router.push('/login')
    },
    handle(event){
      let payload = {
        userName: event.target.value
      }
      let usernameLabel = document.getElementById('forUserName')
      fetchapi('user/username/validation/',{
          method:'POST',
          cache: 'no-store',
          body: JSON.stringify(payload)
        }).then((response)=>{
             return response.text()
        }).then((val)=>{
        val = JSON.parse(val)
            if(val.isExistence){
              usernameLabel.innerText = '用户名已经存在'
              usernameLabel.style.color = 'red'
            }else{   //说明服务器里没有数据
              usernameLabel.innerText = '用户名可用'
              usernameLabel.style.color = 'black'
              this.isUserName = true
            }
          })
        },
    handlepwd(event){
      let form = document.getElementById('form1')
      if(form.pwd1.value !== form.pwd2.value){
        form.pwd2.style.borderColor = 'red'
      }else{
        form.pwd2.style.borderColor = ''
        this.isPassword = true
      }
    },
    handlePhoneNum(e){
      let form = document.getElementById('form1')
      let labelForNum = document.getElementById('forRegisterPhoneNum')
      let num = form.registerPhoneNum.value
      let pattern = /^1\d{10}$/
      if(pattern.test(num)){
        labelForNum.style.color = ''
        labelForNum.innerText = '手机号'
        this.isPhoneNumber = true
      }else{
        labelForNum.innerText = '手机号格式不正确'
        labelForNum.style.color = 'red'
      }
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
  },
  data(){
  return {
    form: null,
    isUserName: false,
    isPassword: false,
    isPhoneNumber: false,
    url: baseUrl
  }
},
  computed:{
    currentState(){
      return this.state === 'login'? '登录' : (this.state === 'register'? '注册' : '登录')
    },
    reverseCurrentState(){
      return this.state === 'login'? '注册' : (this.state === 'register'? '登录' : '登录')
    },
    imgUrl(){
      return this.url + 'user/verifycode/img'
    }
  },
  mounted() {
    const imgEl = document.getElementById('registerImg')
    this.getImgUrl(imgEl)
    let form = document.getElementById('form1')
    let labelForCode = document.getElementById('forRegisterCode')
    //判断用户名是否存在
    form.userName.addEventListener('change',this.handle)
    form.userName.addEventListener('blur',this.handle)
    //判断密码是否正确
    form.pwd2.addEventListener('change',this.handlepwd)
    form.pwd2.addEventListener('blur',this.handlepwd)
    form.pwd1.addEventListener('blur',this.handlepwd)
    form.pwd1.addEventListener('blur',this.handlepwd)
    //判断手机号格式是否正确
    form.registerPhoneNum.addEventListener('blur', this.handlePhoneNum)
    form.registerPhoneNum.addEventListener('change', this.handlePhoneNum)
    form.addEventListener('submit', (e)=>{
      e.preventDefault()
      if(this.isUserName && this.isPhoneNumber && this.isPassword){ //说明用户名，密码手机号3项验证成功
        let url = 'user/register/'
        let newForm = new FormData(e.target)
        let data = Object.fromEntries(newForm.entries())
        // this.$router.go(-1)
        fetchapi(url,{
          method:'POST',
          cache:'no-store',
          body: JSON.stringify(data),
          headers:{'Content-Type': 'application/json'}
        })
          .then((response)=>{
          return response.text()
        })
          .then((value)=>{
            value = JSON.parse(value)
          if(value.status){
            this.$router.push('/login')
          }else{
            labelForCode.innerText = value.msg
            labelForCode.style.color = 'red'
            this.imgChange({target: document.getElementById('registerImg')})
          }
        })
      }
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
    padding-bottom: 10px;
    border: solid #5555 1px;
    align-content: space-around;
    flex-direction: column;
    justify-content: space-evenly;
    flex-wrap: wrap;
    font-size: 14px;
  }
  #form1 label{
    display: block;
  }
  #form1 input{
    height: 28px;
    padding-left: 10px;
    margin-top: 5px;
    font-size: 13px;
  }

  .left input{
    margin: 0 5px 0 0;
    width: 14px;
    height: 14px;
  }

  .button{
    place-self: center;
    margin-top: 20px;
  }
  .button button{
    height: 28px;
    width: 46px;
    margin-right: 30px;
  }
  .button span{
    font-style: italic;
  }
  #registerCode{
    width: 80px;
  }
  .verify-container{
    display: flex;
    align-items: center;
  }
  #form1 div img{
    width: 80px;
    height: 28px;
    margin-top: 5px;
  }
</style>
