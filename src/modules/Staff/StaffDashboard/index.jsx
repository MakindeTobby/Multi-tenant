/**
 * Signin Firebase
 */

import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link, withRouter, useHistory } from 'react-router-dom';
import isBetween from 'dayjs/plugin/isBetween';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import Offcanvas from '../../../Entryfile/offcanvance/index.jsx';
import "../../index.css"
import { MdHourglassTop, MdHourglassBottom, MdPersonOutline } from 'react-icons/md';
import { BsClockHistory } from 'react-icons/bs';
import { BiStopwatch } from 'react-icons/bi';
import { CiStickyNote } from 'react-icons/ci';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

dayjs.extend(isBetween);

const StaffDashboard = ({roster, loading}) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('Australia/Sydney');
  
  const [currentDate, setCurrentDate] = useState(dayjs().tz());

  const daysOfWeek = [
    currentDate.subtract(1, 'day'),
    currentDate,
    currentDate.add(1, 'day')
  ];

  const activitiesByDay = daysOfWeek.map((day) =>
    roster.filter((activity) =>
      dayjs(activity.dateFrom).format('YYYY-MM-DD') === day.format('YYYY-MM-DD')
    )

  );
 
  const [menu, setMenu] = useState(false);
  const toggleMobileMenu = () => {
    setMenu(!menu)
  };

  useEffect(() => {
    let firstload = localStorage.getItem("firstload")
    if (firstload === "false") {
      setTimeout(function () {
        window.location.reload(1)
        localStorage.removeItem("firstload")
      }, 1000)
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useHistory()

  const handleClockIn = () => {
    setIsLoading(true);
    // Simulating an asynchronous action, such as an API call
    setTimeout(() => {
      // Perform any necessary logic here before routing to the - page
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            localStorage.setItem("latit", latitude);
            localStorage.setItem("log", longitude);
            navigate.push(`/staff/main/progress/${activitiesByDay[1][0]?.shiftRosterId}`);
          },
          (error) => {
            toast.error('Error getting location:', error.message);
          }
        );
      } else {
        toast.error('Geolocation is not supported');
      }

    }, 2000); // Set an appropriate delay to simulate the loading time
    
    // Optionally, you can clear the loading state after the specified time
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const rosterId = JSON.parse(localStorage.getItem('rosterId'))
  const progressNoteId = JSON.parse(localStorage.getItem('progressNoteId'))
  const HandleFill = () =>{
    navigate.push(`/staff/main/edit-progress/${rosterId}/${progressNoteId}`);
  }
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const handleActivityClick = (activitiesByDay) => {
    console.log(activitiesByDay);
    setSelectedActivity(activitiesByDay);
    setShowModal(true);
  };

  function getActivityStatus(activitiesByDay) {
    if (!activitiesByDay) {
      return 'No Shift Today';
    }
    // dayjs(activity.dateFrom).format('YYYY-MM-DD') === day.format('YYYY-MM-DD')
    const nowInAustraliaTime = dayjs().tz().format('YYYY-MM-DD HH:mm:ss');
    const activityDateFrom = dayjs(activitiesByDay[1][0].dateFrom).format('YYYY-MM-DD HH:mm:ss');
    const activityDateTo = dayjs(activitiesByDay[1][0].dateTo).format('YYYY-MM-DD HH:mm:ss');

    if (activityDateFrom > nowInAustraliaTime) {
      return 'Upcoming';
    }
    else if (activityDateTo < nowInAustraliaTime) {
      return activitiesByDay[1][0].attendance === true ? 'Present' : 'Absent';
    }
    else if (activityDateTo < nowInAustraliaTime || activitiesByDay[1][0].attendance === true && activitiesByDay[1][0].isEnded === false ) {
      return 'You are already Clocked in'
    }
    else if (activityDateTo < nowInAustraliaTime || activitiesByDay[1][0].attendance === true && activitiesByDay[1][0].isEnded === true) {
      return 'Present';
    }
    else {
      return 'Clock-In';
    }
  }

  return (
    <>
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>

        {/* <StaffHeader />
        <StaffSidebar /> */}
        <div className="page-wrapper">
          <Helmet>
            <title>Dashboard - Promax Staff Dashboard</title>
            <meta name="description" content="Dashboard" />
          </Helmet>
          {/* Page Content */}
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  {/* <h3 className="page-title">Welcome {userObj.firstName}</h3> */}
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className='row g-5'>

              <div className='col-sm-12'>

                <div className='row'>

                  <div className='col-sm-3'>
                    <div className='p-2'>
                      <label className='d-flex justify-content-center fw-bold text-muted'>Yesterday</label>
                    </div>
                    <div className="card text-center">
                      <div className="card-header bg-secondary text-white">
                        <div className='d-flex justify-content-between align-items-center'>
                          <span style={{ fontSize: '12px' }}>{`${dayjs(daysOfWeek[0]).format('dddd, MMMM D, YYYY')}`}</span>
                          <span style={{ fontSize: '12px' }} className='text-white bg-dark rounded px-2'>{activitiesByDay[0][0]?.status === "string" ? "Active" : activitiesByDay[0][0]?.status}</span>
                        </div>
                      </div>
                      <div className="card-body  d-flex flex-column gap-1 justify-content-start align-items-start">

                        <span className=' d-flex justify-content-between w-100'><span className='fw-bold text-truncate'><MdPersonOutline /> Client: </span><span className='text-truncate'>{activitiesByDay[0][0]?.profile.firstName}</span></span>
                        <span className='d-flex justify-content-between w-100'><span className='fw-bold text-truncate'><MdHourglassTop className='text-success' /> Start Time: </span><span className='text-truncate'>{activitiesByDay[0].length > 0 ? dayjs(activitiesByDay[0][0]?.dateFrom).format('hh:mm A') : '--'}</span></span>
                        <span className='d-flex justify-content-between w-100'><span className='fw-bold text-truncate'><MdHourglassBottom className='text-danger' /> End Time: </span><span className='text-truncate'>{activitiesByDay[0].length > 0 ? dayjs(activitiesByDay[0][0]?.dateTo).format('hh:mm A') : '--'}</span></span>
                      </div>
                      <div className="card-footer text-body-light bg-light text-muted">
                        View Details

                      </div>
                    </div>
                  </div>

                  <div className='col-sm-6'>
                    <div className='p-2'>
                      <label className='d-flex justify-content-center fw-bold text-primary'>Today</label>
                    </div>
                    <div className="card text-center">
                      <div className="card-header bg-primary text-white">
                        <div className='d-flex justify-content-between align-items-center'>
                          <span style={{ fontSize: '12px' }}> {`${dayjs(daysOfWeek[1]).format('dddd, MMMM D, YYYY')}`}</span>
                          <span style={{ fontSize: '12px' }} className='text-white bg-warning rounded px-2'>{activitiesByDay[1][0]?.status}</span>
                        </div>
                      </div>

                      <div className="card-body  d-flex flex-column gap-1 justify-content-start align-items-start">

                        <span className=' d-flex justify-content-between w-100'><span className='fw-bold text-truncate'><MdPersonOutline /> Client: </span><span className='text-truncate'>{activitiesByDay[1][0]?.profile.fullName}</span></span>
                        <span className='d-flex justify-content-between w-100'><span className='fw-bold text-truncate'><MdHourglassTop className='text-success' /> Start Time: </span><span className='text-truncate'>  {activitiesByDay[1].length > 0 ? dayjs(activitiesByDay[1][0]?.dateFrom).format('hh:mm A') : '--'}</span></span>
                        <span className='d-flex justify-content-between w-100'><span className='fw-bold text-truncate'><MdHourglassBottom className='text-danger' /> End Time: </span><span className='text-truncate'>  {activitiesByDay[1].length > 0 ? dayjs(activitiesByDay[1][0]?.dateTo).format('hh:mm A') : '--'}</span></span>
                      </div>
                      <div className="card-footer text-body-secondary bg-secondary text-white">
                        <BsClockHistory /> &nbsp; Activities
                      </div>

                      <div className='px-5 py-4'>
                        {activitiesByDay[1][0] ? (
                          <>
                            <span>{activitiesByDay[1][0]?.activities}</span>
                            <br />
                            <br />

                            {getActivityStatus(activitiesByDay) === 'Upcoming' ? (
                              <span className='fw-bold text-warning pointer'>Upcoming</span>
                            ) : getActivityStatus(activitiesByDay) === 'Clock-In' ? (
                              <span className={`pointer btn text-white rounded ${isLoading ? "btn-warning" : "btn-success"}`} onClick={handleClockIn}>
                                {isLoading ?
                                  <div>
                                    <div class="spinner-border text-secondary spinner-border-sm text-white" role="status">
                                      <span class="visually-hidden">Loading...</span>
                                    </div> Please wait....
                                  </div>
                                  : <span> <BiStopwatch /> Clock In</span>
                                }
                              </span>
                            ) : (
                              <div className='d-flex gap-2 flex-wrap justify-content-center'>
                              <small
                                className={`p-1 rounded ${getActivityStatus(activitiesByDay) === 'Upcoming' ? 'bg-warning' :
                                  getActivityStatus(activitiesByDay) === 'Absent' ? 'bg-danger text-white' :
                                  getActivityStatus(activitiesByDay) === 'You are already Clocked in' ? 'bg-primary text-white' :
                                    getActivityStatus(activitiesByDay) === 'Present' ? 'bg-success text-white' : ''
                                  }`}
                              >
                                {getActivityStatus(activitiesByDay)}
                              </small>

                              {getActivityStatus(activitiesByDay) === 'You are already Clocked in' && (
                                      <button
                                        className='btn btn-secondary text-white p-2 rounded'
                                        onClick={HandleFill}
                                      >
                                        {isLoading ?
                                  <div>
                                    <div class="spinner-border text-secondary spinner-border-sm text-white" role="status">
                                      <span class="visually-hidden">Loading...</span>
                                    </div> Please wait....
                                  </div>
                                  : <span> <CiStickyNote /> Fill progress note</span>
                                }
                                      </button>
                                    )}
                              </div>
                            )}
                          </>
                        ) : (
                          <span>No Shift Today</span>

                        )}
                      </div>

                    </div>

                  </div>



                  <div className='col-sm-3'>
                    <div className='p-2'>
                      <label className='d-flex justify-content-center fw-bold text-muted'>Tomorrow</label>
                    </div>

                    <div className="card text-center">
                      <div className="card-header bg-info text-white">
                        <div className='d-flex justify-content-between align-items-center'>
                          <span style={{ fontSize: '12px' }}>{dayjs(daysOfWeek[2]).format('dddd, MMMM D, YYYY')}</span>
                          <span style={{ fontSize: '12px' }} className='text-white bg-primary rounded px-2'>{activitiesByDay[2][0]?.status}</span>
                        </div>
                      </div>
                      <div className="card-body  d-flex flex-column gap-1 justify-content-start align-items-start">

                        <span className=' d-flex justify-content-between w-100'><span className='fw-bold text-truncate'><MdPersonOutline /> Client: </span><span className='text-truncate'>{activitiesByDay[2][0]?.profile.firstName}</span></span>
                        <span className='d-flex justify-content-between w-100'><span className='fw-bold text-truncate'><MdHourglassTop className='text-success' /> Start Time: </span><span className='text-truncate'>{activitiesByDay[2].length > 0 ? dayjs(activitiesByDay[2][0]?.dateFrom).format('hh:mm A') : '--'}</span></span>
                        <span className='d-flex justify-content-between w-100'><span className='fw-bold text-truncate'><MdHourglassBottom className='text-danger' /> End Time: </span><span className='text-truncate'>{activitiesByDay[2].length > 0 ? dayjs(activitiesByDay[2][0]?.dateTo).format('hh:mm A') : '--'}</span></span>
                      </div>
                      <div className="card-footer text-body-danger bg-danger text-white pointer" onClick={() => handleActivityClick(activitiesByDay[2])}>
                        View Details

                      </div>
                    </div>
                  </div>

                </div>

              </div>

              <div className='col-md-4 p-2 d-flex flex-column gap-2 justify-content-start'>
                <div className='p-3 shadow-sm'>
                  <h3>Upcoming Shift</h3>
                  {activitiesByDay[2].length > 0 ? (
                    // activitiesByDay[3][0]?.map(activity => (
                      <span className="mt-2">
                        <div className="d-flex justify-content-between text-dark">
                          <div className='d-flex flex-column justify-content-start'>
                            <span style={{ fontSize: "10px" }}>{dayjs(activitiesByDay[2][0].dateFrom).format('dddd MMMM D, YYYY')}</span>
                            <span className='text-dark fs-7 fw-bold'>{activitiesByDay[2][0].profile.fullName}</span>
                          </div>
                         
                        </div>
                      </span>
                    // ))
                  ) : (
                    <span>No upcoming shifts</span>
                  )}
                  <div className='d-flex justify-content-end mt-2'>
                    <Link to="/staff/main/roster" className='text-dark pointer' style={{ fontSize: "12px" }}>
                      See all <FaLongArrowAltRight className='fs-3' />
                    </Link>
                  </div>
                </div>
              </div>



            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Activity Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedActivity && (
                  <>
                    <p><b>Date:</b> <span style={{ fontSize: '15px' }}>{dayjs(daysOfWeek[2]).format('dddd, MMMM D, YYYY')}</span></p>
                    <p><b>Time:</b> {activitiesByDay[2].length > 0 ? dayjs(activitiesByDay[2][0]?.dateFrom).format('hh:mm A') : '--'} - {activitiesByDay[2].length > 0 ? dayjs(activitiesByDay[2][0]?.dateTo).format('hh:mm A') : '--'}</p>
                    <p><b>Client:</b> {activitiesByDay[2].length > 0 ? activitiesByDay[2][0].clients : " -- "}</p>
                    <p><b>Status:</b> {activitiesByDay[2].length > 0 ? activitiesByDay[2][0]?.status: "--"}</p>
                    <p><b>Description:</b> {activitiesByDay[2].length > 0 ? activitiesByDay[2][0]?.activities: "--"}</p>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer>
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </Modal.Footer>
            </Modal>


          </div>
        </div>
      </div>



      {/* /Page Content */}


      <Offcanvas />
    </>
  );
}

export default withRouter(StaffDashboard);
