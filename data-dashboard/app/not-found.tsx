'use client'

import Link from "next/link";
import { useEffect } from "react";
import PixelSnow from "./components/PixelSnow";

const NotFoundPage = () => {
  return (
    <>
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="astronaut-container">
        <img 
          src="/astronaut-image.png" 
          alt="Floating Astronaut" 
          className="w-75 h-75 object-contain"
        />
      </div>

      <h1 className="text-2xl font-bold">
        The page you're looking for doesn't exist.
        </h1>

      <div className="mt-6 flex gap-4">
        <Link
        href="/search"
        className="rounded-lg border border-gray-300 px-5 py-2 hover:bg-gray-800"
        >
        Go Home
        </Link>
      </div>
    </div>
    <PixelSnow />
    </>
  );
}

export default NotFoundPage;