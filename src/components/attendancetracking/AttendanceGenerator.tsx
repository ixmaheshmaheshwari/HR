import { useState } from 'react';
import { Select, Table } from 'antd';
import moment from 'moment';
interface Employee {
  employeeId: number;
  firstName: string;
  addedBy: string;
  addedTime: Date;
  lastName: string;
  imageUrl?: string | null;
  email: string;
  dateOfJoining: Date;
  secondaryReportingTo?: string;
  reportingTo: string;
  leadPosition: string;
  sourceOfHire?: string;
  seatingPosition?: string;
  locationofOffice?: string;
  employeeStatus: string;
  employeeType: string;
  workPhone?: number;
  extension?: string;
  role: string;
  otherEmail?: string;
  birthDate: Date;
  martialStatus: string;
  address?: string;
  jobDescription?: string;
  aboutMe?: string;
  expertiseaboutme?: string;
  phoneNumber: number;
  timeZone: string;
  department: string;
  position: string;
  jobHistory?: {
    companyName: string;
    jobTitle: string;
    fromDate: Date;
    toDate: Date;
    jobDescription: string;
  }[];
  skills: { skillName: string }[];
  employeeRole: "employee" | "manager" | "admin" | null;
}
interface TimeRecord {
  date: string;
  clockInTime: string;
  isOnLeave: boolean;
  clockOutTime?: string;
}

// interface EmployeeTimeRecords {
//   [employeeId: number]: TimeRecord[];
// }
const { Option } = Select;

const AttendanceReport = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<number>();
  const [attendanceData, setAttendanceData] = useState([]);

  // Mock data for demonstration
  const storedAttendenceData = localStorage.getItem("attendanceData")
  const existingAttendanceData = storedAttendenceData ? JSON.parse(storedAttendenceData) : [];

  const getFullName = (employeeId:number) => {
    const employee = employees.find((emp:Employee ) => emp.employeeId === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : '';
  };
  const storedEmployeesData = localStorage.getItem("employeesData");
  const employees = storedEmployeesData ? JSON.parse(storedEmployeesData) : [];
  const handleGenerateReport = () => {
    // Filter attendance data for the selected employee
    if (!selectedEmployee) {
      alert('Please select an employee.');
      return;
    }
    console.log(existingAttendanceData)
    const filteredData = existingAttendanceData[selectedEmployee] || [];
    const employeeDetails = employees.find((employee: Employee) => employee.employeeId === selectedEmployee);
    const employeeName = employeeDetails ? `${employeeDetails.firstName} ${employeeDetails.lastName}` : '';

    // Calculate hours of working for each record
    const newData = filteredData.map((record: TimeRecord) => {
      const hoursOfWorking = record.clockOutTime
        ? calculateHoursOfWorking(record.clockInTime, record.clockOutTime)
        : undefined;
    
      return {
        ...record,
        employeeId: selectedEmployee,
        employeeName: employeeName,
        hoursOfWorking: hoursOfWorking,
      };
    })
    setAttendanceData(newData);
    console.log(attendanceData)
  };

  const calculateHoursOfWorking = (clockInTime:string, clockOutTime:string) => {
    const start = moment(clockInTime, 'HH:mm:ss');
    const end = moment(clockOutTime, 'HH:mm:ss');
    const duration = moment.duration(end.diff(start));
    const hours = duration.asHours();
    return hours.toFixed(2); // Round to 2 decimal places
  };

  const columns = [
    {
      title: 'Employee ID',
      dataIndex: 'employeeId',
      key: 'employeeId',
    },
    {
      title: 'Employee Name',
      dataIndex: 'employeeName',
      key: 'employeeName',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text:Date) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Clock In Time',
      dataIndex: 'clockInTime',
      key: 'clockInTime',
    },
    {
      title: 'Clock Out Time',
      dataIndex: 'clockOutTime',
      key: 'clockOutTime',
    },
    {
      title: 'Is On Leave',
      dataIndex: 'isOnLeave',
      key: 'isOnLeave',
      render: (isOnLeave:boolean) => (isOnLeave ? 'Yes' : 'No'),
    },
    {
      title: 'Hours of Working',
      dataIndex: 'hoursOfWorking',
      key: 'hoursOfWorking',
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Generate Attendance Report</h2>
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        <label htmlFor="employee" className="mr-4 self-center md:mb-0">Select Employee:</label>
        <Select
          id="employee"
          showSearch
          size="large"
          onChange={(value) => setSelectedEmployee(value)}
          placeholder="Select a task owner"
          optionFilterProp="children"
          filterOption={(input: string, option) =>
            (option?.label || "").toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          className="border-b border-gray-300 outline-none w-full md:w-3/4 text-lg focus:border-blue-500"
        >
          <Option key="select" label="select" value="select">
            {" "}
            Select
          </Option>
          {employees.map((employee: any) => (
            <Option
              key={employee.employeeId}
              label={employee.firstName}
              value={employee.employeeId}
            >
              {`${employee.firstName}  ${employee.lastName}`}
            </Option>
          ))}
        </Select>

        <input
          type="button"
          value="Generate Report"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={handleGenerateReport}
        />

      </div>

      {/* Display attendance report */}
      <div>
        {selectedEmployee && (
         <h3 className="text-lg font-semibold mb-2">Attendance Report for {getFullName(selectedEmployee)}</h3> 
        )}
        
        
        <Table dataSource={attendanceData} columns={columns} />
      </div>
    </div>
  );
};

export default AttendanceReport;
