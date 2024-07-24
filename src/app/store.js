import { applyMiddleware, createStore } from 'redux';

import todosReducer from './redux/reducer'; // Adjust the path based on your directory structure
import { composeWithDevTools } from 'redux-devtools-extension';
import { thunk } from 'redux-thunk';

// Create a composed enhancer with DevTools and middleware
const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunk) // Apply thunk middleware
  // Add other store enhancers here if needed
);

const store = createStore(todosReducer, composedEnhancer);

export default store;
