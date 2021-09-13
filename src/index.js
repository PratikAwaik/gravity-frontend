import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import 'remixicon/fonts/remixicon.css';
import App from './App';
import reducers from './reducers/index';

const store = createStore(
  reducers,
  applyMiddleware(thunk) 
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
