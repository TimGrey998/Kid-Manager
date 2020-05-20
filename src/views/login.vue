<template>
  <div>
    <div class="login-wrap wrap" v-show="showLogin">
      <h1>Book Manager</h1>
      <div class="logReg-form">
        <h2>登录</h2>
        <input type="text" placeholder="请输入用户名" v-model="username" />
        <span class="notice">{{ loginNotice }}</span>
        <input type="password" placeholder="请输入密码" v-model="password" />
        <button @click="login">登录</button>
        <a @click="toRegister">没有账号？马上注册</a>
      </div>
    </div>

    <div class="register-wrap wrap" v-show="showRegister">
      <h1>Book Manager</h1>
      <div action="#" class="logReg-form">
        <h2>注册</h2>
        <input type="text" placeholder="请输入用户名" v-model="newUsername" />
        <span class="notice">{{ registerNotice }}</span>
        <input type="password" placeholder="请输入密码" v-model="newPassword" />
        <input
          type="password"
          placeholder="请确认密码"
          v-model="repeatPassword"
        />
        <button v-on:click="register">注册</button>
        <a @click="toLogin">已有账号？马上登录</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      showLogin: true,
      showRegister: false,
      loginNotice: "",
      registerNotice: "",
      username: "",
      password: "",
      newUsername: "",
      newPassword: "",
      repeatPassword: ""
    };
  },
  methods: {
    loginDemo() {
      if (this.username == "admin" && this.password == "admin") {
        this.$router.push("home");
      }
    },
    login() {
      if (this.username == "" || this.password == "") {
        alert("请输入用户名或密码！");
      } else {
        let data = { username: this.username, password: this.password };
        //接口请求
        this.$http.post("api/user/login", data).then(res => {
          console.log(res);
          if (res.data == -1) {
            this.loginNotice = "该用户不存在！";
          } else if (res.data == 0) {
            this.loginNotice = "密码输入错误！";
          } else {
            this.loginNotice = "登录成功！";
            this.defined.setUserName(this.username);
            console.log(this.defined.userName);
            setTimeout(
              function() {
                this.$router.push("/home");
              }.bind(this),
              1000
            );
          }
        });
      }
    },
    register() {
      if (this.newUsername == "" || this.newPassword == "") {
        alert("请输入用户名或密码");
      } else if (this.repeatPassword != this.newPassword) {
        this.registerNotice = "两次密码输入不一致！";
      } else {
        let data = { username: this.newUsername, password: this.newPassword };
        //接口请求
        this.$http.post("api/user/addUser", data).then(res => {
          console.log(res);
          if (res.data == -1) {
            this.registerNotice = "该用户名已存在！";
          } else {
            this.registerNotice = "注册成功！";
            this.newUsername = "";
            this.newPassword = "";
            this.repeatPassword = "";
          }
        });
      }
    },
    toRegister() {
      this.showRegister = true;
      this.showLogin = false;
      this.loginNotice = "";
      this.registerNotice = "";
    },
    toLogin() {
      this.showRegister = false;
      this.showLogin = true;
      this.loginNotice = "";
      this.registerNotice = "";
    }
  }
};
</script>

<style scoped>
@import "../style/loginPage";
</style>
