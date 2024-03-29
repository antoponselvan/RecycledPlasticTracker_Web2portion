// @ts-nocheck 
import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux"
import store from "./store/store"
import App from './App'
import WalletContextProvider from "./contexts/Wallet"
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <WalletContextProvider>
      <App />
    </WalletContextProvider>
    
  </Provider>
)
