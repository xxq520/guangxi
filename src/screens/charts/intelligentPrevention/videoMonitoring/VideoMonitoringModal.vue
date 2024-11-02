<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title: string | undefined;
    modelValue?: boolean;
    url: string;
  }>(),
  {
    title: '',
    modelValue: true,
    url: '',
  }
);

const emit = defineEmits<{
  (event: 'update:modelValue', visible: boolean): void;
  (event: 'close'): void;
}>();

const close = () => {
  emit('update:modelValue', false);
  emit('close');
};

</script>

<template>
  <teleport to="body">
    <div class="alarm-list-modal" v-if="modelValue">
      <div class="modal-header">
        <div class="modal-title">{{ title }}</div>
        <img class="modal-close" src="@/assets/img/energy/modal-close-icon.png" @click="close" />
      </div>

      <div class="modal-body">
        <iframe :src="url"></iframe>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.alarm-list-modal {
  width: 740px;
  height: 476px;
  background: url('@/assets/img/intelligent-prevention/video-modal.png') no-repeat;
  background-size: cover;
  position: fixed;
  z-index: 99;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
  padding: 5px;
  box-sizing: border-box;

  &:before {
    content: "";
    width: 100vw;
    height: 100vh;
    background: transparent;
    z-index: -1;
    position: fixed;
    left: -50%;
    top: -50%;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;

    .modal-title {
      height: 20px;
      font-size: 20px;
      font-family: OPPOSans;
      font-weight: 800;
      color: #ffffff;
      padding-left: 45px;
    }

    .modal-close {
      width: 24px;
      height: 17px;
      margin-right: 18px;
      cursor: pointer;
    }
  }

  .modal-body {
    iframe {
      display: block;
      width: 677px;
      height: 381px;
      border: none;
      margin: 24px auto;
    }
  }
}
</style>
