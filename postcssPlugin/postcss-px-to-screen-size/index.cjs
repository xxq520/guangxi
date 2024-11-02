const { createPropListMatcher } = require('./prop-list-matcher.cjs');
const { getUnitRegexp } = require('./pixel-unit-regexp.cjs');

const defaults = {
  unitToConvert: 'px',
  selectorBlackList: [],
  propList: ['*'],
};

const ignoreNextComment = 'adaptor-convert-ignore-next';
const ignorePrevComment = 'adaptor-convert-ignore';

function getUnit(prop, opts) {
  return prop.indexOf('font') === -1 ? opts.viewportUnit : opts.fontViewportUnit;
}

function createPxReplace() {
  return function (m, $1) {
    if (!$1) return m;
    const pixels = parseFloat($1);
    return `calc(${pixels}px / var(--targetWidth) * var(--realWidth))`;
    // return parseFloat((pixels / viewportSize * 100).toFixed(5)) + viewportUnit;
  };
}

function blacklistedSelector(blacklist, selector) {
  if (typeof selector !== 'string') return;
  // eslint-disable-next-line consistent-return
  return blacklist.some((regex) => {
    if (typeof regex === 'string') return selector.indexOf(regex) !== -1;
    return selector.match(regex);
  });
}

function isExclude(reg, file) {
  if (Object.prototype.toString.call(reg) !== '[object RegExp]') {
    throw new Error('options.exclude should be RegExp.');
  }
  return file.match(reg) !== null;
}

function declarationExists(decls, prop, value) {
  return decls.some((decl) => (decl.prop === prop && decl.value === value));
}

function validateParams(params, mediaQuery) {
  return !params || (params && mediaQuery);
}

function checkRegExpOrArray(options, optionName) {
  const option = options[optionName];
  if (!option) return;
  if (Object.prototype.toString.call(option) === '[object RegExp]') return;
  if (Object.prototype.toString.call(option) === '[object Array]') {
    let bad = false;
    for (let i = 0; i < option.length; i++) {
      if (Object.prototype.toString.call(option[i]) !== '[object RegExp]') {
        bad = true;
        break;
      }
    }
    if (!bad) return;
  }
  throw new Error('options.' + optionName + ' should be RegExp or Array of RegExp.');
}

module.exports = (options) => {
  const opts = { ...defaults, ...options };

  checkRegExpOrArray(opts, 'exclude');
  checkRegExpOrArray(opts, 'include');

  const pxRegex = getUnitRegexp(opts.unitToConvert);
  const satisfyPropList = createPropListMatcher(opts.propList);

  return function (css, result) {
    css.walkRules((rule) => {
      // Add exclude option to ignore some files like 'node_modules'
      const file = rule.source && rule.source.input.file;

      if (opts.include && file) {
        if (Object.prototype.toString.call(opts.include) === '[object RegExp]') {
          if (!opts.include.test(file)) return;
        } else if (Object.prototype.toString.call(opts.include) === '[object Array]') {
          let flag = false;
          for (let i = 0; i < opts.include.length; i++) {
            if (opts.include[i].test(file)) {
              flag = true;
              break;
            }
          }
          if (!flag) return;
        }
      }

      if (opts.exclude && file) {
        if (Object.prototype.toString.call(opts.exclude) === '[object RegExp]') {
          if (isExclude(opts.exclude, file)) return;
        } else if (Object.prototype.toString.call(opts.exclude) === '[object Array]') {
          for (let i = 0; i < opts.exclude.length; i++) {
            if (isExclude(opts.exclude[i], file)) return;
          }
        } else {
          throw new Error('options.exclude should be RegExp or Array.');
        }
      }

      if (blacklistedSelector(opts.selectorBlackList, rule.selector)) return;

      if (!validateParams(rule.parent.params, opts.mediaQuery)) return;

      rule.walkDecls((decl) => {
        if (decl.value.indexOf(opts.unitToConvert) === -1) return;
        if (!satisfyPropList(decl.prop)) return;

        const prev = decl.prev();
        // prev declaration is ignore conversion comment at same line
        if (prev && prev.type === 'comment' && prev.text === ignoreNextComment) {
          // remove comment
          prev.remove();
          return;
        }
        const next = decl.next();
        // next declaration is ignore conversion comment at same line
        if (next && next.type === 'comment' && next.text === ignorePrevComment) {
          if (/\n/.test(next.raws.before)) {
            result.warn('Unexpected comment /* ' + ignorePrevComment + ' */ must be after declaration at same line.', { node: next });
          } else {
            // remove comment
            next.remove();
            return;
          }
        }

        let unit;
        unit = getUnit(decl.prop, opts);

        const value = decl.value.replace(pxRegex, createPxReplace(opts, unit));

        if (declarationExists(decl.parent, decl.prop, value)) return;
        decl.value = value;
      });
    });
  };
};

module.exports.postcss = true;
