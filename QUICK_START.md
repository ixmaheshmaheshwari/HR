# Quick Setup Instructions

## ✅ Setup Complete!

I've created everything you need to set up your admin user for the HRMS project. Here's what was created:

### Files Created:

1. **`src/utils/setupLocalStorage.ts`** - TypeScript utility functions for local storage setup
2. **`src/pages/SetupPage.tsx`** - React setup page component
3. **`setup-admin-storage.html`** - Standalone HTML setup tool (backup option)

## 🚀 How to Use (2 Methods)

### Method 1: Browser Console (EASIEST - Use This!)

1. **Start your dev server** (already running at `localhost:5173`)

2. **Open the developer console** in your browser (F12 or Right-click → Inspect → Console)

3. **Paste this code** and press Enter:

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
console.log("📧 Email: admin@hrms.com");
console.log("🔑 Password: admin123");
location.reload(); // Refresh the page
```

4. **The page will refresh**, and you can now login with:
   - **Email**: `admin@hrms.com`
   - **Password**: `admin123`

### Method 2: Setup Page (Optional - Requires adding a route)

If you want to use the React setup page, add this to your `App.tsx`:

1. Find the line with `<Routes>` around line 82
2. Add this route ABOVE the authenticated routes:

```tsx
<Route path="/setup" element={<SetupPage />} />
```

Then visit: `http://localhost:5173/setup`

## 🎯 Admin Credentials

- **Email**: admin@hrms.com
- **Password**: admin123
- **Employee ID**: 1001
- **Role**: admin

## 🔄 To Reset Data

Run this in the browser console:

```javascript
['employeesData', 'user', 'leaveData', 'leaveAvailable', 'leaveBooked', 'taskData', 'attendanceData', 'leaveDetails', 'tags'].forEach(key => localStorage.removeItem(key));
console.log("✅ All data cleared!");
location.reload();
```

## ✨ That's It!

Just run the console script above and you'll be able to login immediately!
