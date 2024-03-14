import { useEffect, useState } from "react";
// import { Chart } from "react-google-charts";
import { PieChart } from "@mui/x-charts/PieChart";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme } from "@mui/material";
import "./dashboard.css";
import { BarChart } from "@mui/x-charts/BarChart";
// import { axisClasses } from "@mui/x-charts";
import { useSelector } from "react-redux";
import { LoginState } from "../../redux/store/rootreducer";
import moment from "moment";
// import { number } from "yup";

const theme = createTheme(); // Create your custom theme
interface Leavellocated {
  employeeId: number;
  casualLeave: number;
  earnedLeave: number;

  leaveWithoutPay: number;
  marriageLeave: number;
  optionalHoliday: number;
}
interface LeaveData {
  employeeId: number;
  leaveType: string;
  fromDate: string;
  toDate: string;
  status: string;
  teamEmailId: string;
  reasonForLeave: string;
  appliedDate: Date;
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
const Dashboard = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [leavesAllocatedToUser, setLeavesAllocatedTouser] = useState<number>();
  const [leavesRemainingToUser, setLeavesRemainingToUse] = useState<number>();
  const [leavesAvailabelToUser, setLeavesAvailabelToUser] = useState<number>();

  const userRole = useSelector(
    (state: { auth: LoginState }) => state.auth.role
  );
  const userId = useSelector(
    (state: { auth: LoginState }) => state.auth.userId
  );
  const [taskAssigned, SetTaskAssigned] = useState<number>();
  const [adminTaskAssigned, SetAdminTaskAssigned] = useState<number>();

  const storedemployeesData = localStorage.getItem("employeesData");
  const employeesData = storedemployeesData
    ? JSON.parse(storedemployeesData)
    : [];
  console.log(employeesData);
  const userEmployee = employeesData.find(
    (employees: Employee) => employees.employeeId === userId
  );
  console.log(userEmployee);
  const newEmoloyees = employeesData.filter((employee: Employee) => {
    const today = moment();

    const joinDate = employee.dateOfJoining;
    return today.diff(joinDate, "hours") <= 24;
  });

  const storedLeaveData = localStorage.getItem("leaveDetails");
  const leaveDetails = storedLeaveData ? JSON.parse(storedLeaveData) : [];

  // Get the start of the current month
  // console.log(currentMonth);
  const leaveApplicationsThisMonth = leaveDetails.filter((leave: LeaveData) => {
    const appliedDate = moment(leave.fromDate, "DD-MM-YYYY"); // Convert applied date to moment object
    const currentMonth = moment().add(1, "month").month();

    // Check if the applied date is within the current month
    return appliedDate.isSameOrAfter(currentMonth, "month");
  });
  const leaveApplicationsToday = leaveDetails.filter((leave: LeaveData) => {
    const appliedDate = moment(leave.appliedDate).format("DD-MM-YYYY");
    const today = moment().format("DD-MM-YYYY"); // Get the current date and time
    // console.log(today);
    return appliedDate === today;
  });
  const numberOfLeaveApplicationsThisMonth = leaveApplicationsThisMonth.length;
  const numberOfLeaveApplicationsToday = leaveApplicationsToday.length;

  const totalLeaves = leaveDetails.length;
  const approvedLeaves = leaveDetails.filter(
    (leave: LeaveData) => leave.status === "approved"
  ).length;
  const declinedLeaves = leaveDetails.filter(
    (leave: LeaveData) => leave.status === "declined"
  ).length;

  const userLeaveData = leaveDetails.filter(
    (leave: LeaveData) => leave.employeeId === userId
  );

  const usertotalLeaves = userLeaveData.length;
  const userapprovedLeaves = userLeaveData.filter(
    (leave: LeaveData) => leave.status === "approved"
  ).length;
  const userdeclinedLeaves = userLeaveData.filter(
    (leave: LeaveData) => leave.status === "declined"
  ).length;

