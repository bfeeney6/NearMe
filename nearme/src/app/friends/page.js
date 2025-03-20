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

function CurrentFriendsSection() {
  const friends = [
    { id: 1, name: "Alice Johnson", location: "New York", interest: "Hiking" },
    { id: 2, name: "Michael Smith", location: "Los Angeles", interest: "Photography" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-gray-700)]">
        Current Friends &amp; Groups
      </h2>

      {friends.length > 0 ? (
        <ul className="space-y-4">
          {friends.map((friend) => (
            <li key={friend.id} className="bg-gray-100 p-4 rounded shadow">
              <h3 className="font-semibold text-lg">{friend.name}</h3>
              <p className="text-sm text-gray-600">
                Location: {friend.location} | Interest: {friend.interest}
              </p>
              <button className="mt-2 px-4 py-2 bg-[var(--color-black)] text-[var(--color-white)] rounded transition duration-200 hover:bg-gray-800">
                View Profile
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[var(--color-gray-700)]">You currently have no friends or groups added.</p>
      )}
    </div>
  );
}


function SearchFriendsSection() {
  const [searchType, setSearchType] = useState("friends");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setTimeout(() => {
      setSearchResults([
        { id: 1, name: "John Doe", location: "New York", interest: "Hiking" },
        { id: 2, name: "Jane Smith", location: "New York", interest: "Hiking" },
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-[var(--color-gray-700)]">
        Search for New Friends &amp; Groups
      </h2>

      <input type="text" placeholder="Enter name" className="border border-gray-300 rounded p-2 w-full mb-4" />
      <input type="text" placeholder="Enter location" className="border border-gray-300 rounded p-2 w-full mb-4" />
      <input type="text" placeholder="Enter activity or interest" className="border border-gray-300 rounded p-2 w-full mb-4" />
      
      <button onClick={handleSearch} className="w-full py-2 rounded bg-[var(--color-black)] text-[var(--color-white)] font-semibold">
        Search
      </button>
      
      {loading && <p className="text-center text-gray-500 mt-4">Searching...</p>}

      <div className="mt-4">
        {searchResults.map((profile) => (
          <div key={profile.id} className="p-4 border rounded mb-2">
            <p className="font-semibold">{profile.name}</p>
            <p className="text-sm text-gray-600">Location: {profile.location}</p>
            <p className="text-sm text-gray-600">Interest: {profile.interest}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
