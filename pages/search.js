import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
// import { doc, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import h from "../public/photos/Animated_Shape.svg";
import Nav from "../components/Nav";
import { useFormik } from "formik";
import { AuthContext } from "../context/AuthUserContext";

import Layout from "../layout/layout";
import Link from "next/link";
import {
  HiAtSymbol,
  HiFingerPrint,
  HiOutlineUser,
  HiPhone,
} from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import { AiFillCar,AiFillMessage } from "react-icons/ai";
import { registerValidate } from "../lib/validate";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import Request from "./Request";

export default function search() {
  const [show, setShow] = useState(false);
  const [msg,setMsg] = useState("")

  const [z, setZ] = useState({
    username: "",
    vModel: "",
    vNo: "",
    phone: "",
  });
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [ad, setAd] = useState();
  const api =
    "ApOrSPtt3Kb25jn69KkX92oZaaLopI9ppMJaU6-eVeieOrMCWg9vusEaME2E10Dd";
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };
  async function getLoc() {
    const url = `https://dev.virtualearth.net/REST/v1/Locations/${lat},${lng}?&key=${api}`;
    const response = await fetch(url);
    var data = await response.json();
    setAd(
      data["resourceSets"][0]["resources"][0]["address"]["formattedAddress"]
    );
    // if(Object.keys(ad).length!=0){

    //   console.log(ad["resourceSets"][0]["resources"][0]["address"]["formattedAddress"]);
    console.log(
      data["resourceSets"][0]["resources"][0]["address"]["formattedAddress"]
    );
    console.log(data["resourceSets"][0]["resources"][0]["address"]);
    // }
    console.log(data);

    // console.log(ad["resourceSets"][0]["resources"][0]["address"]["formattedAddress"]);
    // console.log(Object.keys(ad).length!=0);
  }
  // console.log(ad);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (auth.currentUser) {
      let uid = auth.currentUser.uid;

      const docRef = doc(db, "clients", uid);
      onSnapshot(docRef, (doc) => {
        setUser(doc.data());
      });
    } else {
    }
  }, [auth]);

  // if (!currentUser) {
  //  router.push("./Login");
  // }
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const username = e.target[1].value;
    const vModel = e.target[2].value;
    const vNo = e.target[3].value;
    const phone = e.target[4].value;
    const msg = e.target[5].value;
    user['msg'] = msg
    console.log(user);
    // const file = e.target[5].files[0];
    console.log(username, vModel, vNo, phone);
    // console.log(username);
    setShow(true);

  };
  console.log(msg);
  return (
    <div className=" ">
      <div>

      <Image src={h} className="w-full h-[145vh]" alt=""></Image>
      </div>
      <div className="m-auto bg-slate-50 rounded-md w-1/2 h-[140vh] top-[320px] inset-2 absolute">
        <div className="right flex flex-col justify-evenly ">
          <div className="text-center py-10">
            <div className="w-3/4 mx-auto flex flex-col gap-10 ">
              <div className="title">
                <h1 className="text-gray-800 text-4xl font-bold py-4"></h1>
                <p className="w-3/4 mx-auto text-blue-600 font-bold"> 
                  SEARCH PAGE
                  <button
                className="float-right font-bold m-2 bg-red-500 px-4 py-3 rounded-lg text-slate-200 hover:scale-110 duration-300"
                onClick={() => signOut(auth)}
              >
                Sign out
              </button>
                </p>
              </div>

              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-row border rounded-t-xl">
                
                  <input
                    type="email"
                    name="email"
                    //placeholder="Email"
                    className=" w-full py-4 px-6 border text-slate-400 rounded-xl bg-slate-50 focus:outline-1"
                    value={user.email}
                    disabled
                  />
                  <span className="icon flex items-center px-4">
                    <HiAtSymbol size={25} />
                  </span>
                </div>

                <div className="flex flex-row border rounded-t-xl">
                  <input
                    type="text"
                    name="username"
                    //placeholder={user.username}
                    value={user.username}
                    disabled
                    className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                  />
                  <span className="icon flex items-center px-4">
                    <HiOutlineUser size={25} />
                  </span>
                </div>
                <div className="flex flex-row border rounded-t-xl">
                  <input
                    type="text"
                    name="VModel"
                    //placeholder={user.vModel}
                    value={user.vModel}
                    //   onChange={(e)=>setZ(e.target.value)}
                    disabled
                    className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                  />
                  <span className="icon flex items-center px-4">
                    <AiFillCar size={25} />
                  </span>
                </div>
                <div className="flex flex-row border rounded-t-xl">
                  <input
                    type="text"
                    name="VNum"
                    //placeholder={user.vNo}
                    value={user.vNo}
                    disabled
                    className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                  />
                  <span className="icon flex items-center px-4">
                    <AiFillCar size={25} />
                  </span>
                </div>
                <div className="flex flex-row border rounded-t-xl">
                  <input
                    type="number"
                    name="phone"
                    //placeholder={user.phone}
                    disabled
                    value={user.phone}
                    className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                  />
                  <span className="icon flex items-center px-4">
                    <HiPhone size={25} />
                  </span>
                </div>
                <div className="flex flex-row border rounded-t-xl">
                  <textarea placeholder="Enter" onChange={(e)=>setMsg(e.target.value)} rows={4} id="msg" name="msg" className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1" />
                  <span className="icon flex items-center px-4">
                    <AiFillMessage size={25} />
                  </span>
                </div>

              
                <div className="flex  border rounded-t-xl">
                  <span className="icon space-x-4 h-18 flex items-center px-4">
                    <MdLocationOn size={25} />
                    <button
                      onClick={()=>getLocation()}
                      className="rounded border-2 p-2 bg-indigo-600"
                    >
                      Get Location :{" "}
                    </button>

                    <p>{status}</p>
                    {lat && <p>Latitude : {lat}</p>}
                    {lng && <p>Longitude : {lng}</p>}
                  </span>
                </div>
                <div className="flex flex-row border rounded-t-xl">
                  <MdLocationOn size={25} />
                  <button
                    onClick={()=>getLoc()}
                    className="rounded border-2 p-2 bg-indigo-600"
                  >
                    Get Address :{" "}
                  </button>
                  {ad && <p>{ad}</p>}
                </div>
                <div className="input-button">
                  <button
                    type="submit"
                    // disabled={loading}
                    className="bg-indigo-600 rounded-lg p-3 text-white"
                  >
                    Submit
                  </button>
                  {loading}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-10">
    <div className="m-auto w-1/4 space-y-4">

         {
          show && <Request lat={lat} lng={lng} user={user} address={ad} msg= {msg}/>
         }
    </div>
      </div>
    </div>
  );
}
