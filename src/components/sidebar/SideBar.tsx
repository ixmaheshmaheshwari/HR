import React, { useState } from "react";
import { Button, Layout, Menu } from "antd";
import { RxDashboard } from "react-icons/rx";
import { CgPerformance } from "react-icons/cg";
import { FaTasks, FaUserPlus } from "react-icons/fa";
import { FcLeave } from "react-icons/fc";
import { IoPersonSharp } from "react-icons/io5";
import { MdCoPresent } from "react-icons/md";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
import { LoginState } from "../../redux/store/rootreducer";
import { Link } from "react-router-dom";
import "../sidebar/side.css";

const { Sider } = Layout;


interface SidebarProps {
  children: React.ReactNode;
}



interface MenuItem {
  key: string;
  icon?: React.ReactNode;
  title: string;
  link?: string; // Add link as optional
  roles: string[];
  submenu?: MenuItem[]; // Add submenu as optional
}

const Sidebar: React.FC <SidebarProps>= ({children}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const role = useSelector((state: { auth: LoginState }) => state.auth.role);

  const menuItems: MenuItem[] = [
    {
      key: "dashboard",
      icon: <RxDashboard />,
      title: "Dashboard",
      link: "/dashboard",
      roles: ["admin", "employee","manager"],
    },
    {
      key: "employee-directory",
      icon: <IoPersonSharp />,
      title: "Employee Directory",
      link: "/employee",
      roles: ["admin","employee","manager"],
    },
    {
      key: "attendance-tracking",
      icon: <MdCoPresent />,
      title: "Attendance Tracking",
      link: "",
      roles:["admin","manager","employee"],
      submenu: [
        {
          key:"attendance-marker",
        title: "Attendance Marker",
        link: "/attendence/marker",
        roles: ["admin", "employee", "manager"],
      },
      {
        key:"attendance-report",
        title: "Attendance Report Generator",
        link: "/attendence/generator",
        roles: ["admin", "manager"],
      },]
    },
    {
      key: "leave-management",
      icon: <FcLeave />,
      title: "Leave Management",
      link: "/leave",
      roles: ["admin", "employee","manager"],
      submenu: [
        {
          key:"leave-view",
        title: "Leave View",
        link: "/leave/view",
        roles: ["admin", "employee", "manager"],
      },
      {
        key:"leave-action",
        title: "Leave Action",
        link: "/leave/action",
        roles: ["admin", "manager"],
      },
      {
        key:"apply-leave",
        title: "Apply Leave",
        link: "/leave/apply",
        roles: ["admin", "employee", "manager"],
      },
      ],
    },
    {
      key: "task-assignments",
      icon: <FaTasks />,
      title: "Task Assignments",
      roles: ["admin", "employee","manager"],
      submenu: [
        {
          key: "add-task",
          title: "Add Task",
          roles: ["admin", "employee","manager"],
          link: "/add-task",
        },
        {
          key: "assign-task",
          title: "Assign Task",
          roles: ["admin","manager"],
          link: "/assign-task",
        },
        {
          key: "track-task",
          title: "Track Task",
          roles: ["admin", "employee","manager"],
          link: "/track-task",
        },
        
      ],
    },
    {
      key: "performance-reviews",
      icon: <CgPerformance />,
      title: "Performance Reviews",
      link: "/performance",
      roles: ["admin", "manager"],
      submenu: [
        {
          key:"performance-form",
        title: "Performance Form",
        link: "/performance/form",
        roles: ["admin",  "manager"],
      },
      {
        key:"performance-generator",
        title: "Performance Generator",
        link: "/performance/generator",
        roles: ["admin", "manager"],
      },]
    },
    {
      key: "employee-onboarding",
      icon: <FaUserPlus />,
      title: "Employee Onboarding",
      link: "/employeeform",
      roles: ["admin"],
    },
    
  ];

  // const toggleCollapse = () => {
  //   setCollapsed(!collapsed);
  // };
  const handleBreakpointChange = (broken: boolean) => {
    if (broken) {
      setCollapsed(true);
    }
  };

  return (
    <Layout className="overflow-y-scroll" style={{ width: "auto", height: "100vh" }}>
        <Sider
        collapsible
        trigger={null}
        collapsed={collapsed}
        collapsedWidth="0"
        breakpoint="sm"
        onBreakpoint={handleBreakpointChange}
        onCollapse={setCollapsed}
        className={`${collapsed ? 'collapsed' : ''} sm:w-fit w-[100%]   `}
        >
          
        <Menu
          theme="dark"
          mode="inline"
          style={{ top: 0 , overflowY: 'auto' }}
          className="sm:collapsed mt-10 " 
        >
          <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "23px !important",
            backgroundColor: "#001529",
            color: "white",
          }}/>
          {menuItems.map((item) => (
            <>
              {item.roles.includes(role) && (
                item.submenu ? (
                  <Menu.SubMenu key={item.key} icon={item.icon} title={item.title} className="mt-10">
                    {item.submenu.map(subitem => (
                      subitem.roles.includes(role) && (
                        <Menu.Item className="mt-10" key={subitem.key}>
                          <Link to={subitem?.link!}>{subitem.title}</Link>
                        </Menu.Item>
                      )
                    ))}
                  </Menu.SubMenu>
                ) : (
                  <Menu.Item className="" key={item.key} icon={item.icon}>
                    <Link to={item.link || '/'}>{item.title}</Link>
                  </Menu.Item>
                )
              )}
            </>
          ))}
        </Menu>
      </Sider>
      
<Content className="overflow-y-auto ">
    <div className="content">{children}</div>
  </Content>
      
    </Layout>
  );
};

export default Sidebar;
