import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reduceres from './reducers'
// redux分析工具
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(reduceres,composeWithDevTools(applyMiddleware(thunk)))