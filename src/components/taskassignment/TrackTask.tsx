import React, { useEffect, useState } from "react";
import { Table, Tooltip, Radio } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { LoginState } from "../../redux/store/rootreducer";
import { useNavigate } from "react-router-dom";
import "./tracktask.css";
import { EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";

interface Task {
  taskId: number;
  taskOwner: string;
  taskName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  reminderDate?: Date;
  priority: string;
  status: string;
}

interface TaskTableProps {
    data: Task[]; // Specify the type of the data parameter
  }

const TrackTask = () => {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [adminTaskData, setAdminTaskData] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]); // Track completed task IDs
  const navigate = useNavigate();
  const role = useSelector(
    (state: { auth: LoginState }) => state.auth.role
  );
  const employeeID = useSelector(
    (state: { auth: LoginState }) => state.auth.userId
  );
  useEffect(() => {
    const storedTaskData = JSON.parse(localStorage.getItem("taskData") || "[]");
    setAdminTaskData(storedTaskData);
    const userTasks = storedTaskData.filter(
      (task: any) => task.employeeId === employeeID
    );

    setTaskData(userTasks); 
    if (role === "employee") {
      const completedTaskIds = userTasks.filter((task: Task) => task.status === "completed").map((task: Task) => task.taskId);
      setCompletedTasks(completedTaskIds);
    }
    if (role === "admin"||role==="manager") {
      const completedTaskIds = storedTaskData.filter((task: Task) => task.status === "completed").map((task: Task) => task.taskId);
      setCompletedTasks(completedTaskIds);
    }  
  }, []);

  const columns = [
    {
      title: "Task Detail",
      dataIndex: "taskName",
      key: "taskDetail",
      render: (_text:any, record:any) => (
        
        <div className="flex items-center space-x-4">
          {completedTasks.includes(record.taskId) ? (
            <CheckCircleOutlined
              className="text-xl "
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => handleTickClick(record.taskId)}
            />
          ) : (
            <Radio
              className="text-2xl"
              onClick={() => handleRadioClick(record.taskId)}
              checked={completedTasks.includes(record.taskId)}
            />
          )}
          <div>
            <Tooltip
              overlayStyle={{
                border: "none",
                backgroundColor: "white !important",
              }}
              title={getEmployeeCard}
              placement="bottom"
            >
              <img
                src={getEmployeePhoto(record.employeeId)}
                alt="Profile"
                width={32}
                height={32}
              />
            </Tooltip>
          </div>
          <div>
            <p className="font-bold">{record.taskName}</p>
            <p>{record.taskOwner}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Assigned To",
      dataIndex: "taskOwner",
      key: "assignedTo",
      render: (_text:any, record:any) => (
        <div className="flex justify-between space-x-4">
          <div>
            <img
              src={getEmployeePhoto(record.employeeId)}
              alt="Profile"
              width={32}
              height={32}
            />
          </div>
          <div>
          
            <EditOutlined
              style={{ fontSize: "16px", color: "#08c" }}
              onClick={() => handleEdit(record.taskId)}
            />
             <DeleteOutlined 
        style={{ fontSize: '16px', color: 'red', marginLeft:"10px" }} 
        onClick={() => handleDelete(record.taskId)} 
      />
          </div>
        </div>
      ),
    },
  ];

  const handleTickClick = (taskId: number) => {
    if (completedTasks.includes(taskId)) {
      setCompletedTasks(completedTasks.filter((id) => id !== taskId));
    } else {
      setCompletedTasks([...completedTasks, taskId]);
    }
    
  
      if (role === "employee") {
        const task = taskData.find((tasks) => {
          return tasks?.taskId === taskId;
        });
        const index = taskData.findIndex((tasks) => {
          return tasks?.taskId === taskId;
        });
        if (task) {
            task.status = "open";
            taskData[index] = task;
            console.log(taskData);
            localStorage.setItem("taskData", JSON.stringify(taskData));
            toast.success("Task re-opened successfully");
          } else {
            console.error("Task not found");
            toast.error("Task not found");
    
          }
      } else if (role === "admin" || role === "manager") {
        const task = adminTaskData.find((tasks) => {
          return tasks?.taskId === taskId;
        });
        const index = taskData.findIndex((tasks) => {
          return tasks?.taskId === taskId;
        });
        if (task) {
            task.status = "open";
            adminTaskData[index] = task;
            console.log(adminTaskData);
            localStorage.setItem("taskData", JSON.stringify(adminTaskData));
            toast.success("Task re-opened successfully");
          } else {
            console.error("Task not found");
            toast.error("Task not found");
    
          }
      }

    
   
  };
  function handleEdit(taskId: any): void {
   navigate(`/add-task/${taskId}`)
}

