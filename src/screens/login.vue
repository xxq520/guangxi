<!--
 * @Description: 登录页面
-->
<template>
  <div class="login">
    <div class="logo"></div>
    <div class="title">{{ title }}</div>
    <div class="input-box account">
      <img src="@/assets/img/background/login/account.png" alt="" />
      <input v-model.trim="ruleForm.name" placeholder="请输入账号" type="text" />
    </div>
    <div class="input-box password">
      <img src="@/assets/img/background/login/password.png" alt="" />
      <input
        v-model.trim="ruleForm.password"
        @keyup.enter="submitForm"
        placeholder="请输入密码"
        type="password"
      />
    </div>
    <div class="login-btn" @click="submitForm">登录</div>
  </div>
</template>

<script lang="ts">
import { toRef, ref } from 'vue';
import { useAppStore } from '@/store';
import { homeStore } from '@/store/home';
import { useThing } from '@/store/thingStore';
import { autoRequest } from '../request/autoRequest';
import { Home } from '../request/home';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

export default {
  name: 'Login',
  screenConfig: {
    width: 1920,
    height: 1080,
    layout: 'expand',
    title: '登录',
  },
  setup() {
    const store = useAppStore();
    const router = useRouter();
    const ruleForm = ref({
      name: '',
      password: '',
    });
    const submitForm = async () => {
      autoRequest<string>(
        {
          url: '/login',
          data: {
            ssdp: 'login',
          },
        },
        (res: any) => {
          const havaAccount =
            ruleForm.value.name in res && res[ruleForm.value.name] == ruleForm.value.password;
          if (res && havaAccount) {
            sessionStorage.setItem('token', 'login');
            router.replace({ name: 'home' });
          } else {
            ElMessage({
              showClose: true,
              message: '账号或密码错误!',
              type: 'error',
            });
          }
        },
        () => {
          ElMessage({
            showClose: true,
            message: '网络错误!',
            type: 'error',
          });
        },
        'login'
      );
    };
    return {
      // activeMenu,
      // useThingStore,
      title: ref(window.config.title),
      ruleForm,
      submitForm,
    };
  },
};
</script>

<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  color: #fff;
  background: url('@/assets/img/background/login/login-bg.png') center center no-repeat;
  background-size: 100% 100%;
  position: relative;
  @include flex(flex-start, center, column);
  pointer-events: all;
  .logo {
    width: 239px;
    height: 49px;
    margin-top: 187px;
    background: url('@/assets/img/background/login/logo-bg.png') center center no-repeat;
    background-size: 100% 100%;
  }
  .title {
    margin-top: 26px;
    font-size: 60px;
    font-family: Source Han Sans CN;
    font-weight: 800;
    color: #ecf7fe;
    text-shadow: 0px 2px 0px rgba(18, 26, 34, 0.05);

    background: linear-gradient(0deg, #bbdfff 0%, #ffffff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 14px;
  }
  .input-box {
    width: 583px;
    height: 60px;
    background: url('@/assets/img/background/login/login-input.png') center center no-repeat;
    background-size: 100% 100%;
    @include flex(flex-start, center, row);
    img {
      width: 26px;
      height: 28px;
      margin-left: 26px;
      margin-right: 22px;
    }
    input {
      width: 400px;
      height: 30px;
      border: none;
      outline: none;
      background: none;
      font-size: 20px;
      font-family: OPPOSans;
      font-weight: 500;
      color: #ecf7fe;
    }
  }
  .account {
    margin-top: 80px;
  }
  .password {
    margin-top: 28px;
  }
  .login-btn {
    @include flex(center, center, row);
    width: 587px;
    height: 65px;
    text-align: center;
    background: url('@/assets/img/background/login/login-btn-bg.png') center center no-repeat;
    background-size: 100% 100%;
    font-size: 30px;
    font-family: OPPOSans;
    font-weight: 500;
    color: #ecf7fe;
    margin-top: 90px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
