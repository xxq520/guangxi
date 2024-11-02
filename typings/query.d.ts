declare type QueryParam = string | RegExp;
/**
 * 查询物体
 * @param {String} condition 查询的条件
 * @return THING.Selector<T> 查询出来的物体数组集合
 */
export declare function query<T extends THING.BaseObject>(condition: QueryParam): THING.Selector<T>;
/**
 * 查询物体
 * @param {String} condition 查询的条件
 * @param {Number} index 需要返回的下标项数据
 * @return 对应的物体对象实例，没有则返回undefined
 */
export declare function query<T extends THING.BaseObject>(condition: QueryParam, index: number): T | undefined;
/**
 * 传入中心坐标信息，查询周围的物体
 * @param {Array} position 中心坐标信息
 * @param {Number} distance 需要获取距离周围多远的物体
 * @param {String} query 查询物体的条件，默认为查询.Thing类型物体
 * @return 附近的物体
 */
export declare function queryBySphere<T extends THING.Selector>(position: Array<number>, distance: number, query: string): THING.Selector<T>;
/**
 * 传入中心坐标信息，查询周围的物体
 * @param {Array} position 中心坐标信息
 * @param {Number} distance 需要获取距离周围多远的物体
 * @param {Object} level 获取该对象下的所有物体做距离判断，例如只需要获取
 *  当前楼层的周围物体时只需要传入楼层的实例即可，节约性能消耗。默认为整个场景层级
 * @param {String} query 查询物体的条件，默认为查询.Thing类型物体
 * @param {Boolean} queryNowLevel 是否只查询当前层级的物体，不包含子物体
 * @return 附近的物体
 */
export declare function queryBySphere<T extends THING.Selector>(position: Array<number>, distance: number, level: THING.BaseObject | null, query: string, queryNowLevel?: boolean | false): THING.Selector<T>;
export {};
