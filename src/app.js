import(/* webpackChunkName: 'async-bar' */'./async-bar')
import('./async-foo')

export default function app() {
  console.log('Hello, webpack@4')
}
