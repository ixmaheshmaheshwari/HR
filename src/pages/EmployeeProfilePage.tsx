import React from "react";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginState } from "../redux/store/rootreducer";
interface UserInfo {
  email: string;
  password: string;
  role: string;
}
interface JobHistoryEntry {
  companyName: string;
  jobTitle: string;
  fromDate: Date;
  toDate: Date;
  jobDescription: string;
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
  jobHistory?: JobHistoryEntry [];
  skills: {skillName:string}[];
  performanceMetrics: {
    metric: string;
    value: number;
  }[];
}
const EmployeeProfilePage: React.FC = () => {
  // const history = useHistory();
  const navigate = useNavigate(); // Get the navigate function
  const role = useSelector((state: { auth: LoginState }) => state.auth.role );

  const storedEmployeeData = localStorage.getItem("employeesData");
  const employeeData: Employee[] = JSON.parse(storedEmployeeData || "[]");

  const handleCardClick = (employeeId: number) => {
    // Navigate to the EmployeeProfile page with the specific employeeId
    navigate(`/employee/${employeeId}`);
  };

  const handleDelete = (employeeId: number) => {
    // Implement your delete logic here, for example:
    const updatedEmployeeData = employeeData.filter(
      (employee) => employee.employeeId !== employeeId
    );
    const storedlogindetais = localStorage.getItem("user");
    let logindetail: UserInfo[] = storedlogindetais
    ? JSON.parse(storedlogindetais)
    : [];
    const matchingEmployee = employeeData.find(
      (employee) => employee?.employeeId === employeeId
    );
    const updatedlogindetais = logindetail.filter(
      (employee) => employee?.email !== matchingEmployee?.email
    );
    // Update localStorage with the updated employee data
    localStorage.setItem("employeesData", JSON.stringify(updatedEmployeeData));
    localStorage.setItem("user", JSON.stringify(updatedlogindetais));

    // Optionally, you can navigate to a different page after deletion
    navigate(`/employee`);

  };
  const handleUpdate = (employeeId: number) => {
    // Navigate to the EmployeeForm page with the specific employeeId
    // navigate(`/employeeform/update/${employeeId}`);
    navigate(`/employeeform/${employeeId}`);

  };

  return (
    <div>
     
        <div className="flex flex-wrap justify-center    items-start">
          {employeeData.length > 0 ? (
            employeeData.map((employee: Employee) => (
              <div
                key={employee.employeeId}
                className="max-w-sm min-w-[23rem] rounded overflow-hidden shadow-lg bg-white mx-4 my-4 cursor-pointer"
              >
                <img
                  alt="Profile Photo"
                  className="w-[127px] h-[127px] ml-auto mr-auto bg-center justify-center rounded-full pt-3"
                  src={employee.imageUrl}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    {employee.firstName}
                  </div>
                  <p className="text-gray-700 text-base mb-2">
                    {employee.position}
                  </p>
                  <p className="text-gray-700 text-base mb-2">
                    {employee.department}
                  </p>
                  <p className="text-gray-700 text-base mb-2">
                    {employee.email}
                  </p>
                 {role==="employee" && <div className="flex justify-between">
                 <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => handleCardClick(employee.employeeId)}
                        >
                        View Profile
                      </button>
                  </div>
                  } 
                  {(role === "admin" || role ==="manager") && (
                    <div className="flex justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-4 rounded "
                        onClick={() => handleCardClick(employee.employeeId)}
                        >
                        View Profile
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        onClick={() => handleUpdate(employee.employeeId)}
                      >
                        Update
                      </button></div>
                      )
                      }
                      {(role === "admin") &&(
                        <div className="flex justify-between ml-auto ">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 left-1 mt-[-36px] rounded ml-auto mr-auto"
                        onClick={() => handleDelete(employee.employeeId)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No employee data found in local storage.</p>
          )}
        </div>
      
    </div>
  );
};

export default EmployeeProfilePage;
