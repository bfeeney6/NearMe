import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = () => setNavOpen(!navOpen);

  return (
    <nav className="relative w-full bg-white py-4 px-4 shadow flex items-center justify-center">
      {/* <div> 
        <img src="/nearme.jpeg" alt="nearme Logo" className="h-22 max-h-[100px] w-auto" />
      </div> */}
      <div className="hidden md:flex absolute right-4 items-center space-x-4">
        <Link
          href="/home"
          className="text-gray-500 hover:text-gray-700 no-underline transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          href="/friends"
          className="text-gray-500 hover:text-gray-700 no-underline transition-colors duration-200"
        >
          Friends
        </Link>
        <Link
          href="/events"
          className="text-gray-500 hover:text-gray-700 no-underline transition-colors duration-200"
        >
          Events
        </Link>
        <Link
          href="/local-posts"
          className="text-gray-500 hover:text-gray-700 no-underline transition-colors duration-200"
        >
          Local Posts
        </Link>
        <Link
          href="/business-offers"
          className="text-gray-500 hover:text-gray-700 no-underline transition-colors duration-200"
        >
          Business Offers
        </Link>
        <Link
          href="/messages"
          className="text-gray-500 hover:text-gray-700 no-underline transition-colors duration-200"
        >
          Messages
        </Link>
        <Link
          href="/profile"
          className="text-gray-500 hover:text-gray-700 no-underline transition-colors duration-200"
        >
          Profile
        </Link>
      </div>
      <div className="md:hidden absolute right-4">
        <button onClick={toggleNav}>
          {navOpen ? (
            <FaTimes className="text-gray-500 hover:text-gray-700" size={24} />
          ) : (
            <FaBars className="text-gray-500 hover:text-gray-700" size={24} />
          )}
        </button>
      </div>
      {navOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow">
          <div className="flex flex-col items-center p-4 space-y-2">
            <Link
              href="/home"
              onClick={() => setNavOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/friends"
              onClick={() => setNavOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Friends
            </Link>
            <Link
              href="/events"
              onClick={() => setNavOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Events
            </Link>
            <Link
              href="/local-posts"
              onClick={() => setNavOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Local Posts
            </Link>
            <Link
              href="/business-offers"
              onClick={() => setNavOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Business Offers
            </Link>
            <Link
              href="/messages"
              onClick={() => setNavOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Messages
            </Link>
            <Link
              href="/profile"
              onClick={() => setNavOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
