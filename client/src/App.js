import React, { Component } from 'react'
import { Provider } from 'react-redux'
import logo from './circle2.svg'
import './App.css'
import store from './store'
import MainDisplay from './components/MainDisplay/mainDisplay'

class App extends Component {

  render () {
    return (
      <Provider store={ store }>
        <div className="App">
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo"/>
            <h1 className="App-title">TL;DR</h1>
          </header>
          <div className="App-body">
          <MainDisplay/>
          </div>
          
        </div>
      </Provider>
    )
  }
}

export default App
