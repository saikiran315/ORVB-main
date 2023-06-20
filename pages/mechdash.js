

import h from "../public/photos/Animated_Shape.svg";
import Nav from "../components/Nav";
import {
    HiAtSymbol,
    HiOutlineUser,
    HiPhone,
} from "react-icons/hi";
import {
    MdLocationOn
} from "react-icons/md"
import { AiFillCar } from "react-icons/ai";
import { GiHomeGarage } from "react-icons/gi"
import { auth, db, storage,currToken } from "../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { React, useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth"
import Image from "next/image";

const mechdash = () => {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);
    const [ad, setAd] = useState()
    
    const api = "ApOrSPtt3Kb25jn69KkX92oZaaLopI9ppMJaU6-eVeieOrMCWg9vusEaME2E10Dd"
    const getLocation = (e) => {
        e.preventDefault()
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

    async function getLoc(e) {
        e.preventDefault()
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
    console.log(lat, lng);
    console.log(ad);
    const router = useRouter()
    const [user, setuser] = useAuthState(auth)
    const [verify, setVerify] = useState(false)
    const [err, setErr] = useState(false)


    const signout = () => {
        signOut(auth)
        router.push('/')
    }

    console.log(user);
    const check = async () => {
        const docRef = doc(db, "mechanic", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            router.push("./mdashboard")
        } else {
            // docSnap.data() will be undefined in this case
            setVerify(true)
            console.log("No such document!");
        }
    }
    useEffect(() => {
        check()
    }, [])
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const username = e.target[1].value || user.displayName;

        const Address = ad
        const ShopName = e.target[4].value;
        const phone = user.phoneNumber || e.target[5].value;
        const file = user.photoURL;
        console.log(username, Address, ShopName, phone);

        try {
            setDoc(doc(db, "mechanic", user.uid), {
                username: username,
                Address: Address,
                ShopName: ShopName,
                phone: phone,
                photoURL: file,
                uid: user.uid,
                email: user.email,
                lat: lat,
                lng: lng,
                currentToken : currToken,

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
        router.push("./mdashboard");
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

                                <form className="flex flex-col gap-5" onSubmit={handleSubmit} >
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



                                    <div className="flex  border rounded-t-xl">

                                        <span className="icon space-x-4 h-18 flex items-center px-4">
                                            <MdLocationOn size={25} />
                                        </span>
                                        <button onClick={getLocation} className="rounded border-2 p-2 bg-indigo-600">Get Location : </button>
                                        <p>{status}</p>
                                        {lat && <p>Latitude : {lat}</p>}
                                        {lng && <p>Longitude : {lng}</p>}

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
export default mechdash;