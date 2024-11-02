<!--
 * @author: xiexiangquan
 * @Date: 2023-04-25 18:54:08
 * @description: 通用带上下→的数字组件
-->
<template>
  <div class="percentage-number">
    <template v-if="IconFloat == 'left'">
      <img class="icon" v-if="value > 0 && showIcon" src="@/assets/img/icon/upper.png" alt="" />
      <img class="icon" v-if="value < 0 && showIcon" src="@/assets/img/icon/below.png" alt="" />
    </template>
    <p class="right" :class="getValueColor">
      <span v-if="value > 0" class="value" v-num-rolling="value || 0"></span>
      <span v-else class="value">-</span>
      <span v-if="value > 0" class="unit">{{ unit }}</span>
    </p>
    <template v-if="IconFloat == 'right'">
      <img class="icon" v-if="value > 0 && showIcon" src="@/assets/img/icon/upper.png" alt="" />
      <img class="icon" v-if="value < 0 && showIcon" src="@/assets/img/icon/below.png" alt="" />
    </template>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /** 标题内容 */
    value: number;
    /** 单位 */
    unit: string;
    /** 是否显示图标 */
    showIcon: boolean;
    /** 图标的位置 */
    IconFloat: string;
  }>(),
  {
    value: 0,
    unit: '',
    showIcon: true,
    IconFloat: 'left',
  }
);
const getValueColor = computed(() => {
  if (props.value > 0) {
    return 'up';
  } else if (props.value < 0) {
    return 'low';
  }
});
</script>

<style lang="scss" scoped>
.percentage-number {
  @include flex(flex-start, center, row);
  img {
    width: 18px;
    height: 22px;
  }
  p {
    @include flex(space-between, center, row);
    font-size: 26px;
    font-family: DINPro;
    font-weight: 500;
    color: #ffffff;
    padding-left: 4px;
    .value {
      @include text-overflow;
      max-width: 80px;
    }
  }
}
// 文字颜色状态处理
.up {
  color: #fd7337 !important;
}
.low {
  color: #37fd53 !important;
}
</style>
