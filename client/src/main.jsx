import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from "./store";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import persistStore from "redux-persist/es/persistStore";

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
  {/* <PersistGate loading={<div>Loading...</div>}> */}
      <App />
  {/* </PersistGate> */}
</Provider>
,
)
