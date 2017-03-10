<template>
<div class="sign-in-body">
  <div class="sign-box">
    <div>
        <img src="../assets/logo3.png" class="logoimg">
    </div>
    <div class="logo-box">
        <input placeholder="请输入用户名" v-model="username" class="input"></input>
        <input placeholder="请输入登陆密码" v-model="password" type="password" class="input"></input>
        <div class="remember">
            <el-checkbox style="color:#4990e2" v-model="remember">记住密码</el-checkbox>
        </div>
        <div class="log" v-bind:class="{blue:username!=''&&password!=''}" @click="signin">
            登 录
        </div>
    </div>
  </div>
  <div class="sign-foot">
      <div style="text-align:center;color:#ccc;line-height:30px;">版权所有 © 2015 银江股份有限公司版权所有</div>
      <div style="text-align:center;color:#4990e2;line-height:30px;">浙ICP备09109232 号</div>
  </div>
</div>
</template>
<script>
import {Login,login_back} from '../ajax/post.js'
export default {
    data() {
        return {
            username:'',
            password:'',
            remember:true,
        }
    },
    methods: {
        signin(){
            if (this.username==""&&this.password=="") {
                swal({
                    title: "登录失败",
                    type: 'warning',
                    text: "请输入账号或密码",
                    timer: 2000,
                })
            }
            else{
                login_back({
                    userName:this.username,
                    password:this.password
                }).then((res) => {
                    console.log(res)
                    if (res.userId==0) {
                        swal({
                            title: "登录失败",
                            type: 'warning',
                            text: "账户或密码不正确",
                            timer: 2000,
                        })
                    }
                    else{
                        if (this.remember==true) {
                            localStorage.setItem("adminname", this.username);
                            localStorage.setItem("adminpass", this.password);
                        }
                        router.push({name:"home"}) 
                    }                               
                }).catch((e) => {
                    
                })
            }
        }
    },
    mounted:function(){
        this.username = localStorage.getItem("adminname");
        this.password = localStorage.getItem("adminpass");
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    .sign-in-box{
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;  
        bottom: 0px;
    }
    .sign-box{
        z-index: 100;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 140px;
        background: url("../assets/beijing.jpg");
        background-size: cover;
        // background-attachment:fixed;
        background-position:center;
        .logoimg{
            height: 30px;
            margin-top: 20px;
            margin-left: 40px;
        }
        .logo-box{
            padding-top: 40px;
            text-align: center;
            width: 500px;
            height: 278px;
            margin: auto auto;
            margin-top:17%;
            background-color: rgba(241, 242, 248, 0.8);
            // opacity: 0.6;
            border-radius: 20px;
            .input{
                font-size: 14px;
                // color: #ccc;
                padding: 10px;
                background-color: #fff !important;
                margin: 0px auto 20px;
                height: 40px;
                width: 340px;
                display: block;
                border: none;
            }
            .remember{
                width: 340px;
                margin: 0px auto 20px;
                text-align: left;
            }
            .log{
                display: inline-block;
                cursor: pointer;
                color: #333;
                line-height: 40px;
                margin: 0 auto;
                width: 100px;
                height: 40px;
                border-radius: 20px;
                background-color: #dfdfdf;
            }
            .blue{
                background-color: #4990e2;
                color: #fff;
            }
        }
    }
    .sign-foot{
        padding-top: 40px;
        background: linear-gradient(to bottom, #335474 0%,#2c4d6d 100%);
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        height: 140px;
    }
</style>
