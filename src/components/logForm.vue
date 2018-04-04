<template>

    <div class="log-form" >
        <div class="g-form">
            <div class="g-form-line">
                <span class="g-form-label">用户名：</span>
                <div  class="g-form-input">
                    <input type="text" placeholder="邮箱" v-model="username">
                </div>
                <span class="g-form-error">{{ usernameErr.errorText }}</span>
            </div>
            <div class="g-form-line">
                <span class="g-form-label">密码：</span>
                <div  class="g-form-input">
                    <input type="text" placeholder="1-6位密码" v-model="password">
                </div>
                <span class="g-form-error"> {{ passwordErr.errorText }} </span>
            </div>
            <div class="g-form-line">
                <div  class="g-form-btn">
                    <a class="button" @click="onLogin"> 登录</a>
                </div>
            </div>
            <p> {{ errorText }}</p>
        </div>
    </div>
   
</template>
<script>
export default {
  data(){
      return {
          username:'',
          password:'',
          errorText:''
      }
  },
  computed:{
      usernameErr(){
          let errorText,status
          if(!/@/g.test(this.username)){
              errorText='用户名格式错误'
              status=false
          }else{
              errorText='',
              status=true
          }
          if(!this.usernameFlag){
              errorText=''
              this.usernameFlag=true
          }
          return {
              errorText,
              status
          }
      },
      passwordErr(){
         let errorText,status
          if(!/^\d{1,6}$/g.test(this.password)){
              errorText='不是1-6位的数字密码'
              status=false
          }else{
              errorText='',
              status=true
          }
          if(!this.passwordFlag){
              errorText=''
              this.passwordFlag=true
          }
          return {
              errorText,
              status
          }
      }
  },
  methods:{
      onLogin(){
          if(!this.usernameErr.status || !this.passwordErr.status){
              this.errorText = '用户名或密码格式错误'
          }else{
              this.errorText = ''
              this.$http.post('/api/getLogin').then( (data)=>{
                //    console.log(data.data)
                  this.$emit('has-login',data.data)
              },(err)=>{
                  console.log(err)
              })
                 
              
          }
      }
  }

}
</script>


<style>

</style>
