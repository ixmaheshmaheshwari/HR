import React from "react";
import moment from "moment";
import { Table } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface LeaveData {
  employeeId: number;
  leaveType: string;
  fromDate: string;
  toDate: string;
  status: string;
  teamEmailId: string;
  reasonForLeave: string;
  leaveId:number
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
const LeaveTable: React.FC = () => {
  const localStorageData = localStorage.getItem("leaveDetails");
  const data: LeaveData[] = localStorageData
    ? JSON.parse(localStorageData)
    : [];
  const localStorageEmployees = localStorage.getItem("employeesData");
  const employees: Employee[] = localStorageEmployees
    ? JSON.parse(localStorageEmployees)
    : [];
  
  const navigate = useNavigate();

  // const approveLeave = (leaveId: number) => {
  //   const employee = employees.find((emp) => emp.employeeId === employeeId);

  //   const leaveIndex = data.findIndex(
  //     (leave) => leave.employeeId === employeeId
  //   );

  //   if (leaveIndex !== -1) {
  //     data[leaveIndex].status = "approved";

  //     localStorage.setItem("leaveDetails", JSON.stringify(data));

  //     toast.success(
  //       `Leave approved for employee ${employee?.firstName} ${" "} ${
  //         employee?.lastName
  //       }`
  //     );
  //   } else {
  //     toast.error(
  //       `  No Leave application for employee ${employee?.firstName} ${" "} ${
  //         employee?.lastName
  //       }`
  //     );

  //     console.log(`Leave detail not found for employee ${employeeId}`);
  //   }
  //   console.log(`Leave approved for employee ${employeeId}`);
  //   console.log(data);

  //   navigate(`/leave/action`);
  // };
  const approveLeave = (leaveId: number) => {
    const leaveIndex = data.findIndex((leave) => leave.leaveId === leaveId);
   const leaveDeatil=data[leaveIndex]
   console.log(leaveDeatil)
    const storedLeavAvailable = localStorage.getItem("leaveAvailable");
    const existingLeaveAvailable = storedLeavAvailable
      ? JSON.parse(storedLeavAvailable)
      : [];
    const storeLeaveBooked = localStorage.getItem("leaveBooked");
    const existingLeaveBooked = storeLeaveBooked
      ? JSON.parse(storeLeaveBooked)
      : [];


   const leaveAvailable = existingLeaveAvailable.find(
      (leave:LeaveData) => leave.employeeId === leaveDeatil.employeeId
    );
    console.log("lea",leaveAvailable)
    const leaveBooked = existingLeaveBooked.find(
      (leave: LeaveData) => leave.employeeId === leaveDeatil.employeeId
    );
    console.log("book",leaveBooked);

    const leaveAvailableIndex = existingLeaveAvailable.findIndex(
      (leave:LeaveData) => leave.employeeId === leaveDeatil.employeeId
    );
    const leaveBookedIndex = existingLeaveBooked.findIndex(
      (leave:LeaveData) => leave.employeeId === leaveDeatil?.employeeId
    );

    // Check if the leave type value in leaveAvailable is more than 0
    if (
      (leaveAvailable && leaveAvailable[leaveDeatil.leaveType] > 0 && leaveIndex !== -1) ||
      leaveDeatil.leaveType === "leaveWithoutPay" && leaveIndex !== -1
    ) {
      // Submit logic here
      const newLeaveAvailable = {
        ...leaveAvailable,
        [leaveDeatil.leaveType]: leaveAvailable[leaveDeatil.leaveType] - 1, // Decrement the leaveType value by 1
      };

      const newLeaveBooked = {
        ...leaveBooked,
        [leaveDeatil.leaveType]: leaveBooked[leaveDeatil.leaveType] + 1, // Decrement the leaveType value by 1
      };
   

      // Update the leave booked at the found index with newLeaveBooked
      existingLeaveBooked[leaveBookedIndex] = newLeaveBooked;
      existingLeaveAvailable[leaveAvailableIndex] = newLeaveAvailable;
      console.log("exis",existingLeaveAvailable)
console.log("booked",existingLeaveBooked)
      localStorage.setItem("leaveBooked", JSON.stringify(existingLeaveBooked));
      localStorage.setItem(
        "leaveAvailable",
        JSON.stringify(existingLeaveAvailable)
      );

    
      data[leaveIndex].status = "approved";
      localStorage.setItem("leaveDetails", JSON.stringify(data));

      toast.success(`Leave approved successfully!`);

    navigate(`/leave/action`);
  }else {
      toast.error(`No leave application found with leave ID ${leaveId}`);
    }
};
  const declineLeave = (leaveId: number) => {
    const leaveIndex = data.findIndex((leave) => leave.leaveId === leaveId);

    if (leaveIndex !== -1) {
      const leaveDeatil=data[leaveIndex]
      console.log(leaveDeatil)
       const storedLeavAvailable = localStorage.getItem("leaveAvailable");
       const existingLeaveAvailable = storedLeavAvailable
         ? JSON.parse(storedLeavAvailable)
         : [];
       const storeLeaveBooked = localStorage.getItem("leaveBooked");
       const existingLeaveBooked = storeLeaveBooked
         ? JSON.parse(storeLeaveBooked)
         : [];
   
   
      const leaveAvailable = existingLeaveAvailable.find(
         (leave:LeaveData) => leave.employeeId === leaveDeatil.employeeId
       );
       console.log("lea",leaveAvailable)
       const leaveBooked = existingLeaveBooked.find(
         (leave: LeaveData) => leave.employeeId === leaveDeatil.employeeId
       );
       console.log("book",leaveBooked);
   
       const leaveAvailableIndex = existingLeaveAvailable.findIndex(
         (leave:LeaveData) => leave.employeeId === leaveDeatil.employeeId
       );
       const leaveBookedIndex = existingLeaveBooked.findIndex(
         (leave:LeaveData) => leave.employeeId === leaveDeatil?.employeeId
       );
   
       // Check if the leave type value in leaveAvailable is more than 0
       if (
         (leaveAvailable && leaveAvailable[leaveDeatil.leaveType] > 0 && leaveIndex !== -1) ||
         leaveDeatil.leaveType === "leaveWithoutPay" && leaveIndex !== -1
       ) {
         // Submit logic here
         const newLeaveAvailable = {
           ...leaveAvailable,
           [leaveDeatil.leaveType]: leaveAvailable[leaveDeatil.leaveType] + 1, // Decrement the leaveType value by 1
         };
   
         const newLeaveBooked = {
           ...leaveBooked,
           [leaveDeatil.leaveType]: leaveBooked[leaveDeatil.leaveType] - 1, // Decrement the leaveType value by 1
         };
      
   
         // Update the leave booked at the found index with newLeaveBooked
         existingLeaveBooked[leaveBookedIndex] = newLeaveBooked;
         existingLeaveAvailable[leaveAvailableIndex] = newLeaveAvailable;
         console.log("exis",existingLeaveAvailable)
   console.log("booked",existingLeaveBooked)
         localStorage.setItem("leaveBooked", JSON.stringify(existingLeaveBooked));
         localStorage.setItem(
           "leaveAvailable",
           JSON.stringify(existingLeaveAvailable)
         );
   
       
      data[leaveIndex].status = "declined";
      localStorage.setItem("leaveDetails", JSON.stringify(data));

      toast.error(`Leave declined successfully!`);
    } else {
      toast.error(`No leave application found with leave ID ${leaveId}`);
    }

    navigate(`/leave/action`);
  }
  };

  // const declineLeave = (leaveId: number) => {
  //   const leaveIndex = data.findIndex(
  //     (leave) => leave.employeeId === employeeId
  //   );
  //   const employee = employees.find((emp) => emp.employeeId === employeeId);

  //   if (leaveIndex !== -1) {
  //     data[leaveIndex].status = "declined";

  //     localStorage.setItem("leaveDetails", JSON.stringify(data));

  //     toast.error(
  //       `Leave declined for employee ${employee?.firstName} ${" "} ${
  //         employee?.lastName
  //       }`
  //     );
  //     navigate(`/leave/action`);
  //   } else {
  //     toast.error(
  //       `  No Leave application for employee ${employee?.firstName} ${" "} ${
  //         employee?.lastName
  //       }`
  //     );
  //   }
  //   console.log(data);
  // };

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
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_text: string, record: LeaveData) => (
            <div className="flex flex-col mt-2">
              <input
                type="submit"
                value="Approve"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-5 rounded"
                onClick={() => approveLeave(record.leaveId)}
              />
              <input
                type="submit"
                value="Decline"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => declineLeave(record.leaveId)}
              />
            </div>
          ),
      className: "px-4 py-2",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      size="middle"
      pagination={{ pageSize: 10 }}
      className="w-full mt-4"
    />
  );
};

export default LeaveTable;
