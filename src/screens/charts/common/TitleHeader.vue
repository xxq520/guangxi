<!--
 * @author: xiexiangquan
 * @Date: 2023-04-22 17:48:35
 * @description: 项目头部组件
-->
<template>
  <div class="title_box">
    <div style="display: flex">
      <!-- <img src="@/assets/img/logo/logo.png" class="logo" /> -->
      <!-- <img src="@/assets/img/logo/logo1.png" class="logo" /> -->
      <div class="title">
        <p class="title-top">{{ title }}</p>
      </div>
      <p class="building" v-if="route.params?.screenName != 'home'">桃源院区</p>
      <div class="time-box" @click="reload" @dblclick="reload(true)">
        <p v-show-time="'HH:mm:ss'" class="time"></p>
        <p v-show-time="'yyyy-MM-dd'" class="day"></p>
        <!-- <p>星期<span v-show-time="'w'" class="day"></span></p> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, computed } from 'vue';
import { useRoute } from 'vue-router';
// 切换主题的方法
export default defineComponent({
  setup() {
    const reload = (clearCache = false) => {
      (location as any).reload(clearCache);
    };
    const route = useRoute();
    return {
      title: ref(window.config.title),
      reload,
      route,
    };
  },
});
</script>

<style lang="scss" scoped>
.title_box {
  width: 100%;
  height: 53px;
  position: absolute;
  top: 26px;
  left: 0;
  z-index: 99;
  background-size: cover !important;
  .building {
    position: absolute;
    right: 400px;
    top: -10px;
    font-size: 19px;
    // font-weight: bold;
  }
  .logo {
    line-height: 45px;
    position: absolute;
    left: 330px;
    width: 270px;
    height: 84px;
    top: -36px;
  }
  .title {
    position: absolute;
    left: 50%;
    top: -15px;
    transform: translateX(-50%);
    .title-top {
      font-size: 32px;
      font-weight: 500;
      color: #ffffff;
      line-height: 17px;
      text-shadow: 3px 3px 8px rgba(0, 70, 76, 0.5);
      font-size: 34px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #ecf7fe;
      line-height: 43px;
      background: linear-gradient(0deg, #bbdfff 0%, #ffffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 18px;
    }
  }
  .time-box {
    position: absolute;
    right: 76px;
    top: -36px;
    font-weight: 400;
    height: 29px;
    text-align: left;
    color: #fff;
    font-family: DINPro;
    cursor: pointer;
    pointer-events: all;
    @include flex(flex-start, baseline, row);
    p {
      margin-left: 14px;
      font-size: 35px;
      font-weight: 400;
    }
    .day {
      font-size: 14px;
      font-family: DINPro;
      font-weight: 400;
      color: #d3d3d3;
      line-height: 43px;
    }
    .time {
      font-size: 24px;
      font-weight: 500;
      margin-top: 19px;
      font-size: 26px;
      font-family: DINPro;
      font-weight: 500;
      color: #ffffff;
    }
  }
}
</style>