function handleDelete(taskId: any): void {
 if(role==="employee"){
  const updatedTask = taskData.filter((tasks)=>{
    return tasks.taskId!==taskId;
})
console.log(updatedTask)
localStorage.setItem("taskData",JSON.stringify(updatedTask));

 }
 if(role==="admin"|| role==="manager"){
  const updatedTask:Task[] = adminTaskData.filter((tasks)=>{
    return tasks.taskId!==taskId;
  })
  console.log(updatedTask)

  localStorage.setItem("taskData",JSON.stringify(updatedTask));

 }
  
    toast.success("Task succesfully deleted");
    navigate(`/track-task`);
}


  const handleRadioClick = (taskId: number) => {
    if (completedTasks.includes(taskId)) {
      setCompletedTasks(completedTasks.filter((id) => id !== taskId));
    } else {
      setCompletedTasks([...completedTasks, taskId]);
    }
    
  
      if (role === "employee") {
        const task = taskData.find((tasks) => {
          return tasks?.taskId === taskId;
        });
        const index = taskData.findIndex((tasks) => {
          return tasks?.taskId === taskId;
        });
        if (task) {
            task.status = "open";
            taskData[index] = task;
            console.log(taskData);
            localStorage.setItem("taskData", JSON.stringify(taskData));
            toast.success("Task re-opened successfully");
          } else {
            console.error("Task not found");
            toast.error("Task not found");
    
          }
      } else if (role === "admin" || role === "manager") {
        const task = adminTaskData.find((tasks) => {
          return tasks?.taskId === taskId;
        });
        const index = taskData.findIndex((tasks) => {
          return tasks?.taskId === taskId;
        });
        if (task) {
            task.status = "completed";
            adminTaskData[index] = task;
            console.log(adminTaskData);
            localStorage.setItem("taskData", JSON.stringify(adminTaskData));
            toast.success("Task re-opened successfully");
          } else {
            console.error("Task not found");
            toast.error("Task not found");
    
          }
      }

    
   
  };


  const storeTaskData = JSON.parse(localStorage.getItem("taskData") || "[]");

  const TaskTable: React.FC<TaskTableProps> = ({ data }) => {
    return <Table columns={columns} dataSource={data} />;
  };
  const getEmployeePhoto = (employeeId: number) => {
    const employeesData = JSON.parse(
      localStorage.getItem("employeesData") || "[]"
    );
    const employee = employeesData.find(
      (employee:any) => employee.employeeId === employeeId
    );
    return employee ? employee.imageUrl : ""; // Adjust the key according to your data structure
  };

  const getEmployeeCard = () => {
    const storedEmployeeData = JSON.parse(
      localStorage.getItem("employeesData") || "[]"
    );
    const employee = storedEmployeeData.find(
      (employee: any) => employee.employeeId === employeeID
    );

    return (
      <div>
        <div className="cursor-pointer ml-auto mr-auto">
          <img
            className="ml-auto mr-auto"
            src={employee?.imageUrl}
            alt="Profile"
            width={64}
            height={64}
          />
        </div>
        {employee && (
          <>
            <p className="font-semibold ml-auto mr-auto">{`${employee?.firstName} ${employee?.lastName}`}</p>
            <p className="text-gray-600">{employee.email}</p>
            <p className="text-gray-600">{employee.department}</p>
            <p className="text-gray-600">{employee.phone}</p>
          </>
        )}
      </div>
    );
  };

  return (
   
      <div className="w-full">
        <div className="w-11/12 xs:w-auto mx-auto mt-10 bg-white rounded-lg shadow-md p-6  m-10 ml-5">
          <div className="flex justify-between items-center ml-5 my-6 font-latobold">
            <h2 className="text-xl font-semibold mb-5 ">Track Tasks</h2>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-10 rounded"
              onClick={() => {
                navigate("/add-task");
              }}
            >
              Add Task
            </button>
          </div>
          <div className="container mx-auto my-8">
            <h1 className="text-2xl font-semibold mb-5">Task Management</h1>
            
           {(role === "admin" || role ==="manager") && <TaskTable data={storeTaskData} />}
            {role ==="employee" && <TaskTable data={taskData} />}
          </div>
        </div>
      </div>
 
  );
};

export default TrackTask;
