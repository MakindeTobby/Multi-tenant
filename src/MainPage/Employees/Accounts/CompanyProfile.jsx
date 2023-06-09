
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from "react-helmet";
import { useHistory } from 'react-router-dom';
import Offcanvas from '../../../Entryfile/offcanvance';
import useHttp from '../../../hooks/useHttp';
import { FaRegEdit } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';



const CompanyProfile = () => {
    const id = JSON.parse(localStorage.getItem('user'));
    const [companyOne, setCompanyOne] = useState({});
    const [editedCompany, setEditedCompany] = useState({});
    const [showModal, setShowModal] = useState(false);

    const privateHttp = useHttp();
    const FetchCompany = async () => {
        try {
            const { data } = await privateHttp.get(`/Companies/get_company/${id.companyId}`, { cacheTimeout: 300000 })
            setCompanyOne(data.company)
            setEditedCompany({ ...data.company })


        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        FetchCompany()
    }, []);

    const styles = {
        main: {
            backgroundColor: 'black',
            display: 'none',

        },
        label: {
            width: '250px',
            cursor: "pointer",
            display: "flex", justifyContent: "center", alignItems: "center", textAlign: 'center'
        }
    }
    const HandleSubmit = (e) => {
        e.preventDefault();
        toast("Not editable at the moment");
        setShowModal(false);
    }

    return (
        <>
            <div className="page-wrapper">
                <Helmet>
                    <title>Company Profile</title>
                    <meta name="description" content="Company Profile" />
                </Helmet>
                <div className="content container-fluid">
                    <div className="row">
                        <div style={{ display: "flex", justifyContent: 'center' }}>
                            <div className="form-group">
                                <label style={styles.label}>
                                    <img className="" style={{ width: '100%', height: '100%' }}
                                        src={companyOne.companyLogo || ""} alt="company logo" />
                                </label>

                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h4 className="card-title mb-0 fw-bold">Company Profile</h4>
                                    <span className="card-title mb-0 text-info fs-3 pointer"
                                        onClick={() => setShowModal(true)}
                                    > <FaRegEdit /></span>
                                </div>

                                <div className="card-body">
                                    <form action="#">
                                        <div className="row">
                                            <div className="form-group col-md-12">
                                                <label>Company Head</label>
                                                <input type="text" className="form-control"
                                                    value={companyOne.companyHead} readOnly
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Company Name</label>
                                                <input type="text" className="form-control"
                                                    value={companyOne.companyName} readOnly
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Company Email</label>
                                                <input type="text" className="form-control"
                                                    value={companyOne.companyEmail} readOnly
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Company Address</label>
                                                <input type="text" className="form-control"
                                                    value={companyOne.companyAddress} readOnly
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Company Phone</label>
                                                <input type="text" className="form-control"
                                                    value={companyOne.companyPhone} readOnly
                                                />
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={showModal} onHide={() => setShowModal(false)} size='lg'>
                    <Modal.Header closeButton>
                        <Modal.Title className='fw-bold'>Edit Company Profile </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form action="#" onSubmit={HandleSubmit}>
                            <div className="row">
                                <div className="form-group col-md-12">
                                    <label>Company Head</label>
                                    <input type="text" className="form-control"
                                        value={editedCompany.companyHead || ""}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Company Name</label>
                                    <input type="text" className="form-control"
                                        value={editedCompany.companyName || ""}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Company Email</label>
                                    <input type="text" className="form-control"
                                        value={editedCompany.companyEmail || ""}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Company Address</label>
                                    <input type="text" className="form-control"
                                        value={editedCompany.companyAddress || ""}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Company Phone</label>
                                    <input type="text" className="form-control"
                                        value={editedCompany.companyPhone || ""}
                                    />
                                </div>
                                <div className="submit-section">
                                    <button className="btn btn-primary rounded submit-btn" type='submit'>

                                        Submit Changes
                                    </button>
                                </div>

                            </div>
                        </form>

                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
            </div>
            <Offcanvas />
        </>

    );
}

export default CompanyProfile;
