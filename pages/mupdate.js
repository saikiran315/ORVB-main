import React, { useState,useContext,useEffect } from "react";
import Image from "next/image";
// import { doc, onSnapshot } from "firebase/firestore";

import h from "../public/photos/Animated_Shape.svg";
import Nav from "../components/Nav";
import { useFormik } from 'formik';
import { AuthContext } from "../context/AuthUserContext";

import Layout from "../layout/layout";
import Link from "next/link";
import {
  HiAtSymbol,
  HiFingerPrint,
  HiOutlineUser,
  HiPhone,
} from "react-icons/hi";
import {
  MdLocationOn
} from "react-icons/md"
import { GiHomeGarage } from "react-icons/gi"
import { AiFillCar } from "react-icons/ai";
import { registerValidate } from "../lib/validate";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, updateDoc,onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";

export default function mupdate() {
    const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [ad, setAd] = useState()
  const api = "ApOrSPtt3Kb25jn69KkX92oZaaLopI9ppMJaU6-eVeieOrMCWg9vusEaME2E10Dd"
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });

    }
  }
  async function getLoc() {
    const url = `https://dev.virtualearth.net/REST/v1/Locations/${lat},${lng}?&key=${api}`
    const response = await fetch(url);
    var data = await response.json();
    setAd(data["resourceSets"][0]["resources"][0]["address"]["formattedAddress"])
    // if(Object.keys(ad).length!=0){

    //   console.log(ad["resourceSets"][0]["resources"][0]["address"]["formattedAddress"]);
    console.log(data["resourceSets"][0]["resources"][0]["address"]["formattedAddress"]);
    // }
    console.log(data);

    // console.log(ad["resourceSets"][0]["resources"][0]["address"]["formattedAddress"]);
    // console.log(Object.keys(ad).length!=0);
  }
  const [show, setShow] = useState({});

  const [z,setZ] = useState({
    username:"",
    vModel:"",
    vNo:"",
    phone:""

  })
  
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (auth.currentUser) {
      let uid = auth.currentUser.uid;

      const docRef = doc(db, "mechanic",uid);
      onSnapshot(docRef, (doc) => {
        setUser(doc.data());
      });
    } else {
    }
  }, [auth]);

  if (!currentUser) {
    router.push("./Login");
  }

  const handleSubmit= async (e)=>
  {
    setLoading(true);
    e.preventDefault();
    const username = e.target[1].value;
    const ShopName = e.target[2].value; 
    const loc = e.target[3].value;
    const Address = e.target[4].value;
    const phone = e.target[5].value;
    //  const file = e.target[6].files[0];
    console.log(username,ShopName,loc,Address,phone);
    // console.log(username);
    const date = new Date().getTime();
    const storageRef = ref(storage, `${username + date}`);
    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          //create user on firestore
          await updateDoc(doc(db, "mechanic", user.uid), {username : username,
            ShopName:ShopName,
            loc : loc,
            Address: Address,
            phone : phone,
            photoURL: downloadURL})
      .then(() => {
          console.log("A New Document Field has been added to an existing document");
      })
      .catch(error => {
          console.log(error);
      })
          console.log("succesfull");
        } catch (err) {
          console.log(err);
          console.log("failed1");
          setErr(true);
          setLoading(false);
        }
      });
    });
    router.push("./mdashboard");

    

  }


  return (
    <>
      <Nav />
      <div className="flex  relative">
        <Image src={h} className="w-full h-[135vh]" alt=""></Image>
        <div className="m-auto bg-slate-50 rounded-md w-2/5 absolute inset-2">
          <div className="right flex flex-col justify-evenly ">
            <div className="text-center py-10">
              <div className="w-3/4 mx-auto flex flex-col gap-10 ">
                <div className="title">
                  <h1 className="text-gray-800 text-4xl font-bold py-4"></h1>
                  <p className="w-3/4 mx-auto text-blue-600 font-bold">
                    Update Details
                  </p>
                </div>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <div className="flex flex-row border rounded-t-xl">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
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
                      placeholder={user.username}
                    //   value={user.username}
                      
                      className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"

                    />
                    <span className="icon flex items-center px-4">
                      <HiOutlineUser size={25} />
                    </span>
                  </div>
                  <div className="flex flex-row border rounded-t-xl">
                    <input
                      type="text"
                      name="ShpName"
                      placeholder={user.ShopName}
                    //   value={user.vModel}
                    //   onChange={(e)=>setZ(e.target.value)}
                      className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                    />
                    <span className="icon flex items-center px-4">
                      <AiFillCar size={25} />
                    </span>
                  </div>
                   <div className="flex  border rounded-t-xl">
                    <span className="icon space-x-4 h-18 flex items-center px-4">
                      <MdLocationOn size={25} />
                      <button onClick={getLocation} className="rounded border-2 p-2 bg-indigo-600">Get Location : </button>

                      <p>{status}</p>
                      {lat && <p>Latitude : {lat}</p>}
                      {lng && <p>Longitude : {lng}</p>}
                    </span>
                  </div>
                  <div className="flex flex-row border rounded-t-xl">
                    <input
                      type="text"
                      name="Address"
                      placeholder={user.Address}
                    //   value={user.vNo}
                      className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                    />
                    <span className="icon flex items-center px-4">
                      <AiFillCar size={25} />
                      <button onClick={getLoc} className="rounded border-2 p-2 bg-indigo-600">Get Address : </button>
                    {ad && <p>{ad}</p>}
                    </span>
                  </div>
                  <div className="flex flex-row border rounded-t-xl">
                    <input
                      type="number"
                      name="phone"
                      placeholder={user.phone}
                    //   value={user.phone}
                      className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                    />
                    <span className="icon flex items-center px-4">
                      <HiPhone size={25} />
                    </span>
                  </div>

                  {/* <input
                    required
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                  />
                  <label htmlFor="file">
                    <button className="bg-indigo-600 rounded-lg p-3 text-white  ">Edit avatar</button>
                  </label> */}

                  <input
                    
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                  />
                  <label htmlFor="file">
                    
                      <span className="text-white bg-green-400 p-3 cursor-pointer rounded-lg ">Edit avatar</span>
                  </label>

                  <div className="input-button">
                    <button
                      type="submit"
                      // disabled={loading}
                      className="bg-indigo-600 rounded-lg p-3 text-white"
                    >
                      Submit
                    </button>
                    {loading && "Updated"}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
                    }