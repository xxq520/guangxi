<script setup lang="ts">
import { eventBus } from '@/lib/EventBus';
import { useAppStore } from '@/store';
import { flyToTwin } from '@/utils/thingjsx';
const store = useAppStore();
const floor = ref<any[]>([]);
onUnmounted(() => {});
watch(
  () => store.level,
  () => {
    const level = store.level;
    let list: any[] = [];
    if (['Building', 'Floor'].includes(level.level)) {
      list = level.floor;
    }
    floor.value = list
      ?.map((item) => {
        return {
          id: item.id,
          name: item.name,
        };
      })
      ?.reverse();
  },
  {
    immediate: true,
  }
);

const localFloorObj = (id: string) => {
  /** 商业服务有楼层展开，需要将楼层展开关闭孪生体那些才能放在正确的位置 */
  flyToTwin(`#${id}`);
};
</script>

<template>
  <div class="floor-select" v-if="['Building', 'Floor'].includes(store.level?.level)">
    <div class="body" :class="{ max: floor?.length >= 10 }">
      <div
        class="item"
        v-for="(item, index) in floor"
        :class="{ select: store.level?.current?.id == item.id }"
        :key="index"
        @click="localFloorObj(item.id)"
        :title="item.name"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.floor-select {
  position: absolute;
  top: 56%;
  right: 440px;
  z-index: 18;
  overflow-y: auto;
  pointer-events: all;
  background: url('@/assets/img/background/scene/floor-bg.png') no-repeat;
  background-size: 100% 100%;
  width: 62px;
  height: 366px;
  overflow-x: hidden;
  font-size: 16px;
  font-family: DINPro;
  font-weight: 500;
  color: #ffffff;
  padding: 46px 0;
  .body {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    &::-webkit-scrollbar-track-piece {
      background: #d3dce6;
      border-radius: 20px;
    }

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #99a9bf;
      border-radius: 20px;
    }
    &.max {
      margin-left: 4px;
    }
  }
  .item {
    width: 55px;
    height: 30px;
    line-height: 30px;
    pointer-events: all;
    cursor: pointer;
    position: relative;
    @include text-overflow;
    text-align: center;
    padding: 0 10px;
    margin: 0 auto;
    &.select {
      background: url('@/assets/img/background/scene/floor-select.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
