import { combineReducers } from 'redux';
import LoginReducres from '../reducers/LoginReducres';
import { persistReducer } from 'redux-persist';
import persistConfig from './prersistsconfig';
import attendanceReducer from '../reducers/attendancereducers';

// Define the type for your reducers
export type LoginState = ReturnType<typeof LoginReducres>;
export type AttendanceState = ReturnType<typeof attendanceReducer>;

// Combine reducers
const rootReducer = combineReducers({
  auth: LoginReducres,
  attendance: attendanceReducer,
  // Other reducers if any
});

// Define RootState based on the combined reducers
export type RootState = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);
