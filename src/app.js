import('./async-bar').then(() => {
  console.log('async-bar loaded')
})

export default function app() {
  console.log('Hello, webpack@4')
}
