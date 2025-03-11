"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState("current");

  return (
    <div className="bg-[var(--color-background)] min-h-screen">
      <Navbar />

      <h1 className="text-2xl font-bold text-center mt-0 mb-6 text-[var(--color-gray-700)]">
        Friends
      </h1>

      <div className="max-w-md mx-auto bg-[var(--color-card-bg)] p-6 rounded shadow">
        <div className="flex justify-between mb-4">
          <button
            className={`w-full py-2 rounded-l ${
              activeTab === "current"
                ? "bg-[var(--color-black)] text-[var(--color-white)]"
                : "bg-[var(--color-background)] text-[var(--color-gray-700)]"
            }`}
            onClick={() => setActiveTab("current")}
          >
            Current Friends &amp; Groups
          </button>
          <button
            className={`w-full py-2 rounded-r ${
              activeTab === "search"
                ? "bg-[var(--color-black)] text-[var(--color-white)]"
                : "bg-[var(--color-background)] text-[var(--color-gray-700)]"
            }`}
            onClick={() => setActiveTab("search")}
          >
            Search for New Friends &amp; Groups
          </button>
        </div>

        {activeTab === "current" && <CurrentFriendsSection />}
        {activeTab === "search" && <SearchFriendsSection />}
      </div>
    </div>
  );
}

/*
   Current Friends & Groups Section
*/
function CurrentFriendsSection() {
  // API
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-gray-700)]">
        Current Friends &amp; Groups
      </h2>
      <p className="text-[var(--color-gray-700)]">
        {/* Replace with your own list of friends/groups */}
        You currently have no friends or groups added.
      </p>
    </div>
  );
}

/*
   Search for New Friends & Groups Section
*/
function SearchFriendsSection() {
  const [searchType, setSearchType] = useState("friends");

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-gray-700)]">
        Search for New Friends &amp; Groups
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1 text-[var(--color-gray-700)]">
          Name
        </label>
        <input
          type="text"
          placeholder="Enter name"
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1 text-[var(--color-gray-700)]">
          Location
        </label>
        <input
          type="text"
          placeholder="Enter location"
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1 text-[var(--color-gray-700)]">
          Activity/Interest
        </label>
        <input
          type="text"
          placeholder="Enter activity or interest"
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1 text-[var(--color-gray-700)]">
          Age
        </label>
        <input
          type="number"
          placeholder="Enter age"
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm font-semibold text-[var(--color-gray-700)]">
          Search for:
        </span>
        <button
          onClick={() => setSearchType("groups")}
          className={`px-3 py-1 rounded ${
            searchType === "groups"
              ? "bg-[var(--color-black)] text-[var(--color-white)]"
              : "bg-[var(--color-background)] text-[var(--color-gray-700)]"
          }`}
        >
          Groups
        </button>
        <button
          onClick={() => setSearchType("friends")}
          className={`px-3 py-1 rounded ${
            searchType === "friends"
              ? "bg-[var(--color-black)] text-[var(--color-white)]"
              : "bg-[var(--color-background)] text-[var(--color-gray-700)]"
          }`}
        >
          Friends
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1 text-[var(--color-gray-700)]">
          Upload Photo ID
        </label>
        <input
          type="file"
          className="border border-gray-300 rounded p-2 w-full"
        />
        <p className="text-xs text-gray-500 mt-1">
          Note: ID must be either driver&apos;s license or passport.
        </p>
      </div>

      <button className="w-full py-2 rounded bg-[var(--color-black)] text-[var(--color-white)] font-semibold">
        Search
      </button>
    </div>
  );
}
