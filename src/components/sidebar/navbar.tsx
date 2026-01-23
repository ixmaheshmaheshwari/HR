

import { Layout, Input, Badge, Dropdown, Avatar, Space, Button } from "antd";
import {
  BellOutlined,
  UserOutlined,
  SearchOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";
import type { MenuProps } from 'antd';
import Innovatech from "./innovlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/actions/loginaction";

const { Header } = Layout;
const { Search } = Input;

interface NavbarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Navbar({ collapsed, onToggleCollapse }: NavbarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleSearch = (value: string) => {
    if (value) {
      navigate(`/employeesearch?q=${value}`);
    }
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: <Link to="/user">Your Profile</Link>,
    },
    {
      key: 'employees',
      icon: <UserOutlined />,
      label: <Link to="/employee">Employee Directory</Link>,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sign out',
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      {/* Left Section - Toggle & Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggleCollapse}
          style={{
            fontSize: '18px',
            width: 40,
            height: 40,
          }}
        />
        <Link to="/dashboard">
          <img
            src={Innovatech}
            alt="INNOVATECHS"
            style={{ height: '32px', cursor: 'pointer' }}
          />
        </Link>
      </div>

      {/* Search Bar */}
      <div style={{ flex: 1, maxWidth: '500px', margin: '0 24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Search
          placeholder="Search employees, tasks, or documents..."
          allowClear
          enterButton={<SearchOutlined />}
          size="middle"
          onSearch={handleSearch}
          style={{ width: '100%' }}
        />
      </div>

      {/* Right Section - Notifications & User Menu */}
      <Space size="large">
        {/* Notifications */}
        <Badge count={0} showZero={false}>
          <BellOutlined
            style={{
              fontSize: '18px',
              cursor: 'pointer',
              color: '#595959',
            }}
          />
        </Badge>

        {/* User Dropdown */}
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          arrow
        >
          <Space style={{ cursor: 'pointer' }}>
            <Avatar
              size="default"
              icon={<UserOutlined />}
              style={{
                backgroundColor: '#1890ff',
                cursor: 'pointer',
              }}
            />
          </Space>
        </Dropdown>
      </Space>
    </Header>
  );
}