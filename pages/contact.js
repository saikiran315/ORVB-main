import React, { useState, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import h from "../public/photos/Animated_Shape.svg";
import {
  HiAtSymbol,
  HiFingerPrint,
  HiOutlineUser,
  HiPhone,
} from "react-icons/hi";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import Nav from "../components/Nav";
import Image from "next/image";
import { GiHomeGarage } from "react-icons/gi";
import emailjs from "@emailjs/browser";

const ContactPage = () => {
  const form = useRef();

  const templateParams = {
    from_name: "praneeth",
    to_name: "kiran",
    from_email: "praneethsai800@gmail.com",
    to_email: "sai.dharmapu@gmail.com",
    message: "hello world, this is a test message",
  };

  const [submitterName, setSubmitterName] = useState("");
  const router = useRouter();

  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  // const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form.current);
    emailjs
      .send(
        "service_nd1r2a8",
        "template_lf2h10u",
        templateParams,
        "a7Q45_gXvq8wekhqM"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log(result);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setLoading(true);
    form.current.reset();
  };

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
                    Contact Form
                  </p>
                </div>

                <form
                  ref={form}
                  className="flex flex-col gap-5"
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-row border rounded-t-xl">
                    <input
                      required
                      type="text"
                      name="from_name"
                      placeholder="From Name"
                      className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                    />
                    <span className="icon flex items-center px-4">
                      <HiOutlineUser size={25} />
                    </span>
                  </div>
                  <div className="flex flex-row border rounded-t-xl">
                    <input
                      type="email"
                      name="from_email"
                      placeholder="From Email"
                      className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                    />
                    <span className="icon flex items-center px-4">
                      <HiAtSymbol size={25} />
                    </span>
                  </div>
                  <div className="flex flex-row border rounded-t-xl">
                    <input
                      type="text"
                      name="to_name"
                      placeholder="To Name"
                      className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                    />
                    <span className="icon flex items-center px-4">
                      <HiAtSymbol size={25} />
                    </span>
                  </div>
                  <div className="flex flex-row border rounded-t-xl">
                    <input
                      type="email"
                      name="to_email"
                      placeholder="To Email"
                      className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                    />
                    <span className="icon flex items-center px-4">
                      <HiAtSymbol size={25} />
                    </span>
                  </div>

                  <div className="flex flex-row border rounded-t-xl">
                    <textarea
                      rows={4}
                      name="message"
                      placeholder="message"
                      className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                    />
                    <span className="icon flex items-center px-4">
                      <GiHomeGarage size={25} />
                    </span>
                  </div>

                  <div className="input-button">
                    {loading && "sent Successfully"}
                  </div>
                </form>
                <button
                  type="submit"
                  // disabled={loading}
                  onClick={handleSubmit}
                  className="bg-indigo-600 rounded-lg p-3 text-white"
                >
                  SEND
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ContactPage;
