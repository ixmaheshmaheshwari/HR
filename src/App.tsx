// import { useState } from 'react'
import "./App.css";
// import Login from "./components/login/Login";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./components/spinner";
// import EmployeeProfilePage from "./pages/EmployeeProfilePage";
import { useSelector } from "react-redux";
// import LoginReducres from './redux/reducers/LoginReducres';
import { LoginState } from "./redux/store/rootreducer";
import { ToastContainer } from "react-toastify";
// import UserProfile from "./pages/UserProfile";
// import EmployeeForm from "./components/employee/emplyeeform";
// import Example from "./components/sidebar/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
// import AttendanceTracking from "./components/attendancetracking/AttendanceTracking";
// import Navbar from "./components/sidebar/navbar";
// import TaskAssignment from "./components/taskassignment/TaskAssignment";
// import Dashboard from "./components/dashboard/Dashboard";
// import EmployeeProfile from "./components/employee/EmployeeProfile";
// import PerformanceReview from "./components/performancereview/PerformanceReview";
// import EmployeeSearch from "./components/employeesearch/EmployeeSearch";
// import LeaveManagement from "./components/leavemanagent/LeaveManagement";
// import SideBar from "./components/sidebar/SideBar";
// import AddTask from "./components/taskassignment/AddTask";
// import TrackTask from "./components/taskassignment/TrackTask";
// import AssignTask from "./components/taskassignment/TaskAssignment";
// import LeaveView from "./components/leavemanagent/LeaveVeiw";
// import ApplyLeaveForm from "./components/leavemanagent/ApplyLeave";
// import LeaveTable from "./components/leavemanagent/LeaveAction";
const Login = lazy(() => import("./components/login/Login"));
const EmployeeProfilePage = lazy(() => import("./pages/EmployeeProfilePage"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const EmployeeForm = lazy(() => import("./components/employee/emplyeeform"));
const Navbar = lazy(() => import("./components/sidebar/navbar"));
// const AttendanceTracking = lazy(() => import("./components/attendancetracking/AttendanceTracking"));
const TaskAssignment = lazy(() => import("./components/taskassignment/TaskAssignment"));
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const EmployeeProfile = lazy(() => import("./components/employee/EmployeeProfile"));
const PerformanceReview = lazy(() => import("./components/performancereview/PerformanceReview"));
const EmployeeSearch = lazy(() => import("./components/employeesearch/EmployeeSearch"));
const SideBar = lazy(() => import("./components/sidebar/SideBar"));
const AddTask = lazy(() => import("./components/taskassignment/AddTask"));
const TrackTask = lazy(() => import("./components/taskassignment/TrackTask"));
const AssignTask = lazy(() => import("./components/taskassignment/TaskAssignment"));
const LeaveView = lazy(() => import("./components/leavemanagent/LeaveVeiw"));
const ApplyLeaveForm = lazy(() => import("./components/leavemanagent/ApplyLeave"));
const LeaveTable = lazy(() => import("./components/leavemanagent/LeaveAction"));
const AttendanceCalendar=lazy(()=> import("./components/attendancetracking/AttendanceTracker"))
const AttendanceReport=lazy(()=> import("./components/attendancetracking/AttendanceGenerator"))

function App() {
  const isAuthenticated = useSelector(
    (state: { auth: LoginState }) => state.auth.isAuthenticated
  );
  const employeeID = useSelector(
    (state: { auth: LoginState }) => state.auth.userId
  );
  const userRole = useSelector(
    (state: { auth: LoginState }) => state.auth.role
  );
  console.log(isAuthenticated);
  console.log(employeeID);

  return (
    <>
      <Router>
        {" "}
        {/* Wrap the entire application with Router */}
        <>
          <ToastContainer />
          <Suspense fallback={<Spinner />}>
          {isAuthenticated ? (
            <div className="flex h-screen">
              <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <SideBar>
                  <main className="flex-1  overflow-y-auto ">
                    <Routes>
                      {userRole === "admin" && (
                        <>
                          <Route
                            path="/employeeform"
                            element={<EmployeeForm />}
                          />
                          <Route
                            path="/employeeform/:employeeId"
                            element={<EmployeeForm />}
                          />

                          <Route path="/assign-task" element={<AssignTask />} />
                          
                          <Route
                        path="/attendence/generator"
                        element={<AttendanceReport />}
                      />
                          <Route
                            path="/leave/action"
                            element={<LeaveTable />}
                          />
                           <Route
                            path="/performance"
                            element={<PerformanceReview />}
                          />
                        </>
                      )}
                      <Route path="/" element={<Dashboard />} />

                      <Route
                        path="/TaskManagement"
                        element={<TaskAssignment />}
                      />
                      <Route
                        path="/attendence/marker"
                        element={<AttendanceCalendar />}
                      />
<Route
                            path="/employee/:employeeId"
                            element={<EmployeeProfile />}
                          />
                      <Route
                        path="/employee"
                        element={<EmployeeProfilePage />}
                      />
                      <Route
                        path="/employeesearch"
                        element={<EmployeeSearch />}
                      />

                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/add-task" element={<AddTask />} />
                      <Route path="/add-task/:taskId" element={<AddTask />} />
                      <Route path="/track-task" element={<TrackTask />} />

                      <Route path="/leave" element={<LeaveView />} />

                      <Route path="/leave/view" element={<LeaveView />} />
                      <Route path="/leave/apply" element={<ApplyLeaveForm />} />
                      
                      <Route path="/task" element={<TaskAssignment />} />
                      <Route
                        path="/performance"
                        element={<PerformanceReview />}
                      />
                      <Route
                        path="/employeesearch"
                        element={<EmployeeSearch />}
                      />
                      <Route path="/user" element={<UserProfile />} />

                      <Route path="*" element={<Dashboard />} />
                    </Routes>
                  </main>
                </SideBar>
              </div>
            </div>
          ) : (
            <Login />
          )}
           </Suspense>
        </>
       
      </Router>
      {/* <ToastContainer /> */}
      {/* <Example/> */}
      {/* <Login/> */}
      {/* <Sidebar/>     */}
      {/* <EmployeeProfilePage /> */}

      {/* <UserProfile/> */}
      {/* <EmployeeForm/> */}
    </>
  );
}

export default App;
