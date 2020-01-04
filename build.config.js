// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const DEV_SERVER_PORT = 5000;
const DEV_SERVER_HOST = 'localhost';

// const createWebpackEntries = ({
//   isProd = true,
//   url = 'http://localhost:5000',
//   path = '/__webpack_hmr',
// }) => (mapping = []) => {
//   const hotloader = `webpack-hot-middleware/client?path=${url}${path}`;
// 
//   return mapping.reduce((acc, [key, ...entries]) => {
//     acc[key] = isProd ? [...entries] : [hotloader, ...entries];
//     return acc;
//   }, {});
// };
// 
// const createWebpackCacheGroups = (mapping = []) => (
//   mapping.reduce((acc, o = []) => {
//     const [name = '', targets = []] = o;
//     const s = targets.reduce((acc2, name2) => acc2.concat(`(${name2})`), []).join('');
//     const test = new RegExp(`[\\/]node_modules[\\/]${s}[\\/]`);
// 
//     acc[name] = { test, name };
//     return acc;
//   }, {
//     default: false, // Disable the default.
//     vendors: false, // Disable the default.
//   })
// );
// 
// const createWebpackViewTemplates = ({ rootDir = __dirname }) => (mapping = []) => (
//   mapping.reduce((acc, [template = '', target = '', chunks = []]) => (
//     acc.concat(
//       new HtmlWebpackPlugin({
//         template,
//         filename: path.resolve(rootDir, target),
//         chunks,
//       })
//     )
//   ), [])
// );

module.exports = {
  DEV_SERVER_PORT,
  DEV_SERVER_HOST,
  // createWebpackEntries,
  // createWebpackCacheGroups,
  // createWebpackViewTemplates,
};
