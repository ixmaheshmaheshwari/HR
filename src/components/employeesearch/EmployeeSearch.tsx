import React, { useState } from 'react';
import { Avatar, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import './employeesearch.css'
const { Option } = Select;


const SearchableDropdown: React.FC<{ data: any; onSelect: (value: string) => void }> = ({ data, onSelect }) => {

  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<any[]>(data); // State to store filtered data

  const navigate = useNavigate();
  

  const handleChange = (value: string) => {
    setSearch(value);
    // Navigate to the employee page with the employee ID as a parameter
    if (value === "select") {
      return;
    } else {
      navigate(`/employee/${value}`);
    }

    // Call onSelect callback function with the selected value
    onSelect(value);
    setFilteredData(data);

    // Clear search value when an option is selected
    setSearch('');
  };

  

  const handleInput = (value: string): void => {
    setSearch(value);
    const filtered = data.filter((employee: any) =>
      `${employee.employeeId}-${employee.firstName} ${employee.lastName}`.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const handleDropdownFocus = () => {
   console.log("hi")
  };

  const handleDropdownBlur = () => {
   
  };
  return (
    <Select
      showSearch
      className="w-4/12  search hover:w-full z-50 focus-within:w-full "
      // className={`w-4/12 ${
      //   isFocused ? "focus:scale-105" : ""
      // } transition-transform focus:shadow-lg focus:bg-opacity-75`}
     
  placeholder="Search employees"
   optionFilterProp="children"
   autoClearSearchValue	={true}
   onFocus={handleDropdownFocus}
      onBlur={handleDropdownBlur}
      onSearch={handleInput} // Listen to search input changes
      onChange={handleChange}
      filterOption={false} // Disable default filtering since we are handling it manually
      value={search} // Set the value of the Select component to the search state
    >
      <Option key="select" label="select" value="select" >Enter employee name to serach</Option>
      {filteredData.map((employee: any) => (
        <Option key={employee.employeeId} value={employee.employeeId}
          className="w-10/12"
          style={{ minWidth: '300px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={employee.imageUrl} size="large" style={{ marginRight: '10px' }} />
            <div>
              <div>{`${employee.employeeId}- ${employee.firstName} ${employee.lastName}`}</div>
            </div>
          </div>
          <div>
            <div>{employee.department}</div>
            <div>{employee.phoneNumber}</div>
          </div>
        </Option>
      ))}
    </Select>
  );
};

const EmployeeSearch: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [employeeData, setEmployeeData] = useState<any>([]);

  // Load employee data from localStorage on component mount
  React.useEffect(() => {
    const storedData = localStorage.getItem('employeesData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setEmployeeData(parsedData);
    }
  }, []);

  const handleSelect = (value: string) => {
    setSelectedEmployee(value);
  };

  return (
    <>

      <SearchableDropdown data={employeeData} onSelect={handleSelect} />

    </>
  );
};

export default EmployeeSearch;
