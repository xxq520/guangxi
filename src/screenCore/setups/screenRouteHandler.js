import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

/**
 * screenRouteHandler
 * 根据路由来选择大屏的渲染模式，如果是项目内的大屏，则渲染相应的组件，如果是创建的新大屏，就渲染基础组件然后拉取配置
 * @returns {{screenType: Ref<UnwrapRef<string>>, screenName: Ref<UnwrapRef<string>>, screenLayoutConfig: Ref<UnwrapRef<{layout: string, width: number, height: number}>>}}
 */
export default function screenRouteHandler() {
  const route = useRoute();
  // 大屏类型，自定义创建的还是项目自带的
  const screenType = ref('project');
  const screenLayoutConfig = ref({
    // 大屏样式配置
    width: 1920,
    height: 1080,
    layout: 'fixed',
  });
  const screenName = ref('');
  watchEffect(() => {
    if (
      route.name === 'customScreenViewer' ||
      route.name === 'customScreenEditor' ||
      route.name === 'customDevScreenViewer'
    ) {
      screenType.value = 'custom';
      const { configId } = route.params;
      console.log(configId);
      // todo 获取自行配置的大屏内容
      // screenLayoutConfig.value = getScreenConfig(configId);
    } else if (
      route.name === 'projectScreenViewer' ||
      route.name === 'projectScreenEditor' ||
      route.name === 'projectDevScreenViewer'
    ) {
      screenType.value = 'project';
      screenName.value = route.params.screenName;
    }
  });
  return {
    screenLayoutConfig,
    screenType,
    screenName,
  };
}
