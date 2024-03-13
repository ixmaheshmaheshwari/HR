import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DatePicker, Select, Input } from "antd";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { LoginState } from "../../redux/store/rootreducer";
import { ArrowLeftOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import moment from "moment";

interface Employees {
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
interface LeaveData{
  key: string; label: string;
}
const { Option } = Select;

const schema = yup.object().shape({
  employeeId: yup
    .number()
    .required("Employee ID is required")
    .typeError("Employee should be selected"),
  leaveType: yup.string().required("Leave type is required"),
  fromDate: yup.date().required("From date is required"),
  toDate: yup
    .date()
    .required("To date is required")
    .min(yup.ref("fromDate"), "To Date cannot be earlier than from date"),
  teamEmailId: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  reasonForLeave: yup.string().required("Reason for leave is required"),
  status: yup.string().oneOf(["approve", "declined", "waiting"]),
  appliedDate: yup.date(),

});
interface Leave {
  employeeId: number;
  fromDate: Date;
  leaveType: string;
  reasonForLeave: string;
  teamEmailId: string;
  toDate: Date;
  status: "approve" | "declined" | "waiting";
  appliedDate:Date;
  leaveId:number;
}
interface FormData {
  status?: string | undefined;
  appliedDate?: Date | undefined;
  employeeId: number;
  leaveType: string;
  fromDate: Date;
  toDate: Date;
  teamEmailId: string;
  reasonForLeave: string;
  
}

const ApplyLeaveForm = () => {
  const [employees, setEmployees] = useState<Employees>();
  const [leaveOptions, setLeaveOptions] = useState<LeaveData[]>([]);
  // const [lastLeaveId, setLastLeaveId] = useState(0); // State to hold the last leave ID

  const employeeID = useSelector(
    (state: { auth: LoginState }) => state.auth.userId
  );
  const navigate = useNavigate();
 
    
  useEffect(() => {
    // Fetch employees data from localStorage
    const employeesData = localStorage.getItem("employeesData");
    const employee: Employees[] = employeesData
      ? JSON.parse(employeesData)
      : [];
    const filteredEmployee: Employees | undefined = employee.find(
      (employeed: Employees) => {
        return employeed.employeeId == employeeID;
      }
    );
    setEmployees(filteredEmployee);

    //     const data = [
    //         {"employeeId":1,"earnedLeave":0,"marriageLeave":0,"casualLeave":0,"optionalHoliday":0,"sickLeave":0,"leaveWithoutPay":0},
    //         {"employeeId":2,"earnedLeave":4,"marriageLeave":3,"casualLeave":3,"optionalHoliday":2,"sickLeave":4,"leaveWithoutPay":0},
    //         {"employeeId":3,"earnedLeave":4,"marriageLeave":3,"casualLeave":3,"optionalHoliday":2,"sickLeave":4,"leaveWithoutPay":0},
    //         {"employeeId":4,"earnedLeave":4,"marriageLeave":3,"casualLeave":3,"optionalHoliday":2,"sickLeave":4,"leaveWithoutPay":0}
    //       ];

    //       const newData = data.map(employee => ({
    //         ...employee,
    //         earnedLeave: 0,
    //         marriageLeave: 0,
    //         casualLeave: 0,
    //         optionalHoliday: 0,
    //         sickLeave: 0,
    //         leaveWithoutPay: 0
    //       }));

    //       console.log(newData);
    // localStorage.setItem("leaveBooked",JSON.stringify(newData))
    // Generate leave options based on available leaves for each employee
    const leaveOptionsData = [
      { key: "earnedLeave", label: "Earned Leave" },
      { key: "marriageLeave", label: "Marriage Leave" },
      { key: "casualLeave", label: "Casual Leave" },
      { key: "optionalHoliday", label: "Optional Holiday" },
      { key: "sickLeave", label: "Sick Leave" },
      { key: "leaveWithoutPay", label: "Leave Without Pay" },
    ];
    setLeaveOptions(leaveOptionsData);

    // const leaveOptionsData = employeesData.map((employee) => ({
    //     employeeId: employee.employeeId,
    //       earnedLeave: 4,
    //       marriageLeave: 3,
    //       casualLeave: 3,
    //       optionalHoliday: 2,
    //       sickLeave: 4,
    //       leaveWithoutPay: 0,

    //   }));
    // localStorage.setItem("leaveData",JSON.stringify(leaveOptionsData))

    // setLeaveOptions(leaveOptionsData);
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      status: "waiting",
      appliedDate:new Date(),
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // {...data,
    // status:"waiting"
    // }
    console.log(data);

    const storedLeaveDetails = localStorage.getItem("leaveDetails");
const existingLeaveDetails = storedLeaveDetails ? JSON.parse(storedLeaveDetails) : [];
const lastId = existingLeaveDetails.length > 0 ? existingLeaveDetails[existingLeaveDetails.length - 1].leaveId : 0;
console.log(lastId);
    const storedLeavAvailable = localStorage.getItem("leaveAvailable");
    const existingLeaveAvailable = storedLeavAvailable
      ? JSON.parse(storedLeavAvailable)
      : [];
   
    const leaveAvailable = existingLeaveAvailable.find(
      (leave:Leave) => leave.employeeId === data.employeeId
    );
   
    // const leaveAvailableIndex = existingLeaveAvailable.findIndex(
    //   (leave:Leave) => leave.employeeId === data.employeeId
    // );
   

    // Check if the leave type value in leaveAvailable is more than 0
    if (
      (leaveAvailable && leaveAvailable[data.leaveType] > 0) ||
      data.leaveType === "leaveWithoutPay"
    ) {
      // Submit logic here
     
      const newLeaveId = lastId + 1;
      const leaveDataWithId = { ...data, leaveId: newLeaveId };
      const storedLeaveDetails = localStorage.getItem("leaveDetails");
      const existingLeaveDetails =storedLeaveDetails? JSON.parse(storedLeaveDetails) : [];
      existingLeaveDetails.push(leaveDataWithId);

      // Update the leave booked at the found index with newLeaveBooked
      

      console.log("existinleave details", existingLeaveDetails);
      
      // Show success toast message
      toast.success("Leave successfully applied!");

      navigate(`/leave/view`)
    } else {
      toast.error(
        "Leave should not be applied as available leave of leave type is 0"
      );
    }
  };

  return (
    <div className="w-full">
      <div className="w-11/12 xs:w-auto mx-auto mt-10 bg-white rounded-lg shadow-md p-6  m-10 ml-5">
        <div className="flex justify-between items-center mb-6">
          <button
            className="flex items-center text-blue-500"
            onClick={() => {
              navigate(`/leave/view`);
            }}
          >
            <ArrowLeftOutlined className="mr-1" />
            Back
          </button>

          <button
            className="text-red-500"
            onClick={() => {
              navigate(`/leave/view`);
            }}
          >
            <CloseCircleOutlined />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 min-w-lg  mt-10"
        >
          <div>
            <div className=" flex border-b-2 p-4">
              <label className=" mb-1 flex items-center w-2/6 text-base">
                {" "}
                Employee ID
              </label>
              <Controller
                name="employeeId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    showSearch
                    placeholder="Select employee ID"
                    className=" border-b border-gray-300 outline-none w-4/6 text-lg focus:border-blue-500"
                    // className="w-3/4 border-b outline-none"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option key="select" label="select">
                      Select
                    </Option>
                    <Option
                      key={employees?.employeeId}
                      value={employees?.employeeId}
                    >
                      {`${employees?.employeeId} - ${employees?.firstName} ${employees?.lastName}`}
                    </Option>
                  </Select>
                )}
              />
            </div>{" "}
            {errors.employeeId && (
              <span style={{ color: "red" }}>{errors.employeeId.message}</span>
            )}
          </div>
          <Controller
            name="status"
            control={control}
            defaultValue="waiting"
            render={({ field }) => <input type="hidden" {...field} />}
          />
          {/* <Controller
            name="appliedDate"
            control={control}
            render={({ field }) => <input type="hidden" {...field} />}
          /> */}
          <div>
         
            <div className=" flex border-b-2 p-4">
              <label className=" mb-1 flex items-center w-2/6 text-base">
                Leave Type
              </label>
              <Controller
                name="leaveType"
                control={control}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      showSearch
                      placeholder="Select leave type"
                      className="w-4/6 border-b outline-none"
                    >
                      <Option key="select" label="select">
                        Select
                      </Option>

                      {leaveOptions.map((option) => (
                        <Option key={option?.key} value={option?.key}>
                          {option?.label}
                        </Option>
                      ))}
                    </Select>
                  </>
                )}
              />{" "}
            </div>
            {errors.leaveType && (
              <span style={{ color: "red" }}>{errors.leaveType.message}</span>
            )}
          </div>
          <div>
            <div className=" flex border-b-2 p-4">
              <label className=" mb-1 flex items-center w-2/6 text-base">
                Date Range
              </label>
              <div>
                <Controller
                  name="fromDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      format="DD/MM/YYYY"
                      placeholder="From date"
                      className="border-b border-gray-300 outline-none w-fit text-lg focus:border-blue-500"
                    />
                  )}
                />
              </div>
              <div>
                <Controller
                  name="toDate"
                  control={control}
                  render={({ field }) => (
                    <>
                      <DatePicker
                        {...field}
                        format="DD/MM/YYYY"
                        placeholder="To date"
                        className="border-b border-gray-300 outline-none  w-fit ml-10 text-lg focus:border-blue-500"
                      />
                    </>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-around">
              {errors.fromDate && (
                <span style={{ color: "red" }}>{errors.fromDate.message}</span>
              )}{" "}
              {errors.toDate && (
                <span style={{ color: "red" }}>{errors.toDate.message}</span>
              )}
              <div></div>
            </div>
          </div>

          <div>
            <div className=" flex border-b-2 p-4">
              <label className=" mb-1 flex items-center w-2/6 text-base">
                Team Email ID
              </label>
              <Controller
                name="teamEmailId"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      {...field}
                      placeholder="Enter team email ID"
                      className="border-b border-gray-300 outline-none  w-4/6 ml-10 text-lg focus:border-blue-500"
                    />
                  </>
                )}
              />
            </div>
            {errors.teamEmailId && (
              <span style={{ color: "red" }}>{errors.teamEmailId.message}</span>
            )}
          </div>
          <div>
            <div className=" flex border-b-2 p-4">
              <label className=" mb-1 flex items-center w-2/6 text-base">
                Reason for Leave
              </label>
              <Controller
                name="reasonForLeave"
                control={control}
                render={({ field }) => (
                  <>
                    <Input.TextArea
                      {...field}
                      rows={4}
                      placeholder="Enter reason for leave"
                      className="border-b border-gray-300 outline-none  w-4/6 ml-10 text-lg focus:border-blue-500"
                    />
                  </>
                )}
              />
            </div>
            {errors.reasonForLeave && (
              <span style={{ color: "red" }}>
                {errors.reasonForLeave.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Apply Leave
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeaveForm;