  const userpieSeries = [
    {
      data: [
        { label: "Leave Applied", value: usertotalLeaves },
        { label: "Leave Approved", value: userapprovedLeaves },
      ],
      highlightScope: {
        faded: "global",
        highlighted: "item",
      },
      faded: {
        innerRadius: 30,
        additionalRadius: -30,
        color: "gray",
      },
      innerRadius: 30,
      outerRadius: 70,
      paddingAngle: 5,
      cornerRadius: 5,
      startAngle: -90,
      endAngle: 180,
    },
  ];
  const userdeclineSeries = [
    {
      data: [
        { label: "Leave Applied", value: usertotalLeaves },
        { label: "Leave Declined", value: userdeclinedLeaves },
      ],
      highlightScope: {
        faded: "global",
        highlighted: "item",
      },
      faded: {
        innerRadius: 30,
        additionalRadius: -30,
        color: "gray",
      },
      innerRadius: 30,
      outerRadius: 70,
      paddingAngle: 5,
      cornerRadius: 5,
      startAngle: -90,
      endAngle: 180,
    },
  ];
  // console.log(totalLeaves, approvedLeaves);
  const chartSetting = {
    yAxis: [
      {
        label: "Staff Turnover",
      },
    ],
    width: isSmallScreen ? 300 : 500,
    height: 400,
    // sx: {
    //   [`.${axisClasses.left} .${axisClasses.label}`]: {
    //     transform: "translate(-20px, 0)",
    //   },
    // },
  };
  const taskSetting = {
    yAxis: [
      {
        label: "Tasks",
      },
    ],
    width: isSmallScreen ? 300 : 500,
    height: 400,
    // sx: {
    //   [`.${axisClasses.left} .${axisClasses.label}`]: {
    //     transform: "translate(-20px, 0)",
    //   },
    // },
  };
  const pieSeries = [
    {
      data: [
        { label: "Leave Applied", value: totalLeaves },
        { label: "Leave Approved", value: approvedLeaves },
      ],
      highlightScope: {
        faded: "global",
        highlighted: "item",
      },
      faded: {
        innerRadius: 30,
        additionalRadius: -30,
        color: "gray",
      },
      innerRadius: 30,
      outerRadius: 70,
      paddingAngle: 5,
      cornerRadius: 5,
      startAngle: -90,
      endAngle: 180,
    },
  ];
  const declineSeries = [
    {
      data: [
        { label: "Leave Applied", value: totalLeaves },
        { label: "Leave Declined", value: declinedLeaves },
      ],
      highlightScope: {
        faded: "global",
        highlighted: "item",
      },
      faded: {
        innerRadius: 30,
        additionalRadius: -30,
        color: "gray",
      },
      innerRadius: 30,
      outerRadius: 70,
      paddingAngle: 5,
      cornerRadius: 5,
      startAngle: -90,
      endAngle: 180,
    },
  ];
  const staffTurnoverData = [
    { month: "Jan", turnover: 5 },
    { month: "Feb", turnover: 7 },
    { month: "Mar", turnover: 3 },
    { month: "Apr", turnover: 6 },
    { month: "May", turnover: 4 },
    { month: "Jun", turnover: 8 },
    { month: "Jul", turnover: 2 },
    { month: "Aug", turnover: 5 },
    { month: "Sep", turnover: 4 },
    { month: "Oct", turnover: 6 },
    { month: "Nov", turnover: 3 },
    { month: "Dec", turnover: 7 },
  ];
  const userTaskCompleted = [
    { month: "Jan", task: 2 },
    { month: "Feb", task: 4 },
    { month: "Mar", task: 7 },
    { month: "Apr", task: 9 },
    { month: "May", task: 10 },
    { month: "Jun", task: 12 },
    { month: "Jul", task: 9 },
    { month: "Aug", task: 11 },
    { month: "Sep", task: 14 },
    { month: "Oct", task: 6 },
    { month: "Nov", task: 7 },
    { month: "Dec", task: 3 },
  ];
  const valueFormatter = (value: number) => `${value}%`;

  useEffect(() => {
    const storedTask = localStorage.getItem("taskData");
    const existingTask = storedTask ? JSON.parse(storedTask) : [];
    console.log(userId);
    const userTask = existingTask.filter((task: any) => {
      return task.employeeId == userId;
    });
    SetTaskAssigned(userTask.length);
  }, []);

  useEffect(() => {
    const storedTask = localStorage.getItem("taskData");
    const existingTask = storedTask ? JSON.parse(storedTask) : [];
    SetAdminTaskAssigned(existingTask.length);
  }, []);

