// 异步加载的模块里如果存在css的话，一定要通过 /* webpackChunkName */设置名字，不然会报错
// mini-css-webpack-plugin的bug 
// 参考 https://github.com/webpack-contrib/mini-css-extract-plugin/issues/146
import(/* webpackChunkName: "async-bar" */'./async-bar')
import(/* webpackChunkName: "async-foo" */'./async-foo')

export default function app() {
  console.log('Hello, webpack@4')
}
