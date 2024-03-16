import { combineReducers } from 'redux';
import coursesReducer from './reducers/coursesReducer';

const rootReducer = combineReducers({
  courses: coursesReducer,
});

export default rootReducer;
