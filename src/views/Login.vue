<template>
  <div class="container">
    <form class="form">
      <div class="login-image">
        <img class="image-props" :src="require('@/assets/zayaLogo.png')" />
      </div>
      <a-input
        v-model="username"
        size="large"
        type="text"
        placeholder="Username"
        @change="error.username = ''"
      >
        <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
      </a-input>
      <div class="errors">
        <span>{{error.username}}</span>
      </div>
      <a-input-password
        v-model="password"
        size="large"
        type="password"
        placeholder="Password"
        @change="error.password = ''"
        @pressEnter="handleLogin"
      >
        <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
      </a-input-password>
      <div class="errors">
        <span>{{error.password}}</span>
      </div>
      <div class="remember">
        <a-checkbox v-model="rememberMe">Remember Me</a-checkbox>
        <span class="forgot" @click="handleForgotPassword">Forgot Password?</span>
      </div>
      <div class="button-container">
        <a-button
          type="primary"
          style="width: 100px; background-color: #00a7e7"
          @click="handleLogin"
        >Login</a-button>
      </div>
    </form>
    <a-modal
      title="Recover your account"
      :visible="dialog"
      okText="Submit"
      @ok="handleForgotPasswordSubmit"
      @cancel="handleCancel"
    >
      <div class="modal-content">
        <div
          class="modal-text"
        >We will help you reset your password. Enter your registered email address and follow the instructions.</div>
        <div>
          <a-input
            v-model="email"
            size="large"
            type="email"
            placeholder="Email"
            style="width: 100%"
            @change="error.email = ''"
          ></a-input>
          <div class="errors">
            <span>{{error.email}}</span>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { Login } from "@/api/auth.js";
// import { Button, Input, Checkbox, Modal, Icon } from "ant-design-vue";
export default {
  name: "Login",
  data: function() {
    return {
      dialog: false,
      username: "",
      password: "",
      rememberMe: false,
      email: "",
      error: { username: "", password: "", email: "" }
    };
  },
  methods: {
    handleLogin() {
      if (!this.username.length) this.error.username = "username is required";
      if (!this.password.length) this.error.password = "password is required";
      if (this.username.length && this.password.length) {
        let payload = { username: this.username, password: this.password };
        Login(payload)
          .then(response => {
            console.log(response);
            localStorage.setItem("ACCESS_TOKEN", response.data.key);
            this.$router.push({ name: "Dashboard" });
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    handleForgotPassword() {
      this.dialog = true;
    },
    handleCancel() {
      this.dialog = false;
      this.email = "";
      this.error.email = "";
    },
    handleForgotPasswordSubmit() {
      if (!this.email.length) this.error.email = "email id required";
      else this.handleCancel();
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #eceff1;
}
.form {
  width: 30%;
  padding: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: #fafafa;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 6%;
}
.login-image {
  display: flex;
  justify-content: center;
  height: 50%;
  width: 100%;
  padding-bottom: 20%;
}
.image-props {
  object-fit: cover;
  height: 60%;
  width: 60%;
}
.errors {
  display: flex;
  height: 16px;
  font-size: 14px;
  margin-bottom: 5%;
}
.errors span {
  color: red;
  margin-left: 2px;
}
.remember {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4%;
}
.forgot {
  color: rgba(0, 0, 0, 0.54);
  cursor: pointer;
}
.forgot:hover {
  text-decoration: underline;
}
.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 15vh;
}
.modal-header {
  display: flex;
  justify-content: center;
  font-size: 18px;
}
.modal-text {
  display: flex;
  justify-content: center;
  /* width: 50%; */
}
</style>