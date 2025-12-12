import React, { useEffect, useState } from "react";
import slider1 from "../Assets/Slider1.jpeg";
import slider2 from "../Assets/Slider2.jpeg";
import slider3 from "../Assets/Slider3.jpeg";
import slider4 from "../Assets/Slider4.jpeg";
import slider5 from "../Assets/Slider5.jpeg";

function Slider() {
  const slides = [slider1, slider2, slider3, slider4, slider5];
  const [index, setIndex] = useState(0);
  const length = slides.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % length);
    }, 3500);

    return () => clearTimeout(timer);
  }, [index, length]);

  return (
    <div className="w-full">

      <div className="relative w-full overflow-hidden rounded-none shadow-lg">

        {/* IMAGES */}
        <div className="relative h-[55vh] sm:h-[68vh] md:h-[82vh] w-full">
          {slides.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="slide"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-3 mt-4 pb-5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-4 h-4 rounded-full transition ${
                i === index ? "bg-black" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>

      </div>

    </div>
  );
}

export default Slider;
