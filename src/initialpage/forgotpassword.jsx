
import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { FaArrowLeft, FaLongArrowAltLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  headerlogo,
} from '../Entryfile/imagepath'
import './login.css'
import usePublicHttp from '../hooks/usePublicHttp';
import { toast } from 'react-toastify';


const ForgotPassword = () => {
  const publicHttp = usePublicHttp();
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      toast.error("Enter your Email")
    }
    try {
      const { data } = await publicHttp.get(`/Account/forgot_password?=${email}`)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }



  return (

    <>
      <Helmet>
        <title>Forget Password - Promax Multitenant App</title>
        <meta name="description" content="Password" />
      </Helmet>

      <div className="cover-bg">
        <div className="header-left p-4">
          <span className="logo p-4">
            <img src={headerlogo} width={40} height={40} alt="" /> &nbsp; Promax Care
          </span>
        </div>
        <div className="login-form px-3 shadow bg-white rounded" >
          <form onSubmit={handleSubmit}>
            <h4 className="text-center">Forgot Password</h4>
            <div className="form-group mt-4">
              <input type="email" className="form-control" placeholder="Email"
                onChange={e => setEmail(e.target.value)}

                required />
            </div>


            <div className="form-group mt-4">
              <button type="submit" className="btn btn-primary btn-lg w-100"
                disabled={loading ? true : false}
              >{loading ? <div className="spinner-grow text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div> : "Proceed"}

              </button>
            </div>

            <div className="form-group mt-4">

              <p className="text-center"><span>Back to login </span> &nbsp; <Link to={'/login'}> <FaLongArrowAltLeft className='text-primary fs-3' /></Link></p>

            </div>
          </form>
        </div>
      </div>
    </>
  );
}



export default ForgotPassword;
