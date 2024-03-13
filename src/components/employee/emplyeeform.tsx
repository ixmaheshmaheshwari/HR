import { useEffect, useState } from "react";
import dayjs from 'dayjs';

import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";

// interface EmployeeRole{
//     employeeRole:string;
// }
interface UserInfo {
  email: string;
  password: string;
  role: string;
}
interface Employee {
  employeeId: number;
  firstName: string;
  addedBy: string;
  addedTime: string;
  lastName: string;
  imageUrl?: string | null;
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
  birthDate: string;
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
interface EmployeeFormProps {
  employee?: Employee;
  //   employeeRole?:EmployeeRole
  userInfo?: UserInfo;
}

// Validation schema for a single skill entry

const employeeSchema = yup.object().shape({
  employeeId: yup
    .number()
    .typeError("Employee Id should be a number")
    .required("Employee ID is required"),
  firstName: yup.string().required("First name is required"),
  addedBy: yup.string().required("Added by is required"),
  addedTime: yup
    .date()
    .required("Added time is required")
    .typeError("Added time must be a Date and Time"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  dateOfJoining: yup
    .date()
    .required("Date of joining is required")
    .typeError("Joinging Date should be a date"),
  secondaryReportingTo: yup.string().nullable().optional(),
  reportingTo: yup.string().required("Reporting to is required"),
  leadPosition: yup.string().required("Lead position is required"),
  sourceOfHire: yup.string().nullable().optional(),
  seatingPosition: yup.string().nullable().optional(),
  locationofOffice: yup.string().nullable().optional(),
  employeeStatus: yup.string().required("Employee status is required"),
  employeeType: yup.string().optional(),
  workPhone: yup.number().nullable().optional(),
  extension: yup.string().nullable().optional(),
  role: yup.string(),
  otherEmail: yup.string().nullable().optional(),
  birthDate: yup
    .date()
    .required("Birth date is required")
    .typeError("Birth Date should be a Date"),
  martialStatus: yup.string().required("Marital status is required"),
  address: yup.string().nullable().optional(),
  jobDescription: yup.string().nullable().optional(),
  aboutMe: yup.string().nullable().optional(),
  expertiseaboutme: yup.string().nullable().optional(),
  phoneNumber: yup.number().required("Phone number is required"),
  timeZone: yup
    .string()
    .matches(/^[A-Za-z]{3}(?: ?[+-]\d{1,2}:\d{1,2})?$/)
    .optional()
    .typeError("Please enter the correct time zome like GMT+%:00"),
  department: yup.string().required("Department is required"),
  position: yup.string().required("Position is required"),
  imageUrl: yup.string().optional(),
  jobHistory: yup
    .array()
    .of(
      yup.object().shape({
        companyName: yup
          .string()
          .required("Company name is required")
          .nullable(),
        jobTitle: yup.string().required("Job title is required").nullable(),
        fromDate: yup
          .date()
          .required("From date is required")
          .typeError("From Date must be a Date")
          .nullable(),
        toDate: yup
          .date()
          .required("To date is required")
          .typeError("To Date must be a Date")
          .nullable(),
        jobDescription: yup
          .string()
          .required("Job description is required")
          .nullable(),
      })
    )
    .typeError("Job History is not of proper type")
    .nullable()
    .optional(),
  skills: yup
    .array()
    .of(
      yup.object().shape({
        skillName: yup.string().required("Skill name is required"),
      })
    )
    .nullable()
    .optional(),
  employeeRole: yup
    .string()
    .oneOf(["employee", "manager", "admin"])
    .required("Employee role can be only of employee ,manager, admin"),
});

const EmployeeForm: React.FC<EmployeeFormProps> = ({}) => {
  //   const userRole = useSelector(
  //     (state: { auth: LoginState }) => state.auth.role
  //   );
  const navigate = useNavigate(); // Get the navigate function

  const [formError, setFormError] = useState<string>("");
  const [isUpdate, SetIsUpdate] = useState<boolean>(false);
  const { employeeId } = useParams<{ employeeId: string }>(); // Get employeeId from URL params as a string
  const parsedEmployeeId = employeeId ? parseInt(employeeId, 10) : null;
  const storedEmployeeData = localStorage.getItem("employeesData");

  const employeesData: Employee[] = storedEmployeeData
    ? JSON.parse(storedEmployeeData)
    : [];
  const employee = employeesData.find(
    (employee) => employee.employeeId == parsedEmployeeId
  );

  const [resetEmployee] = useState<Employee>({
    employeeId: 0,
    firstName: "",
    addedBy: "",
    addedTime: "",
    lastName: "",
    email: "",
    dateOfJoining: "",
    secondaryReportingTo: "null",
    reportingTo: "",
    leadPosition: "",
    sourceOfHire: " ",
    seatingPosition: "",
    locationofOffice: "",
    employeeStatus: "",
    employeeType: " ",
    workPhone: 0,
    extension: "",
    role: "null",
    otherEmail: " ",
    birthDate: "",
    martialStatus: "",
    address: "",
    jobDescription: "",
    aboutMe: "",
    expertiseaboutme: "",
    phoneNumber: 0,
    timeZone: "",
    department: "",
    position: "",
    jobHistory: [],
    skills: [],
    employeeRole: null,
  });

  //   const [employeeDetail, setEmployeeDetail] = useState<Employee>({
  //     employeeId: 0,
  //     firstName: "",
  //     addedBy: "",
  //     addedTime: new Date(),
  //     lastName: "",
  //     email: "",
  //     dateOfJoining: new Date(),
  //     secondaryReportingTo: "null",
  //     reportingTo: "",
  //     leadPosition: "",
  //     sourceOfHire: " ",
  //     seatingPosition: "",
  //     locationofOffice: "",
  //     employeeStatus: "",
  //     employeeType: " ",
  //     workPhone: 0,
  //     extension: "",
  //     role: "null",
  //     otherEmail: " ",
  //     birthDate: new Date(),
  //     martialStatus: "",
  //     address: "",
  //     jobDescription: "",
  //     aboutMe: "",
  //     expertiseaboutme: "",
  //     phoneNumber: 0,
  //     timeZone: "",
  //     department: "",
  //     position: "",
  //     jobHistory: [],
  //     skills: [],
  //     employeeRole: null,
  //   });
  // const defaultBirthDate = new Date(); // Set a default date if birthDate is not available or invalid

  useEffect(() => {
    if (isNaN(parsedEmployeeId as any)) {
      reset(resetEmployee);
      console.log("hello");
    }
  }, [parsedEmployeeId]);
  //   useEffect(() => {
  //     if (employee && employee.jobHistory) {
  //       employee.jobHistory.forEach((history, index) => {
  //         append(history);
  //       });
  //     }
  //   }, []);
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
    control,
  } = useForm<Employee>({
    mode: "onChange",
    resolver: yupResolver(employeeSchema) as any,
    defaultValues: resetEmployee,
  });

  //   const handleChange = async(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //     const { name, value } = e.target;
  // console.log(name,value)
  //     setEmployeeDetail((prevEmployee: Employee) => ({
  //       ...prevEmployee,
  //       [name]: value,
  //     }));

  //   };
  useEffect(() => {
    if (employee) {
      reset(employee);
      console.log("hi");
    }
  }, [employeeId]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "jobHistory",
  });

