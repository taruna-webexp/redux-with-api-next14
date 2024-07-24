"use client"
import { combineReducers } from 'redux';
import todosReducer from '../reducer';

const rootReducer = combineReducers({
  todos: todosReducer,
  // Add other reducers here if you have more
});

export default rootReducer;
