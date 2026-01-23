/**
 * HRMS Admin User Setup Script
 * 
 * HOW TO USE:
 * 1. Open your HRMS app at http://localhost:5173
 * 2. Open Developer Console (F12)
 * 3. In Console tab, type or paste:
 *    
 *    var script = document.createElement('script');
 *    script.src = '/setup-admin.js';
 *    document.head.appendChild(script);
 * 
 * The admin user will be created automatically!
 * 
 * DEFAULT CREDENTIALS:
 * Email: admin@hrms.com
 * Password: admin123
 */

(function () {
    'use strict';

    console.log('🚀 Starting HRMS Admin Setup...');

    // Check if data already exists
    const existingUsers = localStorage.getItem('user');
    if (existingUsers) {
        const users = JSON.parse(existingUsers);
        const adminExists = users.find(u => u.email === 'admin@hrms.com');
        if (adminExists) {
            console.warn('⚠️  Admin user already exists!');
            console.log('Email: admin@hrms.com');
            console.log('If you want to reset, run: clearHRMSData()');
            return;
        }
    }

    try {
        // Create admin employee data
        const adminEmployee = {
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
            addedTime: new Date().toISOString().split('T')[0],
            dateOfJoining: new Date().toISOString().split('T')[0],
            birthDate: "2000-01-01",
            reportingTo: "Self",
            leadPosition: "Administrator",
            employeeStatus: "Active",
            employeeType: "Full-time",
            martialStatus: "Single",
            timeZone: "GMT+5:30",
            imageUrl: "https://avatar.iran.liara.run/username?username=Admin+User",
            skills: [],
            jobHistory: [],
            secondaryReportingTo: "",
            sourceOfHire: "System",
            seatingPosition: "",
            locationofOffice: "",
            workPhone: null,
            extension: "",
            otherEmail: "",
            address: "",
            jobDescription: "System Administrator",
            aboutMe: "",
            expertiseaboutme: ""
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

        // Get existing data or initialize
        const employeesData = JSON.parse(localStorage.getItem('employeesData') || '[]');
        const usersData = JSON.parse(localStorage.getItem('user') || '[]');
        const leaveDataArray = JSON.parse(localStorage.getItem('leaveData') || '[]');
        const leaveAvailableArray = JSON.parse(localStorage.getItem('leaveAvailable') || '[]');
        const leaveBookedArray = JSON.parse(localStorage.getItem('leaveBooked') || '[]');

        // Add admin data
        employeesData.push(adminEmployee);
        usersData.push(adminCredentials);
        leaveDataArray.push(leaveData);
        leaveAvailableArray.push(leaveData);
        leaveBookedArray.push(leaveBookedData);

        // Save to localStorage
        localStorage.setItem('employeesData', JSON.stringify(employeesData));
        localStorage.setItem('user', JSON.stringify(usersData));
        localStorage.setItem('leaveData', JSON.stringify(leaveDataArray));
        localStorage.setItem('leaveAvailable', JSON.stringify(leaveAvailableArray));
        localStorage.setItem('leaveBooked', JSON.stringify(leaveBookedArray));

        // Initialize other storage items if they don't exist
        if (!localStorage.getItem('taskData')) {
            localStorage.setItem('taskData', '[]');
        }
        if (!localStorage.getItem('attendanceData')) {
            localStorage.setItem('attendanceData', '[]');
        }
        if (!localStorage.getItem('leaveDetails')) {
            localStorage.setItem('leaveDetails', '[]');
        }
        if (!localStorage.getItem('tags')) {
            localStorage.setItem('tags', '[]');
        }

        console.log('✅ Admin user created successfully!');
        console.log('');
        console.log('📧 Email: admin@hrms.com');
        console.log('🔑 Password: admin123');
        console.log('👤 Employee ID: 1001');
        console.log('');
        console.log('🔄 Refreshing page...');

        // Reload the page
        setTimeout(() => {
            window.location.reload();
        }, 1000);

    } catch (error) {
        console.error('❌ Error creating admin user:', error);
    }
})();

// Helper function to clear all data
window.clearHRMSData = function () {
    const keys = [
        'employeesData',
        'user',
        'leaveData',
        'leaveAvailable',
        'leaveBooked',
        'taskData',
        'attendanceData',
        'leaveDetails',
        'tags',
        'leaveAllocated'
    ];

    keys.forEach(key => localStorage.removeItem(key));
    console.log('✅ All HRMS data cleared!');
    console.log('🔄 Refreshing page...');
    setTimeout(() => {
        window.location.reload();
    }, 500);
};

console.log('💡 Tip: To clear all data, run: clearHRMSData()');