  const {
    fields: skillsFields,
    append: appendSkills,
    remove: removeSkills,
  } = useFieldArray({
    control,
    name: "skills",
  });
  const onUpdate = () => {
    SetIsUpdate(true);
  };
  const onSubmitForm: SubmitHandler<Employee> = async (data: Employee) => {
    console.log("button");
    console.log(data);
    console.log(isUpdate)
    try {
      await employeeSchema.validate(data, { abortEarly: false });
      const skills = data.skills.map((skill) => ({
        skillName: skill.skillName,
      }));
      const jobHistory = data?.jobHistory?.map((history) => ({
        companyName: history.companyName,
        jobTitle: history.jobTitle,
        fromDate: history.fromDate,
        toDate: history.toDate,
        jobDescription: history.jobDescription,
      }));
      const formattedDateOfJoining: string = dayjs(data?.dateOfJoining).format('YYYY-MM-DD');

        data.dateOfJoining = (formattedDateOfJoining);
console.log(data.dateOfJoining)
      const formattedBirthDate: string = new Date(data?.birthDate)
        .toISOString()
        .slice(0, 10);
      data.birthDate = formattedBirthDate;
      const formattedAddedDate: string = new Date(data?.addedTime)
        .toISOString()
        .slice(0, 10);
      data.addedTime = formattedAddedDate;
      const formData = { ...data, skills, jobHistory };
      console.log(formData);

      const storedEmployeeData = localStorage.getItem("employeesData");
      const stordlogindetais = localStorage.getItem("user");

      let employeeData: Employee[] = storedEmployeeData
        ? JSON.parse(storedEmployeeData)
        : [];
      let logindetail: UserInfo[] = stordlogindetais
        ? JSON.parse(stordlogindetais)
        : [];
      console.log(logindetail);
      if (isUpdate) {
        const index = employeeData.findIndex(
          (employee) => employee.employeeId === data.employeeId
        );
        if (index !== -1) {
          employeeData[index] = data;
          const baseURL = "https://avatar.iran.liara.run/username?";
          const firstName = data.firstName;
          const lastName = data.lastName;
          const url = `${baseURL}username=${firstName}+${lastName}`;

          if (employeeData[index]?.imageUrl === undefined) {
            employeeData[index].imageUrl = url;
          }

          console.log(employeeData[index].imageUrl);

          localStorage.setItem("employeesData", JSON.stringify(employeeData));
          setFormError("");
          SetIsUpdate(false);

          navigate(`/employee`);
        } else {
          setFormError("Employee not found for update");
          SetIsUpdate(false);
        }
      } 
      else 
      {
        const matchingEmployee = employeeData.find(
          (employee) => employee.employeeId === data.employeeId
        );
        if (matchingEmployee) {
          setFormError("Employee ID already exists");
        } else if (data.employeeId === 0) {
          setFormError("Employee ID cannot be 0");
        } else {
          console.log("hi")
          const storedLeaveData = localStorage.getItem("leaveAllocated");
          const existingLeaveData= storedLeaveData?JSON.parse(storedLeaveData):[];
console.log("f",existingLeaveData)
          const leaveOptionsData = {
            employeeId: data.employeeId,
            earnedLeave: 20,
            marriageLeave: 20,
            casualLeave: 20,
            optionalHoliday: 20,
            sickLeave: 20,
            leaveWithoutPay: 20,
          };
          const leaveBookedData = {
            employeeId: data.employeeId,
            earnedLeave: 0,
            marriageLeave: 0,
            casualLeave: 0,
            optionalHoliday: 0,
            sickLeave: 0,
            leaveWithoutPay: 0,
          };
          if (existingLeaveData) {
            existingLeaveData.push(leaveOptionsData);
            localStorage.setItem("leaveData", JSON.stringify(existingLeaveData));
          
          }
          console.log("existingLeaveData",existingLeaveData);
          const storedLeaveAvailable = localStorage.getItem("leaveAvailable");
          const existingLeaveAvailable = storedLeaveAvailable
            ? JSON.parse(storedLeaveAvailable)
            : [];

          existingLeaveAvailable.push(leaveOptionsData);
                    localStorage.setItem("leaveAvailable",JSON.stringify(existingLeaveAvailable))
          console.log("dd", existingLeaveAvailable);
          const storedLeaveBooked = localStorage.getItem("leaveBooked");
          const existingLeaveBooked = storedLeaveBooked
            ? JSON.parse(storedLeaveBooked)
            : [];

          existingLeaveBooked.push(leaveBookedData);
                    localStorage.setItem("leaveBooked",JSON.stringify(existingLeaveBooked))

          console.log("dd", existingLeaveBooked);
          // Add email, password, and role to user key in local storage
          const baseURL = "https://avatar.iran.liara.run/username?";
          const firstName = data.firstName;
          const lastName = data.lastName;
          const url = `${baseURL}username=${firstName}+${lastName}`;

          data.imageUrl = url;
          employeeData.push(data);

          localStorage.setItem("employeesData", JSON.stringify(employeeData));
          // console.log(matchingEmployee.imageUrl)
          const user: UserInfo = {
            email: data.email,
            password: "manage",
            role: data.employeeRole as string,
          };
          logindetail.push(user);
          console.log(logindetail, "hello");
          localStorage.setItem("user", JSON.stringify(logindetail));
          setFormError("");
          console.log("employee added");
          // navigate(`/employee`);
        }
      }
    } catch (error) {
      // Handle validation errors
      console.log("ctacherror",error);
    }
  };