  useEffect(() => {
    const storeLeaveAllocated = localStorage.getItem("leaveAllocated");
    const allUserleaveAllocated = storeLeaveAllocated
      ? JSON.parse(storeLeaveAllocated)
      : [];
    const employeeleaveAllocated = allUserleaveAllocated.find(
      (leaveAllocated: Leavellocated) => leaveAllocated.employeeId === userId
    );
    const allocatedLeaves = Object.entries(employeeleaveAllocated)
      .filter(([key]) => key !== "employeeId") // Exclude the employeeId key
      .reduce((accumulator: number, [, value]: [string, unknown]) => {
        // Convert the unknown value to a number before adding to the accumulator
        const numericValue = typeof value === "number" ? value : 0;
        return accumulator + numericValue;
      }, 0);
    setLeavesAllocatedTouser(allocatedLeaves);
    console.log(allocatedLeaves);
  }, []);
  useEffect(() => {
    const storeLeaveRemianing = localStorage.getItem("leaveAvailable");
    const allUserleaveRemanining = storeLeaveRemianing
      ? JSON.parse(storeLeaveRemianing)
      : [];
    const employeeleaveRemaining = allUserleaveRemanining.find(
      (leaveAllocated: Leavellocated) => leaveAllocated.employeeId === userId
    );
    const allocatedLeaves = Object.entries(employeeleaveRemaining)
      .filter(([key]) => key !== "employeeId") // Exclude the employeeId key
      .reduce((accumulator: number, [, value]: [string, unknown]) => {
        // Convert the unknown value to a number before adding to the accumulator
        const numericValue = typeof value === "number" ? value : 0;
        return accumulator + numericValue;
      }, 0);
    setLeavesAvailabelToUser(allocatedLeaves);

    console.log("rem", allocatedLeaves);
  }, []);

  useEffect(() => {
    const storeLeaveBooked = localStorage.getItem("leaveBooked");
    const allUserleaveBooked = storeLeaveBooked
      ? JSON.parse(storeLeaveBooked)
      : [];
    const employeeleaveBooked = allUserleaveBooked.find(
      (leaveBooked: Leavellocated) => leaveBooked.employeeId === userId
    );
    const bookedLeaves = Object.entries(employeeleaveBooked)
      .filter(([key]) => key !== "employeeId") // Exclude the employeeId key
      .reduce((accumulator: number, [, value]: [string, unknown]) => {
        // Convert the unknown value to a number before adding to the accumulator
        const numericValue = typeof value === "number" ? value : 0;
        return accumulator + numericValue;
      }, 0);
    setLeavesRemainingToUse(bookedLeaves);

    console.log(bookedLeaves);
  });

