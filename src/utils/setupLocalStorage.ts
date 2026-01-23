/**
 * Local Storage Setup Utility for HRMS
 * This script initializes local storage with an admin user and required data structures
 */

interface Employee {
    employeeId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    department: string;
    position: string;
    role: string;
    employeeRole: "employee" | "manager" | "admin";
    addedBy: string;
    addedTime: string;
    dateOfJoining: string;
    birthDate: string;
    reportingTo: string;
    leadPosition: string;
    employeeStatus: string;
    employeeType: string;
    martialStatus: string;
    timeZone: string;
    imageUrl: string;
    skills: { skillName: string }[];
    jobHistory?: any[];
    secondaryReportingTo?: string | null;
    sourceOfHire?: string;
    seatingPosition?: string;
    locationofOffice?: string;
    workPhone?: number | null;
    extension?: string;
    otherEmail?: string;
    address?: string;
    jobDescription?: string;
    aboutMe?: string;
    expertiseaboutme?: string;
}

interface UserCredentials {
    email: string;
    password: string;
    role: string;
    employeeId: number;
}

interface LeaveData {
    employeeId: number;
    earnedLeave: number;
    marriageLeave: number;
    casualLeave: number;
    optionalHoliday: number;
    sickLeave: number;
    leaveWithoutPay: number;
}

export interface AdminSetupConfig {
    employeeId?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phoneNumber?: number;
    department?: string;
    position?: string;
}

/**
 * Get current date in YYYY-MM-DD format
 */
const getCurrentDate = (): string => {
    return new Date().toISOString().split('T')[0];
};

/**
 * Check if local storage already has data
 */
export const hasExistingData = (): boolean => {
    const employeesData = localStorage.getItem('employeesData');
    const userData = localStorage.getItem('user');
    return (employeesData && JSON.parse(employeesData).length > 0) ||
        (userData && JSON.parse(userData).length > 0);
};

/**
 * Get current storage status
 */
export const getStorageStatus = () => {
    const employeesData = JSON.parse(localStorage.getItem('employeesData') || '[]');
    const userData = JSON.parse(localStorage.getItem('user') || '[]');
    const leaveData = JSON.parse(localStorage.getItem('leaveData') || '[]');
    const taskData = JSON.parse(localStorage.getItem('taskData') || '[]');
    const attendanceData = JSON.parse(localStorage.getItem('attendanceData') || '[]');

    const adminUsers = userData.filter((u: UserCredentials) => u.role === 'admin');

    return {
        totalEmployees: employeesData.length,
        totalUsers: userData.length,
        adminUsers: adminUsers.length,
        leaveRecords: leaveData.length,
        taskRecords: taskData.length,
        attendanceRecords: attendanceData.length,
        admins: adminUsers.map((u: UserCredentials) => ({ email: u.email, employeeId: u.employeeId }))
    };
};

/**
 * Clear all local storage data
 */
export const clearAllStorageData = (): void => {
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

    console.log('✅ All local storage data cleared');
};

/**
 * Initialize all required local storage arrays
 */
const initializeStorageArrays = (): void => {
    const storageKeys = [
        'taskData',
        'attendanceData',
        'leaveDetails',
        'tags'
    ];

    storageKeys.forEach(key => {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, '[]');
        }
    });
};

/**
 * Setup admin user in local storage
 */
