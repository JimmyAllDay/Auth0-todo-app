import BarLoader from 'react-spinners/BarLoader';
import React, { useState, useEffect } from 'react';

export default function LoadingBar({ loading }) {
  // const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress((prevProgress) => (prevProgress + 10) % 110); // Increment the progress by 10 and reset to 0 after reaching 100
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval); // Clean up the interval on component unmount
  //   };
  // }, []);

  return (
    loading && (
      <div className="relative w-full h-1 bg-teal-400 loader-rounding bg-opacity-30 overflow-hidden">
        <div className="absolute h-full bg-teal-400 loader-rounding animate-moving-block w-full"></div>
      </div>
    )
  );
}
