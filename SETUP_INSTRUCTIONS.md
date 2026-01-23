# HRMS Local Storage Setup Instructions

## 📋 Overview

This guide will help you set up the local storage for your HRMS application with an admin user account and all required data structures.

## 🚀 Quick Setup

### Option 1: Using the HTML Setup Tool (Recommended)

1. **Open the setup tool:**
   - Navigate to your project folder: `/Users/mahesh/Documents/hrms/HR/`
   - Open `setup-admin-storage.html` in your web browser (Chrome, Firefox, Safari, etc.)

2. **Configure the admin user:**
   - The form is pre-filled with default values
   - You can modify any fields as needed:
     - **Employee ID**: Default is `1001`
     - **Email**: Default is `admin@hrms.com`
     - **Password**: Default is `admin123`
     - Other fields like name, phone, department, etc.

3. **Create the admin user:**
   - Click the **"Create Admin User"** button
   - You should see a success message
   - The status panel will show all initialized data

4. **Login to the application:**
   - Start your HRMS application: `npm run dev`
   - Navigate to the login page
   - Use the email and password you configured

### Option 2: Manual Browser Console Setup

If you prefer to set up via browser console:

1. Open your HRMS application in the browser
2. Open Developer Tools (F12 or right-click → Inspect)
3. Go to the Console tab
4. Run this script:

```javascript
// Create admin user data
const adminEmployee = {
    employeeId: 1001,
    firstName: "Admin",
    lastName: "User",
    email: "admin@hrms.com",
    password: "admin123",
    phoneNumber: 1234567890,
    department: "Administration",
    position: "System Administrator",
    role: "admin",
    employeeRole: "admin",
    addedBy: "System",
    addedTime: new Date().toISOString().split('T')[0],
    dateOfJoining: new Date().toISOString().split('T')[0],
    birthDate: new Date().toISOString().split('T')[0],
    reportingTo: "Self",
    leadPosition: "Administrator",
    employeeStatus: "Active",
    employeeType: "Full-time",
    martialStatus: "Single",
    timeZone: "GMT+5:30",
    imageUrl: "https://avatar.iran.liara.run/username?username=Admin+User",
    skills: [],
    jobHistory: []
};

// Create login credentials
const adminCredentials = {
    email: "admin@hrms.com",
    password: "admin123",
    role: "admin",
    employeeId: 1001
};

// Create leave data
const leaveData = {
    employeeId: 1001,
    earnedLeave: 20,
    marriageLeave: 20,
    casualLeave: 20,
    optionalHoliday: 20,
    sickLeave: 20,
    leaveWithoutPay: 20
};

const leaveBookedData = {
    employeeId: 1001,
    earnedLeave: 0,
    marriageLeave: 0,
    casualLeave: 0,
    optionalHoliday: 0,
    sickLeave: 0,
    leaveWithoutPay: 0
};

// Save to localStorage
localStorage.setItem('employeesData', JSON.stringify([adminEmployee]));
localStorage.setItem('user', JSON.stringify([adminCredentials]));
localStorage.setItem('leaveData', JSON.stringify([leaveData]));
localStorage.setItem('leaveAvailable', JSON.stringify([leaveData]));
localStorage.setItem('leaveBooked', JSON.stringify([leaveBookedData]));
localStorage.setItem('taskData', '[]');
localStorage.setItem('attendanceData', '[]');
localStorage.setItem('leaveDetails', '[]');
localStorage.setItem('tags', '[]');

console.log("✅ Admin user created successfully!");
```

## 🔍 Features of the Setup Tool

### ✨ Main Features

- **User-friendly interface**: Modern, responsive design
- **Validation**: Checks for duplicate Employee IDs and emails
- **Status checking**: View current local storage state
- **Data management**: Clear all data with one click
- **Pre-filled defaults**: Quick setup with sensible defaults

### 📊 What Gets Created

The setup tool initializes the following local storage items:

1. **employeesData**: Array of employee records
2. **user**: Array of login credentials
3. **leaveData**: Leave allocation data
4. **leaveAvailable**: Available leave balances
5. **leaveBooked**: Booked leave records
6. **taskData**: Task assignments (empty array)
7. **attendanceData**: Attendance records (empty array)
8. **leaveDetails**: Leave details (empty array)
9. **tags**: User tags (empty array)

### 🔐 Default Admin Credentials

If you use the default values:

- **Email**: `admin@hrms.com`
- **Password**: `admin123`
- **Employee ID**: `1001`
- **Role**: `admin`

## 🛠️ Troubleshooting

### Issue: Cannot login after setup

**Solution:**
1. Open the setup tool again
2. Click "Check Current Status" to verify the admin user exists
3. Make sure you're using the correct email and password
4. Clear browser cache and try again

### Issue: Employee ID already exists

**Solution:**
1. Either use a different Employee ID
2. Or click "Clear All Data" and start fresh

### Issue: Changes not reflecting

**Solution:**
1. Make sure you're on the same domain (localhost)
2. Check browser console for errors
3. Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

## 📝 Notes

- Local storage data is specific to your browser and domain
- Data persists until you clear it manually or via the Clear All Data button
- The setup tool can be used to create additional admin users
- All dates are automatically set to the current date

## 🔄 Resetting Data

To completely reset and start fresh:

1. Open `setup-admin-storage.html`
2. Click the **"Clear All Data"** button
3. Confirm the action
4. Re-create the admin user using the form

## 📞 Support

If you encounter any issues, check the browser console (F12) for error messages and ensure:
- You're running the latest version of the HRMS app
- Browser supports localStorage
- No browser extensions are blocking localStorage access
