/*

由于是使用的 webpack 的 Loader，可以根据需要在 next.config.js 文件中进行一些相关的设置
详细可见 https://github.com/zeit/next-plugins/tree/master/packages/next-sass#with-css-modules-and-options

*/

const withSass = require('@zeit/next-sass')
module.exports = withSass()