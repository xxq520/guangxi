<!--
 * @author: xiexiangquan
 * @Date: 2023-04-22 17:48:35
 * @description: 分页器组件
-->
<template>
  <div class="page-toggle">
    <img class="prev" @click="change('sub')" src="@/assets/img/icon/prev-arrow.png" alt="" />
    <p class="page">
      <span class="current">{{ current }}</span
      >/<span class="total">{{ totalPage }}</span>
    </p>
    <img class="next" @click="change('add')" src="@/assets/img/icon/next-arrow.png" alt="" />
  </div>
</template>

<script setup lang="ts">
const current = ref(1);
const props = defineProps<{
  currentPage: number;
  total: number;
  pageNum: number;
}>();
const emit = defineEmits(['toggle']);
const totalPage = computed(() => Math.ceil(props.total / props.pageNum) || 0);
watch(
  () => props.currentPage,
  (res) => {
    current.value = res;
  }
);
const change = (type: string) => {
  if (type == 'add') {
    current.value = current.value + 1 > totalPage.value ? totalPage.value : current.value + 1;
  } else {
    current.value = current.value - 1 < 1 ? 1 : current.value - 1;
  }
  emit('toggle', current.value);
};
</script>

<style lang="scss" scoped>
.page-toggle {
  @include flex(flex-end, center, row);
  .prev {
    margin-right: 10px;
    cursor: pointer;
    padding: 0 10px;
  }
  .page {
    font-size: 14px;
    font-family: OPPOSans;
    font-weight: 500;
    color: #ffffff;
    .current {
      margin-right: 4px;
      border-bottom: 1px solid rgba(174, 220, 255, 1);
      font-size: 14px;
      font-family: OPPOSans;
      font-weight: 500;
      color: #aedcff;
    }
    .total {
      margin-left: 6px;
    }
  }
  .next {
    margin-left: 10px;
    cursor: pointer;
    padding: 0 0 0 10px;
  }
}
</style>
