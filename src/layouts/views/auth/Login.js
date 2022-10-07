import { useLoginForm } from "hooks/useLoginForm";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import { isAccessTokenExpired } from "redux/authentificationActions";

export default function Login() {
  const navigate = useNavigate();

  const { emailInput, passwordInput, handleSubmit } = useLoginForm();
  const isUserLoggedIn = useSelector(isAccessTokenExpired);
  useEffect(() => {
    if(isUserLoggedIn) {
      navigate('/');
    }
  },[navigate, isUserLoggedIn])
    
  
  return (
    <>
      <div className="container mx-auto px-4 h-full"> 
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-sky-500 text-sm font-bold">
                    Sign in with
                  </h6>
                </div>                                
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">                
                <form onSubmit={handleSubmit}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-sky-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      ref={emailInput}
                      type="email"
                      className="border-0 px-3 py-3 placeholder-sky-300 text-sky-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      defaultValue="bob@example.com"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-sky-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      ref={passwordInput}
                      type="password"
                      className="border-0 px-3 py-3 placeholder-sky-300 text-sky-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      defaultValue="secret"
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-sky-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-sky-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">                
                    <button
                      className="bg-sky-900 text-white active:bg-gray-300 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"                 
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-sky-200"
                >
                  <small>Forgot password?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link to="/auth/register" className="text-sky-200">
                  <small>Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
