// actions/attendanceActions.js
import { CLOCK_IN,CLOCK_OUT } from "../actiontypes/attendancetypes";

export const clockIn = () => ({
  type: CLOCK_IN,
});

export const clockOut = () => ({
  type: CLOCK_OUT,
});
