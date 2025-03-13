"use client"; // Remove if using Next.js 12 Pages Router

import { FaUser } from "react-icons/fa";
import Navbar from "@/components/Navbar"; // Adjust path as needed

export default function HomePage() {
  // Mock data
  const friends = [{ name: "Emma" }, { name: "Jack" }];

  const events = [
    {
      title: "Bingo",
      date: "17th May, 16:00",
      location: "Athlone - d56, r4g6",
    },
  ];

  const localPosts = [
    {
      content: "Looking for a plumber !!!",
      timestamp: "12:03pm 17/2/25",
    },
  ];

  return (
    <div className="bg-[var(--color-background)] min-h-screen flex flex-col">
      {/* Header */}
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center text-[var(--color-gray-700)] mt-0">
          NearMe
        </h1>
      </div>

      {/* Main content area */}
      <div className="flex-1 px-4 space-y-6">
        {/* Friends with Similar Interests */}
        <div className="bg-[var(--color-card-bg)] p-4 rounded shadow">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-[var(--color-gray-700)]">
              Friends with similar interests
            </h2>
            <button className="bg-[var(--color-black)] text-[var(--color-white)] px-3 py-1 rounded">
              See More
            </button>
          </div>
          {/* Friends List */}
          <div className="flex gap-6">
            {friends.map((friend, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <FaUser
                  className="text-[var(--color-gray-700)] mb-1"
                  size={32}
                />
                <span className="text-[var(--color-gray-700)]">
                  {friend.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Events You Might Like */}
        <div className="bg-[var(--color-card-bg)] p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-[var(--color-gray-700)] mb-2">
            Events you might like
          </h2>
          {events.map((event, idx) => (
            <div
              key={idx}
              className="bg-[var(--color-background)] p-3 rounded mb-2"
            >
              <p className="text-[var(--color-gray-700)] font-semibold">
                {event.title}, {event.date}
              </p>
              <p className="text-[var(--color-gray-700)]">{event.location}</p>
            </div>
          ))}
        </div>

        {/* Local Posts */}
        <div className="bg-[var(--color-card-bg)] p-4 rounded shadow">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-[var(--color-gray-700)]">
              Local Posts
            </h2>
          </div>
          {localPosts.map((post, idx) => (
            <div
              key={idx}
              className="bg-[var(--color-background)] p-3 rounded mb-2"
            >
              <p className="text-[var(--color-gray-700)] font-semibold">
                {post.content}
              </p>
              <p className="text-[var(--color-gray-700)] text-sm">
                {post.timestamp}
              </p>
            </div>
          ))}
          <button className="bg-[var(--color-black)] text-[var(--color-white)] px-3 py-1 rounded">
            See More
          </button>
        </div>
      </div>
    </div>
  );
}
