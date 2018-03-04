import { // 名前が被ってしまうので別名でimportする
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';

import * as reducers from './reducers'; // historyはsrc/index.jsから渡すようにする

export default function createStore(history) {
  return reduxCreateStore(combineReducers({
    ...reducers, // react-router-reduxのReducer
    router: routerReducer,
  }),
    applyMiddleware(logger, // react-router-reduxのRedux Middleware
      logger,
      thunk,
      routerMiddleware(history)
    )
  );
}