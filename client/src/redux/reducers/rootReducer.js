import { combineReducers } from 'redux';
import userReducer from './userReducer'; // Import your user reducer

const rootReducer = combineReducers({
  user: userReducer, // Add your user reducer here
  // Add more reducers for other parts of your state here
});

export default rootReducer;
