import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ReactApexChart from "react-apexcharts";

// import { BarChart, PieChart } from "@mui/x-charts";
import {
 
  useMediaQuery,
  createTheme,
} from "@mui/material";

const { Option } = Select;
const theme = createTheme(); // Create your custom theme
interface FormData {
 
  tasks: FormTasks[]
}
interface FormTasks{
    feedback: string;
    performance: number;

    task: string;
    qualityOfCode: number;
    quantityOfCode: number;
    contributionToCompany: number;
  
}
interface Task {
  tasks: FormTasks;
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

const Performancegenerator: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<Task[]>([]); // Initialize with an empty array

  const storedEmployeesData = localStorage.getItem("employeesData");
  const employeesData: Employee[] = storedEmployeesData
    ? JSON.parse(storedEmployeesData)
    : [];
  const employees: Employee[] = employeesData.filter((employee) => {
    return employee.employeeRole !== "admin";
  });

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    employee: Yup.number().required("Employee is required"),
    task: Yup.string().required("Task is required"),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const chartSetting = {
    yAxis: [
      {
        label: "Performance",
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

  useEffect(() => {
    const storedTaskData = localStorage.getItem("taskData");
    const existingTaskData: Task[] = storedTaskData
      ? JSON.parse(storedTaskData)
      : [];
    const filteredTasks: Task[] = existingTaskData.filter(
      (task) => task.employeeId === selectedEmployee
    );
    setTasks(filteredTasks);
  }, [selectedEmployee]);
  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    const existingFormData = storedFormData ? JSON.parse(storedFormData) : [];
    const filtereData = existingFormData.filter((data:FormData) => {
      // Assuming selectedId and selectedTask are the selected employee ID and task name, respectively
      const selectedId = selectedEmployee; // For example
      const taskTobeFilterer = selectedTask; // For example
      return (
        data.employee === selectedId &&
        data.tasks.some((task) => task.task === taskTobeFilterer)
      );
    });
    setFilteredData(filtereData);
    console.log(filteredData, "h");
  }, [selectedTask]);

  const onSubmit = (data: { employee: number; task: string }) => {
    setIsGenerated(true);
    setSelectedTask(data.task);
  };

//   const renderPieCharts = () => {
//     if (isGenerated && filteredData.length > 0) {
//       const qualityPieSeries = filteredData.map((data:FormData) => {
//         console.log(data, "hd"); // Log each data object individually
//         return {
//           data: [
//             { label: `Total Points`, value: 10 },
//             // Map over taskName array and access qualityOfCode for each task
//             ...data.tasks.map((task:FormTasks) => ({
//               label: `Quality of Code`,
//               value: task.qualityOfCode,
//             })),
//           ],
//           highlightScope: {
//             faded: "global",
//             highlighted: "item",
//           },
//           faded: {
//             innerRadius: 30,
//             additionalRadius: -30,
//             color: "gray",
//           },
//           innerRadius: 30,
//           outerRadius: 70,
//           paddingAngle: 5,
//           cornerRadius: 5,
//           startAngle: -90,
//           endAngle: 180,
//         };
//       });

     

//       const quantityOfCode = filteredData.map((data) => {
//         console.log(data, "hd"); // Log each data object individually
//         return {
//           data: [
//             { label: `Total Points`, value: 10 },
//             // Map over taskName array and access qualityOfCode for each task
//             ...data.tasks.map((task:FormTasks) => ({
//               label: `Quantity of COde`,
//               value: task.quantityOfCode,
//             })),
//           ],
//           highlightScope: {
//             faded: "global",
//             highlighted: "item",
//           },
//           faded: {
//             innerRadius: 30,
//             additionalRadius: -30,
//             color: "gray",
//           },
//           innerRadius: 30,
//           outerRadius: 70,
//           paddingAngle: 5,
//           cornerRadius: 5,
//           startAngle: -90,
//           endAngle: 180,
//         };
//       });

//       const contributionToCompany = filteredData.map((data) => {
//         console.log(data, "hd"); // Log each data object individually
//         return {
//           data: [
//             { label: `Total Points`, value: 10 },
//             // Map over taskName array and access qualityOfCode for each task
//             ...data.tasks.map((task:FormTasks) => ({
//               label: `Contribution to Company`,
//               value: task.contributionToCompany,
//             })),
//           ],
//           highlightScope: {
//             faded: "global",
//             highlighted: "item",
//           },
//           faded: {
//             innerRadius: 30,
//             additionalRadius: -30,
//             color: "gray",
//           },
//           innerRadius: 30,
//           outerRadius: 70,
//           paddingAngle: 5,
//           cornerRadius: 5,
//           startAngle: -90,
//           endAngle: 180,
//         };
//       });

//       const performanceInTheTask = filteredData.map((data) => {
//         console.log(data, "hd"); // Log each data object individually
//         return {
//           data: [
//             { label: `Total Points`, value: 30 },
//             // Map over taskName array and access qualityOfCode for each task
//             ...data.tasks.map((task:FormTasks) => ({
//               label: `Performance of Employee`,
//               value: task.performance,
//             })),
//           ],
//           highlightScope: {
//             faded: "global",
//             highlighted: "item",
//           },
//           faded: {
//             innerRadius: 30,
//             additionalRadius: -30,
//             color: "gray",
//           },
//           innerRadius: 30,
//           outerRadius: 70,
//           paddingAngle: 5,
//           cornerRadius: 5,
//           startAngle: -90,
//           endAngle: 180,
//           label: {
//             position: 'left', // Set the position of the labels to the left
//             offset: 30, // Adjust the offset to shift the labels further left
//           },
//         };
//       });
//       return (
//         <>
//           <div className=" sm:grid-cols-1  grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  gap-4">
//             <div className="bg-white p-4 shadow-md rounded-lg">
//               <h3 className="text-lg font-semibold mb-2">
//                 Quality of code in the task
//               </h3>
//               <div className=" h-56 md:h-80 lg:h-96">
//                 <PieChart
//                   style={{
//                     width: 200,
//                     height: isSmallScreen ? 200 : 400, // Adjust height based on screen size
//                   }}
//                   series={qualityPieSeries}
//                 />
//               </div>
//             </div>
//             <div className="bg-white p-4 shadow-md rounded-lg">
//               <h3 className="text-lg font-semibold mb-2">
//                 Quantity of Code of code in the task
//               </h3>
//               <div className=" h-56 md:h-80 lg:h-96">
//                 <PieChart
//                   style={{
//                     width: 200,
//                     height: isSmallScreen ? 200 : 400, // Adjust height based on screen size
//                   }}
//                   series={quantityOfCode}
//                 />
//               </div>
//             </div>
//             <div className="bg-white p-4 shadow-md rounded-lg">
//               <h3 className="text-lg font-semibold mb-2">
//                 Contribution to Company in the task
//               </h3>
//               <div className=" h-56 md:h-80 lg:h-96">
//                 <PieChart
//                   style={{
//                     width: 200,
//                     height: isSmallScreen ? 200 : 400, // Adjust height based on screen size
//                   }}
//                   series={contributionToCompany}
//                 />
//               </div>
//             </div>
//             <div className="bg-white p-4   shadow-md rounded-lg">
//               <h3 className="text-lg font-semibold mb-2">
//                 Performance and Feedback
//               </h3>
//               <div className=" h-56 md:h-80 lg:h-96">
//                 <PieChart
//                   style={{
//                     width: 200,
//                     height: isSmallScreen ? 200 : 400, // Adjust height based on screen size
//                   }}
//                   series={performanceInTheTask}
//                 />
               
//               </div>
//               {filteredData.map((data, index) => (
//                   <div key={index}>
//                     {data.tasks.map((task:FormTasks, taskIndex:number) => (
//  <h4 key={taskIndex} className="mt-4 text-lg text-center font-medium text-gray-800">
//  Feedback for the employee: {task.feedback}
// </h4>
//                     ))}
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </>
//       );
      
//     }
//   };

const renderPieCharts = () => {
  if (isGenerated && filteredData.length > 0) {
    return filteredData.map((data, index) => (
      <div key={index} className="bg-white p-4 shadow-md rounded-lg mb-4">
        <h3 className="text-lg font-semibold mb-2">Performance Metrics for Task {selectedTask}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          <div>
            <h4 className="text-lg font-semibold mb-2">Quality of Code</h4>
            <ReactApexChart
              options={{
                chart: {
                  type: "pie",
                },
                labels: ["Total Points", "Quality of Code"],
              }}
              series={[10, ...data.tasks.map((task:FormTasks) => task.qualityOfCode)]}
              type="pie"
              height={isSmallScreen ? 300 : 400}
            />
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Quantity of Code</h4>
            <ReactApexChart
              options={{
                chart: {
                  type: "pie",
                },
                labels: ["Total Points", "Quantity of Code"],
              }}
              series={[10, ...data.tasks.map((task:FormTasks) => task.quantityOfCode)]}
              type="pie"
              height={isSmallScreen ? 300 : 400}
            />
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Contribution to Company</h4>
            <ReactApexChart
              options={{
                chart: {
                  type: "pie",
                },
                labels: ["Total Points", "Contribution to Company"],
              }}
              series={[10, ...data.tasks.map((task:FormTasks) => task.contributionToCompany)]}
              type="pie"
              height={isSmallScreen ? 300 : 400}
            />
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Performance</h4>
            <ReactApexChart
              options={{
                chart: {
                  type: "pie",
                },
                labels: ["Total Points", "Performance"],
              }}
              series={[30, ...data.tasks.map((task:FormTasks) => task.performance)]}
              type="pie"
              height={isSmallScreen ? 300 : 400}
            />
          </div>
        </div>
        {data.tasks.map((task:FormTasks, taskIndex:number) => (
          <h4 key={taskIndex} className="mt-4 text-lg text-center font-medium text-gray-800">
            Feedback for the employee: {task.feedback}
          </h4>
        ))}
      </div>
    ));
  }
};

  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-11/12 xs:w-auto mx-auto mt-10 bg-white rounded-lg shadow-md p-6 m-10 ml-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="employee" className="mr-4 self-center md:mb-0">
              Select Employee:
            </label>
            <Controller
              name="employee"
              control={control}
              render={({ field }) => (
                <>
                  <Select
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      setSelectedEmployee(value);
                    }}
                    showSearch
                    placeholder="Select employee"
                    // className="border-b border-gray-300 outline-none w-4/6 text-lg focus:border-blue-500"
                    filterOption={(input, option) =>
                      (option?.children as unknown as string)
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    className="border-b border-gray-300 outline-none w-full md:w-3/4 text-lg focus:border-blue-500"

                  >
                    <Option key="select" label="select" value="select">
                      Select
                    </Option>
                    {employees.map((employee) => (
                      <Option
                        key={employee.employeeId}
                        label={employee.firstName}
                        value={employee.employeeId}
                      >
                        {`${employee.firstName}  ${employee.lastName}`}
                      </Option>
                    ))}
                  </Select>
                  {errors.employee && (
                    <p className="text-red-500">{errors.employee.message}</p>
                  )}
                </>
              )}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="task" className="mr-4 self-center md:mb-0">
              Select Task:
            </label>
            {tasks && (
              <Controller
                name="task"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    showSearch
                    size="large"
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      setSelectedTask(value);
                    }}
                    placeholder="Select a Task"
                    className="border-b border-gray-300 outline-none w-full md:w-3/4 text-lg focus:border-blue-500"
                  >
                    <Option key="select" label="select" value="select">
                      Select
                    </Option>
                    {tasks.map((task) => (
                      <Option
                        key={task.employeeId}
                        label={task.taskName}
                        value={task.taskName}
                      >
                        {`${task.taskName} `}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            )}
            {errors.task && (
              <p className="text-red-500">{errors.task.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white ml-4 py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {isGenerated && (
          <div>
           
            {renderPieCharts()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Performancegenerator;
