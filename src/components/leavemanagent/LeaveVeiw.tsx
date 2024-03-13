import React from "react";
import moment from "moment";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginState } from "../../redux/store/rootreducer";

interface LeaveData {
  employeeId: number;
  leaveType: string;
  fromDate: string;
  toDate: string;
  status: string;
  teamEmailId: string;
  reasonForLeave: string;
}

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
const LeaveView: React.FC = () => {
  const localStorageData = localStorage.getItem("leaveDetails");
  const data: LeaveData[] = localStorageData
    ? JSON.parse(localStorageData)
    : [];
  const navigate = useNavigate();
  const employeeID = useSelector(
    (state: { auth: LoginState }) => state.auth.userId
  );
  const filteredData = data.filter((leave) => leave.employeeId === employeeID);

  const localStorageEmployees = localStorage.getItem("employeesData");
  const employees: Employee[] = localStorageEmployees
    ? JSON.parse(localStorageEmployees)
    : [];

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "employeeId",
      key: "employeeName",
      render: (employeeId: number) => {
        const employee = employees.find((emp) => emp.employeeId === employeeId);
        return employee ? `${employee.firstName} ${employee.lastName}` : "";
      },
      className: "px-4 py-2",
    },

    {
      title: "Leave Type",
      dataIndex: "leaveType",
      key: "leaveType",
      className: "px-4 py-2",
    },
    {
      title: "Effective From",
      dataIndex: "fromDate",
      key: "fromDate",
      render: (fromDate: string) =>
        moment(fromDate).subtract(1, "days").format("DD-MM-YYYY"),
      className: "px-4 py-2",
    },
    {
      title: "Effective To",
      dataIndex: "toDate",
      key: "toDate",
      render: (toDate: string) =>
        moment(toDate).subtract(1, "days").format("DD-MM-YYYY"),
      className: "px-4 py-2",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "px-4 py-2",
    },
    {
      title: "Reason",
      dataIndex: "reasonForLeave",
      key: "reasonForLeave",
      className: "px-4 py-2",
    },
    {
      title: "Team Email ID",
      dataIndex: "teamEmailId",
      key: "teamEmailId",
      className: "px-4 py-2",
    },
  ];
  const handleApplyLeaveClick = () => {
    navigate(`/leave/apply`);
  };

  return (
    <>
      <form onSubmit={handleApplyLeaveClick} className="my-4 ml-10">
        <input
          type="submit"
          value="Apply Leave"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
      </form>
      <Table
        columns={columns}
        dataSource={filteredData}
        bordered
        size="middle"
        pagination={{ pageSize: 10 }}
        className="w-full "
      />
    </>
  );
};

export default LeaveView;
