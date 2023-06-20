// import React,{useState} from 'react'
// import Head from "next/head";
// const about = () => {
//     const [buttonText, setButtonText] = useState('Click me!')
//     function handleClick() {
//         setButtonText('You clicked the button!')
//       }
//     return (
//         <div className="min-h-screen flex flex-col justify-center items-center">
//           <Head>
//             <title>About page</title>
//             <meta name="description" content="This is the about page" />
//           </Head>
//           <h1 className="text-4xl font-bold mb-4">About page</h1>
//           <p className="mb-8">Welcome to the about page!</p>
//           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>{buttonText}</button>
//         </div>
//       )
// }

// export default about
import React from 'react';
import h from "../public/photos/Animated_Shape.svg";
import { FaPhoneAlt } from 'react-icons/fa';
import Image from "next/image";
const About = () => {
  return (
    <div className='relative'>
      <Image src={h} className="w-full h-screen " alt=""></Image>
      <div className="flex flex-col items-center justify-center py-10 absolute top-20 bg-white">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-600 text-center max-w-lg mb-6">
          Our on-road vehicle breakdown application is designed to provide drivers
          with quick and reliable assistance when their vehicles break down on the
          road.
        </p>
        <div className="flex items-center mb-4">
          <FaPhoneAlt className="text-gray-600 mr-2" />
          <p className="text-gray-600">9381243783</p>
        </div>
        <p className="text-gray-600 mb-6">
          Our team consists of experienced professionals in the automotive industry
          who understand the importance of prompt and efficient roadside assistance.
        </p>
        <p className="text-gray-600 mb-6">
          Our app offers a variety of services, including towing, jump-starting a
          dead battery, changing a flat tire, and providing fuel delivery. We work
          with a network of reliable and certified service providers who are available
          24/7 to help you get back on the road as quickly as possible.
        </p>
        <p className="text-gray-600">
          We prioritize safety and customer satisfaction, and we strive to provide
          the highest quality of service to each and every one of our customers.
        </p>
      </div>
    </div>
  );
};

export default About;
