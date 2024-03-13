// reducers/attendanceReducer.js
import { CLOCK_IN,CLOCK_OUT } from "../actiontypes/attendancetypes";
import { Log_out } from "../actiontypes/loginactiontypes";
const initialState = {
  clockedIn: false,
  clockedOut: false,
};

const attendanceReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case CLOCK_IN:
      return {
        ...state,
        clockedIn: true,
        clockedOut: false,
      };
    case CLOCK_OUT:
      return {
        ...state,
        clockedIn: false,
        clockedOut: true,
      };
      case Log_out:
        return {
          ...state,
          clockedIn: false,
          clockedOut: false,
        };
    default:
      return state;
  }
};

export default attendanceReducer;
