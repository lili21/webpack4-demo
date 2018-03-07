import preact from 'preact'
import './bar'
import(/* webpackChunkName: "async-bar" */'./async-bar').then(a => console.log(a))
import(/* webpackChunkName: "async-foo" */'./async-foo').then(a => console.log(a))
console.log(preact.toString())
console.log('hello preact')