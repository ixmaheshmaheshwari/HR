import React, { useState, useEffect } from 'react';
import { setupAdminUser, getStorageStatus, clearAllStorageData, AdminSetupConfig } from '../utils/setupLocalStorage';
import { useNavigate } from 'react-router-dom';

const SetupPage: React.FC = () => {
    const navigate = useNavigate();
    const [config, setConfig] = useState<AdminSetupConfig>({
        employeeId: 1001,
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@hrms.com',
        password: 'admin123',
        phoneNumber: 1234567890,
        department: 'Administration',
        position: 'System Administrator'
    });

    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' }>({ text: '', type: 'info' });
    const [status, setStatus] = useState<any>(null);
    const [showStatus, setShowStatus] = useState(false);

    useEffect(() => {
        checkStatus();
    }, []);

    const showMessage = (text: string, type: 'success' | 'error' | 'info') => {
        setMessage({ text, type });
        setTimeout(() => {
            setMessage({ text: '', type: 'info' });
        }, 5000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = setupAdminUser(config);

        if (result.success) {
            showMessage(result.message, 'success');
            checkStatus();
            setShowStatus(true);
        } else {
            showMessage(result.message, 'error');
        }
    };

    const checkStatus = () => {
        const currentStatus = getStorageStatus();
        setStatus(currentStatus);
        setShowStatus(true);
    };

    const handleClearData = () => {
        if (window.confirm('⚠️ Are you sure you want to clear ALL local storage data? This action cannot be undone!')) {
            clearAllStorageData();
            showMessage('🗑️ All data has been cleared from local storage!', 'info');
            checkStatus();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setConfig(prev => ({
            ...prev,
            [name]: name === 'employeeId' || name === 'phoneNumber' ? parseInt(value) : value
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-5" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="bg-white rounded-xl shadow-2xl p-10 max-w-2xl w-full">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">🔧 HRMS Local Storage Setup</h1>
                <p className="text-center text-gray-600 text-sm mb-8">Initialize admin user and required data structures</p>

                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                        message.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
                            'bg-blue-50 border-blue-200 text-blue-800'
                        }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Employee ID <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="employeeId"
                                value={config.employeeId}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={config.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={config.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={config.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={config.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={config.phoneNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Department <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="department"
                                value={config.department}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Position <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="position"
                            value={config.position}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 text-white font-semibold rounded-lg transition transform hover:scale-105 hover:shadow-lg mt-6"
                        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                    >
                        Create Admin User
                    </button>
                </form>

                <div className="mt-6 space-y-3">
                    <button
                        onClick={checkStatus}
                        className="w-full py-3 px-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
                    >
                        Check Current Status
                    </button>

                    <button
                        onClick={handleClearData}
                        className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                    >
                        Clear All Data
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                        Go to Login
                    </button>
                </div>

                {showStatus && status && (
                    <div className="mt-6 bg-gray-50 rounded-lg p-5">
                        <h3 className="font-bold text-gray-800 mb-4">📊 Local Storage Status</h3>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-gray-700">Total Employees:</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${status.totalEmployees > 0 ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                                    {status.totalEmployees}
                                </span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-gray-700">Admin Users:</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${status.adminUsers > 0 ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                                    {status.adminUsers}
                                </span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-gray-700">User Credentials:</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${status.totalUsers > 0 ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                                    {status.totalUsers}
                                </span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-gray-700">Leave Records:</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${status.leaveRecords > 0 ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                                    {status.leaveRecords}
                                </span>
                            </div>
                        </div>

                        {status.admins && status.admins.length > 0 && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                <strong className="text-blue-900">Admin Accounts:</strong>
                                {status.admins.map((admin: any, index: number) => (
                                    <div key={index} className="mt-2 text-blue-800">
                                        📧 {admin.email} (ID: {admin.employeeId})
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SetupPage;
