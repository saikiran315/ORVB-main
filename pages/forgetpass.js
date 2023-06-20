import React from 'react'
import Image from "next/image"
import { HiAtSymbol, } from "react-icons/hi";
import h from "../public/photos/Animated_Shape.svg";
import { signInWithEmailAndPassword, getAuth, sendPasswordResetEmail} from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
const ForgetPass = () => {

     const [user, loading] = useAuthState(auth)
    const ForgetPass = (e) =>{
        e.preventDefault();
        // console.log(e.target[0].value)       
        const email = e.target[0].value;
        console.log(email)
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
    return (

        <div className="flex h-screen relative">
            <Image src={h} className="w-full h-screen" alt=""></Image>
            <div className="absolute inset-16 m-auto bg-white rounded-lg w-3/4 grid lg:grid-cols-2 ">
                <div className=" relative">
                    <div className="relative w-[100%] z-10 h-[100%] bg-no-repeat rounded-lg bg-cover bg-[url('/photos/logo.png')]"></div>
                </div>
                <div className="right flex flex-col justify-evenly ">
                    <div className="text-center">
                        
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
                                        FORGET PASSWORD
                                    </p>
                                </div>
                                {/* <Link href="/Dashboard">dashboard</Link>; */}
                                <form className="flex flex-col gap-5" onSubmit={ForgetPass}>
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
                                        <button className="text-blue-700" type='submit' >Reset</button>
                                    </form>
                                    {/* <p className="text-center text-gray-400 mt-[-33px]"> */}
                                    {/* </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        


    )
}

export default ForgetPass