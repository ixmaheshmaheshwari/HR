import  { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/SideBar";
import { useSelector } from "react-redux";
import { LoginState } from "../redux/store/rootreducer";
import { Tooltip, Modal } from "antd";
import { FiUsers } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { PiClockAfternoonDuotone, PiTagThin } from "react-icons/pi";
import { RiDeleteBin6Line, RiPriceTag3Line } from "react-icons/ri";
import { SiAwsorganizations } from "react-icons/si";
import { toast } from "react-toastify";
import { format } from "date-fns";
//import { useDispatch } from "react-redux";
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

const UserProfile = () => {
  const employeeID = useSelector(
    (state: { auth: LoginState }) => state.auth.userId
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchTags = () => {
    const storedTags = localStorage.getItem("tags");
    if (storedTags) {
      const parsedTags = JSON.parse(storedTags);
      setTags(parsedTags);
    }
  };
  useEffect(() => {
    fetchTags();
  }, []);
  const showModal = () => {
    setIsModalVisible(true);
  };
  
  const handleSubmit = () => {
    // Get tag input value from textarea
    const textarea = document.getElementById("tag") as HTMLTextAreaElement;
    const newTag = textarea.value.trim();
    if (newTag === "") {
      console.log("value cant be empty");
      setErrorMessage("Please enter a tag value");
      return;
    }
    console.log("button clicked");
    const updatedTags = [...tags, newTag];

    localStorage.setItem("tags", JSON.stringify(updatedTags));

    setIsModalVisible(false);
    textarea.value = "";
    setErrorMessage("");

    setTags(updatedTags);
    toast.success("Tag added Successfully");
  };

  const handleDeleteTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    localStorage.setItem("tags", JSON.stringify(updatedTags));
    setTags(updatedTags);
    toast.success("tag Deleted successfully");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const storedEmployeeData = localStorage.getItem("employeesData");
  const employeeData: Employee[] = storedEmployeeData?JSON.parse(storedEmployeeData):[];
  const matchingEmployee = employeeData.find(
    ( matchingEmployee) =>  matchingEmployee.employeeId === employeeID
  );
  const formattedBirthDate = matchingEmployee
    ? format(new Date(matchingEmployee.birthDate), "dd/MM/yyyy")
    : "";
  return (
    <div>
     
        {matchingEmployee && (
          <nav className="bg-gray-800     h-48"
          style={{ backgroundColor: '#041527' }}
          >
            {/* Left side of the navbar */}

            <>
              <div className=" ">
                <div className="ml-2 flex flex-col justify-center">
                  <img
                    src={matchingEmployee.imageUrl}
                    alt="Profile Photo"
                    className=" w-[127px]  h-[127px] ml-auto mr-auto bg-center justify-center rounded-full pt-3"
                  />
                  <div className="ml-2 flex justify-evenly pt-[1.9rem]">
                    <div className="text-white font-semibold">
                      {matchingEmployee.employeeId}
                      {" - " +
                        matchingEmployee.firstName +
                        " " +
                        matchingEmployee.lastName}
                    </div>
                    <div className="text-white text-sm">
                      {matchingEmployee.position}
                    </div>
                    <div className="text-white text-sm">
                      {matchingEmployee.department}
                    </div>
                    <div className="text-white text-sm">
                      {matchingEmployee.email}
                    </div>
                  </div>
                </div>
              </div>
            </>
          </nav>
        )}
        {matchingEmployee ? (
          // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 ">
          <div className="w-max" key="">
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 w-[80pc] ">
        <div className="bg-white rounded-lg shadow-md p-6  w-[40pc] h-[18pc] m-10">
          <h2 className="text-lg font-bold mb-3  title text-left">About Me</h2>
          <div className="grid grid-cols-2 ">
            <div className="flex items-center">
              <Tooltip placement="right">
                <div className="flex items-center ">
                  <span className="mr-2 ">
                    <SiAwsorganizations />
                  </span>
                  <span className="truncate max-w-[200px] ">
                    {matchingEmployee.department}
                  </span>
                </div>
              </Tooltip>
            </div>
            <div className="flex items-center">
              <span className="mr-2 ">
                <FiUsers />
              </span>
              <div>{matchingEmployee.position}</div>
            </div>
            <div className="flex items-center  h-[9pc]">
              <span className="mr-2 ">
                <HiOutlineDevicePhoneMobile />
              </span>
              <div>{matchingEmployee.phoneNumber}</div>
            </div>
            <div className="flex items-center">
              <span className="mr-2 ">
                <PiClockAfternoonDuotone />
              </span>

              <div>{matchingEmployee.timeZone}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pl-4 lg:grid-cols-1 gap-4 w-[40pc] h-[18pc] ">
          <div className="bg-white rounded-lg shadow-md p-6 ml-14 w-4/5 m-10">
            <div className="grid grid-cols-1 gap-4">
              <h2 className="text-lg font-bold mb-3  title text-left">
                Reporting To
              </h2>
              <div>
                <div className="text-bold font-bold ">
                  {matchingEmployee.reportingTo}
                </div>

                <p>{matchingEmployee.leadPosition}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 ml-14 w-4/5 mt-[-2pc]">
            <div className="grid grid-cols-1 gap-4">
              <h2 className="text-lg font-bold mb-3  title text-left">Tags</h2>
              <div className="flex flex-wrap">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 flex items-center"
                  >
                    {tag}
                    <RiDeleteBin6Line
                      className="ml-2 cursor-pointer"
                      onClick={() => handleDeleteTag(index)}
                    />
                  </div>
                ))}
              </div>
              <div
                className="flex justify-center"
                style={{ position: "relative" }}
              >
                <PiTagThin className="text-4xl" />

                <GoPlus
                  className="text-3xl absolute top-[22px]  transform -translate-x-2/4 cursor-pointer"
                  onClick={showModal}
                />
                <Modal
                  title={
                    <div className="flex items-center">
                      <RiPriceTag3Line className="text-xl mr-2" />
                      Add Tags
                    </div>
                  }
                  visible={isModalVisible}
                  onCancel={handleCancel}
                  footer={[
                    <button
                      key="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mr-4 px-4 rounded"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>,
                    <button
                      key="cancel"
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>,
                  ]}
                >
                  {" "}
                  <div className="flex flex-col">
                    <h3 className="mb-2">Tags</h3>
                    <textarea
                      id="tag"
                      required
                      className="border p-2 mb-2 "
                      placeholder="Enter tags separated by comma"
                      title="Input canaot be empty"
                    ></textarea>
                    {errorMessage && (
                      <p className="text-red-500 text-sm mb-2">
                        {errorMessage}
                      </p>
                    )}
                    <hr className="my-2" />
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 mt-[2pc] h-[13pc] w-[80pc]">
        <div className="bg-white rounded-lg shadow-md p-6  w-[40pc] m-10">
          <h2 className="text-lg font-bold mb-3  title text-left">
            Organization Structure
          </h2>
          <div>
            <div className="flex items-center">
              <span className="mr-2 ">
                <SiAwsorganizations />
              </span>
              <div className="text-gray-400">Department</div>
            </div>

            <p className="ml-5">{matchingEmployee.department}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 ml-14 w-4/5 m-10">
          <h2 className="text-lg font-bold mb-3  title text-left">
            Basic Info
          </h2>
          <div className="flex mt-3">
            <div className="flex-1">Department:</div>
            {/* <div className="text-right">{ matchingEmployee.department}</div> */}
            {matchingEmployee.department.length > 20 ? (
              <>
                {matchingEmployee.department.substring(0, 20)}
                <br />
                {matchingEmployee.department.substring(20)}
              </>
            ) : (
              matchingEmployee.department
            )}
          </div>
          <div className="flex mt-3">
            <div className="flex-1">Reporting To:</div>
            <div className="text-right">{matchingEmployee.reportingTo}</div>
          </div>
          <div>
            <div className="flex mt-3">
              <div className="flex-1">Source of Hire:</div>
              <div className="text-right mb-3">{matchingEmployee.sourceOfHire}</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6  w-[40pc] m-10">
          <h2 className="text-lg font-bold mb-3  title text-left">Work</h2>
          <div className="flex mt-5">
            <div className="flex-1">Department:</div>
            <div className="text-right">{matchingEmployee.department}</div>
          </div>
          <div className="flex mt-5">
            <div className="flex-1">Secondary Reporting To:</div>
            <div className="text-right">{matchingEmployee.secondaryReportingTo}</div>
          </div>
          <div className="flex mt-5 ">
            <div className="flex-1">Source of Hire:</div>
            <div className="text-right">{matchingEmployee.sourceOfHire}</div>
          </div>
          <div className="flex mt-5">
            <div className="flex-1">Seating Location:</div>
            <div className="text-right">{matchingEmployee.seatingPosition}</div>
          </div>
          <div className="flex mt-5">
            <div className="flex-1">Location:</div>
            <div className="text-right">{matchingEmployee.locationofOffice}</div>
          </div>
          <div className="flex mt-5">
            <div className="flex-1">Title:</div>
            <div className="text-right">{matchingEmployee.department}</div>
          </div>
          <div className="flex mt-5">
            <div className="flex-1">Date of Joining:</div>
            <div className="text-right">{matchingEmployee.dateOfJoining}</div>
          </div>
          <div className="flex mt-5">
            <div className="flex-1">Employee Status:</div>
            <div className="text-right">{matchingEmployee.employeeStatus}</div>
          </div>
          <div className="flex mt-5">
            <div className="flex-1">Employee Type:</div>
            <div className="text-right">{matchingEmployee.employeeType}</div>
          </div>
          <div className="flex mt-5">
            <div className="flex-1">WorkPhone:</div>
            <div className="text-right">{matchingEmployee.workPhone}</div>
          </div>
          <div className="flex mt-5">
            <div className="flex-1">Extension:</div>
            <div className="text-right">{matchingEmployee.extension}</div>
          </div>
          <div className="flex mt-5">
            <div className="flex-1">Role:</div>
            <div className="text-right">{matchingEmployee.role}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pl-4 lg:grid-cols-1 gap-4 w-[40pc] h-[18pc] ">
          <div className="bg-white rounded-lg shadow-md p-6 ml-14 w-4/5 h-max m-10">
            <div className="grid grid-cols-1 gap-4">
              <h2 className="text-lg font-bold mb-3  title text-left">
                Personal
              </h2>
              <div className="flex mt-5">
                <div className="flex-1">Mobile Phone:</div>
                <div className="text-right">{ matchingEmployee.phoneNumber}</div>
              </div>
              <div className="flex mt-5">
                <div className="flex-1">Other Email:</div>
                <div className="text-right">{ matchingEmployee.otherEmail}</div>
              </div>
              <div className="flex mt-5">
                <div className="flex-1">Birth Date:</div>
                <div className="text-right">  {formattedBirthDate}</div>
              </div>
              <div className="flex mt-5">
                <div className="flex-1">Martial Status:</div>
                <div className="text-right">{ matchingEmployee.martialStatus}</div>
              </div>
              <div className="flex mt-5">
                <div className="flex-1">Address:</div>
                <div className="text-right">{ matchingEmployee.address}</div>
              </div>
            </div>
          </div>
<div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-5 mt-[-10px] ml-14 w-4/5 h-9/12">
            <div className="grid grid-cols-1 gap-4 ">
              <h2 className="text-lg font-bold mb-3  title text-left">
                Summary
              </h2>
              <div className="flex mt-5">
                <div className="flex-1">Job Description:</div>
                <div className="text-right">{ matchingEmployee.jobDescription}</div>
              </div>
              <div className="flex mt-5">
                <div className="flex-1">Ask me about/Expertise:</div>
                <div className="text-right">{ matchingEmployee.expertiseaboutme}</div>
              </div>
              <div className="flex mt-5">
                <div className="flex-1">AboutMe:</div>
                <div className="text-right">{ matchingEmployee.aboutMe}</div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div ></div>
       
      </div>
          </div>
        ) : (
          <p>No  matchingEmployee data found in local storage.</p>
        )}
   
    </div>
  );
};

export default UserProfile;