  return (
    <div className="flex flex-col h-screen">
      {/* Main Content */}
      <div className="flex flex-grow">
        {/* Dashboard Content */}
        <main className="flex-grow p-4">
          {(userRole === "admin" || userRole === "manager") && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-center lg:text-left">
                  Welcome {userEmployee.firstName} {userEmployee.lastName} !
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
                <div className="bg-white p-4 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    Total Employees
                  </h3>
                  <p className="text-3xl font-bold">{employeesData.length}</p>
                </div>

                <div className="bg-white p-4 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    Number of Leaves
                  </h3>
                  <p className="text-3xl font-bold">
                    {numberOfLeaveApplicationsThisMonth}
                  </p>
                </div>

                <div className="bg-white p-4 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">New Employees</h3>
                  <p className="text-3xl font-bold">{newEmoloyees.length}</p>
                </div>

                <div className="bg-white p-4 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold mb-5">Task Assigned </h3>
                  <p className="text-3xl font-bold">{adminTaskAssigned}</p>
                </div>
              </div>
              <div className=" sm:grid-cols-1  grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  gap-4">
                <div className="bg-white p-4 shadow-md rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="ml-10">
                      <h3 className="text-lg font-semibold mb-2">
                        {" "}
                        Leaves Applied
                      </h3>
                      <p className="text-3xl font-bold">
                        {numberOfLeaveApplicationsThisMonth}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-rows-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
                    {/* Today's Leaves */}
                    <div className="bg-gray-200 p-4 shadow-md rounded-lg  flex flex-col justify-center items-center">
                      <h3 className="text-lg font-semibold mb-2">
                        Today's Leave Applied
                      </h3>
                      <p className="text-3xl font-bold">
                        {numberOfLeaveApplicationsToday}
                      </p>
                    </div>

                    {/* This Month's Leaves */}
                    <div className="bg-gray-200 p-4 shadow-md rounded-lg flex flex-col justify-center items-center">
                      <h3 className="text-lg font-semibold mb-2">
                        This Month's Leave Applied
                      </h3>
                      <p className="text-3xl font-bold">
                        {numberOfLeaveApplicationsThisMonth}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Placeholder for Pie Chart: Leave Approval */}
                <div className="bg-white p-4 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    Leave Approval Till Today
                  </h3>
                  <div className=" h-56 md:h-80 lg:h-96">
                    <PieChart
                      style={{
                        width: 200,
                        height: isSmallScreen ? 200 : 400, // Adjust height based on screen size
                      }}
                      series={pieSeries}
                    />
                  </div>
                </div>

                {/* Placeholder for Pie Chart: Leave Declined */}
                <div className="bg-white p-4 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    Leave Declined Till Today
                  </h3>
                  <div className=" h-56 md:h-80 lg:h-96">
                    <PieChart
                      style={{
                        width: 200,
                        height: isSmallScreen ? 200 : 400, // Adjust height based on screen size
                      }}
                      series={declineSeries}
                    />
                  </div>{" "}
                </div>

                {/* Placeholder for Pie Chart: Employees Count */}
                <div className="bg-white p-4 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    Employees Location
                  </h3>
                  <div className=" h-56 md:h-80 lg:h-96">
                    <PieChart
                      style={{
                        width: 200,
                        height: isSmallScreen ? 200 : 400, // Adjust height based on screen size
                      }}
                      series={[
                        {
                          data: [
                            { label: "Bhilwara", value: 10 },
                            { label: "Hyderabad", value: 35 },
                            { label: "Abu Dhabi", value: 5 },
                            { label: "Dubai", value: 3 },
                          ],
                          highlightScope: {
                            faded: "global",
                            highlighted: "item",
                          },
                          faded: {
                            innerRadius: 30,
                            additionalRadius: -30,
                            color: "gray",
                          },
                          innerRadius: 30,
                          outerRadius: 70,
                          paddingAngle: 5,
                          cornerRadius: 5,
                          startAngle: -90,
                          endAngle: 180,
                        },
                      ]}
                    />
                  </div>{" "}
                </div>

                <div className="bg-white p-4 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    Remote vs Onsite
                  </h3>
                  <div className="w-full h-64 md:h-80 lg:h-96">
                    <PieChart
                      style={{
                        height: isSmallScreen ? 200 : 400, // Adjust height based on screen size
                      }}
                      series={[
                        {
                          data: [
                            { label: "Remote", value: 20 },
                            { label: "OnSite", value: 7 },
                          ],
                          highlightScope: {
                            faded: "global",
                            highlighted: "item",
                          },
                          faded: {
                            innerRadius: 30,
                            additionalRadius: -30,
                            color: "gray",
                          },
                          innerRadius: 30,
                          outerRadius: 90,
                          paddingAngle: 5,
                          cornerRadius: 5,
                          startAngle: -90,
                          endAngle: 180,
                        },
                      ]}
                    />
                  </div>
                </div>

                {/* Placeholder for Graph: Staff Turnover */}
                <div className="bg-white p-4 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Staff Turnover</h3>
                  <BarChart
                    dataset={staffTurnoverData}
                    xAxis={[{ scaleType: "band", dataKey: "month" }]}
                    series={[
                      {
                        dataKey: "turnover",
                        label: "Turnover Rate",
                        valueFormatter,
                      },
                    ]}
                    {...chartSetting}
                  />
                  <p>Graph for Staff Turnover</p>
                </div>
              </div>
            </>
          )}

          {userRole === "employee" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-center lg:text-left">
                  Welcome {userEmployee.firstName} {userEmployee.lastName} !
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
                <div className="bg-white p-4 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    Total Employees
                  </h3>
                  <p className="text-3xl font-bold">{employeesData.length}</p>
                </div>

                <div className="bg-white p-4 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    Leaves Remaining
                  </h3>
                  <p className="text-3xl font-bold">5</p>
                </div>

                <div className="bg-white p-4 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">New Employees</h3>
                  <p className="text-3xl font-bold">{newEmoloyees.length}</p>
                </div>

                <div className="bg-white p-4 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold mb-5">Task Assigned</h3>
                  <p className="text-3xl font-bold">{taskAssigned}</p>
                </div>
              </div>

              <div className=" sm:grid-cols-1  grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  gap-4">
                <div className="bg-white p-4 shadow-md rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                  {/* Grid for Total Leaves Applied */}
                  <div className="flex items-center">
                    <div className="ml-10">
                      <h3 className="text-lg font-semibold mb-2">
                        {" "}
                        Leaves Allocated{" "}
                      </h3>
                      <p className="text-3xl font-bold">
                        {leavesAllocatedToUser}
                      </p>
                    </div>
                  </div>

                  {/* Grid for Today's and This Month's Leaves */}
                  <div className="grid grid-rows-2 md:grid-cols-1 sm:grid-cols-1 gap-4">
                    {/* Today's Leaves */}
                    <div className="bg-gray-200 p-4 shadow-md rounded-lg  flex flex-col justify-center items-center">
                      <h3 className="text-lg font-semibold mb-2">
                        Leave Applied
                      </h3>
                      <p className="text-3xl font-bold">
                        {leavesRemainingToUser}
                      </p>
                    </div>

                    {/* This Month's Leaves */}
                    <div className="bg-gray-200 p-4 shadow-md rounded-lg flex flex-col justify-center items-center">
                      <h3 className="text-lg font-semibold mb-2">
                        Leaves Remaining
                      </h3>
                      <p className="text-3xl font-bold">
                        {leavesAvailabelToUser}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Placeholder for Pie Chart: Leave Approval */}
                <div className="bg-white p-4 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    Leave Approval Till Today
                  </h3>
                  <div className=" h-56 md:h-80 lg:h-96 logo">
                    <PieChart
                      style={{
                        width: 200,
                        height: isSmallScreen ? 200 : 400, // Adjust height based on screen size
                      }}
                      series={userpieSeries}
                    />
                  </div>
                </div>

                {/* Placeholder for Pie Chart: Leave Declined */}
                <div className="bg-white p-4 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    Leave Declined Till Today
                  </h3>
                  <div className=" h-56 md:h-80 lg:h-96 leave">
                    <PieChart
                      style={{
                        width: 200,
                        height: isSmallScreen ? 200 : 400, // Adjust height based on screen size
                      }}
                      series={userdeclineSeries}
                    />
                  </div>{" "}
                </div>

                {/* Placeholder for Pie Chart: Employees Count */}
                <div className="bg-white p-4 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    Employees Location
                  </h3>
                  <div className=" h-56 md:h-80 lg:h-96 employee">
                    <PieChart
                      style={{
                        width: 200,
                        height: isSmallScreen ? 200 : 400, // Adjust height based on screen size
                      }}
                      series={[
                        {
                          data: [
                            { label: "Bhilwara", value: 10 },
                            { label: "Hyderabad", value: 35 },
                            { label: "Abu Dhabi", value: 5 },
                            { label: "Dubai", value: 3 },
                          ],
                          highlightScope: {
                            faded: "global",
                            highlighted: "item",
                          },
                          faded: {
                            innerRadius: 30,
                            additionalRadius: -30,
                            color: "gray",
                          },
                          innerRadius: 30,
                          outerRadius: 70,
                          paddingAngle: 5,
                          cornerRadius: 5,
                          startAngle: -90,
                          endAngle: 180,
                        },
                      ]}
                    />
                  </div>{" "}
                </div>

                <div className="bg-white p-4 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    Remote vs Onsite
                  </h3>
                  <div className="w-full h-64 md:h-80 lg:h-96">
                    <PieChart
                      style={{
                        height: isSmallScreen ? 200 : 400, // Adjust height based on screen size
                      }}
                      series={[
                        {
                          data: [
                            { label: "Remote", value: 20 },
                            { label: "OnSite", value: 7 },
                          ],
                          highlightScope: {
                            faded: "global",
                            highlighted: "item",
                          },
                          faded: {
                            innerRadius: 30,
                            additionalRadius: -30,
                            color: "gray",
                          },
                          innerRadius: 30,
                          outerRadius: 90,
                          paddingAngle: 5,
                          cornerRadius: 5,
                          startAngle: -90,
                          endAngle: 180,
                        },
                      ]}
                    />
                  </div>
                </div>

                {/* Placeholder for Graph: Staff Turnover */}
                <div className="bg-white p-4 shadow-md rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Task Completed</h3>
                  <BarChart
                    dataset={userTaskCompleted}
                    xAxis={[{ scaleType: "band", dataKey: "month" }]}
                    series={[
                      {
                        dataKey: "task",
                        label: "Task Completed",
                      },
                    ]}
                    {...taskSetting}
                  />
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Footer */}

      <footer className="bg-gray-300 p-4 text-center text-sm">
        © 2024 Your Company. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
