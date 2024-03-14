import { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Select } from "antd";
import { useSelector } from "react-redux";
import { LoginState } from "../../redux/store/rootreducer";

interface FormData {
  employee: number;
  tasks: {
    task: string;
    qualityOfCode: number;
    quantityOfCode: number;
    contributionToCompany: number;
  }[];
}
interface Task {
  taskOwner: string;
  taskName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  taskId: number | null;
  employeeId: number | null;
  reminderDate?: Date;
  priority: string;
  status: string;
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
const schema = yup.object().shape({
  employee: yup.number().required("Employee is required"),
  tasks: yup.array().of(
    yup.object().shape({
      task: yup.string().required("Task is required"),
      qualityOfCode: yup
        .number()
        .required("Quality of code is required")
        .min(1, "Quality of code must be at least 1")
        .max(10, "Quality of code must be at most 10"),
      quantityOfCode: yup
        .number()
        .required("Quantity of code is required")
        .min(1, "Quantity of code must be at least 1")
        .max(10, "Quantity of code must be at most 10"),
      contributionToCompany: yup
        .number()
        .required("Contribution to company is required")
        .min(1, "Contribution to company must be at least 1")
        .max(10, "Contribution to company must be at most 10"),
    })
  ),
});
const PerformanceForm = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<number>(0);
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [employeesData, setEmployeesData] = useState<Employee[]>([]);
  const role = useSelector((state: { auth: LoginState }) => state.auth.role);
  const { Option } = Select;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
  });
  const evaluatePerformance = (performanceValue: number) => {
    if (performanceValue < 6) {
      return "Poor performance. Significant improvement needed.";
    } else if (performanceValue >= 6 && performanceValue < 12) {
      return "Below average performance. Requires improvement.";
    } else if (performanceValue >= 12 && performanceValue < 18) {
      return "Satisfactory performance. Room for improvement.";
    } else if (performanceValue >= 18 && performanceValue < 24) {
      return "Good performance. Keep up the good work!";
    } else {
      return "Excellent performance. Outstanding job!";
    }
  };

  const onSubmit = (data: FormData) => {
    // Handle form submission logic here
    console.log(data);
    const updatedTasks = data.tasks.map((task) => ({
      ...task,
      performance:
        task.qualityOfCode + task.quantityOfCode + task.contributionToCompany,
      feedback: evaluatePerformance(
        task.qualityOfCode + task.quantityOfCode + task.contributionToCompany
      ),
    }));

    // Update FormData with updated tasks
    const updatedData: FormData = {
      ...data,
      tasks: updatedTasks,
    };

    // Handle form submission logic here
    console.log(updatedData);
    // Store the form data in local storage
    const formDataArray = JSON.parse(localStorage.getItem("formData") || "[]");
    localStorage.setItem(
      "formData",
      JSON.stringify([...formDataArray, updatedData])
    );
  };

  useEffect(() => {
    const storedTaskData = localStorage.getItem("taskData");
    const existingTaskData = storedTaskData ? JSON.parse(storedTaskData) : [];

    const completedTasks = existingTaskData.filter(
      (task: Task) =>
        task.status === "completed" && task.employeeId === selectedEmployee
    );

    const formData = JSON.parse(localStorage.getItem("formData") || "[]");
    const taskNames: string[] = formData.flatMap((data: any) =>
      data.tasks.map((task: any) => task.task)
    );

    const filteredCompletedTasks = completedTasks.filter(
      (task: Task) => !taskNames.includes(task.taskName)
    );

    console.log(filteredCompletedTasks);
    setTaskData(filteredCompletedTasks);
  }, [selectedEmployee]);
  console.log(selectedEmployee);
  console.log(taskData);
  // const employeesData = employeeData.filter((employee:Employee) => employee.employeeRole !== 'admin');
  useEffect(() => {
    const storedEmployeeData = localStorage.getItem("employeesData");
    const employeeData = storedEmployeeData
      ? JSON.parse(storedEmployeeData)
      : [];

   
      const employeesData = employeeData.filter(
        (employee: Employee) => employee.employeeRole !== "admin"
      )
      setEmployeesData(employeesData);
    
  }, []);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  return (
    <>
      <div className="w-full">
        <div className="w-11/12 xs:w-auto mx-auto mt-10 bg-white rounded-lg shadow-md p-6 m-10 ml-5">
          <h2 className="text-lg font-semibold mb-4">
            Performance Review Form
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="employee"
                className="mb-1 flex items-center w-1/4 text-base"
              >
                Employee
              </label>
              {/* Assuming employee data is stored in localStorage under key 'employeesData' */}
              <div className=" flex border-b-2 p-4">
                <label className=" mb-1 flex items-center w-2/6 text-base">
                  {" "}
                  Employee ID
                </label>
                <Controller
                  name="employee"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value} // Set the value prop explicitly
                      onChange={(value) => {
                        field.onChange(value); // Call field.onChange to update the form value
                        setSelectedEmployee(value); // Handle the selected value separately if needed
                      }}
                      showSearch
                      placeholder="Select employee"
                      className="border-b border-gray-300 outline-none w-4/6 text-lg focus:border-blue-500"
                      filterOption={(input, option) =>
                        (option?.children as unknown as string)
                          .toLowerCase() // Type assertion to treat option?.children as a string
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option key="select" label="select">
                        Select
                      </Option>
                      {employeesData.map((employee: any) => (
                        <Option
                          key={employee.employeeId}
                          label={employee.firstName}
                          value={employee.employeeId}
                        >
                          {` ${employee.firstName} ${employee.lastName}`}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
              </div>
            </div>{" "}
            {errors?.employee && (
              <span style={{ color: "red" }}>{errors?.employee?.message}</span>
            )}
            {fields.map((_task, index) => (
              <div className="bg-white rounded-lg shadow-md p-6 ml-14 m-10">
                <div className="mb-4">
                  <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <div className="flex  mb-4">
                        <label
                          className="flex items-center mr-4 text-gray-700 w-1/4 text-sm font-bold mb-2"
                          htmlFor={`tasks[${index}].task`}
                        >
                          Task <span className="text-red-500">*</span>
                        </label>
                        <Controller
                          name={
                            `tasks[${index}].task` as `tasks.${number}.task`
                          }
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              showSearch
                              className="border-b border-gray-300 outline-none w-4/6 text-lg focus:border-blue-500"
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              placeholder="Select task"
                            >
                              <Option key="select" label="select" disabled>
                                Select
                              </Option>
                              {taskData.map((task, index) => (
                                <Option key={index} value={task.taskName}>
                                  {task.taskName}
                                </Option>
                              ))}
                            </Select>
                          )}
                        />
                      </div>
                      {errors?.tasks &&
                        errors?.tasks[index] &&
                        errors?.tasks[index]?.task && (
                          <p className="text-red-500 text-xs my-2 italic">
                            {errors?.tasks[index]?.task?.message}
                          </p>
                        )}
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <div className="flex mb-4">
                        <label
                          className="flex items-center mr-4 text-gray-700 text-sm font-bold mb-2"
                          htmlFor={`tasks[${index}].qualityOfCode`}
                        >
                          Quality of Code{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Controller
                          name={
                            `tasks[${index}].qualityOfCode` as `tasks.${number}.qualityOfCode`
                          }
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="number"
                              className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                errors?.tasks &&
                                errors?.tasks[index] &&
                                errors?.tasks[index]?.qualityOfCode
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                          )}
                        />
                      </div>
                      {errors?.tasks &&
                        errors?.tasks[index] &&
                        errors?.tasks[index]?.qualityOfCode && (
                          <p className="text-red-500 text-xs my-2 italic">
                            {errors?.tasks[index]?.qualityOfCode?.message}
                          </p>
                        )}
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <div className="flex mb-4">
                        <label
                          className="flex items-center mr-4 text-gray-700 text-sm font-bold mb-2"
                          htmlFor={`tasks[${index}].quantityOfCode`}
                        >
                          Quantity of Code{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Controller
                          name={
                            `tasks[${index}].quantityOfCode` as `tasks.${number}.quantityOfCode`
                          }
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="number"
                              className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                errors?.tasks &&
                                errors?.tasks[index] &&
                                errors?.tasks[index]?.quantityOfCode
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                          )}
                        />
                      </div>
                      {errors?.tasks &&
                        errors?.tasks[index] &&
                        errors?.tasks[index]?.quantityOfCode && (
                          <p className="text-red-500 text-xs my-2 italic">
                            {errors?.tasks[index]?.quantityOfCode?.message}
                          </p>
                        )}
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <div className="flex mb-4">
                        <label
                          className="flex items-center mr-4 text-gray-700 text-sm font-bold mb-2"
                          htmlFor={`tasks[${index}].contributionToCompany`}
                        >
                          Contribution to Company{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Controller
                          name={
                            `tasks[${index}].contributionToCompany` as `tasks.${number}.contributionToCompany`
                          }
                          control={control}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="number"
                              className={`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                errors?.tasks &&
                                errors?.tasks[index] &&
                                errors?.tasks[index]?.contributionToCompany
                                  ? "border-red-500"
                                  : ""
                              }`}
                            />
                          )}
                        />
                      </div>
                      {errors?.tasks &&
                        errors?.tasks[index] &&
                        errors?.tasks[index]?.contributionToCompany && (
                          <p className="text-red-500 text-xs my-2 italic">
                            {
                              errors?.tasks[index]?.contributionToCompany
                                ?.message
                            }
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
                  task: "",
                  qualityOfCode: 0,
                  quantityOfCode: 0,
                  contributionToCompany: 0,
                })
              }
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-10"
            >
              Add Task
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white ml-4 py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PerformanceForm;
