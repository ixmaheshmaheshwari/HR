import React from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  CalendarOutlined,
  FileTextOutlined,
  BarChartOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
import { LoginState } from "../../redux/store/rootreducer";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

interface SidebarProps {
  children: React.ReactNode;
  collapsed: boolean;
}

type MenuItem = Required<MenuProps>['items'][number];

const Sidebar: React.FC<SidebarProps> = ({ children, collapsed }) => {
  const role = useSelector((state: { auth: LoginState }) => state.auth.role);
  const location = useLocation();

  // Helper function to create menu items
  function getItem(
    label: React.ReactNode,
    key: string,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  // Build menu items based on role
  const getMenuItems = (): MenuItem[] => {
    const items: MenuItem[] = [];

    // Dashboard - visible to all
    if (["admin", "employee", "manager"].includes(role)) {
      items.push(
        getItem(<Link to="/dashboard">Dashboard</Link>, "dashboard", <DashboardOutlined />)
      );
    }

    // Employee Directory - visible to all
    if (["admin", "employee", "manager"].includes(role)) {
      items.push(
        getItem(<Link to="/employee">Employee Directory</Link>, "employee-directory", <TeamOutlined />)
      );
    }

    // Attendance Tracking
    if (["admin", "manager", "employee"].includes(role)) {
      const attendanceChildren: MenuItem[] = [
        getItem(<Link to="/attendence/marker">Attendance Marker</Link>, "attendance-marker"),
      ];

      if (["admin", "manager"].includes(role)) {
        attendanceChildren.push(
          getItem(<Link to="/attendence/generator">Attendance Report</Link>, "attendance-report")
        );
      }

      items.push(
        getItem("Attendance Tracking", "attendance-tracking", <CalendarOutlined />, attendanceChildren)
      );
    }

    // Leave Management
    if (["admin", "employee", "manager"].includes(role)) {
      const leaveChildren: MenuItem[] = [
        getItem(<Link to="/leave/view">Leave View</Link>, "leave-view"),
        getItem(<Link to="/leave/apply">Apply Leave</Link>, "apply-leave"),
      ];

      if (["admin", "manager"].includes(role)) {
        leaveChildren.push(
          getItem(<Link to="/leave/action">Leave Action</Link>, "leave-action")
        );
      }

      items.push(
        getItem("Leave Management", "leave-management", <FileTextOutlined />, leaveChildren)
      );
    }

    // Task Assignments
    if (["admin", "employee", "manager"].includes(role)) {
      const taskChildren: MenuItem[] = [
        getItem(<Link to="/add-task">Add Task</Link>, "add-task"),
        getItem(<Link to="/track-task">Track Task</Link>, "track-task"),
      ];

      if (["admin", "manager"].includes(role)) {
        taskChildren.push(
          getItem(<Link to="/assign-task">Assign Task</Link>, "assign-task")
        );
      }

      items.push(
        getItem("Task Assignments", "task-assignments", <FileTextOutlined />, taskChildren)
      );
    }

    // Performance Reviews
    if (["admin", "manager"].includes(role)) {
      items.push(
        getItem(
          "Performance Reviews",
          "performance-reviews",
          <BarChartOutlined />,
          [
            getItem(<Link to="/performance/form">Performance Form</Link>, "performance-form"),
            getItem(<Link to="/performance/generator">Performance Report</Link>, "performance-generator"),
          ]
        )
      );
    }

    // Employee Onboarding - Admin only
    if (role === "admin") {
      items.push(
        getItem(<Link to="/employeeform">Employee Onboarding</Link>, "employee-onboarding", <UserAddOutlined />)
      );
    }

    return items;
  };

  // Get current selected key based on location
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'dashboard';
    if (path.includes('/employee') && !path.includes('/employeeform')) return 'employee-directory';
    if (path.includes('/attendence/marker')) return 'attendance-marker';
    if (path.includes('/attendence/generator')) return 'attendance-report';
    if (path.includes('/leave/view')) return 'leave-view';
    if (path.includes('/leave/apply')) return 'apply-leave';
    if (path.includes('/leave/action')) return 'leave-action';
    if (path.includes('/add-task')) return 'add-task';
    if (path.includes('/track-task')) return 'track-task';
    if (path.includes('/assign-task')) return 'assign-task';
    if (path.includes('/performance/form')) return 'performance-form';
    if (path.includes('/performance/generator')) return 'performance-generator';
    if (path.includes('/employeeform')) return 'employee-onboarding';
    return 'dashboard';
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth={80}
        width={250}
        style={{
          background: '#fff',
          borderRight: '1px solid #f0f0f0',
        }}
      >
        <Menu
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          defaultOpenKeys={['attendance-tracking', 'leave-management', 'task-assignments', 'performance-reviews']}
          style={{
            height: '100%',
            borderRight: 0,
            paddingTop: '16px',
          }}
          items={getMenuItems()}
          inlineCollapsed={collapsed}
        />
      </Sider>

      <Content
        style={{
          padding: 0,
          margin: 0,
          minHeight: 280,
          background: '#f5f5f5',
          overflow: 'auto',
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default Sidebar;
