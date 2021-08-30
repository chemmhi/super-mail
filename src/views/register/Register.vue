<template>
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
      <label for="phoneNum" id="forPhoneNum" >手机号</label>
      <input type="text" id="phoneNum" placeholder="请输入手机号" name="phoneNum">
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
      <button type="submit">注册</button>
      <span @click="switchState">>>已有账号, 去登录?</span>
    </form-item>
  </form>
</template>

<script>
import LoginFrame from "../login/childcomponent/LoginFrame";
import FormItem from "../login/childcomponent/FormItem";
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
  },
    data(){
    return {
      state:'login',
      code: '',
      form: null,
      canBeSubmit: false,
    }
  },
    imgChange(event){
      // console.log(event);
      let target = event.target
      target.src = target.src + "?"
      this.getVeryficode()
    },
    getVeryficode(){
      fetch('http://127.0.0.1:8001/user/getverifycode/').then((response)=>{
                 return response.text()
            }).then((val)=>{
        let labelForCode = document.getElementById('forcode')
        if(this.form.code.value && val.toLowerCase() === this.form.code.value.toLowerCase()){
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
    handle(){
      let payload = {
        userName: this.form.userName.value
      }
      fetch('http://127.0.0.1:8001/user/username/validation/',{
          method:'POST',
          body: JSON.stringify(payload)
        }).then((response)=>{
             return response.text()
        }).then((val)=>{
        val = JSON.parse(val)
        let usernameLabel = document.getElementById('forusername')
            if(val.isExistence){
                if(this.state === 'register'){
                  usernameLabel.innerText = '用户名已经存在'
                  usernameLabel.style.color = 'red'
                  this.canBeSubmit = false
                }else{
                  usernameLabel.innerText = '用户名'
                  usernameLabel.style.color = ''
                  this.canBeSubmit = true
                }
              }else{   //说明服务器里没有数据
                if(this.state === 'register'){
                  usernameLabel.innerText = '用户名可用'
                  usernameLabel.style.color = 'black'
                  this.canBeSubmit = true
                }else{
                  usernameLabel.innerText = '用户名不存在,去注册？'
                  usernameLabel.style.color = 'red'
                  this.canBeSubmit = false
                }
              }
              this.code = val.verifyCode
          })
        },
    handlepwd(){
      if(form.pwd.value !== form.pwd2.value){
        form.pwd2.style.borderColor = 'red'
        this.canBeSubmit = false
      }else{
        form.pwd2.style.borderColor = ''
        this.canBeSubmit = true
      }
    },
    handlePhoneNum(e){
      let form = document.getElementById('form')
      let labelForNum = document.getElementById('forPhoneNum')
      let num = form.phoneNum.value
      let pattern = /1\d{10}/
      if(pattern.test(num)){
        labelForNum.style.color = ''
        labelForNum.innerText = '手机号'
        this.canBeSubmit = true
      }else{
        let labelForNum = document.getElementById('forPhoneNum')
        labelForNum.innerText = '手机号格式不正确'
        labelForNum.style.color = 'red'
        this.canBeSubmit = false
      }
    },
    computed:{
      currentState(){
        return this.state === 'login'? '登录' : (this.state === 'register'? '注册' : '登录')
      },
      reverseCurrentState(){
        return this.state === 'login'? '注册' : (this.state === 'register'? '登录' : '登录')
      }
    },
    watch:{
      state(nw, old){
        if (nw === 'register'){
          setTimeout(()=>{
            let form = document.getElementById('form')
            //判断用户名是否合法
            form.userName.addEventListener('change',this.handle)
            form.userName.addEventListener('blur',this.handle)
              //判断密码是否正确
            form.pwd2.addEventListener('change',this.handlepwd)
            form.pwd2.addEventListener('blur',this.handlepwd)
            //判断手机号格式是否正确
            form.phoneNum.addEventListener('blur', this.handlePhoneNum)
            form.phoneNum.addEventListener('change', this.handlePhoneNum)
          })

        }
        else if(nw === 'login'){

        }
      },

    },
    mounted() {
      let form = document.getElementById('form1')
          form.code.addEventListener('blur',this.getVeryficode)
          form.code.addEventListener('change',this.getVeryficode)
          form.userName.addEventListener('change',this.handle)
          form.userName.addEventListener('blur',this.handle)
          form.addEventListener('submit', (e)=>{
            if(this.canBeSubmit){
                let url = form.action
                let newForm = new FormData(form)
                this.$router.go(-1)
                fetch(url,{
                  method:'POST',
                  body: newForm,
                  // headers:{
                  //   credentials: 'include',
                  // }
                }).then((response)=>{
                  return response.text()
                },(error)=>{
                  console.log('register');
                  this.$router.push('/login')
                  return null
                }).then((value)=>{
                  if(value){
                    value = JSON.parse(value)
                    this.emitter.emit('loginSuccess', value)
                    this.$store.commit('changeToLogin')
                    this.$store.commit('setUserName', value.userName)
                    let cart = value.cart ? Array.from(value.cart) : []
                    this.$store.commit('loadingCart', cart)
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
