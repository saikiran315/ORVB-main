import { useState } from "react";
import Link from "next/link";
import {GiHomeGarage} from "react-icons/gi"
import {FaUserTie} from "react-icons/fa"
export default function Nav() {
  const [navbar, setNavbar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="w-full bg-white shadow">
      <div className="justify-between  mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between  md:py-5 md:block">
            <Link href="/">
              <h2 className="text-2xl font-bold">Moto Help</h2>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md  focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex  justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Sign Up
                  </h3>
                  <button
                    className="p-1 ml-auto  float-right hover:scale-125 duration-300 text-3xl leading-none font-semibold "
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-red-400  ">
                      X
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex items-center gap-10 justify-center">
                  <button className="hover:scale-125 duration-300 " >
                   
                    <Link href="./mregister" >
                    <GiHomeGarage size={80} className="text-indigo-800"/>
                       <p className="text-2xl">Mechanic</p>
                       </Link>
                    
                  </button>
                  <button className="hover:scale-125 duration-300 " >
                    
                    <Link href="./Register" >
                    <FaUserTie size={75}/>
                      <p className="text-2xl">User</p>
                      </Link>
                  </button>
                  
                  
                </div>
                {/*footer*/}
                
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center font-medium space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="text-gray-600 hover:text-blue-600">
                <Link href="/">Home</Link>
              </li>
              <li className="text-gray-600 hover:text-blue-600">
                <a href="./contact1">Contact</a>
              </li>
              <li className="text-gray-600 hover:text-blue-600">
                <a href="./about">About</a>
              </li>
              <li className="text-gray-600 hover:text-blue-600">
                <button onClick={() => setShowModal(true)}>

                Sign up
                </button>
              </li>
              <li className="rounded-lg border p-3 bg-[#3EC1D3] text-white hover:scale-110 duration-300">
                <Link href="./Login">Login In</Link>
              </li>
             
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
