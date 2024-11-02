/** 范围查询物体的函数重载实现 */
export function queryBySphere(
  target: THING.BaseObject,
  distance: number,
  level: any,
  query = '.Thing'
) {
  const allTwins = level
    ?.query(query)
    ?.objects?.filter((item: any) => item.distanceTo(item) <= distance);
  const filterTwin = allTwins.sort(
    (current: any, next: any) => target.distanceTo(current) - target.distanceTo(next)
  );
  return filterTwin;
}
