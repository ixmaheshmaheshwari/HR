import{ useState, useEffect } from 'react';
import {  message, Calendar } from 'antd';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { AttendanceState, LoginState } from '../../redux/store/rootreducer';
import { clockIn, clockOut } from '../../redux/actions/attendanceaction';
import  { Dayjs } from 'dayjs';

const AttendanceCalendar = () => {
  const [clockInTime, setClockInTime] = useState('');
  const [clockOutTime, setClockOutTime] = useState('');
  const [isOnLeave] = useState(false);
  const dispatch = useDispatch();
  const [attendanceData, setAttendanceData] = useState<{ [key: number]: any[] }>({});

  const userId = useSelector(
    (state: { auth: LoginState }) => state.auth.userId
  );
  const IsClockIn = useSelector(
    (state: { attendance: AttendanceState }) => state.attendance.clockedIn
  );
  console.log(IsClockIn)
  

  const IsClockOut = useSelector(
    (state: { attendance: AttendanceState }) => state.attendance.clockedOut
      );
      console.log(IsClockOut)

  useEffect(() => {
    // Fetch attendance data from localStorage
    const storedData = localStorage.getItem('attendanceData');
    if (storedData) {
      setAttendanceData(JSON.parse(storedData));
    }
    const todayDate = moment().format('YYYY-MM-DD');
    const userData = attendanceData[userId] || [];
    const todayAttendance = userData.find(entry => entry.date === todayDate);
    if (todayAttendance && todayAttendance.clockInTime) {
      setClockInTime(todayAttendance.clockInTime);
    }
    if (todayAttendance && todayAttendance.clockOutTime) {
      setClockInTime(todayAttendance.clockOutTime);
    }
  }, []);

  const handleClockIn = () => {
    dispatch(clockIn());
    const todayDate = moment().format('YYYY-MM-DD');
    const currentTime = moment().format('HH:mm:ss');

    let userData = attendanceData[userId] || [];

    if (userData.find(entry => entry.date === todayDate)) {
      message.warning('You have already clocked in for today.');
      return;
    }

    userData.push({ date: todayDate, clockInTime: currentTime, isOnLeave: false });
    setAttendanceData({ ...attendanceData, [userId]: userData });
    localStorage.setItem('attendanceData', JSON.stringify(attendanceData));

    setClockInTime(currentTime);
  
  };

  console.log(clockInTime)
  const handleClockOut = () => {
    dispatch(clockOut());
    const todayDate = moment().format('YYYY-MM-DD');
    const currentTime = moment().format('HH:mm:ss');

    let userData = attendanceData[userId] || [];
    const todayAttendance = userData.find(entry => entry.date === todayDate);

    if (!todayAttendance) {
      message.warning('You have not clocked in yet.');
      return;
    }

    todayAttendance.clockOutTime = currentTime;
    setAttendanceData({ ...attendanceData, [userId]: userData });
    localStorage.setItem('attendanceData', JSON.stringify(attendanceData));

    setClockOutTime(currentTime);
  };

  const dateCellRender = (value: Dayjs): React.ReactNode => {
    const date = value.format('YYYY-MM-DD');  const userData = attendanceData[userId] || [];
    const attendanceEntry = userData.find(entry => entry.date === date);
    if (attendanceEntry) {
      return (
        <div>
          {attendanceEntry.clockInTime && <div style={{ color: 'green' }}>In {attendanceEntry.clockInTime}</div>}
          {attendanceEntry.clockOutTime && <div style={{ color: 'red' }}>Out {attendanceEntry.clockOutTime}</div>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center">
        <h2 className="text-2xl mb-4">Attendance Calendar</h2>
        <div className="my-4">
        {!IsClockIn && !clockInTime && (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClockIn}>
          Clock In
        </button>
      )}
      {IsClockIn && !clockOutTime && (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClockOut}>
          Clock Out
        </button>
      )}
      </div>
      {isOnLeave && <p className="text-red-500 mt-4">You are on leave today.</p>}
    
      
      <Calendar dateCellRender={dateCellRender} />
      </div>
  );
};

export default AttendanceCalendar;
