import React, { useState } from "react";
import Image from "next/image";
import h from "../public/photos/Animated_Shape.svg";
import Nav from "../components/Nav";
import { useFormik } from 'formik';
import Layout from "../layout/layout";
import Link from "next/link";
import {
  HiAtSymbol,
  HiFingerPrint,
  HiOutlineUser,
  HiPhone,
} from "react-icons/hi";

import { AiFillCar } from "react-icons/ai";
import { registerValidate } from "../lib/validate";

// import Add from "./img/addAvatar.png";
// import Add from "/photos/img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, getAuth } from "firebase/auth";
import { auth, db, storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";

export default function roadregister() {
  const [show, setShow] = useState({ password: false, cpassword: false });


  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState('');
  const [cpassword, setcpassword] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const cpassword = e.target[3].value;

    const vModel = e.target[4].value;
    const vNo = e.target[5].value;
    const phone = e.target[6].value;
    const file = e.target[7].files[0];
    try {
      //Create user

      const res = await createUserWithEmailAndPassword(auth, email, password)
      console.log(res);
    //   res.then((userCredential) => {
    //     // send verification mail.
    //     userCredential.user.sendEmailVerification();
    //     auth.signOut();
    //     alert("Email sent");
    //   })
    //   .catch(alert); 
    // }

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
      await setDoc(doc(db, "clients", res.user.uid), {
        uid: res.user.uid,
        username,
        email,
        vModel,
        vNo,
        phone,
        photoURL: downloadURL,
      });
      console.log("succesfull");
      const auth = getAuth();

    } catch (err) {
      console.log(err);
      console.log("failed1");
      setErr(true);
      setLoading(false);
    }
  });
});
    } catch (err) {
  console.log("failed2");
  setErr(true);
  setLoading(false);
}
//router.push("./Login");
  };

//const isPasswordValid = password.length >= 8 || password.length <= 20 && password == cpassword;

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
                    required
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
                   // pattern="[a-z0-9]{1,10}"
                    title="password must not contain special letters"
                    className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                    required
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
                    required
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
                <div className="flex flex-row border rounded-t-xl">
                  <input
                    required
                    type="text"
                    name="VModel"
                    placeholder="Vehicle Model"
                    className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                  />
                  <span className="icon flex items-center px-4">
                    <AiFillCar size={25} />
                  </span>
                </div>
                <div className="flex flex-row border rounded-t-xl">
                  <input
                    required
                    type="text"
                    name="VNum"
                    placeholder="Vehicle Number"
                    className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                  />
                  <span className="icon flex items-center px-4">
                    <AiFillCar size={25} />
                  </span>
                </div>
                <div className="flex flex-row border rounded-t-xl">
                  <input
                    required
                    type="tel"
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
