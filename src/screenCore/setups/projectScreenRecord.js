import { ref, computed } from 'vue';

const screenList = ref([]);

function registerScreen(screenInfo) {
  screenList.value.push({
    ...screenInfo,
    viewUrl: `./p/${screenInfo.name}`,
    devViewUrl: `./dev/p/${screenInfo.name}`,
    editorUrl: `./editor/p/${screenInfo.name}`,
  });
}
const screens = computed(() => screenList);
export { registerScreen, screens };
