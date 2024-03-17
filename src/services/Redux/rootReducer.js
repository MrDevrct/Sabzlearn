import { combineReducers } from 'redux';
import coursesReducer from './reducers/coursesReducer';
import openMenuReducer from './reducers/openMenuReducer';

const rootReducer = combineReducers({
  courses: coursesReducer,
  OpenMenu: openMenuReducer
});

export default rootReducer;
