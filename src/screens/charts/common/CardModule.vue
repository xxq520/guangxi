<!-- 公共模块标题 -->
<template>
  <div class="card-module">
    <div class="card-header" :class="{ 'short-header': short }">
      <div class="card-left" @click="titleClick">
        {{ title }}<span class="sub-title">{{ subTitle }}</span>
      </div>
    </div>
    <div class="body">
      <slot></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue';
const emits = defineEmits(['titleClick']);
const titleClick = () => emits('titleClick', true);

withDefaults(
  defineProps<{
    /** 标题内容 */
    title: string;
    /** 子标题内容 */
    subTitle: string;
    /**短标题 */
    short?: boolean;
  }>(),
  {
    title: () => '这是一个标题',
    short: false,
  }
);
</script>

<style lang="scss" scoped>
.card-module {
  width: 100%;
  position: relative;

  .short-header {
    height: 92px !important;
    background-size: 100% 100% !important;

    .card-left {
      line-height: 90px !important;
    }
  }
  .card-header {
    height: 32px;
    width: 100%;
    position: relative;
    background: url('@/assets/img/background/title-bg.png') center center no-repeat;
    background-size: 100% 100%;
    .card-left {
      padding-left: 41px;
      text-align: left;
      font-size: 17px;
      line-height: 26px;
      font-family: OPPOSans;
      font-weight: 400;
      color: #ffffff;
      .sub-title {
        font-size: 17px;
        font-family: OPPOSans;
        font-weight: 500;
        color: #99bfff;
      }
    }
    &::after {
      content: '';
      position: absolute;
      left: 44px;
      width: 300px;
      bottom: -1px;
    }
  }

  .body {
    // border: 1px solid rgba(32, 88, 104, 0.4);
    // border-top: none;
    // background: rgba(9, 23, 29, 0.8);
    // position: relative;
    // padding-top: 4px;
    // margin-top: -1px;
    // &::after,
    // &::before {
    //   content: '';
    //   position: absolute;
    //   left: 0;
    //   bottom: -2px;
    //   width: 8px;
    //   height: 8px;
    //   background: #15eceb;
    // }
    // &::after {
    //   left: -4px;
    // }
    // &::before {
    //   right: -4px;
    //   left: auto;
    // }
  }
  .right {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 14px;
    font-family: OPPOSans;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
  }
}
</style>
