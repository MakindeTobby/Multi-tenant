/**
 * Signin Firebase
 */

import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link, withRouter } from 'react-router-dom';
import { User, Avatar_19, Avatar_07, Avatar_06, Avatar_14 } from '../../../Entryfile/imagepath.jsx'

import {
  BarChart, Bar, Cell, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Header from '../../../initialpage/Sidebar/header'
import Sidebar from '../../../initialpage/Sidebar/sidebar';
import Offcanvas from '../../../Entryfile/offcanvance/index.jsx';
import "../../index.css"
import { FaCalendar, FaClock, FaFile, FaFileAlt, FaFolderOpen, FaTicketAlt } from 'react-icons/fa';
import { useCompanyContext } from '../../../context/index.jsx';
import DashboardCard from '../../../_components/cards/dashboardCard.jsx';


const barchartdata = [
  { y: '2006', "Total Income": 100, 'Total Outcome': 90 },
  { y: '2007', "Total Income": 75, 'Total Outcome': 65 },
  { y: '2008', "Total Income": 50, 'Total Outcome': 40 },
  { y: '2009', "Total Income": 75, 'Total Outcome': 65 },
  { y: '2010', "Total Income": 50, 'Total Outcome': 40 },
  { y: '2011', "Total Income": 75, 'Total Outcome': 65 },
  { y: '2012', "Total Income": 100, 'Total Outcome': 90 }
];
const linechartdata = [
  { y: '2006', "Total Sales": 50, 'Total Revenue': 90 },
  { y: '2007', "Total Sales": 75, 'Total Revenue': 65 },
  { y: '2008', "Total Sales": 50, 'Total Revenue': 40 },
  { y: '2009', "Total Sales": 75, 'Total Revenue': 65 },
  { y: '2010', "Total Sales": 50, 'Total Revenue': 40 },
  { y: '2011', "Total Sales": 75, 'Total Revenue': 65 },
  { y: '2012', "Total Sales": 100, 'Total Revenue': 50 }
];
const AdminDashboard = () => {

  const [menu, setMenu] = useState(false)
  const { staff, clients, FetchStaff, document } = useCompanyContext()
  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  useEffect(() => {
    FetchStaff()
  }, [])

  useEffect(() => {
    let firstload = localStorage.getItem("firstload")
    if (firstload === "false") {
      setTimeout(function () {
        window.location.reload(1)
        localStorage.removeItem("firstload")
      }, 1000)
    }
  });
  return (
    <>
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>

        <Header onMenuClick={(value) => toggleMobileMenu()} />
        <Sidebar />
        <div className="page-wrapper">
          <Helmet>
            <title>Dashboard - Promax Admin Dashboard</title>
            <meta name="description" content="Dashboard" />
          </Helmet>
          {/* Page Content */}
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Welcome Admin!</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="row">
              <DashboardCard title={"Total Staff"} content={staff.length} icon={<i className="fa fa-user" />}
                linkTitle={"View Staffs"} link={`/app/employee/allemployees`}
              />
              <DashboardCard title={"Total Client"} content={clients.length} icon={<i className="fa fa-users" />}
                linkTitle={"View Clients"} link={`/app/employee/clients`}
              />
              <DashboardCard title={"Total Admin"} content={0} icon={<i className="fa fa-user" />}
                linkTitle={"View Clients"} link={''}
              />
              <DashboardCard title={"Total Tickets"} content={0} icon={<FaTicketAlt />}
                linkTitle={"View Tickets"} link={''}
              />
              <DashboardCard title={"Total Document"} content={document.length} icon={<FaFolderOpen />}
                linkTitle={"View Documents"} link={`/app/employee/document`}
              />
              <DashboardCard title={"Total Progress Notes "} content={0} icon={<FaFileAlt />}
                linkTitle={"View Progress Notes"} link={``}
              />
              <DashboardCard title={"Total Shift Roaster "} content={0} icon={<FaCalendar />}
                linkTitle={"View Roaster"} link={``}
              />
              <DashboardCard title={"Total Attendances"} content={0} icon={<FaClock />}
                linkTitle={"View Attendance"} link={``}
              />

            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-6 text-center">
                    <div className="card">
                      <div className="card-body">
                        <h3 className="card-title">Total Revenue</h3>

                        <ResponsiveContainer width='100%' height={300}>
                          <BarChart

                            data={barchartdata}
                            margin={{
                              top: 5, right: 5, left: 5, bottom: 5,
                            }}
                          >
                            <CartesianGrid />
                            <XAxis dataKey="y" />
                            <YAxis />

                            <Legend />
                            <Bar dataKey="Total Income" fill="#4256D0" />
                            <Bar dataKey="Total Outcome" fill="#18225C" />
                          </BarChart>
                        </ResponsiveContainer>

                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 text-center">
                    <div className="card">
                      <div className="card-body">
                        <h3 className="card-title">Sales Overview</h3>
                        <ResponsiveContainer width='100%' height={300}>
                          <LineChart data={linechartdata}
                            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                            <CartesianGrid />
                            <XAxis dataKey="y" />
                            <YAxis />

                            <Legend />
                            <Line type="monotone" dataKey="Total Sales" stroke="#4256D0" fill="#18225C" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 7 }} />
                            <Line type="monotone" dataKey="Total Revenue" stroke="#18225C" fill="#4256D0" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 7 }} />
                          </LineChart>
                        </ResponsiveContainer>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-md-12">
                <div className="card-group m-b-30">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-3">
                        <div>
                          <span className="d-block">New Employees</span>
                        </div>
                        <div>
                          <span className="text-success">+10%</span>
                        </div>
                      </div>
                      <h3 className="mb-3">10</h3>
                      <div className="progress mb-2" style={{ height: '5px' }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: '70%' }} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      <p className="mb-0">Overall Employees 218</p>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-3">
                        <div>
                          <span className="d-block">Earnings</span>
                        </div>
                        <div>
                          <span className="text-success">+12.5%</span>
                        </div>
                      </div>
                      <h3 className="mb-3">$1,42,300</h3>
                      <div className="progress mb-2" style={{ height: '5px' }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: '70%' }} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      <p className="mb-0">Previous Month <span className="text-muted">$1,15,852</span></p>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-3">
                        <div>
                          <span className="d-block">Expenses</span>
                        </div>
                        <div>
                          <span className="text-danger">-2.8%</span>
                        </div>
                      </div>
                      <h3 className="mb-3">$8,500</h3>
                      <div className="progress mb-2" style={{ height: '5px' }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: '70%' }} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      <p className="mb-0">Previous Month <span className="text-muted">$7,500</span></p>
                    </div>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-3">
                        <div>
                          <span className="d-block">Profit</span>
                        </div>
                        <div>
                          <span className="text-danger">-75%</span>
                        </div>
                      </div>
                      <h3 className="mb-3">$1,12,000</h3>
                      <div className="progress mb-2" style={{ height: '5px' }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: '70%' }} aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                      <p className="mb-0">Previous Month <span className="text-muted">$1,42,000</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Statistics Widget */}

            {/* /Statistics Widget */}
          </div>
        </div>
      </div>



      {/* /Page Content */}


      <Offcanvas />
    </>
  );
}

export default withRouter(AdminDashboard);
