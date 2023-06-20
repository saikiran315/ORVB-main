import React from "react";
import Image from "next/image";
import h from "../public/photos/Animated_Shape.svg";
import hero from "../public/photos/hero.png";
 
const Landing = () => {
  return (
    <>
      <div className="relative">
        <Image src={h} className="w-full h-screen" alt=""></Image>
        <div className="absolute left-2 top-2 text-white flex items-center justify-center">
          <p className="w-1/2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At tenetur
            repellendus itaque, asperiores cupiditate sapiente iure doloribus
            aut. Quisquam odit accusantium perferendis molestias sit eos minus
            porro rem, iure quo!
          </p>
          <Image src={hero} alt=""></Image>
        </div>
      </div>
    </>
  );
};

export default Landing;
