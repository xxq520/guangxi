import autoImportScreen from './autoImportScreen';

export default {
  async install(app: any) {
    autoImportScreen(app);
  },
};
