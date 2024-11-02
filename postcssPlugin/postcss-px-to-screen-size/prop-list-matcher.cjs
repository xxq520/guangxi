const filterPropList = {
  exact(list) {
    return list.filter((m) => m.match(/^[^\*\!]+$/));
  },
  contain(list) {
    return list.filter((m) => m.match(/^\*.+\*$/)).map((m) => m.substr(1, m.length - 2));
  },
  endWith(list) {
    return list.filter((m) => m.match(/^\*[^\*]+$/)).map((m) => m.substr(1));
  },
  startWith(list) {
    return list.filter((m) => m.match(/^[^\\*\!]+\*$/)).map((m) => m.substr(0, m.length - 1));
  },
  notExact(list) {
    return list.filter((m) => m.match(/^\![^\*].*$/)).map((m) => m.substr(1));
  },
  notContain(list) {
    return list.filter((m) => m.match(/^\!\*.+\*$/)).map((m) => m.substr(2, m.length - 3));
  },
  notEndWith(list) {
    return list.filter((m) => m.match(/^\!\*[^\*]+$/)).map((m) => m.substr(2));
  },
  notStartWith(list) {
    return list.filter((m) => m.match(/^\![^\*]+\*$/)).map((m) => m.substr(1, m.length - 2));
  },
};

function createPropListMatcher(propList) {
  const hasWild = propList.indexOf('*') > -1;
  const matchAll = (hasWild && propList.length === 1);
  const lists = {
    exact: filterPropList.exact(propList),
    contain: filterPropList.contain(propList),
    startWith: filterPropList.startWith(propList),
    endWith: filterPropList.endWith(propList),
    notExact: filterPropList.notExact(propList),
    notContain: filterPropList.notContain(propList),
    notStartWith: filterPropList.notStartWith(propList),
    notEndWith: filterPropList.notEndWith(propList),
  };
  return function (prop) {
    if (matchAll) return true;
    return (
      (
        hasWild
        || lists.exact.indexOf(prop) > -1
        || lists.contain.some((m) => prop.indexOf(m) > -1)
        || lists.startWith.some((m) => prop.indexOf(m) === 0)
        || lists.endWith.some((m) => prop.indexOf(m) === prop.length - m.length)
      )
      && !(
        lists.notExact.indexOf(prop) > -1
        || lists.notContain.some((m) => prop.indexOf(m) > -1)
        || lists.notStartWith.some((m) => prop.indexOf(m) === 0)
        || lists.notEndWith.some((m) => prop.indexOf(m) === prop.length - m.length)
      )
    );
  };
}

module.exports = {
  filterPropList,
  createPropListMatcher,
};
