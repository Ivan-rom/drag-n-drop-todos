import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from './App'
import { createStore } from 'redux'
import { todosReducer } from './redux/todosReducer'
import { Provider } from 'react-redux'

const store = createStore(todosReducer)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
