import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  loginSuccess,
  loginFailure,
  setRole,
  Set_UserId,
} from "../../redux/actions/loginaction";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import logo from '../sidebar/innovlogo.png'
import { Carousel } from "antd";
import hr from './HR.jpg';
import hrms from './hrm.jpg';
import fingerPrint from './fingerprint.jpg'
import { Header } from "antd/es/layout/layout";
import hrbackground from './hrback.jpg';
import { useNavigate } from "react-router-dom";

interface UserCredentials {
  email: string;
  password: string;
  role: string;
  employeeId: number;
}
interface Employee {
  employeeId: number;
  firstName: string;
  addedBy: string;
  addedTime: Date;
  lastName: string;
  email: string;
  dateOfJoining: string;
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
  phoneNumber: string;
  timeZone: string;
  department: string;
  position: string;
  imageUrl?: string;
  jobHistory?: { title: string; startDate: string; endDate: string }[];
  skills: string[];
  performanceMetrics: {
    metric: string;
    value: number;
  }[];
}

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
const navigate= useNavigate();
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const users: UserCredentials[] = JSON.parse(storedUser);
      const matchedUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser) {
        dispatch(loginSuccess());
        dispatch(setRole(matchedUser.role));
        const storedEmployeeData = localStorage.getItem("employeesData");
        const employeeData: Employee[] = storedEmployeeData? JSON.parse(storedEmployeeData):[];
        const matchingEmployee = employeeData.find(
          (employee) => employee.email === email
        );

        if (matchingEmployee) {
          dispatch(Set_UserId(matchingEmployee.employeeId));
          console.log("userid")
        }
        toast.success("User logged in successfully");
        navigate(`/dashboard`)
      } else {
        dispatch(loginFailure());
        toast.error("Invalid email or password");
      }

    } else {
      toast.error("User not found in local storage");
    }
  };
  return (
    <>
     <Header style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          background: 'white', 
        }} className="header w-full sticky">
     
     <img src={logo} className="pr-40 " style={{ height: '3.5pc' }} alt="logo" />
    
    
 </Header>
 <div className={`min-h-screen  flex items-center justify-center overflow-hidden bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 login`}  style={{ backgroundImage: `url(${hrbackground})` }}>
 
        <div className="max-w-md  space-y-8 bg-white border border-gray-300 rounded-md shadow-md p-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 word">
              Sign in to your account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
        <div  className="max-w-md w-full rounded-md ">
        <Carousel autoplay effect="fade" autoplaySpeed={5000} >
    <div>
      <img  className="h-[339px]" src={hr} />
    </div>
    <div>
    <img src={hrms} className="h-[339px]"/>
    </div>
    <div>
    <img src={fingerPrint} className="h-[339px]" />
    </div>
   
  </Carousel>
        </div>
      </div>
    </>
  );
};

export default Login;
