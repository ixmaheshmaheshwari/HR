import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Select } from "antd";
import { useSelector } from "react-redux";
import { LoginState } from "../../redux/store/rootreducer";
import { toast } from "react-toastify";
import { ArrowLeftOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import moment from "moment";

const { Option } = Select;
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

const schema = yup.object().shape({
  taskOwner: yup.string().required("Task owner is required"),
  taskName: yup.string().required("Task name is required"),
  description: yup.string().required("Description is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup
    .date()
    .required("End date is required")
    .min(yup.ref("startDate"), "End date cannot be earlier than start date"),
  reminderDate: yup
    .date()
    .min(
      yup.ref("startDate"),
      "Reminder date cannot be earlier than start date"
    )
    .max(yup.ref("endDate"), "Reminder date cannot be later than end date"),
  priority: yup.string().required("Priority is required"),
  status: yup
    .string()
    .oneOf(["open", "completed"])
    .required("status is required"),
});

const AssignTask = () => {
  const navigate = useNavigate();

  const [isUpdate, SetIsUpdate] = useState<boolean>(false);

  const { taskId } = useParams<{ taskId: string }>(); // Get employeeId from URL params as a string
  const parsedTadkId = taskId ? parseInt(taskId, 10) : "";
  const formatDate = (date: any) => {
    // Check if the input is a valid date
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "";
    }

    // Get year, month, and day
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const day = date.getDate().toString().padStart(2, "0");

    // Return formatted date string in "yyyy-MM-dd" format
    return `${year}-${month}-${day}`;
  };
  const [resetTask, setResetTask] = useState<Task>({
    taskOwner: "",
    taskName: "",
    description: "",
    taskId: null,
    employeeId: null,
    startDate: new Date(),
    endDate: new Date(),
    reminderDate: undefined,
    priority: "",
    status: "open",
  });
  const employeeID = useSelector(
    (state: { auth: LoginState }) => state.auth.userId
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      taskOwner: resetTask.taskOwner,
      taskName: resetTask.taskName,
      description: resetTask.description,
      startDate: resetTask.startDate,
      endDate: resetTask.endDate,
      reminderDate: resetTask.reminderDate,
      priority: resetTask.priority,
      status: resetTask.status as "open" | "completed" | undefined,
    },
  });
  const employees = JSON.parse(localStorage.getItem("employeesData") || "[]");
  const filteredEmployee = employees.find(
    (employee: any) => employee.employeeId == employeeID
  );
  console.log(errors);

  const existingTask = JSON.parse(localStorage.getItem("taskData") || "[]");
  const editingTask = existingTask.find((task: Task) => {
    return task?.taskId === parsedTadkId;
  });
  console.log(editingTask);
  useEffect(() => {
    reset(editingTask);
  }, [taskId]);
  useEffect(() => {
    if (!taskId) {
      reset({
        taskOwner: resetTask?.taskOwner,
        taskName: resetTask?.taskName,
        description: resetTask?.description,
        startDate: resetTask?.startDate,
        endDate: resetTask?.endDate,
        reminderDate: resetTask.reminderDate,
        priority: resetTask?.priority,
        status: resetTask.status as "open" | "completed" | undefined,
      });
    }
  }, [taskId]);

  const onSubmit = (data: any) => {
    data.startDate = formatDate(data?.startDate);
    data.endDate = formatDate(data?.endDate);
    data.reminderDate = formatDate(data?.reminderDate);
    const storedTask = localStorage.getItem("taskData");
    const existingTask = storedTask ? JSON.parse(storedTask) : [];
    if (isUpdate) {
      const index = existingTask.findIndex(
        (tasks: any) => tasks.taskId === data.taskId
      );
      if (index !== -1) {
        existingTask[index] = data;

        localStorage.setItem("taskData", JSON.stringify(existingTask));

        SetIsUpdate(false);
        toast.success("Task Updated Successfully");
        navigate("/track-task");
      } else {
        SetIsUpdate(false);
      }
    } else {
      const isTaskPresent = existingTask.some((task: any) => {
        // Compare tasks by their properties (e.g., taskName, startDate, endDate)
        return task.taskName === data.taskName;
      });

      // If the task already exists, show an error and return
      if (isTaskPresent) {
        toast.error("Task is already present");
        return;
      }
      const lastTaskId =
        existingTask.length > 0
          ? existingTask[existingTask.length - 1].taskId
          : 0;
      const newTaskId = lastTaskId + 1;
      const employeed = employees.find(
        (employee: any) => employee.firstName == data.taskOwner
      );
      const newData = {
        ...data,
        employeeId: employeed.employeeId,
        taskId: newTaskId,
      };
      existingTask.push(newData);
      console.log(newTaskId);
      localStorage.setItem("taskData", JSON.stringify(existingTask));
      navigate("/track-task");
      console.log(newData); // Handle form submission
    }
  };

  const onUpdate = () => {
    SetIsUpdate(true);
  };
  // const data = [
  //   {
  //     description: "kjmn",
  //     endDate: "30/03/2024",
  //     priority: "high",
  //     reminderDate: "22/03/2024",
  //     startDate: "21/03/2024",
  //     status: "open",
  //     taskName: "kj",
  //     taskOwner: "Mahesh",
  //   },
  // ];

  // const dataString = JSON.stringify(data);

  // localStorage.setItem("taskData", dataString);

  return (
    <div className="w-full">
      <div className="w-11/12 xs:w-auto mx-auto mt-10 bg-white rounded-lg shadow-md p-6  m-10 ml-5">
        <div className="flex justify-between items-center mb-6">
          <button
            className="flex items-center text-blue-500"
            onClick={() => {
              navigate(`/track-task`);
            }}
          >
            <ArrowLeftOutlined className="mr-1" />
            Back
          </button>

          <button
            className="text-red-500"
            onClick={() => {
              navigate(`/track-task`);
            }}
          >
            <CloseCircleOutlined />
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-5">Task Details</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <div className="flex border-b-2 p-4">
              <label className=" mb-1 flex items-center w-1/4 text-base">
                Task Owner
              </label>
              <Controller
                control={control}
                name="taskOwner"
                render={({ field }) => (
                  <Select
                    {...field}
                    showSearch
                    size="large"
                    placeholder="Select a task owner"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label || "")
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    className=" border-b border-gray-300 outline-none w-3/4 text-lg focus:border-blue-500"
                  >
                    <Option key="select" label="select" value="select">
                      {" "}
                      Select
                    </Option>
                    {employees.map((employee: any) => (
                      <Option
                        key={employee.employeeId}
                        label={employee.firstName}
                        value={employee.firstName}
                      >
                        {`${employee.firstName}  ${employee.lastName}`}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            </div>
            {errors?.taskOwner && (
              <p className="text-red-500 flex justify-center">
                {errors?.taskOwner?.message}
              </p>
            )}
          </div>
          <div>
            <div className="flex border-b-2  p-4">
              <label className="mb-1 flex items-center w-1/4 text-base">
                Task Name
              </label>
              <Controller
                control={control}
                name="taskName"
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    // size="large"
                    className="border-b border-gray-300 outline-none w-3/4 text-lg focus:border-blue-500"
                  />
                )}
              />
            </div>
            {errors.taskName && (
              <p className="text-red-500 flex justify-center">
                {errors.taskName.message}
              </p>
            )}
          </div>
          <div>
            <div className="flex border-b-2  p-4">
              <label className="mb-1 flex items-center w-1/4 text-base">
                Description
              </label>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="border-b border-gray-300 outline-none w-3/4 text-lg focus:border-blue-500h"
                  />
                )}
              />
            </div>
            {errors.description && (
              <p className="text-red-500 flex justify-center">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <div className="flex border-b-2  p-4">
              <label className="mb-1 flex items-center w-1/4 text-base">
                Start Date
              </label>

              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className="border-b border-gray-300 outline-none w-3/4 text-lg focus:border-blue-500"
                    value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value}

                  />
                )}
              />
            </div>
            {errors.startDate && (
              <p className="text-red-500 flex justify-center">
                {errors.startDate.message}
              </p>
            )}
          </div>
          <div className="flex border-b-2  p-4">
            <label className="mb-1 flex items-center w-1/4 text-base">
              Due Date
            </label>
            <Controller
              control={control}
              name="endDate"
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="border-b border-gray-300 outline-none w-3/4 text-lg focus:border-blue-500"
                  value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value}

                />
              )}
            />
          </div>
          {errors?.endDate && (
            <p className="text-red-500 flex justify-center">
              {errors?.endDate?.message}
            </p>
          )}
          <div className="flex border-b-2 p-4">
            <label className=" mb-1 flex items-center w-1/4 text-base">
              Reminder Date
            </label>
            <Controller
              control={control}
              name="reminderDate"
              render={({ field }) => (
                <input
                  {...field}
                  // value={
                  //   editingTask?.reminderDate instanceof Date
                  //         ? editingTask.reminderDate.toISOString().split("T")[0]
                  //         : (
                  //           editingTask?.reminderDate as string | undefined
                  //           )?.split("T")[0]

                  //  }
                  value={field.value instanceof Date ? field.value.toISOString().split('T')[0] : field.value}

                  type="date"
                  className="border-b border-gray-300 outline-none w-3/4 text-lg focus:border-blue-500"
                />
              )}
            />
          </div>
          {errors?.reminderDate && (
            <p className="text-red-500 flex justify-center">
              {errors?.reminderDate?.message}
            </p>
          )}

          <div>
            <div className="flex border-b-2 p-4">
              <label className=" mb-1 flex items-center w-1/4 text-base">
                Priority
              </label>
              <Controller
                control={control}
                name="priority"
                render={({ field }) => (
                  <Select
                    {...field}
                    showSearch
                    size="large"
                    placeholder="Select priority"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option?.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    className=" border-b border-gray-300 outline-none w-3/4 text-lg focus:border-blue-500"
                  >
                    <Option key="select" label="select" value="select">
                      Select
                    </Option>
                    <Option key="high" label="high" value="high">
                      High
                    </Option>
                    <Option key="moderate" label="moderate" value="moderate">
                      Moderate
                    </Option>
                    <Option key="low" label="low" value="low">
                      Low
                    </Option>
                  </Select>
                )}
              />
            </div>
            {errors?.priority && (
              <p className="text-red-500 flex justify-center">
                {errors?.priority?.message}
              </p>
            )}
          </div>
          <div>
            <div className="flex border-b-2 p-4">
              <label className=" mb-1 flex items-center w-1/4 text-base">
                Status
              </label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select
                    {...field}
                    showSearch
                    size="large"
                    placeholder="Select a task owner"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option?.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    className=" border-b border-gray-300 outline-none w-3/4 text-lg focus:border-blue-500"
                  >
                    <Option key="select" label="select" value="select">
                      Select
                    </Option>

                    <Option key="open" label="open" value="open">
                      Open
                    </Option>
                    <Option key="completed" label="completed" value="completed">
                      Completed
                    </Option>
                  </Select>
                )}
              />
            </div>
            {errors?.status && (
              <p className="text-red-500 flex justify-center">
                {errors?.status?.message}
              </p>
            )}
          </div>
          {taskId ? (
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={onUpdate}
            >
              Update
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Add
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AssignTask;
