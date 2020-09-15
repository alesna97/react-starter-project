import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './styles/theme';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './redux/reducers';
import { Provider } from 'react-redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <Routes />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));
serviceWorker.unregister();
