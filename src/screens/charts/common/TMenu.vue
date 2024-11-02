<!--
 * @Version: 1.0
 * @Autor: yls
 * @Date: 2023-02-28 13:59:34
 * @LastEditors: jiangzhikun
 * @LastEditTime: 2023-03-03 09:20:39
-->
<template>
  <div class="menu-wrapper" v-if="menuList?.length">
    <div class="toggle-btn menu-prev" @click="prev"></div>
    <div class="toggle-btn menu-next" @click="next"></div>

    <div
      v-for="item in currentMenu"
      :key="item.name"
      :class="[
        activeName === item.title ||
        item?.children?.filter((menu) => menu.title == store.activeSubMenuInfo?.title)?.length
          ? 'active-item'
          : '',
        'menu-item',
      ]"
      @click="!item?.children?.length ? changeMenu(item) : () => {}"
    >
      <div class="title">
        {{ item.title }}
      </div>
      <div class="menu-children">
        <div class="menu-children-box">
          <div
            v-for="subItem in item.children || []"
            :key="subItem.name"
            :class="[
              store.activeSubMenuInfo?.title === subItem.title ? 'active-menu-children-item' : '',
              'menu-children-item',
            ]"
            @click.stop="changeMenu(subItem, item, 'children')"
          >
            <div class="title">{{ subItem.title }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
// import InitMenuTwins from "@/utils/twins/initTwins";
import router from '@/routers';
import { bussinessActive } from '@/utils/thingjsx';

const store = useAppStore();
/** 路由跳转 */
const jumpUrl = (url: string) => router.push(url);

const menuList = computed(() => store?.menusInfo);
const activeName = computed(() => store.activeMenuInfo?.title);

const currentMenu = computed(() => {
  return menuList.value.slice((page.value - 1) * 4, page.value * 4);
});

// 切换菜单
const changeMenu = (item: Menu, parent: any, children: string) => {
  if (item.router?.startsWith('http')) {
    window.open(item?.router);
    return;
  }
  bussinessActive(item.title);
  if (children) {
    store.setMenuInfo(parent);
    store.setSubMenuInfo(item);
    parent.router && jumpUrl(parent.router);
  } else {
    store.setMenuInfo(item);
    item.router && jumpUrl(item.router);
  }
};

onMounted(() => {});

const page = ref(1);

const next = () => {
  if (page.value + 1 > Math.ceil(menuList.value.length / 4)) return;
  page.value = page.value + 1;
};
const prev = () => {
  if (page.value - 1 < 1) return;
  page.value = page.value - 1;
};
</script>
<script lang="ts">
export default {
  name: 'MenuBox',
};
</script>

<style scoped lang="scss">
.menu-wrapper {
  position: absolute;
  bottom: 27px;
  left: 50%;
  // transform: translateX(-50%);
  display: flex;
  height: 37px;
  pointer-events: all;
  z-index: 1;
  @include flex(center, center, row);
  height: 37px;
  transform: translateX(-50%);
  .toggle-btn {
    position: absolute;
    top: 10px;
    width: 52px;
    height: 25px;
    cursor: pointer;
  }
  .menu-prev {
    left: -60px;
    background: url('@/assets/img/background/menu/menu-prev.png') center center no-repeat;
    background-size: 100% 100%;
  }
  .menu-next {
    right: -60px;
    background: url('@/assets/img/background/menu/menu-next.png') center center no-repeat;
    background-size: 100% 100%;
  }
  .menu-children {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    display: none;
    height: 60px;
    .menu-children-box {
      height: 100%;
      @include flex(center, flex-start, row);
    }
    .menu-children-item {
      width: 81px;
      height: 31px;

      background: rgba(28, 158, 255, 0.3);
      border: 1px solid #1c9eff;
      border-bottom-width: 4px;
      margin: 0 8px;
      cursor: pointer;
      .title {
        line-height: 26px;
        font-size: 14px;
        font-family: OPPOSans;
        font-weight: 500;
        color: #ffffff;
        background: none;
      }
    }
    .active-menu-children-item,
    .menu-children-item:hover {
      background: rgba(249, 218, 75, 0.3);
      border-color: #f9da4b !important;
    }
  }
  .menu-item {
    @include flex(center, center, row);
    margin: 0 14px;
    // min-width: 366px;
    color: white;
    // height: 120px;
    width: 120px;
    height: 37px;
    box-sizing: border-box;
    // background: rgba(24, 24, 24, 0.75);
    // margin: 0 14px;
    // border-radius: 2px;
    cursor: pointer;
    transition: all 0.1s;
    font-family: Source Han Sans SC;
    font-weight: 500;
    font-size: 36px;
    // background: url('@/assets/img/background/menu.png') center center no-repeat;
    background-size: 100% 100%;
    text-align: center;
    // padding-top: 28px;
    &:hover {
      color: #00ffff;
      .menu-children {
        display: block !important;
      }
    }
    .title {
      width: 100%;
      height: 100%;
      line-height: 37px;
      color: #ffffff;
      background: url('@/assets/img/background/menu/menu-noSelect.png') center center no-repeat;
      background-size: 100% 100%;
      font-size: 20px;
      font-family: OPPOSans;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.7);
    }
  }

  .active-item,
  .menu-item:hover {
    > .title {
      background: url('@/assets/img/background/menu/menu-select.png') center center no-repeat;
      background-size: 100% 100%;
      font-size: 20px;
      font-family: OPPOSans;
      font-weight: 500;
      color: #ffffff;
    }
    background: url('@/assets/img/background/menu-selected.png') center center no-repeat;
    background-size: 100% 100%;
  }
}
</style>