  console.log("error", errors);

  //    function handleselected(event: ChangeEvent<HTMLSelectElement>) {
  //     const selectedRole = event.target.value as "employee" | "manager" | "admin";

  //     // Update the state with the selected role
  //     setEmployeeDetail((prevState) => ({
  //       ...prevState,
  //       employeeRole: selectedRole,
  //     }));
  //     console.log(employeeDetail);
  //   }

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="max-w-screen w-full mx-auto bg-white rounded px-8 pt-6 pb-8 mb-4 h-fit"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <div className="bg-white rounded-lg shadow-md p-6 ml-14 m-10">
        <h2 className="text-lg font-bold mb-3 title text-left">Basic Info</h2>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="flex my-4">
              <label
                className=" text-gray-700 text-sm my-4 font-bold mb-2 mr-4 flex items-center		"
                htmlFor="employeeId"
              >
                EmployeeId <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="employeeId"
                {...register("employeeId")}
                //   onChange={handleChange}
                className={`shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.employeeId ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.employeeId && (
              <p className="text-red-500 text-xs italic my-4 ml-5">
                {errors.employeeId.message}
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="flex my-4">
              <label
                className=" text-gray-700 text-sm my-4 font-bold mb-2 items-center flex"
                htmlFor="firstName"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName")}
                className={`shadow appearance-none border rounded ml-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.firstName ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-xs italic my-4 ml-5">
                First Name is required
              </p>
            )}
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="flex my-4">
              <label
                className="mr-4 text-gray-700 my-4 text-sm font-bold mb-2 flex items-center"
                htmlFor="lastName"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName")}
                className={`shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.lastName ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-xs italic my-4 ml-5">
                Last Name is required
              </p>
            )}
          </div>
          {employeeId ? (
            ""
          ) : (
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <div className="flex my-4">
                <label
                  className=" text-gray-700 my-4 mr-4 text-sm font-bold mb-2 flex items-center"
                  htmlFor="email"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="email"
                  {...register("email")}
                  className={`shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs italic my-4 ml-5">
                  Email is required
                </p>
              )}
            </div>
          )}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="flex my-4">
              <label
                className=" text-gray-700 text-sm my-4 font-bold mb-2 flex items-center mr-4"
                htmlFor="addedBy"
              >
                Added By <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="addedBy"
                {...register("addedBy")}
                className={`shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.addedBy ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.addedBy && (
              <p className="text-red-500 text-xs italic my-4 ml-5">
                Added By is required
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="flex my-4">
              <label
                className=" text-gray-700 text-sm my-4 font-bold mb-2 flex items-center mr-4"
                htmlFor="timeZone"
              >
                Time Zone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="timeZone"
                {...register("timeZone")}
                className={`shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors?.timeZone ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.timeZone && (
              <p className="text-red-500 text-xs italic my-4 ml-5">
                Time Zone is required
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="flex my-4">
              <label
                className=" text-gray-700 text-sm my-4 font-bold mb-2 flex items-center mr-4"
                htmlFor="addedTime"
              >
                Added Time <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="addedTime"
                placeholder="date"
                //   value={
                //     employeeDetail?.addedTime instanceof Date
                //       ? employeeDetail.addedTime.toISOString().split("T")[0]
                //       : (
                //           employeeDetail?.addedTime as string | undefined
                //         )?.split("T")[0]
                //   }
                {...register("addedTime")}
                //   onChange={handleChange}
                className={`shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.addedTime ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.addedTime && (
              <p className="text-red-500 text-xs italic my-4 ml-5">
                Added Time is required
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 ml-14 m-10">
        <h2 className="text-lg font-bold mb-3 title text-left">Work</h2>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="flex">
              <label
                className="mr-4 text-gray-700 text-sm my-4 font-bold mb-2 flex items-center "
                htmlFor="dateOfJoining"
              >
                Date of Joining <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dateOfJoining"
                //   defaultValue={new Date().toISOString().split("T")[0]}

                {...register("dateOfJoining")}
                className={`shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.dateOfJoining ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.dateOfJoining && (
              <p className="text-red-500 text-xs italic my-4 ml-5">
                Date of Joining is required
              </p>
            )}
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="flex">
              <label
                className="mr-4 text-gray-700 text-sm my-4 font-bold mb-2 flex items-center "
                htmlFor="reportingTo"
              >
                Reprting To <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="reportingTo"
                {...register("reportingTo")}
                className={`shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.reportingTo ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.reportingTo && (
              <p className="text-red-500 text-xs italic my-4 ml-5">
                Reporting to is required
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="flex my-4">
              <label
                className=" text-gray-700 text-sm font-bold mb-2 flex items-center mr-4"
                htmlFor="leadPosition"
              >
                Reporting Employee Position
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="leadPosition"
                {...register("leadPosition")}
                className={`shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none my-4 focus:shadow-outline ${
                  errors.leadPosition ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.leadPosition && (
              <p className="text-red-500 text-xs italic my-4 ml-5">
                Reporting Employee Position is required
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="flex my-4">
              <label
                className=" text-gray-700 text-sm my-4 font-bold mb-2 flex mr-4 items-center"
                htmlFor="sourceOfHire"
              >
                Source Of Hire
              </label>
              <input
                type="text"
                id="sourceOfHire"
                {...register("sourceOfHire")}
                className={`shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.sourceOfHire ? "border-red-500" : ""
                }`}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="flex my-4">
              <label
                className=" text-gray-700 text-sm  font-bold my-4 mr-5 mb-2 flex items-center"
                htmlFor="employeeStatus"
              >
                Employee Status <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="employeeStatus"
                {...register("employeeStatus")}
                className={`shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.employeeStatus ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.employeeStatus && (
              <p className="text-red-500 text-xs my-4 italic" ml-5>
                Employee Status is required
              </p>
            )}
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="flex my-4">
              <label
                className=" text-gray-700 mr-4 flex items-center text-sm font-bold mb-2"
                htmlFor="employeeType"
              >
                Employee Position <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="position"
                {...register("position")}
                className={`shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.position ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.position && (
              <p className="text-red-500 text-xs my-4 ml-5 italic">
                employee position is required
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="flex">
              <label
                className="mr-4 text-gray-700 text-sm my-4 font-bold mb-2 flex items-center "
                htmlFor="department"
              >
                Department<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="department"
                {...register("department")}
                className={`shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.department ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.department && (
              <p className="text-red-500 text-xs italic my-4 ml-5">
                Department is required
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="flex my-4">
              <label
                className=" text-gray-700 text-sm my-4 font-bold mb-2 flex items-center mr-4"
                htmlFor="seatingPosition"
              >
                Seating Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="seatingPosition"
                {...register("seatingPosition")}
                className={`shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.seatingPosition ? "border-red-500" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 ml-14 m-10">
        <h2 className="text-lg font-bold mb-3 title text-left">Personal</h2>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="flex mb-4">
              <label
                className="flex items-center mr-4 text-gray-700 text-sm font-bold mb-2"
                htmlFor="phoneNumber"
              >
                Mobile Phone <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                id="phoneNumber"
                {...register("phoneNumber")}
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.phoneNumber ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs my-4 italic">
                Mobile Phone is required
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="flex mb-4">
              <label
                className="flex items-center mr-4 text-gray-700 text-sm font-bold mb-2"
                htmlFor="otherEmail"
              >
                Other Email
              </label>
              <input
                type="text"
                id="otherEmail"
                {...register("otherEmail")}
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.otherEmail ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.otherEmail && (
              <p className="text-red-500 text-xs itali my-4c">
                Other Email is required
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="flex mb-4">
              <label
                className="flex items-center mr-4 text-gray-700 text-sm font-bold mb-2 "
                htmlFor="birthDate"
              >
                Birth Date <span className="text-red-500">*</span>
              </label>

              <input
                type="date"
                id="birthDate"
                //   value={
                //     employeeDetail?.birthDate instanceof Date
                //       ? employeeDetail.birthDate.toISOString().split("T")[0]
                //       : (
                //           employeeDetail?.birthDate as string | undefined
                //         )?.split("T")[0]
                //   }
                {...register("birthDate")}
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.birthDate ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.birthDate && (
              <p className="text-red-500 text-xs my-4 italic">
                Birth Date is required
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="flex mb-4">
              <label
                className="flex items-center mr-4 text-gray-700 text-sm font-bold mb-2"
                htmlFor="martialStatus"
              >
                Marital Status <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="maritalStatus"
                {...register("martialStatus")}
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.martialStatus ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.martialStatus && (
              <p className="text-red-500 text-xs my-4 italic">
                Marital Status is required
              </p>
            )}
          </div>
          <div className="w-full px-3">
            <div className="flex flex-wrap">
              <div className=" flex mb-4">
                <label
                  className="flex items-center mr-4 text-gray-700 text-sm font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  type="textArea"
                  id="address"
                  {...register("address")}
                  className={`shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.address ? "border-red-500" : ""
                  }`}
                />
              </div>
            </div>
            {errors.address && (
              <p className="text-red-500 text-xs my-4 italic">
                Address is required
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <div className="flex mb-4">
              <label
                className="flex items-center mr-4 text-gray-700 text-sm font-bold mb-2"
                htmlFor="employeeRole"
              >
                Employee Role <span className="text-red-500">*</span>
              </label>
              <select
                id="employeeRole"
                {...register("employeeRole")}
                className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.employeeRole ? "border-red-500" : ""
                }`}
              >
                <option>Please select a role</option>
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {errors.employeeRole && (
              <p className="text-red-500 text-xs my-4 italic">
                {errors.employeeRole.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 ml-14 m-10">
        <h2 className="text-lg font-bold mb-3 title text-left">
          Work Experience
        </h2>
        <h2 className="text-lg font-bold mb-3 title text-left">Job History</h2>
        {fields.map((field, index) => (
          <div className="bg-white rounded-lg shadow-md p-6 ml-14 m-10">
            <div key={field.id} className="mb-4">
              <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <div className="flex mb-4">
                    <label
                      className="flex items-center mr-4 text-gray-700 text-sm font-bold mb-2"
                      htmlFor={`companyName_${index}`}
                    >
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`companyName_${index}`}
                      // value={employeeDetail?.jobHistory?.[index]?.companyName}
                      {...register(`jobHistory.${index}.companyName`)}
                      className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors?.jobHistory &&
                        errors?.jobHistory[index] &&
                        errors?.jobHistory[index]?.companyName
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                  </div>
                  {errors?.jobHistory &&
                    errors?.jobHistory[index] &&
                    errors?.jobHistory[index]?.companyName && (
                      <p className="text-red-500 text-xs my-2 italic">
                        {errors?.jobHistory[index]?.companyName?.message}
                      </p>
                    )}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <div className="flex mb-4">
                    <label
                      className="flex items-center mr-4 text-gray-700 text-sm font-bold mb-2"
                      htmlFor={`jobTitle_${index}`}
                    >
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id={`jobTitle_${index}`}
                      // value={
                      //   employeeDetail?.jobHistory &&
                      //   employeeDetail?.jobHistory[index]?.jobTitle
                      // }
                      {...register(`jobHistory.${index}.jobTitle`)}
                      className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors?.jobHistory &&
                        errors?.jobHistory[index] &&
                        errors?.jobHistory[index]?.jobTitle
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                  </div>
                  {errors?.jobHistory &&
                    errors?.jobHistory[index] &&
                    errors?.jobHistory[index]?.jobTitle && (
                      <p className="text-red-500 text-xs my-2 italic">
                        {errors?.jobHistory[index]?.jobTitle?.message}
                      </p>
                    )}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <div className="flex mb-4">
                    <label
                      className="flex items-center mr-4 text-gray-700 text-sm font-bold mb-2"
                      htmlFor={`fromDate_${index}`}
                    >
                      From Date
                    </label>
                    <input
                      type="date"
                      id={`fromDate_${index}`}
                      // value={
                      //   employeeDetail?.jobHistory?.[index]?.fromDate
                      //     ? new Date(
                      //         employeeDetail.jobHistory[index].fromDate
                      //       )
                      //         .toISOString()
                      //         .split("T")[0]
                      //     : (
                      //         employeeDetail?.jobHistory?.[index]
                      //           ?.fromDate as string | undefined
                      //       )?.split("T")[0]
                      // }
                      {...register(`jobHistory.${index}.fromDate`)}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  {errors?.jobHistory &&
                    errors?.jobHistory[index] &&
                    errors?.jobHistory[index]?.fromDate && (
                      <p className="text-red-500 text-xs my-2 italic">
                        {errors?.jobHistory[index]?.fromDate?.message}
                      </p>
                    )}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <div className="flex mb-4">
                    <label
                      className="flex items-center mr-4 text-gray-700 text-sm font-bold mb-2"
                      htmlFor={`toDate_${index}`}
                    >
                      To Date
                    </label>
                    <input
                      type="date"
                      id={`toDate_${index}`}
                      // value={
                      //     employeeDetail?.jobHistory?.[index]?.toDate
                      //     ? new Date(employeeDetail.jobHistory[index].toDate)
                      //         .toISOString()
                      //         .split("T")[0]
                      //     : (
                      //         employeeDetail?.jobHistory?.[index]?.toDate as
                      //           | string
                      //           | undefined
                      //       )?.split("T")[0]
                      // }
                      {...register(`jobHistory.${index}.toDate`)}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  {errors.jobHistory &&
                    errors?.jobHistory[index] &&
                    errors.jobHistory?.[index]?.toDate && (
                      <p className="text-red-500 text-xs my-2 italic">
                        {errors?.jobHistory?.[index]?.toDate?.message}
                      </p>
                    )}
                </div>
                <div className="w-full px-3">
                  <div className="flex mb-4">
                    <label
                      className="flex items-center mr-4 text-gray-700 text-sm font-bold mb-2"
                      htmlFor={`jobDescription_${index}`}
                    >
                      Job Description
                    </label>
                    <input
                      type="text"
                      id={`jobDescription_${index}`}
                      // value={
                      //   employeeDetail?.jobHistory?.[index]?.jobDescription
                      // }
                      {...register(`jobHistory.${index}.jobDescription`)}
                      className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  {errors.jobHistory &&
                    errors.jobHistory[index] &&
                    errors?.jobHistory[index]?.jobDescription && (
                      <p className="text-red-500 text-xs my-2 italic">
                        {errors?.jobHistory[index]?.jobDescription?.message}
                      </p>
                    )}
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 mt-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            append({
              companyName: "",
              jobTitle: "",
              fromDate: new Date(),
              toDate: new Date(),
              jobDescription: "",
            })
          }
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-10"
        >
          Add Job
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 ml-14 m-10">
        <h2 className="text-lg font-bold mb-3 title text-left">Skills</h2>
        {skillsFields.map((field, index) => (
          <div key={field.id} className="mb-4">
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <div className="flex mb-4">
                  <label
                    className="flex items-center mr-4 text-gray-700 text-sm font-bold mb-2"
                    htmlFor={`skillName_${index}`}
                  >
                    Skill Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    //   value={employeeDetail?.skills[index]?.skillName}
                    id={`skillName_${index}`}
                    {...register(`skills.${index}.skillName`)}
                    className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.skills && errors.skills[index]?.skillName
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                </div>
                {errors?.skills && errors?.skills[index]?.skillName && (
                  <p className="text-red-500 text-xs my-2 italic">
                    {errors?.skills[index]?.skillName?.message}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => removeSkills(index)}
                className="bg-red-500 mt-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            appendSkills({
              skillName: "",
            })
          }
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-10"
        >
          Add Skill
        </button>
      </div>

      <div>
        {formError && (
          <div className="text-red-500 text-xs ml-auto mr-auto italic my-4 flex justify-center">
            {formError}
          </div>
        )}
      </div>
      <div className="flex items-center ml-10">
        {employeeId ? (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onUpdate}
          >
            Update
          </button>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 ml-10 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add
          </button>
        )}
      </div>
    </form>
  );
};

export default EmployeeForm;
