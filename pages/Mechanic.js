import React, { useRef, useState,useContext } from "react";
import List from "../components/List";
import { AuthContext } from "../context/AuthUserContext";
import { useRouter } from "next/router";
const Mechanic = () => {
  // console.log(mechanics["mechanics"][0].name);

  const [data, setData] = useState([]);
  const [Jdata, setJdata] = useState({});
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const clickPoint = useRef();
  const handleFocus = () => {
    clickPoint.current.style.display = "none";
  };

  const handleBlur = () => {
    clickPoint.current.style.display = "block";
  };
  if (!currentUser) {
    router.push("./Login");
  }
  // console.log(data);
  return (
    <div className=" ">
      <div className="item-center flex-wrap bg-neutral-700">
        <div className="lg:w-3/5 w-5/6 shadow-2xl m-auto text-center bg-fuchsia-500 ">
          <div className="items-center pt-6 flex justify-center">
            <div className="relative mr-3">
              <div
                className="absolute top-3 left-3 items-center"
                ref={clickPoint}
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text" 
                className="block p-2 pl-10 w-70 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:pl-3"
                placeholder="Search Here..."
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => setData(e.target.value)}
              />
            </div>
          </div>
          <List input={data} />
        </div>
      </div>
    </div>
  );
};

export default Mechanic;
