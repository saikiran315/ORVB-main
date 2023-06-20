import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "../layout/layout";
import Link from "next/link";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import login_validate from "../lib/validate";
import { signInWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider , sendPasswordResetEmail,TwitterAuthProvider} from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useAuthState, useSignInWithFacebook } from "react-firebase-hooks/auth"
import h from "../public/photos/Animated_Shape.svg";
import Nav from "../components/Nav";
// import {  } from "firebase/auth";
const Login = () => {
  const [openTab, setOpenTab] = useState(1);

  // const { authUser, loading, signOut } = useAuth();
  const router = useRouter();
  //const [show, setShow] = useState(false);
  const [show, setShow] = useState({ password: false, cpassword: false });
  const [err, setErr] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (openTab == 1) {

        router.push("/mdashboard");
      }
      else {

        router.push("/Dashboard");
      }
    } catch (err) {
      setErr(true);
    }
  };

  // const auth = getAuth();
const ForgetPass = (e) =>{
  const email = e.target[0].value;
  sendPasswordResetEmail(auth, email)
  .then(() => {
    alert("Reset Link was sent.")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}

  const showPopup = () => {
    provider.setCustomParameters({
      prompt: "select_account"
    });
    signInWithPopup(auth, provider).then((res) => {
      router.push('./mechdash')
    }).catch((error) => {
      console.log(error.message)
    })
  }
  const getPopup = () => {
    provider.setCustomParameters({
      prompt: "select_account"
    });
    signInWithPopup(auth, provider).then((res) => {
      router.push('./userDash')
    }).catch((error) => {
      console.log(error.message)
    })
  }
  const face = () =>
  {
    const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    // IdP data available using getAdditionalUserInfo(result)
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
}

  return (
    <>
      <Nav />
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-indigo-600"
                    : "text-indigo-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);  
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Mechanic
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-indigo-600"
                    : "text-indigo-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                User
              </a>
            </li>

          </ul>


        </div>
      </div>
        <div className="flex h-screen relative">
          <Image src={h} className="w-full h-screen" alt=""></Image>
          <div className="absolute inset-16 m-auto bg-white rounded-lg w-3/4 grid lg:grid-cols-2 ">
            <div className=" relative">
              <div className="relative w-[100%] z-10 h-[100%] bg-no-repeat rounded-lg bg-cover bg-[url('/photos/logo.png')]"></div>
            </div>
            <div className="right flex flex-col justify-evenly ">
              <div className="text-center">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">


                  <div className="w-3/4 mx-auto flex flex-col gap-10" >
                    <div className="title">
                      <h1 className="text-gray-800 text-4xl font-bold"></h1>
                      <p className="w-3/4 mx-auto text-violet-600 text-3xl font-bold pt-10">
                        {" "}
                        MOTO-HELP
                      </p>
                    </div>
                    <div className="title">
                      <p className="w-3/4 mx-auto text-black-600 text-xl font-bold ">
                        Mechanic Login
                      </p>
                    </div>
                    {/* <Link href="/Dashboard">dashboard</Link>; */}
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                      <div className="flex flex-row border rounded-t-xl">
                        <input
                          type="text"
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
                          placeholder="password"
                          className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                        />
                        <span
                          className="icon flex items-center px-4"
                          // onClick={() => setShow(!show)}
                          onClick={() =>
                            setShow({ ...show, password: !show.password })}
                        >
                          <HiFingerPrint size={25} />
                        </span>
                      </div>

                      <div className="input-button">
                        <button
                          type="submit"
                          className="bg-indigo-600 rounded-lg p-3 text-white hover:scale-110 duration-300 "
                        >
                          Login
                        </button>
                      </div>
                      {err && <span className="text-red-500">Something went wrong</span>}
                      <div className="flex justify-center gap-2 rounded-lg border p-3 bg-indigo-600 text-white hover:scale-110 duration-300 w-60 m-auto">
                        <Image
                          src={"/photos/google.svg"}
                          width="20"
                          height="20"
                          alt=""
                        ></Image>
                        <button type="button" onClick={showPopup}>Sign in with Google </button>
                      </div>
                    </form>
                    <p className="text-center text-red-400 mt-[-33px] hover:scale-110 duration-300 w-60 mx-auto">
                      Forgot your Password <a className="text-blue-700" href="/forgetpass">Reset</a>
                    </p>
                  </div>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link1">


                  <div className="w-3/4 mx-auto flex flex-col gap-10" >
                    <div className="title">
                      <h1 className="text-gray-800 text-4xl font-bold"></h1>
                      <p className="w-3/4 mx-auto text-violet-600 text-3xl font-bold pt-10">
                        {" "}
                        MOTO-HELP
                      </p>
                    </div>
                    <div className="title">
                      <p className="w-3/4 mx-auto text-black-600 text-xl font-bold ">
                        User Login
                      </p>
                    </div>
                    {/* <Link href="/Dashboard">dashboard</Link>; */}
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                      <div className="flex flex-row border rounded-t-xl">
                        <input
                          type="text"
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
                          placeholder="password"
                          className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                        />
                        <span
                          className="icon flex items-center px-4"
                          // onClick={() => setShow(!show)}
                          onClick={() =>
                            setShow({ ...show, password: !show.password })}
                        >
                          <HiFingerPrint size={25} />
                        </span>
                      </div>

                      <div className="input-button">
                        <button
                          type="submit"
                          className="bg-indigo-600 rounded-lg p-3 text-white hover:scale-110 duration-300 "
                        >
                          Login
                        </button>
                      </div>
                      {err && <span className="text-red-500">Something went wrong</span>}
                      <div className="flex justify-center gap-2 rounded-lg  border p-3 bg-indigo-600 text-white hover:scale-110 duration-300 w-60 m-auto">
                        <Image
                          src={"/photos/google.svg"}
                          width="20"
                          height="20"
                          alt=""
                        ></Image>
                        <button type="button" onClick={getPopup}>Sign in with Google </button>
                      </div>
                      {/* <div className="flex justify-center gap-2 rounded-lg border p-3 bg-violet-600 text-white hover:scale-110 duration-300 w-60 mx-auto">
                        <Image
                          src={"/photos/facebook"}
                          width="20"
                          height="10"
                          alt=""
                        ></Image>
                        <button
                          type="button"
                        onClick={face}
                        // className={styles.button_custom}
                        >
                          Sign-in with Facebook
                        </button>
                      </div> */}
                    </form>
                    <p className="text-center text-red-400 mt-[-33px] hover:scale-110 duration-300 w-60 mx-auto ">
                      Forgot your Password <a className="text-blue-700" href="/forgetpass">Reset</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

export default Login;
