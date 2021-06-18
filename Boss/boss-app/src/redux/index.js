import { createStore } from 'redux';
import reducers from './reducers'

// redux-tools 工具使用
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(reducers,composeWithDevTools())