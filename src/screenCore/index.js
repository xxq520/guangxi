import screenLoader from './loaders/screenLoader';
import screenCore from './components/screenCore.vue';
import screenAgent from './components/screenAgent.vue';
import { onScreenLoaded } from './setups/screenLoadedHook';
import { registerScreen, screens } from './setups/projectScreenRecord';

export {
  onScreenLoaded,
  screenAgent,
  screenLoader,
  screenCore,
  registerScreen,
  screens,
};
