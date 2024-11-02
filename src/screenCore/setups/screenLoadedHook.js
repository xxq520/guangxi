import {
  ref, watch,
} from 'vue';

const loaded = ref(false);
const handlerList = [];

watch(loaded, () => {
  handlerList.forEach((handler) => {
    handler();
  });
});
function changeLoadState(state) {
  loaded.value = state;
}
function onScreenLoaded(func) {
  handlerList.push(func);
}
export {
  changeLoadState,
  onScreenLoaded,
};
