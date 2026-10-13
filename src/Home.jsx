import React from "react";
import homeimg from "../public/home.png";
import homeimg2 from "../public/home2.png";

const categories = [
  "PHP & Laravel",
  "CodeIgniter & REST APIs",
  "HTML, CSS & JS",
  "MySQL & SQL",
];

export const Home = () => {
  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-black text-white md:block md:h-[100svh]">
      {/* Top Image Container */}
      <div className="relative flex w-full flex-1 items-center justify-center p-2 pt-4 md:absolute md:inset-0 md:p-0">
        {/* Mobile Image (home2.png) */}
        <img
          src={homeimg2}
          alt="Portfolio hero mobile"
          className="block max-h-[68vh] w-auto object-contain object-center md:hidden"
        />

        {/* Desktop Image (home.png) */}
        <img
          src={homeimg}
          alt="Portfolio hero desktop"
          className="hidden h-full w-full object-cover object-[65%_center] md:block"
        />
      </div>

      {/* Content Section: Motivation Quote + Buttons + Name */}
      <div className="flex w-full flex-col gap-4 px-5 pb-6 pt-2 md:static md:p-0">
        {/* Professional Motivation Quote from Resume */}
        <div className="max-w-md text-left md:hidden">
          <p className="text-xs italic leading-relaxed text-gray-300">
            "Passionate about building seamless web applications, robust REST
            APIs, and dynamic e-commerce solutions with clean code and efficient
            database architecture."
          </p>
        </div>

        {/* Category Buttons */}
        <div className="btn-wrap flex flex-wrap gap-2 md:absolute md:bottom-auto md:left-[2%] md:right-auto md:top-[72%] md:gap-3">
          {categories.map((item) => (
            <span
              key={item}
              className="cursor-pointer rounded-full border border-white/70 px-3 py-1 text-[11px] text-white transition-all hover:bg-white hover:text-black md:px-4 md:py-1 md:text-[10px] lg:px-5 lg:py-1.5 lg:text-sm"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Name and Subtext */}
        <div className="text-wrap md:absolute md:bottom-[4%] md:left-[2%]">
          <div>
            <p className="text-[11px] text-white/70 sm:text-xs lg:text-sm">
              or just google me
            </p>
            <h1 className="cursor-pointer text-lg font-bold tracking-wide transition-all hover:translate-x-2 sm:text-xl lg:text-2xl">
              YAZHINI SARAVANAN
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
