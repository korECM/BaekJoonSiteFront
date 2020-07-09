import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './modules';
import Thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import { setUser } from './modules/user';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(Thunk)));

const loadUser = () => {
  try {
    const user = localStorage.getItem('user');
    if (!user) return;

    console.log(JSON.parse(user));

    store.dispatch(setUser(JSON.parse(user)));
  } catch (error) {}
};

loadUser();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
