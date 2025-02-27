import React, { useState, useEffect } from "react";

const AnimatedCard = ({ title, subtitle, images }) => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered && images.length > 1) {
      let index = 0;
      const interval = setInterval(() => {
        index = (index + 1) % images.length;
        setCurrentImage(images[index]);
      }, 300); // Change image every 300ms

      return () => clearInterval(interval);
    } else {
      setCurrentImage(images[0]); // Reset to the first image when not hovered
    }
  }, [hovered, images]);

  return (
    <div
  className="w-64 h-72 rounded-xl bg-[#315242] text-white p-4 shadow-lg transition-transform transform hover:scale-105 cursor-pointer flex flex-col justify-between border border-[rgb(48,80,65)]"
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
>
  <div>
    <h2 className="text-xl font-semibold">{title}</h2>
    <p className="text-sm mt-2 flex items-center text-gray-300">
      {subtitle} <span className="ml-2">→</span>
    </p>
  </div>
  <img
    src={currentImage}
    alt={title}
    className="w-full rounded-lg object-cover mt-4"
  />
</div>

  );
};

export default AnimatedCard;
