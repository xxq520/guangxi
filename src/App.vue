<template>
  <KeepAlive>
    <div :style="screenStyle" class="uearth" v-if="route.params.screenName != 'login'">
      <loading-page v-if="showLoading" />
      <component :is="backgroundComponent" v-bind="attrs" v-on="eventHandlers" />
      <!-- thingjsx场景 -->
      <iframe :src="thingjsX" id="thing-x" allowfullscreen="true"></iframe>
      <!-- 菜单 -->
      <t-menu v-if="store?.menusInfo?.length && route.params.screenName != 'home'" />
    </div>
  </KeepAlive>
  <KeepAlive>
    <div :style="screenStyle" class="public-component">
      <!-- 三维场景楼层选择 -->
    </div>
  </KeepAlive>
  <el-config-provider>
    <router-view />
    <panel />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue';
import { ElConfigProvider } from 'element-plus';
// import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { useAppStore } from './store/index';
// import cameraLevel from '@/utils/levelManager/cameraLevel';
import { useThing } from './store/thingStore';
import { config } from 'process';
import router from '@/routers';
import { takeOverMessage } from './utils/thingjsx';
import { useRoute } from 'vue-router';

document.title = window.config.title;
export default defineComponent({
  name: 'App',
  components: {
    ElConfigProvider,
  },
  setup() {
    const store = useAppStore();
    const route = useRoute();
    const activeCode = computed(() => store.activeMenuInfo?.code);
    const useThingStore = useThing();
    store.setShowLoading(true);
    const showLoading = computed(() => window.config.showProcess && store.showLoading);
    /** 根据层级展示用水用电按钮 能耗管理主题不需要展示楼层组件 */
    const buildingOrFloor = computed(() =>
      ['Building', 'Floor'].includes(useThingStore?.currentLevel?.type)
    );

    /** 获取菜单 */

    const backgroundComponent = ref('');

    const attrs = ref({});
    const eventHandlers = ref({});
    const renderBackground = (
      componentName: string,
      props: Record<string, any>,
      handlers: Record<string, any>
    ) => {
      backgroundComponent.value = componentName;
      attrs.value = props;
      eventHandlers.value = handlers;
    };
    const screenStyle = ref({});
    const updateScreenStyle = (style: any) => {
      screenStyle.value = { ...screenStyle.value, ...style };
    };
    provide('renderBackground', renderBackground);
    provide('updateScreenStyle', updateScreenStyle);
    provide('updateScreenDevStyle', updateScreenStyle);
    const showUe = ref(window.config.showUe);

    /** 设置菜单 */
    store.setMenusInfo(window.config.menu);

    window.addEventListener('message', ({ data }) => {
      if (data?.source?.includes('vue-devtool')) return;
      console.info('父页面收到消息，消息内容为：', data);
      takeOverMessage(data);
    });

    return {
      // locale: zhCn,
      backgroundComponent,
      attrs,
      eventHandlers,
      screenStyle,
      activeCode,
      showUe,
      buildingOrFloor,
      thingjsX: window.config.thingjsX,
      store,
      route,
      showLoading,
    };
  },
});
</script>

<style lang="scss">
html,
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  font-size: 14px;
  font-family: AlibabaPuHuiTi, AlibabaPuHuiTi-Medium;
  font-weight: 400;
  color: #fff;
}

.background-container {
  position: fixed;
  overflow: hidden;
}

#screenCore {
  background: transparent !important;
}

.getLayoutClass {
  background: url('@/assets/img/background/body.png') center center no-repeat !important;
  background-size: 100% 100% !important;
  position: relative;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.uearth {
  overflow: hidden;
  position: fixed;
  width: 1920px;
  left: 0px;
  background: #23364e;

  .ue-play {
    width: 1920px;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  iframe {
    width: 100vw;
    height: 100vh;
  }
}

.public-component {
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  pointer-events: none;
}

.video-mask {
  .mask {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    pointer-events: none;
    background: #0000005e;
  }

  .full-video {
    pointer-events: auto;
    width: 1000px;
    height: 560px;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);

    .video {
      width: 100%;
      height: 100%;
    }

    .close {
      position: absolute;
      right: 0px;
      // top: 1000px;
      z-index: 2;
      width: 29px;
      height: 28px;
      background: url('@/assets/img/background/camera/close.png') no-repeat 0 0 / 100% 100%;
    }
  }

  .full-photo {
    pointer-events: auto;
    width: 509px;
    height: 337px;
    background: url('@/assets/img/background/spaceManagement/photo-bg.png') no-repeat 0 0 / 100%
      100%;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);

    > p {
      font-size: 18px;
      font-family: AlibabaPuHuiTi;
      color: #ffffff;
      margin: 11px 0 0 11px;
    }

    .photo {
      width: 472px;
      height: 265px;
      margin: 15px 0 0 19px;
    }

    .close {
      position: absolute;
      right: 3px;
      top: 3px;
      z-index: 2;
      width: 29px;
      height: 28px;
      background: url('@/assets/img/background/camera/close.png') no-repeat 0 0 / 100% 100%;
    }
  }
}
</style>
