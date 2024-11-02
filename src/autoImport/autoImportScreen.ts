import path from 'path-browserify';
import { registerScreen, screenLoader } from '../screenCore';

/**
 * 注册大屏组件
 * @param app
 */
const componentsList = import.meta.glob('/src/screens/*.vue', { eager: true });

// vue安装函数
export default function autoImportSvelte(app) {
  // eslint-disable-next-line no-restricted-syntax
  for (const component of Object.keys(componentsList)) {
    const screenName = path.basename(component, '.vue');
    registerScreen({
      name: screenName,
      ...componentsList[component].default.screenConfig,
    });
    // 因为组件获取是个异步的过程，所以要以异步组件形式注册组件
    app.component(
      screenName,
      screenLoader(
        componentsList[component].default,
        screenName,
        componentsList[component].default.screenConfig
      )
    );
  }
}
