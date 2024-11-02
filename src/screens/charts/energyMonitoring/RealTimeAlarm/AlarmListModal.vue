<script lang="ts" setup>
import { useAppStore } from '@/store';
import { flyToTwin, reloadFlyToTwin } from '@/utils/thingjsx';
const store = useAppStore();
const props = withDefaults(
  defineProps<{
    title: string | undefined;
    modelValue?: boolean;
    alarm: any;
  }>(),
  {
    title: '',
    modelValue: true,
    alarm: [],
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

// 原始数据
const dataList = computed(() => props.alarm);

/** 表头数据 */
const columns = ref([
  {
    key: 'index',
    title: '序号',
    align: 'center',
    width: 100,
  },
  {
    key: 'deviceName',
    title: '告警设备',
    align: 'center',
    width: 210,
    className: 'line-overflow',
  },
  {
    key: 'description',
    title: '告警描述',
    align: 'center',
    width: 230,
    className: 'line-overflow',
  },
  {
    key: 'level',
    title: '告警级别',
    align: 'center',
    width: 100,
  },
  {
    key: 'date',
    title: '告警时间',
    align: 'center',
    width: 262,
  },
]);

/** 筛选之后的数据 */
const alarmList = ref<any>(dataList.value);

// 当前页
const currentPage = ref(1);
// 每页条数
const pageSize = ref(8);
// 总条数
const totalPage = computed(() => alarmList.value.length);
// 关键字
const keyword = ref('');
// 当前 tab 类型
const currentTabType = ref('');

// 当前页告警列表
const currentAlarmList = computed(
  () =>
    alarmList.value?.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value
    ) || []
);

/** 当页数据处理 */
const toggle = (page: number) => (currentPage.value = page);

/** 过滤数据。包括tab切换和关键字 */
const filterData = () => {
  alarmList.value = dataList.value
    ?.filter((item) => item.deviceName.includes(keyword.value))
    ?.filter((item) => item.level.includes(currentTabType.value));
};

type TabItem = { name: string; value: number; type: string; color?: string; isActive: boolean };
const tabList = ref<TabItem[]>([]);

// 动态设置当前 tab 的数量信息
const setTabListData = () => {
  const tempData = dataList.value?.filter((item) => item.deviceName.includes(keyword.value));

  tabList.value = [
    {
      name: '告警总数',
      value: tempData.length,
      isActive: currentTabType.value === '',
      color: '',
      type: '',
    },
    {
      name: '紧急总数',
      value: tempData.filter((item: any) => item?.level?.includes('紧急'))?.length || 0,
      isActive: currentTabType.value === '紧急',
      color: '#F9DA4B',
      type: '紧急',
    },
    {
      name: '常规总数',
      value: tempData.filter((item: any) => item?.level?.includes('常规'))?.length || 0,
      isActive: currentTabType.value === '常规',
      color: '#39D56C',
      type: '常规',
    },
  ];
};

const changeTab = (item: TabItem) => {
  setTabListData();
  currentTabType.value = item.type;
  currentPage.value = 1;
  filterData();
  tabList.value = tabList.value.map((cItem) => ({
    ...cItem,
    isActive: item.name === cItem.name,
  }));
};

watch(
  () => keyword.value,
  () => {
    setTabListData();
  },
  {
    immediate: true,
  }
);

// 搜索时重置分页
watch(
  () => keyword.value,
  () => (currentPage.value = 1)
);

watch(
  () => props.modelValue,
  (value: boolean) => {
    if (!value) {
      keyword.value = '';
      changeTab(tabList.value[0]);
    }
  }
);

const rowClick = (item: any) => {
  if (store.activeMenuInfo?.code == 'assetManagement') {
    reloadFlyToTwin(item.twin);
  } else {
    flyToTwin('#' + item.twin);
  }
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
        <div class="alarm-filter">
          <div class="alarm-tab-list">
            <div
              class="alarm-tab-item"
              @click="changeTab(item)"
              :class="{ 'alarm-tab-item-active': item.isActive }"
              v-for="item in tabList"
              :key="item.name"
            >
              <div
                class="color-block"
                v-if="item.color"
                :style="{ backgroundColor: item.color }"
              ></div>
              {{ item.name }}({{ item.value }})
            </div>
          </div>

          <div class="filter-input-box">
            <input
              type="text"
              class="filter-input"
              v-model="keyword"
              placeholder="请输入搜索内容"
              @keyup="filterData"
            />
            <div class="filter-btn" @click="filterData">
              <img src="@/assets/img/energy/search-icon.png" alt="" />
              搜索
            </div>
          </div>
        </div>

        <div class="table-list">
          <scroll-table
            :data="currentAlarmList || []"
            :columns="columns"
            :autoPlay="true"
            @row-click="rowClick"
          >
            <template #level="scope">
              <div class="row-data-level">
                <div
                  class="color-radius"
                  :style="{ backgroundColor: scope.row.level === '紧急' ? '#F9DA4B' : '#39D56C' }"
                ></div>
                <span>{{ scope.row.level }}</span>
              </div>
            </template>
          </scroll-table>

          <div class="pagenation-box">
            <page-toggle
              @toggle="toggle"
              :currentPage="currentPage"
              :total="totalPage"
              :pageNum="pageSize"
            />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.alarm-list-modal {
  width: 912px;
  height: 475px;
  background: url('@/assets/img/energy/alarm-list-modal-bg.png') no-repeat;
  background-size: cover;
  position: fixed;
  z-index: 99;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -60%);
  padding: 5px;
  box-sizing: border-box;
  :deep(.el-table__header) {
    width: 100% !important;
  }
  :deep(.el-table__body) {
    width: 100% !important;
  }

  &:before {
    content: '';
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
    .alarm-filter {
      padding-top: 15px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;

      .alarm-tab-list {
        display: flex;
        margin-left: 18px;

        .alarm-tab-item {
          width: 138px;
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 16px;
          font-family: OPPOSans;
          font-weight: 500;
          color: #ffffff;
          background-image: url('@/assets/img/energy/alarm-btn-bg.png');
          background-repeat: no-repeat;
          background-size: contain;
          margin-right: 19px;
          cursor: pointer;
        }

        .color-block {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          position: relative;
          top: -2px;
        }

        .alarm-tab-item-active {
          background-image: url('@/assets/img/energy/alarm-btn-active-bg.png');
        }
      }

      .filter-input-box {
        margin-top: 8px;
        margin-right: 18px;
        display: flex;
        align-items: center;

        .filter-input {
          height: 27px;
          width: 200px;
          border: 1px solid #30425b;
          outline: none;
          background: transparent;
          padding-left: 10px;
          font-size: 12px;
          font-family: OPPOSans;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.5);

          &:focus {
            outline: none;
          }

          &::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }
        }

        .filter-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 66px;
          height: 27px;
          line-height: 27px;
          background: url('@/assets/img/energy/search-btn.png');
          background-size: cover;
          background-repeat: no-repeat;
          font-size: 12px;
          font-family: OPPOSans;
          font-weight: 500;
          color: #ffffff;
          margin-left: 10px;
          cursor: pointer;

          img {
            margin-right: 5px;
          }
        }
      }
    }

    .row-data-level {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .color-radius {
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 4px;
    }

    .table-list {
      margin-top: 10px;
    }

    :deep(.el-table__body .el-table__row),
    :deep(.el-table__header tr) {
      height: 28px;
    }

    .pagenation-box {
      position: absolute;
      right: 20px;
      bottom: 20px;
    }
  }
}
</style>
