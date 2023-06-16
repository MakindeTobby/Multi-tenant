import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { MdDashboard } from 'react-icons/md';

const Sidebar = (props) => {
  const MenuMore = () => {
    document.getElementById("more-menu-hidden").classList.toggle("hidden");
  }

  const onMenuClik = () => {
    props.onMenuClick()
  }

  const [isSideMenu, setSideMenu] = useState("");
  const [isSideMenunew, setSideMenuNew] = useState("dashboard")
  const [level2Menu, setLevel2Menu] = useState("")
  const [level3Menu, setLevel3Menu] = useState("")


  const toggleSidebar = (value) => {
    setSideMenu(value);
    setSideMenuNew(value);

  }

  const toggleLvelTwo = (value) => {
    setLevel2Menu(value)
  }
  const toggleLevelThree = (value) => {
    setLevel3Menu(value)
  }




  let pathname = props.location.pathname
  return (
    <div id="sidebar" className="sidebar" style={{ backgroundColor: "#1C75B9" }}>
      <Scrollbars
        autoHide
        // autoHideTimeout={1000}
        // autoHideDuration={200}
        autoHeight
        autoHeightMin={0}
        autoHeightMax="95vh"
        thumbMinSize={30}
        universal={false}
        hideTracksWhenNotNeeded={true}


      >
        <div className="sidebar-inner slimscroll">
          <div id="sidebar-menu" className="sidebar-menu" style={{ backgroundColor: "#1C75B9", height: '100vh' }}>


            { /*Vertical Sidebar starts here*/}
            <ul className="sidebar-vertical" id='veritical-sidebar'>
              <li className="menu-title">
                <span>Main</span>
              </li>
              <li className={pathname.includes('dashboard') ? "active" : ""} onClick={() => onMenuClik()}>

                <Link to="/app/main/dashboard"  >
                  <i className="la la-dashboard" />
                  <span> Dashboard</span></Link>



              </li>

              <li className="menu-title">
                <span>User Management</span>
              </li>
              <li className={pathname.includes('admin') ? "active" : ""} onClick={() => onMenuClik()}>
                <Link to="/app/employee/alladmin"><i className="la la-user-lock" /> <span>Administrators</span></Link>
              </li>

              <li className={pathname.includes('allstaff') ? "active" : ""} onClick={() => onMenuClik()}>
                <Link to="/app/employee/allstaff"><i className="la la-user" /> <span>Staffs</span></Link>
              </li>
              <li className={pathname.includes('clients') ? "active" : ""} onClick={() => onMenuClik()}>
                <Link to="/app/employee/clients"><i className="la la-users" /> <span>Clients</span></Link>
              </li>
              <li className="submenu">
                <a href="#" className={isSideMenu == "management" ? "subdrop" : ""} onClick={(e) => {
                  e.preventDefault();
                  toggleSidebar(isSideMenu == "management" ? "" : "management")
                }}><i className="la la-cog" /> <span>Account Management</span> <span className="menu-arrow" /></a>
                {isSideMenu == "management" ?
                  <ul>
                    <li><Link className={pathname.includes('alluser') ? "active" : pathname.includes('alluser')}
                      onClick={() => onMenuClik()}
                      to="/app/account/alluser" >Manage Users</Link> </li>
                    <li><Link className={pathname.includes('user-roles') ? "active" : pathname.includes('user-roles')}
                      onClick={() => onMenuClik()}
                      to="/app/account/user-roles" >Manage Roles</Link> </li>
                  </ul>
                  : ""
                }
              </li>
              <li className="menu-title">
                <span>Staff-Client Management</span>
              </li>
              <li className="submenu">
                <a href="#" className={isSideMenu == "setup" ? "subdrop" : ""} onClick={(e) => {
                  e.preventDefault();
                  toggleSidebar(isSideMenu == "setup" ? "" : "setup")
                }}><i className="la la-map" /> <span>Set Up</span> <span className="menu-arrow" /></a>
                {isSideMenu == "setup" ?
                  <ul>
                    <li><Link className={pathname.includes('public-holiday') ? "active" : pathname.includes('public-holiday')}
                      to="/app/setup/public-holiday" onClick={() => onMenuClik()}>Public Holidays</Link>
                    </li>

                    <li><Link className={pathname.includes('schedule-support') ? "active" : pathname.includes('schedule-support')}
                      to="/app/setup/schedule-support" onClick={() => onMenuClik()}>Schedule Supports</Link>
                    </li>

                    <li><Link className={pathname.includes('support-type') ? "active" : pathname.includes('support-type')}
                      to="/app/setup/support-type" onClick={() => onMenuClik()}>Support Type</Link>
                    </li>
                    <li><Link className={pathname.includes('integrations') ? "active" : pathname.includes('integrations')}
                      to="/app/setup/integrations" onClick={() => onMenuClik()}>Third Party Integration</Link>
                    </li>

                  </ul>
                  : ""
                }
              </li>
              <li className={pathname.includes('shift-scheduling') || pathname.includes('shift-list') ? "active" : ""}>
                <Link to="/app/employee/shift-scheduling" onClick={() => onMenuClik()}><i className="la la-calendar" /> <span>Shift Roaster</span></Link>
              </li>

              <li className="menu-title">
                <span>Report Management</span>
              </li>

              <li className={pathname.includes('attendance-report') || pathname.includes('attendance-report') ? "active" : ""}>
                <Link to="/app/reports/attendance-reports" onClick={() => onMenuClik()}><i className="la la-calendar-check-o" /> <span>Attendance Report</span></Link>
              </li>
              <li className={pathname.includes('progress-report') || pathname.includes('progress-report') ? "active" : ""}>
                <Link to="/app/reports/progress-reports" onClick={() => onMenuClik()}><i className="la la-folder-open" /> <span>Progress Report</span></Link>
              </li>
              <li className={pathname.includes('invoice') || pathname.includes('invoice') ? "active" : ""}>
                <Link to="/app/reports/invoice" onClick={() => onMenuClik()}><i className="la la-file-text" /> <span>Invoicing</span></Link>
              </li>
              <li className={pathname.includes('document') || pathname.includes('document') ? "active" : ""}>
                <Link to="/app/employee/document" onClick={() => onMenuClik()}><i className="la la-book" /> <span>Documents</span></Link>
              </li>

              <li className="menu-title">
                <span>Communication</span>
              </li>
              <li className={pathname.includes('message') || pathname.includes('message') ? "active" : ""}>
                <Link to="/app/message/inbox" onClick={() => onMenuClik()}><i className="la la-comment" /> <span>Messages</span></Link>
              </li>
              <li className="submenu">
                <a href="#" className={isSideMenu == "support" ? "subdrop" : ""} onClick={(e) => {
                  e.preventDefault();
                  toggleSidebar(isSideMenu == "support" ? "" : "support")
                }}><i className="la la-headphones" /> <span>Support</span> <span className="menu-arrow" /></a>
                {isSideMenu == "support" ?
                  <ul>
                    <li><Link className={pathname.includes('view-tickets') ? "active" : pathname.includes('view-tickets')}
                      to="/app/support/view-tickets" onClick={() => onMenuClik()}>View Tickets</Link>
                    </li>

                    <li><Link className={pathname.includes('raise-ticket') ? "active" : pathname.includes('raise-ticket')}
                      to="/app/support/raise-ticket" onClick={() => onMenuClik()}>Raise a Ticket</Link>
                    </li>

                    <li><Link className={pathname.includes('knowledge-base') ? "active" : pathname.includes('knowledge-base')}
                      to="/app/support/knowledge-base" onClick={() => onMenuClik()}>Knowledge Base</Link>
                    </li>

                  </ul>
                  : ""
                }
              </li>

              <br />
              <br />
            </ul>
          </div>
        </div>


      </Scrollbars>


    </div>

  );

}

export default withRouter(Sidebar);
