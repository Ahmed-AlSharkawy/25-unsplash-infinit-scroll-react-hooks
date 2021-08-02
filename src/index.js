import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import PhotosProvider from './PhotosContext'

ReactDOM.render(
  <PhotosProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </PhotosProvider>,
  document.getElementById('root')
)
