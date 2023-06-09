import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import { CopyToClipboard } from "react-copy-to-clipboard";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Papa from 'papaparse';
import { FaCopy, FaEdit, FaFileCsv, FaFileExcel, FaFilePdf, FaRegEdit, FaRegFileAlt, FaTrash } from "react-icons/fa";
import ExcelJS from 'exceljs';
import Sidebar from '../../../initialpage/Sidebar/sidebar';;
import Header from '../../../initialpage/Sidebar/header'
import Offcanvas from '../../../Entryfile/offcanvance';
import { toast } from 'react-toastify';
import useHttp from '../../../hooks/useHttp';
import { useCompanyContext } from '../../../context';
import { GoSearch, GoTrashcan } from 'react-icons/go';
import { SlSettings } from 'react-icons/sl'
import Swal from 'sweetalert2';
import moment from 'moment';
import LocationMapModal from '../../../_components/map/MapModal';
import { Modal } from 'react-bootstrap';

function formatDuration(duration) {
  const durationInTicks = BigInt(duration);
  const durationInMilliseconds = Number(durationInTicks) / 10000; // Convert ticks to milliseconds

  const durationInMinutes = Math.floor(durationInMilliseconds / (1000 * 60));
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  return `${hours} Hrs ${minutes} min`;
}




