'use client'

import Link from "next/link";
import { useEffect } from "react";
import PixelSnow from "./components/PixelSnow";

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
}

const ErrorPage = ({error, reset}: ErrorProps) => {
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

      <h1 className="text-2xl font-bold">Sorry, something went wrong</h1>

      <p className="mt-2 text-gray-600">
        We couldn't load the requested data.
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          Try Again
        </button>
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

export default ErrorPage;