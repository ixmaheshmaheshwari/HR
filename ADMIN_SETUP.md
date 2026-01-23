# HRMS Admin Setup - Quick Start Guide

## 🚀 Setup Admin User

Your HRMS project now has an integrated setup page that works directly within your localhost development environment.

### Access the Setup Page

1. **Start your development server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Open the setup page in your browser**:
   ```
   http://localhost:5173/setup
   ```

3. **Fill in the admin details** (pre-filled with defaults):
   - Employee ID: `1001`
   - Email: `admin@hrms.com`
   - Password: `admin123`
   - Other fields as needed

4. **Click "Create Admin User"**

5. **Click "Go to Login"** and sign in with your credentials!

## 🎯 Default Admin Credentials

- **Email**: `admin@hrms.com`
- **Password**: `admin123`
- **Employee ID**: `1001`

## 📝 Alternative: Browser Console Method

If you prefer to use the browser console:

1. Open your HRMS app at `http://localhost:5173`
2. Open Developer Tools (F12)
3. Go to Console tab
4. Run this command:

```javascript
// Import and run the setup
import('./src/utils/setupLocalStorage.ts').then(module => {
  const result = module.quickSetup();
  console.log(result);
});
```

Or manually:

```javascript
// Create admin user data
localStorage.setItem('employeesData', JSON.stringify([{
  employeeId: 1001,
  firstName: "Admin",
  lastName: "User",
  email: "admin@hrms.com",
  phoneNumber: 1234567890,
  department: "Administration",
  position: "System Administrator",
  role: "admin",
  employeeRole: "admin",
  addedBy: "System",
  addedTime: "2026-01-23",
  dateOfJoining: "2026-01-23",
  birthDate: "2000-01-01",
  reportingTo: "Self",
  leadPosition: "Administrator",
  employeeStatus: "Active",
  employeeType: "Full-time",
  martialStatus: "Single",
  timeZone: "GMT+5:30",
  imageUrl: "https://avatar.iran.liara.run/username?username=Admin+User",
  skills: [],
  jobHistory: []
}]));

localStorage.setItem('user', JSON.stringify([{
  email: "admin@hrms.com",
  password: "admin123",
  role: "admin",
  employeeId: 1001
}]));

localStorage.setItem('leaveData', JSON.stringify([{
  employeeId: 1001,
  earnedLeave: 20,
  marriageLeave: 20,
  casualLeave: 20,
  optionalHoliday: 20,
  sickLeave: 20,
  leaveWithoutPay: 20
}]));

localStorage.setItem('leaveAvailable', JSON.stringify([{
  employeeId: 1001,
  earnedLeave: 20,
  marriageLeave: 20,
  casualLeave: 20,
  optionalHoliday: 20,
  sickLeave: 20,
  leaveWithoutPay: 20
}]));

localStorage.setItem('leaveBooked', JSON.stringify([{
  employeeId: 1001,
  earnedLeave: 0,
  marriageLeave: 0,
  casualLeave: 0,
  optionalHoliday: 0,
  sickLeave: 0,
  leaveWithoutPay: 0
}]));

localStorage.setItem('taskData', '[]');
localStorage.setItem('attendanceData', '[]');
localStorage.setItem('leaveDetails', '[]');
localStorage.setItem('tags', '[]');

console.log("✅ Admin user created successfully!");
location.reload(); // Refresh the page
```

## 🛠️ Features

The setup page provides:

- ✅ **Create Admin User**: Initialize your first admin account
- ✅ **Check Status**: View current local storage state
- ✅ **Clear Data**: Reset everything and start fresh
- ✅ **Go to Login**: Quick navigation to login page

## 📦 What Gets Created

The setup initializes:

1. **Employee Data** (`employeesData`)
2. **User Credentials** (`user`)
3. **Leave System** (`leaveData`, `leaveAvailable`, `leaveBooked`)
4. **Tasks** (`taskData`)
5. **Attendance** (`attendanceData`)
6. **Leave Details** (`leaveDetails`)
7. **Tags** (`tags`)

## 🔄 Reset Data

To completely reset:

1. Go to `http://localhost:5173/setup`
2. Click **"Clear All Data"**
3. Confirm
4. Create a new admin user

## 📝 Notes

- The setup page works on `localhost:5173` domain (same as your app)
- Local storage is domain-specific, so it will work correctly with your running app
- You can create multiple admin users with different employee IDs
- All dates are automatically set to today's date

## ❓ Troubleshooting

### Can't access /setup page

Make sure your dev server is running and try accessing:
```
http://localhost:5173/setup
```

### Already have data

If you see "Employee ID already exists", either:
- Use a different Employee ID
- Click "Clear All Data" first

### Can't login after setup

- Check that you're using the correct email and password
- Click "Check Status" on the setup page to verify the admin user exists
- Try clearing your browser cache

## 🎉 You're Ready!

Once you've created your admin user, you can:

1. Navigate to the login page
2. Use the credentials you set up
3. Start using your HRMS system!

---

**Need help?** Check the browser console (F12) for any error messages.