const AttendanceReport = () => {
  const { get } = useHttp();
  const { loading, setLoading } = useCompanyContext();
  const [loading1, setLoading1] = useState(false);
  const id = JSON.parse(localStorage.getItem('user'));
  const [attendance, setAttendance] = useState([]);
  const [staff, setStaff] = useState([]);
  const [sta, setSta] = useState(0);
  const dateFrom = useRef(null);
  const dateTo = useRef(null);
  const [editModal, setEditModal] = useState(false);



  const columns = [
    {
      name: 'Staff',
      selector: row => row.staff.fullName,
      sortable: true
    },
    {
      name: 'Clock-In',
      selector: row => row.clockIn,
      sortable: true,
      expandable: true,
      cell: (row) => (
        <span style={{ overflow: "hidden" }}> {!row.clockIn ? "Not Modified" : moment(row.clockIn).format('LLL')}</span>
      ),
    },
    {
      name: 'Duration',
      selector: row => row.clockIn,
      sortable: true,
      expandable: true,
      cell: (row) => (
        <span style={{ overflow: "hidden" }}> {formatDuration(row.duration)}</span>
      ),
    },


    {
      name: 'Clock-Out',
      selector: row => row.clockIn,
      sortable: true,
      expandable: true,
      cell: (row) => (
        <span style={{ overflow: "hidden" }}> {!row.clockOut ? "Not Modified" : moment(row.clockOut).format('LLL')}</span>
      ),
    },
    {
      name: 'Location',
      selector: row => row.clockIn,
      sortable: true,
      expandable: true,
      cell: (row) => (
        <span style={{ overflow: "hidden" }}>

          <LocationMapModal latitude={row.inLatitude} longitude={row.inLongitude} />
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="d-flex gap-1" style={{ overflow: "hidden" }}>
          <button
            className='btn'
            title='Edit'
            onClick={() => setEditModal(true)}
          >
            <FaRegEdit />
          </button>
          <button
            className='btn'
            title='Details'
            onClick={() => {
              // handle action here, e.g. open a modal or navigate to a new page
              handleDelete(row.administratorId)
            }}
          >
            <FaRegFileAlt />
          </button>
          <button
            className='btn'
            title='Delete'
            onClick={() => {
              // handle action here, e.g. open a modal or navigate to a new page
              handleDelete(row.administratorId)
            }}
          >
            <GoTrashcan />
          </button>

        </div>
      ),
    },



  ];


  const FetchAttendance = async () => {
    try {
      setLoading(true)
      // const { data } = await get(`Attendances/get_staff_attendances?staffId=2${id.companyId}`, { cacheTimeout: 300000 });
      const { data } = await get(`Attendances/get_all_attendances_by_company?companyId=${id.companyId}`, { cacheTimeout: 300000 });
      console.log(data);
      setAttendance(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
    try {
      const staffResponse = await get(`/Staffs?companyId=${id.companyId}`, { cacheTimeout: 300000 });
      const staff = staffResponse.data;
      setStaff(staff);
      setLoading(false)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {

    FetchAttendance()
  }, []);


  const [menu, setMenu] = useState(false);


  // const handleDelete = async (e) => {
  //   Swal.fire({
  //     html: `<h3>Are you sure? you want to delete this user</h3></br><p>You won't be able to revert this!</p>`,
  //     icon: 'question',
  //     showCancelButton: true,
  //     confirmButtonColor: '#00AEEF',
  //     cancelButtonColor: '#777',
  //     confirmButtonText: 'Confirm Delete',
  //     showLoaderOnConfirm: true,
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         const { data } = await privateHttp.post(`/Administrators/delete/${e}?userId=${id.userId}`,
  //         )
  //         if (data.status === 'Success') {
  //           toast.success(data.message);
  //           FetchStaff()
  //         } else {
  //           toast.error(data.message);
  //         }


  //       } catch (error) {
  //         console.log(error);
  //         toast.error(error.response.data.message)
  //         toast.error(error.response.data.title)


  //       }


  //     }
  //   })
  // }


  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  useEffect(() => {
    if ($('.select').length > 0) {
      $('.select').select2({
        minimumResultsForSearch: -1,
        width: '100%'
      });
    }
  });

  const handleExcelDownload = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Sheet1');

    // Add headers
    const headers = columns.map((column) => column.name);
    sheet.addRow(headers);

    // Add data
    attendance.forEach((dataRow) => {
      const values = columns.map((column) => {
        if (typeof column.selector === 'function') {
          return column.selector(dataRow);
        }
        return dataRow[column.selector];
      });
      sheet.addRow(values);
    });

    // Generate Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'data.xlsx';
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };



  const handleCSVDownload = () => {
    const csvData = Papa.unparse(attendance);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePDFDownload = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(13);
    doc.text("User Table", marginLeft, 40);
    const headers = columns.map((column) => column.name);
    const dataValues = attendance.map((dataRow) =>
      columns.map((column) => {
        if (typeof column.selector === "function") {
          return column.selector(dataRow);
        }
        return dataRow[column.selector];
      })
    );

    doc.autoTable({
      startY: 50,
      head: [headers],
      body: dataValues,
      margin: { top: 50, left: marginLeft, right: marginLeft, bottom: 0 },
    });
    doc.save("Attendance.pdf");
  };

  const ButtonRow = ({ data }) => {
    return (
      <div className="p-4">
        <div className='fw-bold'><span>Full NAME</span> {data.fullName}</div>
        <div>{data.email}</div>
      </div>
    );
  };
  const [searchText, setSearchText] = useState("");

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredData = attendance.filter((item) =>
    item.staff.fullName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>

        {/* <Header onMenuClick={(value) => toggleMobileMenu()} />
        <Sidebar /> */}
        <div className="page-wrapper">
          <Helmet>
            <title>Attendance Reports</title>
            <meta name="description" content="Login page" />
          </Helmet>

          <div className="content container-fluid">

            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3 className="page-title">Attendance Reports</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/administrator/administrator/adminDashboard">Dashboard</Link></li>
                    <li className="breadcrumb-item active">Attendance Reports</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row align-items-center shadow-sm p-3">

              <div className="col-md-4">
                <div className="form-group">
                  <label className="col-form-label">Staff Name</label>
                  <div>
                    <select className="form-select" onChange={e => setSta(e.target.value)}>
                      <option defaultValue value={""}>--Select a staff--</option>
                      {
                        staff.map((data, index) =>
                          <option value={data.fullName} key={index}>{data.fullName}</option>)
                      }
                    </select></div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="col-form-label">Start Date</label>
                  <div>
                    <input type="date" ref={dateFrom} className=' form-control' name="" id="" />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="col-form-label">End Date</label>
                  <div>
                    <input type="date" ref={dateTo} className=' form-control' name="" id="" />
                  </div>
                </div>
              </div>

              <div className="col-auto mt-3">
                <div className="form-group">
                  <button
                    className="btn btn-info add-btn text-white rounded-2 m-r-5"
                    disabled={loading1 ? true : false}
                  >


                    {loading1 ? <div className="spinner-grow text-light" role="status">
                      <span className="sr-only">Loading...</span>
                    </div> : "Load"}
                  </button>

                </div>
              </div>


            </div>



            <div className='mt-4 border'>
              <div className="row px-2 py-3">

                <div className="col-md-3">
                  <div className='d-flex justify-content-between border align-items-center rounded rounded-pill p-2'>
                    <input type="text" placeholder="Search Attendance" className='border-0 outline-none' onChange={handleSearch} />
                    <GoSearch />
                  </div>
                </div>
                <div className='col-md-5 d-flex  justify-content-center align-items-center gap-4'>
                  <CSVLink
                    data={attendance}
                    filename={"data.csv"}

                  >
                    <button

                      className='btn text-info'
                      title="Export as CSV"
                    >
                      <FaFileCsv />
                    </button>

                  </CSVLink>
                  <button
                    className='btn text-danger'
                    onClick={handlePDFDownload}
                    title="Export as PDF"
                  >
                    <FaFilePdf />
                  </button>
                  <button
                    className='btn text-primary'

                    onClick={handleExcelDownload}
                    title="Export as Excel"
                  >
                    <FaFileExcel />
                  </button>
                  <CopyToClipboard text={JSON.stringify(attendance)}>
                    <button

                      className='btn text-warning'
                      title="Copy Table"
                      onClick={() => toast("Table Copied")}
                    >
                      <FaCopy />
                    </button>
                  </CopyToClipboard>
                </div>

              </div>
              <DataTable data={filteredData} columns={columns}
                pagination
                highlightOnHover
                searchable
                searchTerm={searchText}
                progressPending={loading}
                progressComponent={<div className='text-center fs-1'>
                  <div className="spinner-grow text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>}
                responsive
                expandableRows
                expandableRowsComponent={ButtonRow}
                paginationTotalRows={filteredData.length}



              />






            </div>


            {/*Edit Modal */}
            <Modal show={editModal} onHide={() => setEditModal(false)} centered size='lg'>
              <Modal.Header closeButton>
                <Modal.Title>Edit Attendance</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <div className="row">

                    <form
                    // onSubmit={SendReport}
                    >

                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="">Clock In</label>
                            <input type="text" className="form-control"
                              // value={moment(attendance.clockIn).format("LLL")}
                              readOnly />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="">Clock Out</label>
                            <input type="text" className="form-control"
                              // value={moment(attendance.clockOut).format("LLL")}
                              readOnly />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="">Starting Kilometre (km)</label>
                            <input type="text"
                              // value={startKm}
                              // onChange={e => setStartKm(e.target.value)}
                              className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="">Ending Kilometre (km)</label>
                            <input type="text"
                              // value={endKm}
                              // onChange={e => setEndKm(e.target.value)}
                              className="form-control" />
                          </div>
                        </div>
                      </div>


                      <div className="form-group">
                        {/* <DefaultEditor value={html} onChange={onChange} /> */}
                        <label htmlFor="">Additional Report <span className='text-success' style={{ fontSize: '10px' }}>This could be reasons why you were late or information you want your admin to be aware of</span></label>
                        <textarea rows={3} className="form-control summernote"
                          name="report"
                        // value={report} onChange={e => setReport(e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="">Image URL </label>
                        <input className="form-control" type="file"
                          accept=".png,.jpg,.jpeg"
                          maxSize={1024 * 1024 * 2}
                        // onChange={handleFileChange}
                        />
                      </div>
                      <div className="form-group text-center mb-0">
                        <div className="text-center d-flex gap-2">
                          <button className="btn btn-info add-btn text-white rounded-2 m-r-5"
                            disabled={loading1 ? true : false}
                            type='submit'
                          >

                            {loading1 ? <div className="spinner-grow text-light" role="status">
                              <span className="sr-only">Loading...</span>
                            </div> : "Save"}</button>


                        </div>
                      </div>
                    </form>
                  </div>

                </div>
              </Modal.Body>

            </Modal>



          </div>

        </div>
      </div>

      <Offcanvas />
    </>

  );
}

export default AttendanceReport;