export const setupAdminUser = (config: AdminSetupConfig = {}): { success: boolean; message: string; admin?: any } => {
    try {
        // Default configuration
        const defaultConfig: Required<AdminSetupConfig> = {
            employeeId: 1001,
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@hrms.com',
            password: 'admin123',
            phoneNumber: 1234567890,
            department: 'Administration',
            position: 'System Administrator'
        };

        // Merge with provided config
        const finalConfig = { ...defaultConfig, ...config };

        // Get existing data
        const existingEmployees: Employee[] = JSON.parse(localStorage.getItem('employeesData') || '[]');
        const existingUsers: UserCredentials[] = JSON.parse(localStorage.getItem('user') || '[]');

        // Check for duplicates
        const employeeExists = existingEmployees.find(emp => emp.employeeId === finalConfig.employeeId);
        if (employeeExists) {
            return {
                success: false,
                message: `Employee ID ${finalConfig.employeeId} already exists!`
            };
        }

        const emailExists = existingUsers.find(user => user.email === finalConfig.email);
        if (emailExists) {
            return {
                success: false,
                message: `Email ${finalConfig.email} already exists!`
            };
        }

        const currentDate = getCurrentDate();

        // Create admin employee
        const adminEmployee: Employee = {
            employeeId: finalConfig.employeeId,
            firstName: finalConfig.firstName,
            lastName: finalConfig.lastName,
            email: finalConfig.email,
            phoneNumber: finalConfig.phoneNumber,
            department: finalConfig.department,
            position: finalConfig.position,
            role: "admin",
            employeeRole: "admin",
            addedBy: "System",
            addedTime: currentDate,
            dateOfJoining: currentDate,
            birthDate: currentDate,
            reportingTo: "Self",
            leadPosition: "Administrator",
            employeeStatus: "Active",
            employeeType: "Full-time",
            martialStatus: "Single",
            timeZone: "GMT+5:30",
            imageUrl: `https://avatar.iran.liara.run/username?username=${finalConfig.firstName}+${finalConfig.lastName}`,
            skills: [],
            jobHistory: [],
            secondaryReportingTo: undefined,
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
        const adminUserCredentials: UserCredentials = {
            email: finalConfig.email,
            password: finalConfig.password,
            role: "admin",
            employeeId: finalConfig.employeeId
        };

        // Create leave data
        const leaveData: LeaveData = {
            employeeId: finalConfig.employeeId,
            earnedLeave: 20,
            marriageLeave: 20,
            casualLeave: 20,
            optionalHoliday: 20,
            sickLeave: 20,
            leaveWithoutPay: 20
        };

        const leaveBookedData: LeaveData = {
            employeeId: finalConfig.employeeId,
            earnedLeave: 0,
            marriageLeave: 0,
            casualLeave: 0,
            optionalHoliday: 0,
            sickLeave: 0,
            leaveWithoutPay: 0
        };

        // Add to existing data
        existingEmployees.push(adminEmployee);
        existingUsers.push(adminUserCredentials);

        const existingLeaveData: LeaveData[] = JSON.parse(localStorage.getItem('leaveData') || '[]');
        existingLeaveData.push(leaveData);

        const existingLeaveAvailable: LeaveData[] = JSON.parse(localStorage.getItem('leaveAvailable') || '[]');
        existingLeaveAvailable.push(leaveData);

        const existingLeaveBooked: LeaveData[] = JSON.parse(localStorage.getItem('leaveBooked') || '[]');
        existingLeaveBooked.push(leaveBookedData);

        // Save to localStorage
        localStorage.setItem('employeesData', JSON.stringify(existingEmployees));
        localStorage.setItem('user', JSON.stringify(existingUsers));
        localStorage.setItem('leaveData', JSON.stringify(existingLeaveData));
        localStorage.setItem('leaveAvailable', JSON.stringify(existingLeaveAvailable));
        localStorage.setItem('leaveBooked', JSON.stringify(existingLeaveBooked));

        // Initialize other storage arrays
        initializeStorageArrays();

        console.log('✅ Admin user created successfully!');
        console.log(`📧 Email: ${finalConfig.email}`);
        console.log(`🔑 Password: ${finalConfig.password}`);
        console.log(`👤 Employee ID: ${finalConfig.employeeId}`);

        return {
            success: true,
            message: 'Admin user created successfully!',
            admin: {
                email: finalConfig.email,
                password: finalConfig.password,
                employeeId: finalConfig.employeeId
            }
        };

    } catch (error) {
        console.error('Error setting up admin user:', error);
        return {
            success: false,
            message: `Error: ${(error as Error).message}`
        };
    }
};

/**
 * Quick setup with default admin user
 */
export const quickSetup = () => {
    if (hasExistingData()) {
        console.warn('⚠️ Data already exists. Use clearAllStorageData() first if you want to reset.');
        return getStorageStatus();
    }

    const result = setupAdminUser();
    if (result.success) {
        return {
            ...result,
            status: getStorageStatus()
        };
    }
    return result;
};
