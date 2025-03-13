"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { FaUserCircle } from "react-icons/fa";

export default function LocalPostsPage() {
  
  const [searchTerm, setSearchTerm] = useState("");

  
  const localPosts = [
    {
      id: 1,
      content: "Looking for a plumber!!!",
      time: "12:03pm",
      date: "17/2/25",
    },
    {
      id: 2,
      content: "Yes I know a plumber looking for work. He did a great job for me.",
      time: "12:03pm",
      date: "17/2/25",
    },
    {
      id: 3,
      content: "Great, please put me in contact with them.",
      time: "12:03pm",
      date: "17/2/25",
    },
  ];

  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      <Navbar />
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-lg font-bold text-[var(--color-black)]">
          Lucan posts
        </h1>
        <p className="text-[var(--color-gray-500)] text-sm mb-4">
          Place is prepopulated with profile but can be changed
        </p>
        <input
          type="text"
          placeholder="Enter category to search"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {localPosts.map((post) => (
          <div
            key={post.id}
            className="bg-[var(--color-card-bg)] p-4 rounded-md shadow mb-3"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <FaUserCircle className="text-2xl text-[var(--color-gray-700)]" />
                <p className="text-[var(--color-gray-700)] text-sm">
                  {post.content}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[var(--color-gray-500)] text-xs">
                  {post.time}
                </p>
                <p className="text-[var(--color-gray-500)] text-xs">
                  {post.date}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-[var(--color-card-bg)] p-4 rounded-md shadow mt-3">
          <div className="flex items-center gap-2">
            <FaUserCircle className="text-2xl text-[var(--color-gray-700)]" />
            <p className="text-[var(--color-gray-500)] text-sm">
              Make post.....
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
