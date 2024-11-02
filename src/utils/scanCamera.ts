import { queryBySphere } from '@/utils/query';

export class ScanCamera {
  static instance: ScanCamera;
  footModel: any;
  constructor() {
    if (ScanCamera.instance) {
      return ScanCamera.instance;
    }
  }

  static async getInstance() {
    if (!ScanCamera.instance) {
      ScanCamera.instance = new ScanCamera();
    }
    return ScanCamera.instance;
  }

  scan(target: THING.BaseObject, distance: number, level: THING.BaseObject, queryStr: string) {
    ScanCamera.instance.createFooterModel();
    // const thing = queryBySphere(
    //   object.position,
    //   20,
    //   THING.App.current.level.current,
    //   '[userData/twinClassCode=SHE_XIANG_TOU]'
    // ) as any;
    // const currentLevel = uino.app.level.current;
    ScanCamera.instance.footModel.setParent(level);
    ScanCamera.instance.footModel.visible = true;
    ScanCamera.instance.footModel.position = target.position;
    const [x, y, z] = ScanCamera.instance.footModel.localPosition;
    ScanCamera.instance.footModel.localPosition = [x, 1, z];
    ScanCamera.instance.footModel.angles = [0, 0, 0];
    uino.app.camera.flyTo({
      object: ScanCamera.instance.footModel,
      radius: 30,
    });
    setTimeout(() => {
      ScanCamera.instance.footModel.visible = false;
      ScanCamera.instance.footModel.setParent(uino.app.root);
    }, 3000);
    const thing = queryBySphere(target, distance, uino.app, queryStr) as any;
    return thing;
  }

  createFooterModel() {
    if (!ScanCamera.instance.footModel) {
      ScanCamera.instance.footModel = uino.app.create({
        type: 'Thing',
        url: `${window.basex.httpOpt.previewModelUrl}model/ef915cab17fe42ecbbbf1f78e9541110/0/gltf`,
        // position: this.model.position,
        pickable: false,
        visible: false,
        inheritPickable: false,
        scale: [0.5, 0.5, 0.5],
      });
    }
  }
}
ScanCamera.getInstance();
export const scanCamera = ScanCamera.instance;
window.scanCamera = scanCamera;
