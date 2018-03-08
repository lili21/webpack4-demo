import app from './app'
import './app.css'

if (module.hot) {
  module.hot.accept('./app', app)
}

app()
