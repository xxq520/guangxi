interface Uino {
  app: window.THING.App;
  map: any;
}
interface Menu {
  /** 菜单标题 */
  title: string;
  /** 菜单唯一id */
  code: string;
  /** 菜单对应的地址 */
  router: string;
}
interface Window {
  configXxv: any;
  uino: any;
  THING: any;
  $vm: any;
  CMAP: any;
  config: {
    /** 菜单 */
    menu: Menu[];
    [key: string]: any;
  };
  basex: any;
  data: any;
  kmeans: any;
  LoadModelIns: any;
  campusIns: any;
  CachedDownloader: any;
  MenuCameraView: MenuCameraView;
  [key: string]: any;
  [key: string]: Object; // 字段扩展声明
}
declare const uino: Uino;
declare const basex: any;
interface MenuCameraView {
  changeCameraView: (menuCode: string) => void;
}
