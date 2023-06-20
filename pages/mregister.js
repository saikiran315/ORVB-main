import React, { useState } from "react";
import Image from "next/image";
import h from "../public/photos/Animated_Shape.svg";
import Nav from "../components/Nav";
import { useFormik } from 'formik';
import { getAuth, sendEmailVerification } from "firebase/auth";
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
// import Add from "./img/addAvatar.png";
// import Add from "/photos/img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage,currToken } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

export default function roadregister() {
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
  console.log(ad);
  const [show, setShow] = useState({ password: false, cpassword: false });


  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const cpassword = e.target[3].value;
    const loc = e.target[4].value;
    const Address = e.target[5].value;
    const ShopName = e.target[6].value;
    const phone = e.target[7].value;
    const file = e.target[8].files[0];

    /*  try {
        //Create user
  
        const res = await createUserWithEmailAndPassword(auth, email, password).then(() => {
          // const auth = getAuth();
          // console.log(auth)
          // console.log(auth.currentUser)
          sendEmailVerification(auth.currentUser)
            .then(() => {
              alert("EMail Sent")
            });
          })
          */
    //Create a unique image name
    const date = new Date().getTime();
    const storageRef = ref(storage, `${username + date}`);
    
    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        try {
          //Update profile
          await updateProfile(res.user, {
            username,
            photoURL: downloadURL,
          });
          //create user on firestore
          await setDoc(doc(db, "mechanic", res.user.uid), {
            uid: res.user.uid,
            username,
            email,
            loc,
            Address,
            ShopName,
            phone,
            photoURL: downloadURL,
            currentToken : currToken,
          });
        } catch (err) {
          console.log(err);
          setErr(true);
          setLoading(false);
        }
        router.push("./Login");
      });
    });
  }/* catch (err) {
      setErr(true);
      setLoading(false);
    }
    router.push("./Login");*/
  // };

  return (
    <>
      <Nav />
      <div className="flex  relative">
        <Image src={h} className="w-full h-[150vh]" alt=""></Image>
        <div className="m-auto bg-slate-50 rounded-md w-2/5 absolute inset-2">
          <div className="right flex flex-col justify-evenly ">
            <div className="text-center py-10">
              <div className="w-3/4 mx-auto flex flex-col gap-10 ">
                <div className="title">
                  <h1 className="text-gray-800 text-4xl font-bold py-4"></h1>
                  <p className="w-3/4 mx-auto text-blue-600 font-bold">
                    REGISTER FORM
                  </p>
                </div>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <div className="flex flex-row border rounded-t-xl">
                    <input
                      required
                      type="text"
                      name="username"
                      placeholder="Username"

                      className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"

                    />
                    <span className="icon flex items-center px-4">
                      <HiOutlineUser size={25} />
                    </span>
                  </div>
                  <div className="flex flex-row border rounded-t-xl">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                    />
                    <span className="icon flex items-center px-4">
                      <HiAtSymbol size={25} />
                    </span>
                  </div>

                  <div className="flex flex-row border rounded-t-xl">
                    <input
                      type={`${show.password ? "text" : "password"}`}
                      name="password"
                      placeholder="Password"
                      pattern="[a-z0-9]{1,10}"
                      title="password must not contain special letters"
                      className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                    />
                    <span
                      className="icon flex items-center px-4"
                      onClick={() =>
                        setShow({ ...show, password: !show.password })
                      }
                    >
                      <HiFingerPrint size={25} />
                    </span>
                  </div>

                  <div className="flex flex-row border rounded-t-xl">
                    <input
                      type={`${show.cpassword ? "text" : "password"}`}
                      name="cpassword"
                      placeholder="Confirm password"
                      className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                    />
                    <span
                      className="icon flex items-center px-4"
                      onClick={() =>
                        setShow({ ...show, cpassword: !show.cpassword })
                      }
                    >
                      <HiFingerPrint size={25} />
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
                    <MdLocationOn size={25} />
                    <button onClick={getLoc} className="rounded border-2 p-2 bg-indigo-600">Get Address : </button>
                    {ad && <p>{ad}</p>}

                  </div>
                  <div className="flex flex-row border rounded-t-xl">
                    <input
                      type="text"
                      name="ShopName"
                      placeholder="Shop Name"
                      className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                    />
                    <span className="icon flex items-center px-4">
                      <GiHomeGarage size={25} />
                    </span>
                  </div>
                  <div className="flex flex-row border rounded-t-xl">
                    <input
                      type="number"
                      name="phone"
                      placeholder="Phone Number"
                      className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                    />
                    <span className="icon flex items-center px-4">
                      <HiPhone size={25} />
                    </span>
                  </div>

                  <input
                    required
                    style={{ display: "none" }}
                    type="file"
                    id="file"
                  />
                  <label htmlFor="file">
                    <img
                      src={"/photos/img/addAvatar.png"}
                      alt="avatar"
                      className="m-auto"
                    />
                    <span className="text-slate-500">Add an avatar</span>
                  </label>

                  <div className="input-button">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-indigo-600 rounded-lg p-3 text-white"
                    >
                      SIGN-UP
                    </button>
                    {loading && "Registered Successfully"}
                  </div>
                </form>
                <p className="text-center text-gray-400">
                  Account Exist?
                  <Link href="/Login" className="text-blue-700 ">
                    Signin
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  // }
}
