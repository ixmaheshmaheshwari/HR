import React, { useEffect, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_Row,
  createMRTColumnHelper,
} from 'material-react-table';
import { Box } from '@mui/material';

const columnHelper = createMRTColumnHelper();

const ExampleTable = () => {
    const [formData, setFormData] = useState([]);
const [rows,setRows]=useState([])
  useEffect(() => {
    const storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []); // R
  // Retrieve data from local storage


  // Define columns based on the structure of the data
  const columns = [
    // Employee ID
    columnHelper.accessor('employee', {
      header: 'Employee ID',
      size: 100,
    }),
    // Task
    columnHelper.accessor('task', {
      header: 'Task',
      size: 200,
    }),
    // Quality of Code
    columnHelper.accessor('qualityOfCode', {
      header: 'Quality of Code',
      size: 150,
    }),
    // Quantity of Code
    columnHelper.accessor('quantityOfCode', {
      header: 'Quantity of Code',
      size: 150,
    }),
    // Contribution to Company
    columnHelper.accessor('contributionToCompany', {
      header: 'Contribution to Company',
      size: 200,
    }),
    // Performance
    columnHelper.accessor('performance', {
      header: 'Performance',
      size: 150,
    }),
    // Feedback
    columnHelper.accessor('feedback', {
      header: 'Feedback',
      size: 300,
    }),
  ];
  
  // Map data to rows
  useEffect(()=>{
    const row: MRT_Row<any>[] = [];
    formData.forEach((item, index) => {
      item.tasks.forEach((task, taskIndex) => {
        row.push({
          id: `${index}_${taskIndex}`,
          employee: item.employee,
          task: task.task,
          qualityOfCode: task.qualityOfCode,
          quantityOfCode: task.quantityOfCode,
          contributionToCompany: task.contributionToCompany,
          performance: task.performance,
          feedback: task.feedback,
        });
      });
    });
    console.log(row)
  setRows(row)
  },[formData])
 
  // Configure Material React Table
  const table = useMaterialReactTable({
    columns,
    data: rows,
    enableRowSelection: false, // You can enable row selection if needed
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    // Add any other configurations as needed
  });

  return (
    <Box sx={{ maxWidth: '100%', margin: 'auto', mt: 5 }}>
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default ExampleTable;
