
import h from "../public/photos/Animated_Shape.svg";
import Nav from "../components/Nav";
import {
    HiAtSymbol,
    HiOutlineUser,
    HiPhone,
    MdLocationOn
} from "react-icons/hi";

import { AiFillCar } from "react-icons/ai";
import { auth, db, storage } from "../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { React, useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"
import Image from "next/image";

const userDash = () => {

    const router = useRouter()
    const [user, setuser] = useAuthState(auth)
    const [verify,setVerify] = useState(false)
    

    const signout = () => {
        signOut(auth)
        router.push('/')
    }

    console.log(user);
    const check = async () =>{
        const docRef = doc(db, "clients", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            router.push("./Dashboard")
        } else {
            // docSnap.data() will be undefined in this case
            setVerify(true)
            console.log("No such document!");   
        }
    }
    useEffect(() => {
        check()
    },[])
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const username = e.target[1].value || user.displayName;
        const vModel = e.target[2].value;
        const vNo = e.target[3].value;
        const phone = user.phoneNumber || e.target[4].value;
        const file = user.photoURL;
        console.log(username, vModel, vNo, phone);

        try {
            setDoc(doc(db, "clients", user.uid), {
                username: user.displayName,
                vModel: vModel,
                vNo: vNo,
                phone: phone,
                photoURL: file,
                uid : user.uid,
                email : user.email,

            })
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
        router.push("./Dashboard");
        // console.log("Successfull");
    }


    return (
        <>{verify && 
        
            <div className="flex  relative">
                <Image src={h} className="w-full h-[135vh]" alt=""></Image>
                <div className="m-auto bg-slate-50 rounded-md w-2/5 absolute inset-2">
                    <div className="right flex flex-col justify-evenly ">
                        <div className="text-center py-10">
                            <div className="w-3/4 mx-auto flex flex-col gap-10 ">
                                <div className="title">
                                    <h1 className="text-gray-800 text-4xl font-bold py-4"></h1>
                                    <p className="w-3/4 mx-auto text-blue-600 font-bold">
                                        Profile
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
                                            placeholder={user.displayName}
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
                                            name="VModel"
                                            placeholder="Enter Vehicle Model"
                                            //   value={user.vModel}
                                            //   onChange={(e)=>setZ(e.target.value)}
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
                                            placeholder="Enter Vehicle Number"
                                            //   value={user.vNo}
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
                                            placeholder={user.phoneNumber || "Enter Phone Number"}
                                            //   value={user.phone}
                                            className=" w-full py-4 px-6 border rounded-xl bg-slate-50 focus:outline-1"
                                        />
                                        <span className="icon flex items-center px-4">
                                            <HiPhone size={25} />
                                        </span>
                                    </div>


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
            }
        </>
    )

}
export default userDash;

