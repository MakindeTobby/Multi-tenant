
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { Avatar_02, Avatar_05, Avatar_11, Avatar_12, Avatar_09, Avatar_10, Avatar_13 } from "../../../Entryfile/imagepath"
import Offcanvas from '../../../Entryfile/offcanvance';
import useHttp from '../../../hooks/useHttp';
import '../../../assets/css/table2.css'
import { FaAngleLeft, FaAngleRight, FaSlidersH } from 'react-icons/fa';
import { useCompanyContext } from '../../../context';

const StaffRoster = () => {
  const id = JSON.parse(localStorage.getItem('user'));
  const { get } = useHttp();
  const { loading, setLoading } = useCompanyContext();
  const [schedule, setSchedule] = useState([]);
  const [isClockedIn, setIsClockedIn] = useState(false);

  const handleClockInClick = () => {
    setIsClockedIn(true);
  };

  const shiftEnd = new Date();
  shiftEnd.setHours(18);

  const now = new Date();

  const isOnTime = now <= shiftEnd;

  const FetchSchedule = async () => {
    setLoading(true)
    try {
      const scheduleResponse = await get(`ShiftRosters/get_shifts_by_user?client=${0}&staff=${2}`, { cacheTimeout: 300000 });
      const schedule = scheduleResponse.data;
      console.log(schedule)
      setSchedule(schedule);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
    

  };
  useEffect(() => {
    FetchSchedule()
  }, []);





  useEffect(() => {
    if ($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%'
      });
    }
  });

  const [list, setList] = useState([1, 2, 3, 4, 5])
  const [startIndex, setStartIndex] = useState(0);

  const [currentDate, setCurrentDate] = useState(new Date());
  currentDate.setDate(1); // Set the date to the 1st of the current month

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // Get the number of days in the current month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();


  // Generate an array of dates for the current month
  const currentMonthDates = [];
  for (let i = startIndex + 1; i <= daysInMonth; i++) {
    if (currentMonthDates.length === 6) {
      break;
    }
    currentMonthDates.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
  }


  // Generate an array of date strings for the current month
  const currentMonthDateStrings = currentMonthDates.map(date => `${weekdays[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`);

  // Handler for previous button click
  const handlePrevClick = () => {
    setStartIndex(startIndex - 6);
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getDate() - 1, 1));
  };

  // Handler for next button click
  const handleNextClick = () => {
    setStartIndex(startIndex + 6);
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getDate() + 1, 1));
  };



  // Get the start and end dates for the current range
  const startDate = currentMonthDates[0];
  const endDate = currentMonthDates[5]; // Get the 6th date (0-based index)






  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <Helmet>
          <title>Shift Roaster</title>
          <meta name="description" content="Login page" />
        </Helmet>
        {/* Page Content */}
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row">
              <div className="col">
                <h3 className="page-title">Shift Roaster</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/staff/staff/staffDashboard">Dashboard</Link></li>
                  <li className="breadcrumb-item"><Link to="">Staff</Link></li>
                  <li className="breadcrumb-item active">Shift Roaster</li>
                </ul>
              </div>
              {/* <div className="col-auto float-end ml-auto">
                <Link to="/app/employee/add-shift" className="btn add-btn m-r-5">Add New Roaster</Link>
               
              </div> */}
            </div>
          </div>
          {/* /Page Header */}
          {/* Content Starts */}
          {/* Search Filter */}








          <div className='row filter-row '>
            <div className="col-sm-2" style={{ height: "50vh" }}>

              <div className=''>
                {/* <div className="form-group">
                  <select className="form-select border-0 shadow-sm" style={{ backgroundColor: '#F4F4F4' }}>
                    <option defaultValue hidden>All clients</option>
                    {
                      staff.map((data, index) =>
                        <option value={data.staffId} key={index}>{data.fullName}</option>)
                    }
                  </select></div> */}
                <div className="d-flex flex-column gap-2 px-2 py-3" style={{ backgroundColor: "#F3FEFF" }}>
                  <div className='d-flex justify-content-between align-items-center'>
                    <span className='fw-bold'>
                      Client Assign
                    </span>
                    <span> <FaSlidersH /></span>
                  </div>

                  <div className=''>
                    <input className="form-control" type="search" placeholder='Search Client' />

                  </div>
                  <div>

                    {
                      list.map((data, index) =>
                        <div className='d-flex align-items-center gap-2 p-2' key={index}>
                          <span className='rounded-circle bg-danger' style={{ width: "10px", height: "10px" }}></span>
                          <span className='rounded-circle bg-dark' style={{ width: "35px", height: "35px" }}></span>
                          <span className='text-truncate' style={{ fontSize: '12px' }}>Rose Mary {data}</span>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>




            <div className="col-sm-10">
              <div className=' py-3 d-flex justify-content-between align-items-center'>
                <span className='shadow-sm p-3' style={{ backgroundColor: '#F4F4F4' }}>
                  <FaAngleLeft onClick={handlePrevClick} style={{ cursor: "pointer" }} />
                  <span className='fw-bold text-muted'> {`${startDate.getDate()} ${months[startDate.getMonth()]} - ${endDate.getDate()} ${months[endDate.getMonth()]}`} </span>
                  <FaAngleRight onClick={handleNextClick} style={{ cursor: "pointer" }} />
                </span>
                <span>
                  <select className="form-select border-0 fw-bold" style={{ backgroundColor: '#F4F4F4' }}>
                    <option defaultValue hidden>Week</option>

                    <option value=''>Month</option>
                    <option value=''>Week</option>
                    <option value=''>Day</option>

                  </select>
                </span>
              </div>
              <div className='row'>
                {currentMonthDateStrings.map((dateString, index) =>
                  <div key={index} className="col-sm-2 border py-2">
                    <span className='text-muted' style={{ fontSize: '12px' }}>
                      {dateString}
                    </span>
                    <div className="col-sm-12 text-center py-3">
                      <div className='bg-primary text-white rounded-2 d-flex flex-column align-items-start p-2' style={{ fontSize: '10px' }}>
                        <span className='fw-bold'>9AM - 3PM</span>
                        <span>Rose Mary</span>
                        {/* <small className='bg-success rounded-3 p-1'>Clock-in</small> */}
                        <small
                          className={`bg-${isClockedIn ? (isOnTime ? "success" : "danger") : "success"} rounded-3 p-1`}
                          onClick={handleClockInClick}
                          disabled={isClockedIn}
                          style={{ cursor: "pointer" }}
                        >
                          {isClockedIn ? (isOnTime ? "Present" : "Absent") : "Clock In"}
                        </small>

                      </div>
                      <div className='bg-primary text-white rounded-2 mt-2 d-flex flex-column align-items-start p-2' style={{ fontSize: '10px' }}>
                        <span className='fw-bold'>9AM - 3PM</span>
                        <span>Rose Mary</span>
                        <small
                          className={`bg-${isClockedIn ? (isOnTime ? "success" : "danger") : "success"} rounded-3 p-1`}
                          onClick={handleClockInClick}
                          disabled={isClockedIn}
                          style={{ cursor: "pointer" }}
                        >
                          {isClockedIn ? (isOnTime ? "Present" : "Absent") : "Clock In"}
                        </small>
                      </div>
                      {/* <div className='bg-primary text-white rounded-2 mt-2 d-flex flex-column align-items-start p-2' style={{ fontSize: '10px' }}>
                        <span className='fw-bold'>9AM - 3PM</span>
                        <span>Rose Mary</span>
                        <small>Absent</small>
                      </div> */}
                      <button className='btn'>
                        {/* <FaPlus /> */}
                      </button>

                    </div>
                  </div>

                )
                }

              </div>
              <div className='row'>

              </div>

            </div>
          </div>
          {/* /Content End */}
        </div>
        {/* /Page Content */}

      </div>
      {/* /Page Wrapper */}
      {/* Add Schedule Modal */}
      {/* /Add Schedule Modal */}
      {/* Edit Schedule Modal */}






      {/* /Edit Schedule Modal */}
      <Offcanvas />
    </>
  );

}

export default StaffRoster;
