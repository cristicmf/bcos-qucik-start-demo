const changeCase = require("change-case");

const createModuleName = (opts) => {
  const { name = '' } = opts;

  return changeCase.camelCase(name);
};

const createReduxName = (opts) => {
  const { name = '' } = opts;

  return changeCase.constantCase(name);
};

const createComponentName = (opts = {}) => {
  const { name = '' } = opts;

  return changeCase.pascalCase(name);
};

const createClassName = (opts = {}) => {
  const { page = false, single = false, name = '', parentName = '' } = opts;

  if (single) {
    return changeCase.paramCase(name);
  }

  return changeCase.paramCase(`${page ? 'pages' : 'components'}-${parentName}-${name}-render`);
};

const clearLine = (code = '') => {
  const res = code
    .replace(/\n+(DELETE_LINE{1,})\n/g, '\n')
    .replace(/DELETE_LINE/, '')
    .replace(/\n+(\s{1,})\n/g, '\n\n')
    .replace(/\n+(\s{1,})\n/g, '\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^\n/, '');

  return res;
};

module.exports = {
  createComponentName,
  createClassName,
  createModuleName,
  createReduxName,
  clearLine,
};